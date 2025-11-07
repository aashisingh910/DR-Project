import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

// ✅ Predefined FAQs
const faqs: FAQ[] = [
  {
    question: "What is Diabetic Retinopathy?",
    answer:
      "Diabetic Retinopathy is a diabetes-related eye disease caused by damage to the small blood vessels in the retina. Over time, high blood sugar weakens these vessels, leading to leakage or abnormal growth that can impair vision.",
  },
  {
    question: "Who is at risk of developing DR?",
    answer:
      "Individuals with Type 1 or Type 2 diabetes, especially those with poor blood sugar control, high blood pressure, or long-standing diabetes, are at high risk.",
  },
  {
    question: "Can diabetic retinopathy cause blindness?",
    answer:
      "Yes. Without timely diagnosis and treatment, DR can progress to proliferative stages that cause severe vision loss or blindness.",
  },
  {
    question: "What are the stages of DR?",
    answer:
      "Mild NPDR, Moderate NPDR, Severe NPDR, and Proliferative DR (advanced stage with new vessel growth).",
  },
  {
    question: "What lifestyle changes help prevent DR?",
    answer:
      "Maintain HbA1c below 7%, control blood pressure, stop smoking, exercise regularly, and eat a balanced diet.",
  },
  {
    question: "What is Diabetic Macular Edema?",
    answer:
      "DME is swelling of the macula due to fluid leakage, causing central vision loss. It can occur at any DR stage.",
  },
  {
    question: "How often should diabetic patients get an eye exam?",
    answer:
      "Every 6 to 12 months. Early detection via annual dilated retinal exams helps prevent vision loss.",
  },
  {
    question: "Can AI detect diabetic retinopathy?",
    answer:
      "Yes, AI models like CNNs analyze fundus images to detect lesions and grade DR severity automatically.",
  },
  {
    question: "Which datasets are used for AI training?",
    answer:
      "Messidor, EyePACS, IDRiD, and APTOS 2019 are commonly used datasets for DR detection.",
  },
  {
    question: "Can AI replace ophthalmologists?",
    answer:
      "No. AI assists in screening and triage, but clinical decisions remain with ophthalmologists.",
  },
  // ...add remaining FAQs
];

// --- Simple cosine similarity for text matching ---
const getSimilarity = (a: string, b: string): number => {
  const wordsA = a.toLowerCase().split(/\W+/);
  const wordsB = b.toLowerCase().split(/\W+/);
  const allWords = Array.from(new Set([...wordsA, ...wordsB]));
  const freqA = allWords.map((w) => wordsA.filter((x) => x === w).length);
  const freqB = allWords.map((w) => wordsB.filter((x) => x === w).length);
  const dot = freqA.reduce((sum, val, i) => sum + val * freqB[i], 0);
  const magA = Math.sqrt(freqA.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(freqB.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB || 1);
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([
    {
      sender: "bot",
      text: "👋 Hi! I'm your Diabetic Retinopathy Assistant. Ask me anything about DR, AI detection, or prevention!",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user" as const, text: input };
    setMessages((prev) => [...prev, userMsg]);

    // Match the most similar FAQ
    const best = faqs
      .map((faq) => ({
        faq,
        score: getSimilarity(input, faq.question),
      }))
      .sort((a, b) => b.score - a.score)[0];

    const reply =
      best && best.score > 0.25
        ? best.faq.answer
        : "I'm not sure about that. Could you rephrase or ask something related to Diabetic Retinopathy?";

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 500);

    setInput("");
  };

  return (
    <>
      {isOpen ? (
        <motion.div
          className="fixed bottom-8 right-8 bg-white shadow-2xl rounded-2xl w-96 overflow-hidden border border-gray-200 z-50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {/* Header */}
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 font-semibold flex justify-between items-center cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <span>🩺 DR Chatbot Assistant</span>
            <button className="text-white hover:text-gray-200">✕</button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl max-w-xs text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex items-center border-t p-2 bg-gray-50">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-3 py-2 text-sm outline-none bg-gray-50"
              placeholder="Ask about DR..."
            />
            <button
              onClick={handleSend}
              className="p-2 text-blue-600 hover:text-blue-800 transition"
            >
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.button
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg z-50 hover:shadow-xl transition-shadow"
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-2xl">💬</span>
        </motion.button>
      )}
    </>
  );
};

export default ChatBot;
