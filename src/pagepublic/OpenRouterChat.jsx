import React from "react";
import { Input, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const OpenRouterChat = () => {
  const [message, setMessage] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState([
    {
      role: "system",
      content: "Eres un asistente de orientación vocacional especializado en carreras universitarias en Yucatán, México. Proporciona información útil, precisa y motivadora sobre carreras, universidades como la UADY, oportunidades laborales y becas disponibles."
    },
    {
      type: "bot",
      role: "assistant",
      content: "¡Hola! Soy tu asistente de orientación vocacional. Puedo ayudarte con información sobre las carreras recomendadas. ¿Qué te gustaría saber?",
    },
  ]);
  const [isTyping, setIsTyping] = React.useState(false);

  // Leer API key desde variable de entorno (ajusta según tu setup)
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

  const chatContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    const clean = message.trim();
    if (!clean) return;

    // Añadir mensaje del usuario
    const newMessages = [...chatHistory, { role: "user", content: clean }];
    setChatHistory(newMessages);
    setMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini", // o "anthropic/claude-3.5-sonnet"
          messages: newMessages,
        }),
      });

      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        setChatHistory([
          ...newMessages, 
          {
            type: "bot",
            role: "assistant",
            content: data.choices[0].message.content
          }
        ]);
      } else {
        setChatHistory([
          ...newMessages,
          {
            type: "bot",
            role: "assistant",
            content: "Lo siento, no hubo respuesta de la IA."
          }
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setChatHistory([
        ...newMessages,
        {
          type: "bot",
          role: "assistant",
          content: "Error: " + error.message
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-64 border rounded-medium overflow-hidden bg-white">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-3"
      >
        {chatHistory
          .filter((chat) => chat.role === "user" || chat.role === "assistant")
          .map((chat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                chat.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-3 ${
                  chat.role === "user"
                    ? "bg-[#2CBFF0] text-white rounded-tr-none"
                    : "bg-slate-100 text-[#181818] rounded-tl-none"
                }`}
              >
                <p className="text-sm">{chat.content}</p>
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
            disabled={isTyping}
          />
          <Button
            isIconOnly
            color="primary"
            radius="full"
            size="sm"
            type="submit"
            isDisabled={!message.trim() || isTyping}
          >
            <PaperAirplaneIcon className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OpenRouterChat;
