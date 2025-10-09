import React from "react";
import { Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const OpenRouterChat = () => {
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState([
    {
      type: "bot",
      text: "¡Hola! Soy tu asistente de orientación vocacional. Puedo ayudarte con información sobre las carreras recomendadas. ¿Qué te gustaría saber?",
    },
  ]);
  const [isTyping, setIsTyping] = React.useState(false);

  const chatContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = () => {
    const clean = message.trim();
    if (!clean) return;

    // Añadir mensaje del usuario
    setChatHistory((prev) => [...prev, { type: "user", text: clean }]);
    setMessage("");

    // Simular respuesta del bot
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "Las carreras de ingeniería tienen excelentes oportunidades laborales en Yucatán, especialmente con el crecimiento del sector tecnológico.",
        "El diseño digital es una excelente opción si te gusta combinar creatividad con tecnología. Hay varias agencias en Mérida buscando talento.",
        "La UADY tiene uno de los programas de Psicología mejor valorados en la región sureste.",
        "Si te interesa más información sobre alguna carrera específica, puedo darte detalles sobre el plan de estudios y salidas profesionales.",
        "¿Te gustaría saber más sobre becas disponibles para estas carreras?",
      ];
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          text: responses[Math.floor(Math.random() * responses.length)],
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-64 border rounded-medium overflow-hidden bg-white">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-3"
      >
        {chatHistory.map((chat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${
              chat.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl p-3 ${
                chat.type === "user"
                  ? "bg-[#2CBFF0] text-white rounded-tr-none"
                  : "bg-slate-100 text-[#181818] rounded-tl-none"
              }`}
            >
              <p className="text-sm">{chat.text}</p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-slate-100 rounded-xl rounded-tl-none p-3">
              <div className="flex gap-1">
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="border-t p-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Escribe tu pregunta..."
            value={message}
            onValueChange={setMessage}
            variant="bordered"
            size="sm"
            radius="full"
          />
          <Button
            isIconOnly
            color="primary"
            radius="full"
            size="sm"
            type="submit"
            isDisabled={!message.trim()}
          >
            <PaperAirplaneIcon className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OpenRouterChat;
