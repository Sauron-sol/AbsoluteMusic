import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MusicNote, VideoLibrary, Compare } from '@mui/icons-material';

export const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <VideoLibrary className="w-8 h-8" />,
      title: "Bibliothèque de vidéos",
      description: "Gérez facilement vos vidéos de performances musicales"
    },
    {
      icon: <Compare className="w-8 h-8" />,
      title: "Comparaison vidéo",
      description: "Comparez vos performances côte à côte pour suivre votre progression"
    },
    {
      icon: <MusicNote className="w-8 h-8" />,
      title: "Analyse musicale",
      description: "Analysez vos performances pour vous améliorer"
    }
  ];

  // Animation des notes de musique
  const noteVariants = {
    animate: (i: number) => ({
      y: [-20, 20],
      rotate: [0, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        delay: i * 0.2
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white"
    >
      {/* Notes de musique animées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={noteVariants}
            animate="animate"
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1
            }}
          >
            <MusicNote className="w-12 h-12" />
          </motion.div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-20 relative">
        {/* Hero section */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Absolute
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto"
          >
            Perfectionnez votre art musical en analysant et comparant vos performances
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/library')}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-purple-600"
          >
            Commencer maintenant
          </motion.button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/20 transition-colors duration-300"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-20 text-blue-200"
        >
          <p>Développé avec ♪ pour les musiciens</p>
        </motion.div>
      </div>
    </motion.div>
  );
}; 