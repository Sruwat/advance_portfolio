import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';
import professionalPhoto from 'figma:asset/b5603aedf39c3dcc25105904600f07413f7a78a8.png';

interface AIAvatarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAvatar({ isOpen, onClose }: AIAvatarProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    setCurrentMessage(text);
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find an Indian English voice or male voice
    const indianVoice = voices.find(voice => 
      voice.lang.includes('en-IN') || 
      voice.name.includes('Indian') ||
      voice.name.includes('Ravi') ||
      voice.name.includes('Hindi')
    );
    
    const maleVoice = voices.find(voice => 
      voice.name.includes('Male') || 
      voice.name.includes('male')
    );
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice preference: Indian voice > Male voice > Default
    if (indianVoice) {
      utterance.voice = indianVoice;
    } else if (maleVoice) {
      utterance.voice = maleVoice;
    }
    
    // Configure speech parameters for natural Indian male tone
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 0.95; // Slightly lower pitch for male voice
    utterance.volume = 1;
    utterance.lang = 'en-IN'; // Indian English
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const topics = [
    {
      title: 'About Me',
      text: 'Hello! I am Shankranand Sarswati... a Full Stack Developer at N X T E Mobility... I specialize in building complete Business Management Solutions... including H R M... C R M... and E R P systems... My expertise spans Python... Django... React... and Machine Learning... I have successfully delivered multiple production-grade applications... with features like face recognition attendance... automated payroll... and comprehensive business analytics... My passion lies in creating solutions that solve real-world business problems through technology.',
    },
    {
      title: 'My Skills',
      text: 'I have expertise in multiple domains... In Backend Development... I work with Python... Django... Node dot js... and PHP... For Frontend... I use React... JavaScript... and modern CSS frameworks... My Database skills include PostgreSQL... MySQL... and MongoDB... I specialize in Machine Learning using TensorFlow... Keras... and scikit-learn... particularly in Computer Vision and Deep Learning... I have hands-on experience with Cloud platforms like A W S... Docker... and deployment automation... Additionally... I work with automation tools like N 8 N for workflow automation and A I integration.',
    },
    {
      title: 'Business Solutions',
      text: 'I have developed three comprehensive Business Management Solutions... The H R M system features face recognition based attendance... automated payroll generation... employee self-service portal... and complete H R analytics... The C R M system includes sales pipeline management... automated customer follow-ups... email integration... and detailed analytics... The E R P system provides end-to-end business process integration... real-time inventory management... financial accounting... and multi-warehouse operations... All these systems are built with scalability and automation in mind.',
    },
    {
      title: 'Professional Work',
      text: 'At N X T E Mobility Energy Private Limited... I have delivered three major projects... Kwick is a complete electric vehicle rental platform... with both web and mobile applications... featuring K Y C verification... real-time vehicle tracking... payment integration... and an advanced admin dashboard... GO RIDE PE is a professional vehicle rental website with complete booking management... And the N X T E Mobility corporate website serves as the parent site showcasing the company\'s electric vehicle solutions... All these projects are currently in production and serving real customers.',
    },
    {
      title: 'AI & Data Science',
      text: 'My A I and Data Science projects showcase my expertise in Machine Learning... The Stock Market Price Prediction system uses L S T M neural networks and ensemble methods... to predict stock prices with technical indicators and sentiment analysis... The A I Driven Medical Scan Analysis system uses Convolutional Neural Networks... to assist doctors in diagnosing medical conditions from X-rays... C T scans... and M R I images... achieving over ninety-five percent accuracy... I have also built a Face Recognition system that\'s integrated into our H R M solution... and developed an L M S platform with comprehensive course management and student tracking.',
    },
    {
      title: 'Automation',
      text: 'I have implemented advanced automation solutions using N 8 N workflow automation platform... My current project includes a bulk calling agent for automated customer outreach... and an A I powered lead generation agent that qualifies prospects automatically... The system integrates with C R M and communication tools... creating seamless automated workflows... It handles follow-up sequences automatically... significantly reducing manual work... The analytics dashboard provides insights into call performance and lead quality... This demonstrates my ability to leverage cutting-edge automation tools to improve business efficiency.',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-2 border-slate-700 shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-slate-700 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-50 animate-pulse" />
                  <div className="relative w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <h2 className="text-2xl bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    AI Assistant
                  </h2>
                  <p className="text-sm text-gray-400">Ask me about my work and projects</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-lg transition-all duration-300 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Avatar Section */}
                <div className="lg:w-1/3 flex flex-col items-center">
                  <motion.div
                    animate={isSpeaking ? {
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 20px rgba(59, 130, 246, 0.5)',
                        '0 0 40px rgba(168, 85, 247, 0.8)',
                        '0 0 20px rgba(59, 130, 246, 0.5)',
                      ],
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: isSpeaking ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                    className="relative mb-4"
                  >
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl opacity-50" />
                    
                    {/* Avatar image with circular frame */}
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-slate-700 shadow-2xl">
                      <img
                        src={professionalPhoto}
                        alt="AI Avatar"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Animated rings when speaking */}
                      {isSpeaking && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-blue-400"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.8, 0, 0.8],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeOut',
                            }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full border-2 border-purple-400"
                            animate={{
                              scale: [1, 1.4, 1],
                              opacity: [0.6, 0, 0.6],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeOut',
                              delay: 0.5,
                            }}
                          />
                        </>
                      )}
                    </div>

                    {/* Status indicator */}
                    <div className="absolute bottom-2 right-2 px-3 py-1 bg-slate-900 rounded-full border border-slate-700 flex items-center gap-2">
                      {isSpeaking ? (
                        <>
                          <Volume2 className="w-4 h-4 text-green-500 animate-pulse" />
                          <span className="text-xs text-green-500">Speaking...</span>
                        </>
                      ) : (
                        <>
                          <VolumeX className="w-4 h-4 text-gray-500" />
                          <span className="text-xs text-gray-500">Idle</span>
                        </>
                      )}
                    </div>
                  </motion.div>

                  <div className="text-center">
                    <h3 className="text-xl mb-1">Shankranand Sarswati</h3>
                    <p className="text-sm text-gray-400">Full Stack Developer</p>
                  </div>

                  {isSpeaking && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => {
                        window.speechSynthesis.cancel();
                        setIsSpeaking(false);
                      }}
                      className="mt-4 px-6 py-2 bg-red-600 rounded-full hover:bg-red-500 transition-all duration-300 flex items-center gap-2"
                    >
                      <VolumeX className="w-4 h-4" />
                      Stop Speaking
                    </motion.button>
                  )}
                </div>

                {/* Topics Section */}
                <div className="lg:w-2/3 space-y-3">
                  <h3 className="text-xl text-gray-300 mb-4">Select a topic to learn more:</h3>
                  {topics.map((topic, index) => (
                    <motion.button
                      key={topic.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => handleSpeak(topic.text)}
                      disabled={isSpeaking}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                        isSpeaking
                          ? 'bg-slate-800/50 cursor-not-allowed opacity-50'
                          : 'bg-gradient-to-r from-slate-800 to-slate-700 hover:from-blue-900/50 hover:to-purple-900/50 border border-slate-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <Volume2 className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-lg mb-1">{topic.title}</h4>
                            <p className="text-sm text-gray-400">Click to hear about this</p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-blue-400"
                        >
                          →
                        </motion.div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}