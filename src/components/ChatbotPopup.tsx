import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

const initialQuestions = [
  {
    key: 'name',
    question: 'Aapka naam kya hai?',
    options: ['Raja', 'Amit', 'Priya', 'Koi aur']
  },
  {
    key: 'product',
    question: 'Kaunsa product chahiye?',
    options: ['Premium Makhana', 'Commercial Makhana', 'Industrial Makhana', 'Koi aur']
  },
  {
    key: 'quantity',
    question: 'Kitni quantity chahiye?',
    options: ['1kg', '10kg', '100kg', '1000kg', 'Koi aur']
  },
  {
    key: 'phone',
    question: 'Aapka phone number?',
    options: ['9876543210', '9953240031', 'Koi aur']
  },
  {
    key: 'email',
    question: 'Aapka email (optional)?',
    options: ['raja@example.com', 'amit@example.com', 'Koi aur', 'Skip']
  },
];

const ChatbotPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [input, setInput] = useState('');
  const [showQuote, setShowQuote] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setAnswers({ ...answers, [initialQuestions[step].key]: input });
    setInput('');
    if (step < initialQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setShowQuote(true);
    }

  };

  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [initialQuestions[step].key]: option });
    setInput('');
    if (step < initialQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setShowQuote(true);
    }
  };

  const getWhatsappLink = () => {
    const msg = `Makario Quotation\n\nName: ${answers.name}\nProduct: ${answers.product}\nQuantity: ${answers.quantity}\nPhone: ${answers.phone}\nEmail: ${answers.email || ''}\n\nQuotation:\n${answers.quantity} x ${answers.product}\nPlease contact for best price!`;
    return `https://wa.me/919953240031?text=${encodeURIComponent(msg)}`;
  };

  // Prepare chat history: show all questions and answers up to current step
  const chatHistory = [];
  for (let i = 0; i <= step; i++) {
    if (i < initialQuestions.length && answers[initialQuestions[i].key]) {
      chatHistory.push(
        <div key={initialQuestions[i].key} className="mb-2">
          <div className="text-xs text-gray-500">{initialQuestions[i].question}</div>
          <div className="bg-gray-100 rounded px-3 py-2 mt-1 text-heritage font-semibold">{answers[initialQuestions[i].key]}</div>
        </div>
      );
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          className="fixed z-50 bg-golden text-white rounded-full w-14 h-14 md:w-16 md:h-16 p-0 shadow-2xl flex items-center justify-center hover:scale-110"
          style={{
            right: '1rem',
            bottom: window.innerWidth <= 768 ? '12rem' : '5.5rem', // more gap for mobile
          }}
          onClick={() => setOpen(true)}
        >
          <MessageCircle size={28} className="md:w-8 md:h-8" />
        </button>
      )}
      {/* Popup Chatbot */}
      {open && (
        <div className="fixed left-6 bottom-6 z-50 w-80 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-golden/30 flex flex-col">
          <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-golden to-heritage rounded-t-2xl">
            <span className="text-white font-bold">Makario Chatbot</span>
            <button onClick={() => setOpen(false)} className="text-white"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 px-4 py-3 overflow-y-auto" style={{ minHeight: 220 }}>
            {!showQuote ? (
              <>
                {chatHistory}
                {step < initialQuestions.length && !answers[initialQuestions[step].key] && (
                  <div className="mb-2">
                    <div className="text-xs text-gray-500">{initialQuestions[step].question}</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {initialQuestions[step].options.map((option, idx) => (
                        <button
                          key={option + idx}
                          className="bg-golden/90 text-white px-3 py-2 rounded-full text-sm font-semibold hover:bg-golden mt-1"
                          onClick={() => handleOptionSelect(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {/* If user wants to type custom answer */}
                    <input
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      className="w-full border rounded px-3 py-2 mt-2"
                      onKeyDown={e => e.key === 'Enter' ? handleSend() : undefined}
                      placeholder="Apna jawab likhein (optional)"
                    />
                    <button
                      className="bg-golden text-white px-4 py-2 rounded flex items-center mt-2 w-full justify-center"
                      onClick={handleSend}
                    >
                      <Send className="w-4 h-4 mr-1" /> Send
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-2">
                <div className="text-sm font-bold text-golden">Aapka Quotation Ready Hai!</div>
                <div className="bg-gray-50 rounded p-3 text-sm">
                  <div><strong>Name:</strong> {answers.name}</div>
                  <div><strong>Product:</strong> {answers.product}</div>
                  <div><strong>Quantity:</strong> {answers.quantity}</div>
                  <div><strong>Phone:</strong> {answers.phone}</div>
                  {answers.email && <div><strong>Email:</strong> {answers.email}</div>}
                  <div className="mt-2"><strong>Quotation:</strong> {answers.quantity} x {answers.product}</div>
                  <div className="text-xs text-gray-500 mt-1">Best price will be shared on WhatsApp!</div>
                </div>
                <a
                  href={getWhatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded flex items-center w-full justify-center font-bold hover:bg-green-600"
                >
                  WhatsApp Par Bheje
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotPopup;
