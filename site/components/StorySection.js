import { motion } from 'framer-motion';

const StorySection = ({ title, description, animationEffect }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <motion.div
        className="max-w-2xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        {...animationEffect}
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg">{description}</p>
      </motion.div>
    </div>
  );
};

export default StorySection;
