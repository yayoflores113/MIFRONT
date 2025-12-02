import React from "react";
import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardBody,
  Progress,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from "@heroui/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  BookOpenIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Config from "../Config";
import TestQuestion from "./TestQuestion";
import TestResults from "./TestResults";
import OpenRouterChat from "./OpenRouterChat";
import {
  getRecommendedCareers,
  getRecommendedUniversities,
  generateAnalysisSummary,
} from "./testAnalyzer";

const Test = () => {
  // Cambia esto si tu test activo tiene otro id
  const TEST_ID = 2;

  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [answers, setAnswers] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [recommendedCareers, setRecommendedCareers] = React.useState([]);
  const [recommendedCourses, setRecommendedCourses] = React.useState([]);
  const [recommendedUniversities, setRecommendedUniversities] = React.useState([]);
  const [analysisSummary, setAnalysisSummary] = React.useState(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Normaliza preguntas de la API al formato del UI
  const normalizeQuestions = (raw) =>
    (raw || [])
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((q) => ({
        id: q.id,
        question: q.text, // el UI espera 'question'
        options: (q.answer_options || []).sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        ), // el UI espera 'options'
      }));

  // Cargar las preguntas de la db al montar el componente
  React.useEffect(() => {
    let cancelled = false;

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await Config.getQuestions({ test_id: TEST_ID });
        const data = res?.data;
        const mapped = Array.isArray(data) ? normalizeQuestions(data) : [];

        if (!cancelled) {
          setQuestions(mapped);
          setCurrentStep(mapped.length ? 1 : 0);
        }
      } catch (err) {
        console.error(err);
        toast.error("No se pudieron cargar las preguntas del test.");
        if (!cancelled) {
          setQuestions([]);
          setCurrentStep(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchQuestions();
    return () => {
      cancelled = true;
    };
  }, []);

  const currentQuestion = questions[currentStep - 1];

  const handleOptionSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // Calcular resultados reales basados en respuestas
  const calculateResults = () => {
    console.log("📊 Analizando respuestas:", answers);

    // Obtener carreras recomendadas (YA vienen formateadas como strings)
    const careers = getRecommendedCareers(answers, 5);
    console.log("🎓 Carreras recomendadas:", careers);

    // Obtener universidades relacionadas (YA vienen como strings)
    const universities = getRecommendedUniversities(careers);
    console.log("🏛️ Universidades:", universities);

    // Generar resumen del análisis
    const summary = generateAnalysisSummary(answers);
    console.log("📈 Resumen:", summary);

    // Usar directamente los resultados (YA están formateados)
    setRecommendedCareers(careers);
    setRecommendedUniversities(universities);
    setRecommendedCourses([]); // Por ahora vacío
    setAnalysisSummary(summary);

    onOpen();
  };

  const restartTest = () => {
    setCurrentStep(questions.length ? 1 : 0);
    setAnswers({});
    setRecommendedCareers([]);
    setRecommendedUniversities([]);
    setRecommendedCourses([]);
    setAnalysisSummary(null);
    onOpenChange(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md p-8 shadow-sm">
          <CardBody className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2CBFF0]/10 flex items-center justify-center">
              <BookOpenIcon className="w-6 h-6 text-[#2CBFF0]" />
            </div>
            <h2 className="text-xl font-medium text-[#181818]">
              Preparando tu test
            </h2>
            <Progress
              size="sm"
              isIndeterminate
              aria-label="Cargando..."
              className="max-w-xs"
              color="primary"
            />
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-visible shadow-sm">
          <CardBody className="p-6 md:p-8">
            <div className="flex flex-col gap-8">
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-[#181818]">
                  Test de Orientación Universitaria
                </h1>
                <p className="text-slate-500">
                  Descubre las carreras que mejor se adaptan a tus intereses
                </p>
              </div>

              <div className="w-full">
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>
                    Pregunta {Math.max(currentStep, questions.length ? 1 : 0)}{" "}
                    de {questions.length}
                  </span>
                  <span>
                    {questions.length
                      ? Math.round((currentStep / questions.length) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <Progress
                  aria-label="Progreso del test"
                  value={
                    questions.length
                      ? (currentStep / questions.length) * 100
                      : 0
                  }
                  className="h-1.5"
                  color="primary"
                />
              </div>

              {questions.length === 0 ? (
                <p className="text-center text-slate-500">
                  No hay preguntas disponibles.
                </p>
              ) : (
                <TestQuestion
                  question={currentQuestion}
                  selectedOption={answers[currentQuestion?.id]?.id}
                  onOptionSelect={(option) =>
                    handleOptionSelect(currentQuestion.id, option)
                  }
                />
              )}

              <div className="flex justify-between mt-4">
                <Button
                  variant="flat"
                  color="default"
                  isDisabled={currentStep <= 1}
                  onPress={() => setCurrentStep((s) => Math.max(1, s - 1))}
                  startContent={<ArrowLeftIcon className="w-4 h-4" />}
                >
                  Anterior
                </Button>

                <Button
                  color="primary"
                  className="bg-[#2CBFF0]"
                  isDisabled={
                    !questions.length || !answers[currentQuestion?.id]
                  }
                  onPress={() => {
                    if (currentStep < questions.length) {
                      setCurrentStep((s) => s + 1);
                    } else {
                      calculateResults();
                    }
                  }}
                  endContent={
                    currentStep === questions.length ? (
                      <CheckIcon className="w-4 h-4" />
                    ) : (
                      <ArrowRightIcon className="w-4 h-4" />
                    )
                  }
                >
                  {currentStep === questions.length
                    ? "Ver resultados"
                    : "Siguiente"}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        backdrop="blur"
        scrollBehavior="inside"
        classNames={{
          body: "py-8 px-8",
          base: "max-h-[90vh]"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center pb-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <SparklesIcon className="w-8 h-8 text-[#2CBFF0]" />
                  <h2 className="text-3xl font-bold text-[#181818]">
                    ¡Tus Recomendaciones!
                  </h2>
                </div>
                {analysisSummary && analysisSummary.topAreas.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                    <span className="text-sm text-slate-600">
                      Áreas de interés:
                    </span>
                    {analysisSummary.topAreas.map((area, idx) => (
                      <Chip
                        key={idx}
                        size="sm"
                        variant="flat"
                        className="bg-[#2CBFF0]/20 text-[#2CBFF0] font-medium"
                      >
                        {area}
                      </Chip>
                    ))}
                  </div>
                )}
              </ModalHeader>
              <ModalBody className="px-6">
                <TestResults
                  careers={recommendedCareers}
                  courses={recommendedCourses}
                  universities={recommendedUniversities}
                />
                <div className="mt-4 bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
                  <h3 className="text-md font-semibold mb-3 flex items-center gap-2 text-[#181818]">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#2CBFF0]" />
                    <span>¿Tienes dudas? Consulta con nuestro asistente</span>
                  </h3>
                  <OpenRouterChat />
                </div>
              </ModalBody>
              <ModalFooter className="pt-4 border-t justify-center">
                <Button
                  variant="flat"
                  size="lg"
                  className="bg-slate-100 hover:bg-slate-200"
                  onPress={() => {
                    onClose();
                    restartTest();
                  }}
                >
                  Realizar test nuevamente
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Test;