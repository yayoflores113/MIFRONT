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

const Test = () => {
  const TEST_ID = 2;

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [answers, setAnswers] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [recommendedCareers, setRecommendedCareers] = React.useState([]);
  const [recommendedCourses, setRecommendedCourses] = React.useState([]);
  const [recommendedUniversities, setRecommendedUniversities] = React.useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const normalizeQuestions = (raw) =>
    (raw || [])
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((q) => ({
        id: q.id,
        question: q.text,
        options: (q.answer_options || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
      }));

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

  const calculateResults = async () => {
    // Mock de resultados
    const mockCareers = [
      "Ingeniería en Software (UADY)",
      "Diseño Digital (Modelo)",
      "Psicología (UADY)",
      "Administración de Empresas (UADY)",
      "Arquitectura (UADY)",
    ];
    setRecommendedCareers(mockCareers);
    setRecommendedCourses([]);
    setRecommendedUniversities([]);

    // 🔹 Registrar notificación al superusuario (solo refleja)
    try {
      await Config.post("/notificaciones/test-completado", {});
      console.log("Notificación registrada correctamente.");
    } catch (err) {
      console.error("No se pudo registrar la notificación:", err);
    }

    onOpen();
  };

  const restartTest = () => {
    setCurrentStep(questions.length ? 1 : 0);
    setAnswers({});
    onOpenChange(false);
  };

  const navigateToProfile = () => {
    navigate("/user");
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
                    Pregunta {Math.max(currentStep, questions.length ? 1 : 0)} de {questions.length}
                  </span>
                  <span>
                    {questions.length ? Math.round((currentStep / questions.length) * 100) : 0}%
                  </span>
                </div>
                <Progress
                  aria-label="Progreso del test"
                  value={questions.length ? (currentStep / questions.length) * 100 : 0}
                  className="h-1.5"
                  color="primary"
                />
              </div>

              {questions.length === 0 ? (
                <p className="text-center text-slate-500">No hay preguntas disponibles.</p>
              ) : (
                <TestQuestion
                  question={currentQuestion}
                  selectedOption={answers[currentQuestion?.id]?.id}
                  onOptionSelect={(option) => handleOptionSelect(currentQuestion.id, option)}
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
                  isDisabled={!questions.length || !answers[currentQuestion?.id]}
                  onPress={() => {
                    if (currentStep < questions.length) {
                      setCurrentStep((s) => s + 1);
                    } else {
                      calculateResults();
                    }
                  }}
                  endContent={currentStep === questions.length ? <CheckIcon className="w-4 h-4" /> : <ArrowRightIcon className="w-4 h-4" />}
                >
                  {currentStep === questions.length ? "Ver resultados" : "Siguiente"}
                </Button>
              </div>

              {/* 🔹 Botón de prueba para guardar notificación */}
              {questions.length > 0 && currentStep === questions.length && (
                <div className="mt-4 flex justify-center gap-4">
                  <Button
                    color="secondary"
                    onPress={async () => {
                      try {
                        await Config.post("/notificaciones/test-completado", {});
                        alert("Notificación registrada en la BD del superusuario.");
                      } catch (err) {
                        console.error("Error al guardar notificación:", err);
                        alert("No se pudo guardar la notificación.");
                      }
                    }}
                  >
                    Guardar notificación (Prueba)
                  </Button>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <SparklesIcon className="w-6 h-6 text-[#2CBFF0] mx-auto mb-2" />
                <h2 className="text-2xl font-bold">¡Tus recomendaciones!</h2>
              </ModalHeader>
              <ModalBody>
                <TestResults
                  careers={recommendedCareers}
                  courses={recommendedCourses}
                  universities={recommendedUniversities}
                />
                <div className="mt-6 bg-slate-50 p-4 rounded-medium">
                  <h3 className="text-md font-medium mb-3 flex items-center gap-2">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#2CBFF0]" />
                    <span>Consulta con nuestro asistente</span>
                  </h3>
                  <OpenRouterChat />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className="bg-[#FEFEFE] shadow-sm border border-slate-200" onPress={() => { onClose(); restartTest(); }}>
                  Realizar test nuevamente
                </Button>
                <Button color="primary" className="bg-[#2CBFF0]" onPress={() => { onClose(); navigateToProfile(); }}>
                  Visitar perfil
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
