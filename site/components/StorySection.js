import { motion } from 'framer-motion';
import { useTheme } from "next-themes";

const StorySection = ({ title, description, animationEffect, children }) => {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <motion.div
        className='max-w-2xl text-center border rounded-lg shadow-lg p-8 backdrop-filter backdrop-blur-lg text-black bg-white bg-opacity-70 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:bg-opacity-70'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        {...animationEffect}
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-4">{description}</p>
        {children && <div className="mt-4">{children}</div>}
      </motion.div>
    </div>
  );
};

export default StorySection;
