// src/pagepublic/TestQuestion.jsx
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";

const TestQuestion = ({ question, selectedOption, onOptionSelect }) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
    >
      <h2 className="text-xl font-medium text-[#181818]">
        {question.question}
      </h2>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Card
              isPressable
              onPress={() => onOptionSelect(option)}
              className={`p-4 border transition-all ${
                selectedOption === option.id
                  ? "border-[#2CBFF0] bg-[#2CBFF0]/5"
                  : "border-slate-200 hover:border-[#2CBFF0]/50"
              }`}
              disableRipple
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                    selectedOption === option.id
                      ? "border-[#2CBFF0] bg-[#2CBFF0]"
                      : "border-slate-300"
                  }`}
                >
                  {selectedOption === option.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>
                <span className="text-[#181818]">{option.text}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TestQuestion;
