import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface PremiumLoadingModalProps {
  isOpen: boolean;
  message?: string;
}

const LoadingModal = ({
  isOpen,
  message = "Processing your request...",
}: PremiumLoadingModalProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  // Animation variants for the loader
  const loaderVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.2, 1],
      transition: {
        rotate: { repeat: Infinity, duration: 1.5, ease: "linear" },
        scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
      },
    },
  };

  // Animation variants for the modal content
  const modalVariants = {
    initial: { y: 50, opacity: 0, scale: 0.9 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: 50, opacity: 0, scale: 0.9 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-md"
        >
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative mx-4 flex w-full max-w-md flex-col items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-100 p-8 shadow-xl dark:from-gray-800 dark:to-gray-900"
          >
            {/* background effect */}
            <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-2xl" />

            {/* Loader */}
            <motion.div variants={loaderVariants} animate="animate">
              <Loader2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </motion.div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-center text-xl font-semibold text-gray-800 dark:text-gray-100"
            >
              {message}
            </motion.p>

            <motion.div
              className="h-1 w-full overflow-hidden rounded-full bg-blue-200 dark:bg-blue-900"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="h-full bg-blue-500 dark:bg-blue-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingModal;
