import { useState, useEffect } from 'react';

interface UseTypewriterCycleProps {
  texts: string[];
  speed?: number;
  delayBetweenTexts?: number;
  deleteSpeed?: number;
}

export const useTypewriterCycle = ({
  texts,
  speed = 80,
  delayBetweenTexts = 2000,
  deleteSpeed = 40,
}: UseTypewriterCycleProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    let timeout: NodeJS.Timeout;
    const currentText = texts[textIndex];

    if (!isDeleting) {
      // Typing forward
      if (displayedText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, speed);
      } else {
        // Wait before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenTexts);
      }
    } else {
      // Deleting backward
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deleteSpeed);
      } else {
        // Move to next text
        setTextIndex((prev) => (prev + 1) % texts.length);
        setIsDeleting(false);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, textIndex, isDeleting, texts, speed, delayBetweenTexts, deleteSpeed]);

  return { displayedText, currentText: texts[textIndex] };
};
