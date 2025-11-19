import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Progress,
  Card,
  CardBody,
  Chip,
} from "@heroui/react";
import {
  FireIcon,
  TrophyIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Config from "../Config";
import activityTracker from "../utils/ActivityTracker";

const DailyExerciseModal = ({ isOpen, onClose }) => {
  const [exercise, setExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [attempts, setAttempts] = useState(0); // ✅ NUEVO - Trackear intentos

  useEffect(() => {
    if (isOpen) {
      fetchTodayExercise();
      setAttempts(0); // Resetear intentos al abrir
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !result) {
      const timer = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, result, startTime]);

  const fetchTodayExercise = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await Config.getTodayExercise();
      
      console.log("✅ Response completo:", response);
      console.log("✅ Response.data:", response.data);
      
      if (response.data.completed) {
        setResult({ 
          alreadyCompleted: true, 
          message: response.data.message 
        });
      } else {
        setExercise(response.data.exercise);
      }
    } catch (error) {
      console.error("❌ Error fetching exercise:", error);
      console.error("❌ Error response:", error.response);
      console.error("❌ Error data:", error.response?.data);
      
      if (error.response?.data && typeof error.response.data === 'string') {
        console.error("❌ HTML Response (primeros 500 caracteres):", 
          error.response.data.substring(0, 500)
        );
      }
      
      setError(
        error.response?.data?.message || 
        error.message || 
        "Error al cargar el ejercicio. Verifica la consola."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!userAnswer.trim()) return;

    setAttempts(prev => prev + 1); // ✅ NUEVO - Incrementar intentos
    setSubmitting(true);
    setError(null);
    
    try {
      const response = await Config.submitExerciseAnswer({
        exercise_id: exercise.id,
        answer: userAnswer,
        time_spent: timeSpent,
      });

      console.log("✅ Submit response:", response.data);
      setResult(response.data);

      // ✅ MEJORADO - Trackear el ejercicio completado con TODA la info
      activityTracker.trackExerciseCompleted(
        exercise.id,                          // ID del ejercicio
        Math.floor(timeSpent / 60) || 1,     // Tiempo en minutos (mínimo 1)
        response.data.correct || false,      // ¿Fue correcto?
        exercise.difficulty || 3,            // Dificultad (1-5)
        attempts                             // Número de intentos
      );

      console.log("📊 Ejercicio trackeado:", {
        id: exercise.id,
        tiempo: Math.floor(timeSpent / 60),
        correcto: response.data.correct,
        dificultad: exercise.difficulty,
        intentos: attempts
      });

    } catch (error) {
      console.error("❌ Error submitting answer:", error);
      console.error("❌ Error response:", error.response);
      
      setError(
        error.response?.data?.message || 
        error.message || 
        "Error al enviar la respuesta"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getDifficultyColor = (level) => {
    const colors = {
      1: "success",
      2: "primary",
      3: "warning",
      4: "danger",
      5: "danger",
    };
    return colors[level] || "default";
  };

  const getDifficultyLabel = (level) => {
    const labels = {
      1: "Principiante",
      2: "Fácil",
      3: "Intermedio",
      4: "Avanzado",
      5: "Experto",
    };
    return labels[level] || "Desconocido";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
      backdrop="blur"
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FireIcon className="w-6 h-6 text-orange-500" />
                  <h3 className="text-xl font-bold">Ejercicio Diario</h3>
                </div>
                {exercise && (
                  <Chip
                    size="sm"
                    color={getDifficultyColor(exercise.difficulty)}
                    variant="flat"
                  >
                    {getDifficultyLabel(exercise.difficulty)}
                  </Chip>
                )}
              </div>
            </ModalHeader>

            <ModalBody>
              {/* Error Display */}
              {error && (
                <Card className="bg-gradient-to-br from-danger-50 to-danger-100 border-2 border-danger-200 mb-4">
                  <CardBody className="text-center py-6">
                    <ExclamationTriangleIcon className="w-12 h-12 text-danger-500 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-danger-700 mb-2">
                      Error
                    </h3>
                    <p className="text-sm text-danger-600">{error}</p>
                    <p className="text-xs text-default-500 mt-2">
                      Revisa la consola del navegador (F12) para más detalles
                    </p>
                  </CardBody>
                </Card>
              )}

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <Progress
                    size="sm"
                    isIndeterminate
                    aria-label="Cargando ejercicio..."
                    className="max-w-md"
                  />
                  <p className="text-default-500">Preparando tu ejercicio...</p>
                </div>
              ) : result?.alreadyCompleted ? (
                <Card className="bg-gradient-to-br from-success-50 to-success-100">
                  <CardBody className="text-center py-12">
                    <CheckCircleIcon className="w-20 h-20 text-success-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">
                      ¡Excelente trabajo!
                    </h3>
                    <p className="text-lg text-default-600">
                      {result.message}
                    </p>
                  </CardBody>
                </Card>
              ) : result ? (
                <div className="space-y-6">
                  <Card
                    className={
                      result.correct
                        ? "bg-gradient-to-br from-success-50 to-success-100 border-2 border-success-200"
                        : "bg-gradient-to-br from-danger-50 to-danger-100 border-2 border-danger-200"
                    }
                  >
                    <CardBody className="text-center py-8">
                      {result.correct ? (
                        <>
                          <TrophyIcon className="w-16 h-16 text-success-500 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-success-700 mb-2">
                            ¡Correcto! 🎉
                          </h3>
                          <p className="text-lg mb-4">{result.message}</p>
                          <Chip size="lg" color="success" variant="shadow">
                            +{result.points_earned} puntos
                          </Chip>
                        </>
                      ) : (
                        <>
                          <XCircleIcon className="w-16 h-16 text-danger-500 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-danger-700 mb-2">
                            Intenta nuevamente
                          </h3>
                          <p className="text-lg mb-4">{result.message}</p>
                          <Chip size="lg" color="warning" variant="shadow">
                            +{result.points_earned} puntos de esfuerzo
                          </Chip>
                        </>
                      )}
                    </CardBody>
                  </Card>

                  {result.solution && (
                    <Card>
                      <CardBody>
                        <h4 className="font-bold mb-2">💡 Solución:</h4>
                        <div className="bg-default-100 p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap text-sm">
                            {result.solution}
                          </pre>
                        </div>
                      </CardBody>
                    </Card>
                  )}

                  {result.streak && (
                    <Card>
                      <CardBody>
                        <h4 className="font-bold mb-3 text-center">📊 Tu Progreso</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">
                              {result.streak.current}
                            </p>
                            <p className="text-xs text-default-500">Racha actual</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-warning">
                              {result.streak.longest}
                            </p>
                            <p className="text-xs text-default-500">Mejor racha</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-success">
                              {result.streak.total_points}
                            </p>
                            <p className="text-xs text-default-500">Puntos totales</p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  )}
                </div>
              ) : exercise ? (
                <div className="space-y-6">
                  <Card>
                    <CardBody>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {exercise.title}
                          </h3>
                          <p className="text-sm text-default-500">
                            Curso: {exercise.course}
                          </p>
                        </div>
                        <Chip color="primary" variant="flat">
                          {exercise.points} pts
                        </Chip>
                      </div>

                      <p className="text-default-700 mb-4">
                        {exercise.description}
                      </p>

                      <div className="bg-default-100 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm">
                          {typeof exercise.content === 'string' 
                            ? exercise.content 
                            : JSON.stringify(exercise.content, null, 2)
                          }
                        </pre>
                      </div>
                    </CardBody>
                  </Card>

                  <Textarea
                    label="Tu respuesta"
                    placeholder="Escribe tu solución aquí..."
                    value={userAnswer}
                    onValueChange={setUserAnswer}
                    minRows={6}
                    variant="bordered"
                  />

                  <div className="flex items-center justify-between text-sm text-default-500">
                    <span>Tiempo: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, "0")}</span>
                    <span>Tipo: {exercise.type}</span>
                  </div>
                </div>
              ) : null}
            </ModalBody>

            <ModalFooter>
              {error && !result && (
                <>
                  <Button variant="light" onPress={onModalClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={fetchTodayExercise}>
                    Reintentar
                  </Button>
                </>
              )}
              {!result && !error && exercise && (
                <>
                  <Button variant="light" onPress={onModalClose}>
                    Más tarde
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSubmit}
                    isLoading={submitting}
                    isDisabled={!userAnswer.trim() || submitting}
                  >
                    Enviar Respuesta
                  </Button>
                </>
              )}
              {result && (
                <Button color="primary" onPress={onModalClose}>
                  {result.alreadyCompleted ? "Entendido" : "Continuar"}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DailyExerciseModal;