import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { X, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceBot({ isOpen, onClose }: VoiceBotProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        setTranscript(transcript);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        if (transcript) {
          handleQuery(transcript);
        }
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let answer = '';

    if (lowerQuery.includes('skill') || lowerQuery.includes('technology')) {
      answer = "I specialize in Full Stack Python Development with Django and Flask... Data Science using Pandas, NumPy and Machine Learning libraries... Generative A I with LangChain and R A G systems... and Agentic A I using AutoGen and CrewAI... I'm also proficient in React, TypeScript, and modern web technologies... I have extensive experience building complete Business Management Solutions including H R M, C R M, and E R P systems.";
    } else if (lowerQuery.includes('experience') || lowerQuery.includes('work')) {
      answer = "I'm currently working as a Full Stack Developer at N X T E Mobility Energy Private Limited for 8 months... where I manage P H P and Java-based projects... handle A P I integrations... and ensure efficient deployments with enhanced U I and U X... I've worked on major projects like Kwick, a rental E V platform... GO RIDE PE website... and the N X T E Mobility parent website.";
    } else if (lowerQuery.includes('business') || lowerQuery.includes('hrm') || lowerQuery.includes('crm') || lowerQuery.includes('erp')) {
      answer = "I've developed comprehensive Business Management Solutions... including an H R M system with face recognition attendance using Machine Learning... automated payroll generation... and employee portals... A C R M system for managing customer relationships and sales pipelines... and an E R P system integrating inventory, finance, and operations... These solutions demonstrate my ability to build complete enterprise-grade applications.";
    } else if (lowerQuery.includes('project')) {
      answer = "I've built numerous projects across different domains... My major work includes complete Business Management Solutions like H R M, C R M, and E R P systems... Professional work at N X T E Mobility including Kwick E V rental platform, GO RIDE PE website... A Learning Management System for online education... Face Recognition M L Model... E-commerce platforms including multi-vendor marketplace... and automation systems using N 8 N with A I calling agents... Each project showcases my expertise in A I and full-stack development.";
    } else if (lowerQuery.includes('nxte') || lowerQuery.includes('kwick') || lowerQuery.includes('go ride')) {
      answer = "At N X T E Mobility... I developed three major projects... First, the N X T E Mobility parent website serving as the company's main online presence... Second, Kwick, a complete electric vehicle rental platform with web and mobile apps, featuring authentication, K Y C, payment integration, and an advanced admin dashboard... Third, GO RIDE PE, a professional vehicle rental website with booking management... All these are production applications serving real customers.";
    } else if (lowerQuery.includes('automation') || lowerQuery.includes('n8n')) {
      answer = "I've implemented advanced automation systems using N 8 N workflow platform... This includes a bulk calling agent for automated customer outreach at scale... and an A I powered lead generation agent that qualifies prospects automatically... The system integrates with C R M and communication tools, creating seamless automated workflows... This significantly reduces manual work and improves operational efficiency.";
    } else if (lowerQuery.includes('education') || lowerQuery.includes('university') || lowerQuery.includes('qualification')) {
      answer = "I'm pursuing a Bachelor of Technology in Computer Science at Galgotias University, Greater Noida... with a specialization in Artificial Intelligence and Full-Stack Development... I'm expected to graduate in August 2025... I've also completed multiple certifications including Web Development Internships, Java Full Stack program, Data Analytics with A W S, and H ackerRank certifications in Problem Solving and Python.";
    } else if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('reach') || lowerQuery.includes('whatsapp')) {
      answer = "You can reach me at shankranand332 at gmail dot com... or connect via WhatsApp at plus 91 6203447902... I'm also available on LinkedIn and GitHub... Feel free to connect with me for collaboration, opportunities, or to discuss your project ideas.";
    } else if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
      answer = "Hello! I'm Shankranand Sarswati's A I voice assistant... I can tell you about his skills, experience, projects, education, and contact information... You can ask me about his Business Management Solutions, work at N X T E Mobility, automation projects, or any other technical work... What would you like to know?";
    } else {
      answer = "I can help you learn about Shankranand's skills, experience, projects, education, and contact information... You can ask me about his H R M, C R M, E R P systems... his work at N X T E Mobility... automation projects... or any specific technology... Please ask me about any of these topics!";
    }

    setResponse(answer);
    speak(answer);
  };

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setResponse('');
      window.speechSynthesis.cancel();
      recognition.start();
      setIsListening(true);
    }
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else if (response) {
      speak(response);
    }
  };

  const quickQuestions = [
    'Tell me about your skills',
    'What projects have you built?',
    'What is your experience?',
    'How can I contact you?',
  ];

  const handleQuickQuestion = (question: string) => {
    setTranscript(question);
    handleQuery(question);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-2xl w-full border border-slate-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-white">AI Voice Assistant</h3>
                  <p className="text-sm text-white/80">Ask me anything about Shankranand</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Voice Visualizer */}
              <div className="mb-6">
                <div className="relative h-32 bg-slate-800/50 rounded-xl flex items-center justify-center overflow-hidden">
                  {isListening && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            height: [20, 60, 20],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                          className="w-2 bg-gradient-to-t from-purple-600 to-blue-600 rounded-full"
                        />
                      ))}
                    </div>
                  )}
                  {isSpeaking && (
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                      className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                    />
                  )}
                  {!isListening && !isSpeaking && (
                    <div className="text-gray-400 text-center">
                      <Mic className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Click the mic button to start</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Transcript */}
              {transcript && (
                <div className="mb-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <p className="text-sm text-gray-400 mb-1">You asked:</p>
                  <p className="text-white">{transcript}</p>
                </div>
              )}

              {/* Response */}
              {response && (
                <div className="mb-4 p-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30">
                  <p className="text-sm text-purple-400 mb-1">Assistant:</p>
                  <p className="text-white leading-relaxed">{response}</p>
                </div>
              )}

              {/* Quick Questions */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-3">Quick Questions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleQuickQuestion(question)}
                      className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-sm text-gray-300 hover:text-white border border-slate-700 hover:border-purple-500/50 transition-all duration-300 text-left"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={toggleListening}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    isListening
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/50'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/50 text-white'
                  }`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-5 h-5" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5" />
                      Start Listening
                    </>
                  )}
                </button>
                {response && (
                  <button
                    onClick={toggleSpeaking}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                      isSpeaking
                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-5 h-5" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-5 h-5" />
                        Repeat
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}