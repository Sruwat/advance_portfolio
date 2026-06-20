/// <reference path="./types/images.d.ts" />

import { Canvas, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { motion } from 'motion/react';
import type { CSSProperties, FormEvent, PointerEvent, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as THREE from 'three';
import ceoBackground from '../assets/ceo.jpeg';
import crmDashboard from '../assets/CRM/crm dashboard.png';
import erpAccounting from '../assets/ERP/accounting.png';
import erpDashboard from '../assets/ERP/dashboard.png';
import erpInventoryDashboard from '../assets/ERP/inventory_dashboard.png';
import erpMainScreen from '../assets/ERP/mainscreen.png';
import erpOverview from '../assets/ERP/1.png';
import hrmsAiInsight from '../assets/HRMS/AI_Insight.png';
import hrmsBusinessInsight from '../assets/HRMS/Buisness_insight.png';
import hrmsEmployeeDashboard from '../assets/HRMS/Emp_Dashboard.png';
import hrmsFaceAttendance from '../assets/HRMS/Face_Attendance.png';
import hrmsHrDashboard from '../assets/HRMS/HR_dashboard.png';
import hrmsLeavePortal from '../assets/HRMS/leave_apply_portal.png';
import hrmsTaskCreation from '../assets/HRMS/Task_Creation.png';
import hrmsTeamCommunication from '../assets/HRMS/teammate_communication.png';
import {
  agentUseCases,
  architectureGallery,
  brands,
  clientProjects,
  contactLinks,
  enterpriseSystems,
  experience,
  navItems,
  products,
  proofMetrics,
  researchProjects,
  techGroups,
  type CaseStudy,
  type Product,
  type ResearchProject,
} from './portfolioData';

const heroBadges = ['Agentic AI', 'RAG Systems', 'SaaS Products', 'LangGraph', 'Qdrant', 'AWS'];
const orbitNodes = ['HRMS', 'ERP', 'CRM', 'Document Intelligence', 'Voice Bot', 'RAG Chatbot', 'MSME Guard', 'GST Guard Shield'];
const hrmsScreenshots = [
  { label: 'employee_dashboard', title: 'Employee Dashboard', src: hrmsEmployeeDashboard },
  { label: 'hr_dashboard', title: 'HR Dashboard', src: hrmsHrDashboard },
  { label: 'face_attendance', title: 'Face Attendance', src: hrmsFaceAttendance },
  { label: 'leave_apply_portal', title: 'Leave Apply Portal', src: hrmsLeavePortal },
  { label: 'teammate_communication', title: 'Team Communication', src: hrmsTeamCommunication },
  { label: 'task_creation', title: 'Task Creation', src: hrmsTaskCreation },
  { label: 'ai_insight', title: 'AI Insight', src: hrmsAiInsight },
  { label: 'business_insight', title: 'Business Insight', src: hrmsBusinessInsight },
];
const hrmsDemoAssets = [
  { label: 'Part 1', src: '/videos/hrms/hrms-demo-part1.mp4' },
  { label: 'Part 2', src: '/videos/hrms/hrms-demo-part2.mp4' },
];
const erpScreenshots = [
  { label: 'erp_main_screen', title: 'ERP Main Screen', src: erpMainScreen },
  { label: 'erp_dashboard', title: 'ERP Dashboard', src: erpDashboard },
  { label: 'inventory_dashboard', title: 'Inventory Dashboard', src: erpInventoryDashboard },
  { label: 'accounting', title: 'Accounting', src: erpAccounting },
  { label: 'operations_overview', title: 'Operations Overview', src: erpOverview },
];
const erpDemoAssets = [
  { label: 'ERP Demo', src: '/videos/erp/erp-demo.mp4' },
];
const skillBars = [
  { name: 'AI Engineering', value: 96, group: 'Core AI' },
  { name: 'Agentic AI', value: 94, group: 'Core AI' },
  { name: 'RAG Systems', value: 93, group: 'Retrieval' },
  { name: 'Multi-Agent Systems', value: 91, group: 'Agents' },
  { name: 'FastAPI', value: 90, group: 'Backend' },
  { name: 'LangGraph', value: 89, group: 'Agents' },
  { name: 'LangChain', value: 88, group: 'AI Apps' },
  { name: 'SaaS Products', value: 87, group: 'Product' },
  { name: 'Enterprise Software', value: 86, group: 'Product' },
  { name: 'AWS', value: 84, group: 'Cloud' },
  { name: 'Qdrant', value: 83, group: 'Vector DB' },
  { name: 'Neo4j', value: 80, group: 'Graph DB' },
  { name: 'Automation Systems', value: 79, group: 'Workflow' },
];

function projectSlug(name: string) {
  return name.toLowerCase().replace(/^aiwana\s+/, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function caseStudySlug(study: CaseStudy) {
  return study.slug ?? projectSlug(study.title);
}

function personalProjectSlug(project: ResearchProject) {
  return project.slug;
}

const founderIntro =
  'Hi, I am Shankranand Sarswati, Founder and AI Solutions Architect at Aiwana Solution. I design and ship enterprise AI systems, SaaS products, RAG platforms, agentic workflows, HRMS, ERP, CRM, document intelligence, automation systems, and AI voice or chatbot experiences for real business operations.';

function getPreferredVoice() {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => voice.lang === 'en-IN' && /male|ravi|kumar|india/i.test(voice.name))
    ?? voices.find((voice) => voice.lang === 'en-IN')
    ?? voices.find((voice) => voice.lang === 'en-GB')
    ?? voices.find((voice) => voice.lang.startsWith('en'))
    ?? voices[0];
}

function waitForVoices() {
  if (!('speechSynthesis' in window)) return Promise.resolve<SpeechSynthesisVoice[]>([]);
  const existing = window.speechSynthesis.getVoices();
  if (existing.length) return Promise.resolve(existing);

  return new Promise<SpeechSynthesisVoice[]>((resolve) => {
    const finish = () => resolve(window.speechSynthesis.getVoices());
    window.speechSynthesis.onvoiceschanged = finish;
    window.setTimeout(finish, 650);
  });
}

async function speakText(text: string, callbacks?: { onStart?: () => void; onEnd?: () => void; onError?: (message: string) => void }) {
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    callbacks?.onError?.('Voice output is not supported in this browser.');
    return false;
  }

  await waitForVoices();
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  let didStart = false;
  utterance.rate = 0.9;
  utterance.pitch = 0.92;
  utterance.volume = 1;
  utterance.lang = 'en-IN';
  const preferredVoice = getPreferredVoice();
  if (preferredVoice) utterance.voice = preferredVoice;

  utterance.onstart = () => {
    didStart = true;
    callbacks?.onStart?.();
  };
  utterance.onend = () => callbacks?.onEnd?.();
  utterance.onerror = (event) => {
    if (didStart) {
      callbacks?.onEnd?.();
      return;
    }
    callbacks?.onError?.(`Voice output failed: ${event.error || 'unknown error'}.`);
  };

  window.speechSynthesis.speak(utterance);
  window.setTimeout(() => {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
  }, 120);
  return true;
}

function NeuralField() {
  const group = useMemo(() => {
    const field = new THREE.Group();
    const cyan = new THREE.MeshBasicMaterial({ color: '#67e8f9' });
    const violet = new THREE.MeshBasicMaterial({ color: '#a78bfa' });
    const lineMaterial = new THREE.LineBasicMaterial({ color: '#38bdf8', transparent: true, opacity: 0.18 });
    const points = Array.from({ length: 42 }, (_, index) => ({
      id: index,
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3,
      ),
      size: 0.025 + Math.random() * 0.035,
    }));

    points.forEach((point) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(point.size, 12, 12), point.id % 3 === 0 ? cyan : violet);
      node.position.copy(point.position);
      field.add(node);
    });

    points.slice(0, 24).forEach((point, index) => {
      const next = points[(index * 3 + 7) % points.length];
      const geometry = new THREE.BufferGeometry().setFromPoints([point.position, next.position]);
      field.add(new THREE.Line(geometry, lineMaterial));
    });

    return field;
  }, []);

  useFrame(({ clock }) => {
    group.rotation.y = clock.elapsedTime * 0.04;
    group.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.08;
  });

  return <primitive object={group} />;
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-photo-frame">
        <img src={ceoBackground} alt="" />
      </div>
      <div className="hero-orbit-ring hero-orbit-ring-one" />
      <div className="hero-orbit-ring hero-orbit-ring-two" />
      <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 1.5]}>
        <NeuralField />
      </Canvas>
    </div>
  );
}

function MagneticButton({
  href,
  className,
  children,
  download,
}: {
  href: string;
  className: string;
  children: ReactNode;
  download?: boolean;
}) {
  return (
    <motion.a
      className={className}
      href={href}
      download={download}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      {children}
    </motion.a>
  );
}

const assistantContext = {
  profile:
    'Shankranand Sarswati is Founder & AI Solutions Architect at Aiwana Solution, building enterprise AI systems, SaaS products, RAG platforms, agentic automation, HRMS, ERP, CRM, and business workflow intelligence.',
  products:
    'Aiwana products include HRMS for attendance/payroll/leave/recruitment, ERP for inventory/purchase/finance/production/compliance, CRM for lead capture/scoring/follow-ups/pipeline, and Document Intelligence for agentic RAG over enterprise documents.',
  ai:
    'Core AI expertise: Agentic AI, RAG systems, multi-agent systems, LangChain, LangGraph, FastAPI, Qdrant, Neo4j, Groq, OCR, BGE-M3 embeddings, reranking, evidence canvas, and workflow automation.',
  clients:
    'Client and brand work includes NXTMobility, GoRidePE, KWICK, Iconica Globex, and Aiwana Solution.',
  contact:
    'Best contact: shankranand332@gmail.com. The portfolio includes a resume download and case pages for HRMS, ERP, CRM, and Document Intelligence.',
};

function answerPortfolioQuestion(question: string) {
  const normalized = question.toLowerCase();
  if (normalized.includes('document') || normalized.includes('rag') || normalized.includes('architecture')) {
    return `${assistantContext.products} The strongest architecture proof is the Document Intelligence case page: ingestion, OCR, chunking, BGE-M3 embeddings, Qdrant named vectors, SQLite metadata, reranking, LangGraph-style agent pipeline, Groq LLM, citations, confidence, and evidence canvas.`;
  }
  if (normalized.includes('hrms') || normalized.includes('erp') || normalized.includes('crm') || normalized.includes('saas')) {
    return assistantContext.products;
  }
  if (normalized.includes('skill') || normalized.includes('tech') || normalized.includes('stack') || normalized.includes('ai')) {
    return assistantContext.ai;
  }
  if (normalized.includes('client') || normalized.includes('company') || normalized.includes('brand')) {
    return assistantContext.clients;
  }
  if (normalized.includes('contact') || normalized.includes('email') || normalized.includes('hire') || normalized.includes('call')) {
    return assistantContext.contact;
  }
  return `${assistantContext.profile} Ask me about SaaS products, Document Intelligence, RAG architecture, client work, tech stack, or contact details.`;
}

function AIAssistantDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const [messages, setMessages] = useState([
    { role: 'agent', text: 'Ask about HRMS, ERP, CRM, Document Intelligence, RAG systems, agents, client work, or founder proof.' },
  ]);
  const [input, setInput] = useState('');
  const [voiceInput, setVoiceInput] = useState('');
  const [voiceStatus, setVoiceStatus] = useState('Ready to listen');

  const sendMessage = (text = input) => {
    const question = text.trim();
    if (!question) return;
    const response = answerPortfolioQuestion(question);
    setMessages((items) => [...items, { role: 'user', text: question }, { role: 'agent', text: response }]);
    setInput('');
    return response;
  };

  const speak = (text: string) => {
    speakText(text, {
      onStart: () => setVoiceStatus('Speaking answer...'),
      onEnd: () => setVoiceStatus('Ready to listen'),
      onError: (message) => setVoiceStatus(message),
    });
  };

  const startVoice = () => {
    const SpeechRecognition = (window as unknown as {
      SpeechRecognition?: new () => any;
      webkitSpeechRecognition?: new () => any;
    }).SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition?: new () => any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const fallback = 'Microphone speech recognition is not available here. Type a question below and I will speak the answer.';
      setVoiceStatus(fallback);
      speak(fallback);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setVoiceStatus('Listening...');
    recognition.onresult = (event: any) => {
      const transcript = event.results[0]?.[0]?.transcript ?? '';
      const response = sendMessage(transcript) ?? answerPortfolioQuestion(transcript);
      setVoiceStatus(`Heard: ${transcript}`);
      speak(response);
    };
    recognition.onerror = () => {
      setVoiceStatus('Microphone permission or recognition failed. Type a question below and I will speak the answer.');
    };
    recognition.onend = () => {
      setVoiceStatus((status) => (status === 'Listening...' ? 'Ready to listen' : status));
    };
    recognition.start();
  };

  const speakTypedVoiceAnswer = () => {
    const question = voiceInput.trim() || 'Introduce Shankranand Sarswati';
    const response = sendMessage(question) ?? answerPortfolioQuestion(question);
    setVoiceInput('');
    speak(response);
  };

  const speakIntro = () => {
    speakText(founderIntro, {
      onStart: () => setVoiceStatus('Speaking founder intro...'),
      onEnd: () => setVoiceStatus('Ready to listen'),
      onError: (message) => setVoiceStatus(message),
    });
  };

  return (
    <div className={`assistant-dock ${isOpen ? 'is-open' : ''}`}>
      {isOpen ? (
        <motion.div
          className="assistant-panel"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
        >
          <div className="assistant-header">
            <div>
              <span>Aiwana assistant</span>
              <strong>{mode === 'chat' ? 'Portfolio chatbot mode' : 'Voice bot mode'}</strong>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close assistant">
              X
            </button>
          </div>
          <div className="assistant-modes" role="tablist" aria-label="Assistant modes">
            <button type="button" className={mode === 'chat' ? 'active' : ''} onClick={() => setMode('chat')}>
              Chatbot
            </button>
            <button type="button" className={mode === 'voice' ? 'active' : ''} onClick={() => setMode('voice')}>
              Voice Bot
            </button>
          </div>
          {mode === 'chat' ? (
            <div className="assistant-chat">
              <div className="chat-thread" aria-live="polite">
                {messages.map((message, index) => (
                  <div className={`chat-bubble ${message.role}`} key={`${message.role}-${index}`}>
                    {message.text}
                  </div>
                ))}
              </div>
              <form
                className="chat-input-preview"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about resume, products, RAG..."
                  aria-label="Ask portfolio assistant"
                />
                <button type="submit">Send</button>
              </form>
            </div>
          ) : (
            <div className="assistant-voice">
              <div className="voice-orb">
                <span />
              </div>
              <strong>Voice bot mode</strong>
              <p>{voiceStatus}</p>
              <div className="voice-actions">
                <button type="button" className="voice-action" onClick={startVoice}>
                  Start microphone
                </button>
                <button type="button" className="voice-action secondary" onClick={speakIntro}>
                  Speak intro
                </button>
              </div>
              <form
                className="voice-fallback-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  speakTypedVoiceAnswer();
                }}
              >
                <input
                  value={voiceInput}
                  onChange={(event) => setVoiceInput(event.target.value)}
                  placeholder="Type a voice question..."
                  aria-label="Type a voice question"
                />
                <button type="submit">Speak answer</button>
              </form>
            </div>
          )}
        </motion.div>
      ) : null}
      <motion.button
        className="assistant-launcher"
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="launcher-pulse" />
        <strong>AI Assistant</strong>
        <small>Chatbot / Voice Bot</small>
      </motion.button>
    </div>
  );
}

export function ArchitectureDiagram({
  title,
  description,
  mermaidCode,
}: {
  title: string;
  description: string;
  mermaidCode: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const id = useMemo(() => `diagram-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, [title]);

  useEffect(() => {
    let mounted = true;
    setStatus('loading');

    import('mermaid')
      .then(({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          flowchart: { curve: 'basis', htmlLabels: true },
          themeVariables: {
            background: '#07111f',
            primaryColor: '#0f1b2f',
            primaryTextColor: '#e5f7ff',
            primaryBorderColor: '#38bdf8',
            lineColor: '#8b5cf6',
            secondaryColor: '#111827',
            tertiaryColor: '#0f172a',
          },
        });

        return mermaid.render(id, mermaidCode);
      })
      .then(({ svg }) => {
        if (mounted && ref.current) {
          ref.current.innerHTML = svg;
          setStatus('ready');
        }
      })
      .catch(() => {
        if (mounted && ref.current) {
          ref.current.innerHTML = `<pre>${mermaidCode}</pre>`;
          setStatus('error');
        }
      });

    return () => {
      mounted = false;
    };
  }, [id, mermaidCode]);

  return (
    <motion.article className="architecture-card spotlight-card" whileHover={{ y: -6, rotateX: 1.5, rotateY: -1.5 }} transition={{ duration: 0.2 }}>
      <div className="section-kicker">Architecture</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {status === 'loading' && (
        <div className="diagram-loading" aria-live="polite">
          <span />
          <strong>Loading architecture diagram</strong>
          <small>Mermaid is lazy-loaded to keep the first page bundle lighter.</small>
        </div>
      )}
      <div className={`diagram-shell ${status === 'loading' ? 'is-loading' : ''}`} ref={ref} />
    </motion.article>
  );
}

function SectionHeader({ kicker, title, copy }: { kicker: string; title: string; copy: string }) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55 }}
    >
      <span>{kicker}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </motion.div>
  );
}

function MediaPlaceholder({
  label,
  kind,
  expectedPath,
  folder,
}: {
  label: string;
  kind: 'Screenshot' | 'Video';
  expectedPath: string;
  folder: string;
}) {
  return (
    <div className="proof-slot">
      <div className={`media-icon ${kind.toLowerCase()}`}>{kind === 'Screenshot' ? 'IMG' : 'MP4'}</div>
      <strong>{label}</strong>
      <span>{kind === 'Screenshot' ? 'Real product screenshot will be added here.' : 'Demo recording will be added here.'}</span>
      <code>{expectedPath}</code>
      <small>Folder: {folder}</small>
    </div>
  );
}

function ProductMockup({ product }: { product: Product }) {
  return (
    <div className="product-mockup" aria-label={`${product.name} visual preview`}>
      <div className="mockup-window">
        <div className="mockup-bar">
          <span />
          <span />
          <span />
          <strong>{product.name.replace('Aiwana ', '')}</strong>
        </div>
        <div className="mockup-body">
          <div className="mockup-sidebar">
            {product.modules.slice(0, 5).map((module) => (
              <span key={module}>{module}</span>
            ))}
          </div>
          <div className="mockup-main">
            <div className="mockup-stat-row">
              <div />
              <div />
              <div />
            </div>
            <div className="mockup-chart">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="mockup-table">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
      <div className="mockup-glow" />
    </div>
  );
}

function ProductVisualGallery({
  productName,
  shots,
}: {
  productName: string;
  shots: Array<{ label: string; title: string; src: string }>;
}) {
  return (
    <div className="hrms-gallery" aria-label={`${productName} real product screenshots`}>
      <div className="hrms-gallery-shell">
        <div className="hrms-gallery-bar">
          <span />
          <span />
          <span />
          <strong>{productName.replace('Aiwana ', '')}</strong>
        </div>
        <div className="hrms-scroll-track" tabIndex={0} aria-label={`Scrollable ${productName} screenshots`}>
          {shots.map((shot) => (
            <figure className="hrms-shot-card" key={shot.label}>
              <img src={shot.src} alt={`${productName} ${shot.title}`} loading="lazy" />
              <figcaption>
                <strong>{shot.title}</strong>
                <code>{shot.label}</code>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="mockup-glow" />
    </div>
  );
}

function ProductDemoPlayer({
  title,
  subtitle,
  assets,
}: {
  title: string;
  subtitle: string;
  assets: Array<{ label: string; src: string }>;
}) {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = assets[activeVideo];

  useEffect(() => {
    const player = videoRef.current;
    if (!player) return;

    player.muted = true;
    player.play().catch(() => {
      // Browsers can delay autoplay until metadata is ready; onLoadedData retries.
    });
  }, [activeVideo]);

  return (
    <div className="hrms-demo-player" aria-label={`${title} autoplay demo`}>
      <div className="hrms-demo-copy">
        <span>Autoplay Demo</span>
        <strong>{title}</strong>
        <small>
          {subtitle} Playing {video.label} of {assets.length}. The demo automatically continues and loops.
        </small>
      </div>
      <video
        ref={videoRef}
        key={video.src}
        src={video.src}
        autoPlay
        muted
        playsInline
        controls
        preload="metadata"
        onLoadedData={(event) => {
          event.currentTarget.muted = true;
          event.currentTarget.play().catch(() => undefined);
        }}
        onEnded={() => setActiveVideo((index) => (index + 1) % assets.length)}
      />
      <div className="hrms-demo-progress">
        {assets.map((item, index) => (
          <button
            type="button"
            className={index === activeVideo ? 'active' : ''}
            key={item.src}
            onClick={() => setActiveVideo(index)}
            aria-label={`Play ${item.label}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductImagePreview({
  src,
  alt,
  title,
  label,
}: {
  src: string;
  alt: string;
  title: string;
  label: string;
}) {
  return (
    <div className="product-preview-screen product-real-preview">
      <img src={src} alt={alt} loading="lazy" />
      <div className="preview-screen-label">
        <strong>{title}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function ProductPreviewVisual({ product }: { product: Product }) {
  if (product.name === 'Aiwana HRMS') {
    return (
      <ProductImagePreview
        src={hrmsEmployeeDashboard}
        alt="Aiwana HRMS employee dashboard preview"
        title="Employee Dashboard"
        label="HRMS real screen"
      />
    );
  }

  if (product.name === 'Aiwana ERP') {
    return (
      <ProductImagePreview
        src={erpDashboard}
        alt="Aiwana ERP dashboard preview"
        title="ERP Dashboard"
        label="ERP real screen"
      />
    );
  }

  if (product.name === 'Aiwana CRM') {
    return (
      <ProductImagePreview
        src={crmDashboard}
        alt="Aiwana CRM dashboard preview"
        title="CRM Dashboard"
        label="CRM real screen"
      />
    );
  }

  return <ProductMockup product={product} />;
}

function DocumentIntelligenceVisual() {
  return (
    <div className="doc-intel-visual" aria-label="Document Intelligence interface preview">
      <div className="doc-window-top">
        <span />
        <span />
        <span />
        <strong>Aiwana Workspace</strong>
      </div>
      <div className="doc-intel-grid">
        <div className="doc-sidebar">
          <b>Workspace</b>
          <span>Contracts.pdf</span>
          <span>Policy.md</span>
          <span>Scanned pages</span>
        </div>
        <div className="doc-answer">
          <small>Agentic RAG answer</small>
          <strong>Citation-backed risk summary</strong>
          <p>Evidence from text, tables, OCR, and visual artifacts is reranked before final synthesis.</p>
          <div className="citation-row">
            <span>p.12</span>
            <span>clause</span>
            <span>92% confidence</span>
          </div>
        </div>
        <div className="doc-agent-trace">
          {['Context', 'Retrieve', 'Plan', 'Verify'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductPreviewCard({ product }: { product: Product }) {
  return (
    <motion.article
      className="product-card product-preview-card spotlight-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -8, rotateX: 1, rotateY: -1 }}
    >
      <div className="card-topline">
        <span>Flagship SaaS</span>
        {product.linkLabel === 'Live product' ? (
          <a href={product.url} target="_blank" rel="noreferrer">
            {product.linkLabel}
          </a>
        ) : (
          <span className="availability-pill">{product.linkLabel}</span>
        )}
      </div>
      <ProductPreviewVisual product={product} />
      {product.productionBadge && <div className="production-badge">{product.productionBadge}</div>}
      <h3>{product.name}</h3>
      <p className="preview-copy">{product.description}</p>
      {product.confidentialityNote && <p className="confidential-note">{product.confidentialityNote}</p>}
      <div className="tag-row">
        {product.stack.slice(0, 4).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="card-actions">
        <Link to={`/project/${projectSlug(product.name)}`}>Open case page</Link>
        {product.linkLabel === 'Live product' ? (
          <a href={product.url} target="_blank" rel="noreferrer">
            Live link
          </a>
        ) : (
          <span>Product preview coming online</span>
        )}
      </div>
    </motion.article>
  );
}

function AboutSection() {
  const [voiceState, setVoiceState] = useState('Play my AI founder intro');

  const playIntro = () => {
    setVoiceState('Preparing voice...');
    speakText(founderIntro, {
      onStart: () => setVoiceState('Speaking intro...'),
      onEnd: () => setVoiceState('Play my AI founder intro'),
      onError: (message) => setVoiceState(message),
    }).then((started) => {
      if (!started) setVoiceState('Voice is not supported in this browser');
    });
  };

  return (
    <section className="content-section about-section" id="about">
      <SectionHeader
        kicker="About Me"
        title="Founder-engineer building AI systems that ship into business operations"
        copy="This portfolio is about who I am: an AI lead architect and product builder focused on enterprise AI, SaaS, RAG, agents, and automation through Aiwana Solution."
      />
      <div className="about-grid">
        <div className="about-copy-panel spotlight-card">
          <p>
            I am Shankranand Sarswati, Founder & AI Solutions Architect at Aiwana Solution. My work sits at the intersection of AI engineering,
            SaaS product architecture, business automation, and founder-led execution.
          </p>
          <p>
            I build systems like HRMS, ERP, CRM, document intelligence platforms, RAG applications, multi-agent workflows,
            voice/chat agents, and enterprise automation layers for teams that need real operational outcomes.
          </p>
          <div className="about-actions">
            <button type="button" onClick={playIntro}>{voiceState}</button>
            <a href="/Shankranand-Sarswati-Resume.pdf" download>Download Resume</a>
          </div>
        </div>
        <div className="about-signal-grid">
          {[
            ['Founder', 'Aiwana Solution'],
            ['AI Systems', 'RAG, agents, automation'],
            ['SaaS', 'HRMS, ERP, CRM'],
            ['Stack', 'FastAPI, LangGraph, Qdrant, AWS'],
          ].map(([label, value]) => (
            <div className="about-signal spotlight-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonalProjectCard({ project }: { project: ResearchProject }) {
  return (
    <motion.article
      className="personal-project-card spotlight-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -6 }}
    >
      <div className="card-topline">
        <span>{project.category}</span>
        <Link to={`/project/${personalProjectSlug(project)}`}>Open case</Link>
      </div>
      <h3>{project.title}</h3>
      <p>{project.note}</p>
      {project.publication && <p className="publication-note">Published: {project.publication}</p>}
      <div className="tag-row">
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </motion.article>
  );
}

function ArchitectureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = architectureGallery[activeIndex];

  const goTo = (direction: 1 | -1) => {
    setActiveIndex((index) => (index + direction + architectureGallery.length) % architectureGallery.length);
  };

  return (
    <div className="architecture-carousel">
      <div className="architecture-carousel-rail" aria-label="Architecture selector">
        {architectureGallery.map((item, index) => (
          <button
            type="button"
            className={index === activeIndex ? 'active' : ''}
            key={item.title}
            onClick={() => setActiveIndex(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="architecture-carousel-frame">
        <div className="carousel-controls">
          <button type="button" onClick={() => goTo(-1)} aria-label="Previous architecture">
            Prev
          </button>
          <span>
            {activeIndex + 1} / {architectureGallery.length}
          </span>
          <button type="button" onClick={() => goTo(1)} aria-label="Next architecture">
            Next
          </button>
        </div>
        <ArchitectureDiagram key={active.title} title={active.title} description={active.problem} mermaidCode={active.mermaid} />
      </div>
    </div>
  );
}

const hireServices = [
  {
    title: 'AI Agents & RAG Systems',
    kind: 'Project contract / AI architect role',
    proof: 'Document Intelligence, RAG chatbot, LangGraph workflows, Qdrant retrieval, agent trace.',
    stack: ['LangGraph', 'LangChain', 'FastAPI', 'Qdrant', 'Groq'],
  },
  {
    title: 'SaaS Product Building',
    kind: 'Founder-style product build',
    proof: 'Aiwana HRMS, ERP, CRM with live/product proof pages, screenshots, demos, and architecture.',
    stack: ['React', 'FastAPI', 'Django', 'PostgreSQL', 'AWS'],
  },
  {
    title: 'Software Development',
    kind: 'Full-stack role / contract',
    proof: 'NXTMobility, KWICK, GoRidePE, Iconica Globex, APIs, dashboards, auth, payments.',
    stack: ['Laravel', 'JavaScript', 'APIs', 'Dashboards', 'Payments'],
  },
  {
    title: 'Website & Business Platform Building',
    kind: 'Client project contract',
    proof: 'Business websites, operational platforms, responsive UI, CRM/ERP-connected workflows.',
    stack: ['React', 'Responsive UI', 'SEO', 'Forms', 'Automation'],
  },
  {
    title: 'Voice Bot / Chatbot Automation',
    kind: 'AI automation project',
    proof: 'Portfolio assistant, voice mode, support/sales/HR assistant architecture, tool-calling flow.',
    stack: ['RAG', 'STT/TTS', 'WhatsApp', 'CRM APIs', 'Tool calling'],
  },
];

function HireServicesSection() {
  return (
    <section className="content-section hire-section" id="hire">
      <SectionHeader
        kicker="Hire Me For"
        title="Roles and project contracts where I can create business value"
        copy="Clear engagement areas backed by the proof already visible in this portfolio."
      />
      <div className="hire-grid">
        {hireServices.map((service) => (
          <article className="hire-card spotlight-card" key={service.title}>
            <span>{service.kind}</span>
            <h3>{service.title}</h3>
            <p>{service.proof}</p>
            <div className="tag-row">
              {service.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <a href="#contact">Start conversation</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductDetailPage({ product }: { product: Product }) {
  const isHrms = product.name === 'Aiwana HRMS';
  const isErp = product.name === 'Aiwana ERP';
  const hasRealDemo = isHrms || isErp;
  const realScreenshots = isHrms ? hrmsScreenshots : isErp ? erpScreenshots : [];
  const demoAssets = isHrms ? hrmsDemoAssets : isErp ? erpDemoAssets : [];

  return (
    <div className="project-detail-shell">
      <section className="project-detail-hero">
        <Link className="back-link" to="/#products">
          Back to products
        </Link>
        <div className="project-detail-grid">
          <div>
            <span className="section-kicker">Project Case Page</span>
            <h1>{product.name}</h1>
            {product.productionBadge && <div className="production-badge detail-production-badge">{product.productionBadge}</div>}
            <p>{product.description}</p>
            {product.confidentialityNote && <p className="confidential-note">{product.confidentialityNote}</p>}
            <div className="project-detail-actions">
              {product.linkLabel === 'Live product' ? (
                <a className="primary-button" href={product.url} target="_blank" rel="noreferrer">
                  Open Live Product
                </a>
              ) : (
                <span className="availability-pill">{product.linkLabel}</span>
              )}
              <a className="secondary-button" href="#project-architecture">
                View Architecture
              </a>
            </div>
          </div>
          <ProductPreviewVisual product={product} />
        </div>
      </section>

      <section className="project-detail-section">
        <SectionHeader
          kicker="Product Details"
          title="What this system proves"
          copy={product.impact}
        />
        <div className="project-detail-panels">
          <div className="detail-panel">
            <h3>Technology</h3>
            <div className="tag-row">
              {product.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="detail-panel">
            <h3>Modules</h3>
            <div className="module-grid">
              {product.modules.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
        {product.proofBullets && (
          <div className="production-proof-panel">
            <h3>Production Usage Proof</h3>
            <ul>
              {product.proofBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="project-detail-section">
        <SectionHeader
          kicker="Screenshots & Demo"
          title="Live product demo and screenshots"
          copy={
            hasRealDemo
              ? `${product.name} includes real local screenshots and an autoplay product demo.`
              : `${product.name} has the real dashboard preview now; the full demo recording can be added after it is shot.`
          }
        />
        {hasRealDemo ? (
          <div className="hrms-proof-stack">
            <ProductDemoPlayer
              title={`${product.name.replace('Aiwana ', '')} product walkthrough`}
              subtitle={isHrms ? 'Combined HRMS recording.' : 'ERP recording from the local product demo.'}
              assets={demoAssets}
            />
            <ProductVisualGallery productName={product.name} shots={realScreenshots} />
          </div>
        ) : (
          <>
            <ProductPreviewVisual product={product} />
            <div className="proof-grid detail-proof-grid">
              <MediaPlaceholder label="Product screenshot placeholder" kind="Screenshot" expectedPath={product.screenshotFile} folder={product.screenshotSlot} />
              <MediaPlaceholder label="Product demo placeholder" kind="Video" expectedPath={product.videoFile} folder={product.videoSlot} />
            </div>
          </>
        )}
      </section>

      <section className="project-detail-section" id="project-architecture">
        <ArchitectureDiagram
          title={`${product.name} architecture`}
          description="Technical architecture for the product, including UI, API, auth, data, intelligence, and deployment layers."
          mermaidCode={product.mermaid}
        />
      </section>
    </div>
  );
}

function SkillsSection() {
  return (
    <section className="skills-section content-section" id="skills">
      <SectionHeader
        kicker="Resume Skills"
        title="AI architect skills mapped as execution strength"
        copy="A compact view of the core skills behind the AI, SaaS, RAG, automation, and enterprise systems work."
      />
      <div className="skills-grid">
        {skillBars.map((skill, index) => (
          <motion.div
            className="skill-bar-card"
            key={skill.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.025 }}
          >
            <div className="skill-bar-head">
              <strong>{skill.name}</strong>
              <span>{skill.group}</span>
            </div>
            <div className="skill-meter" aria-label={`${skill.name} ${skill.value}%`}>
              <motion.i initial={{ width: 0 }} whileInView={{ width: `${skill.value}%` }} viewport={{ once: true }} transition={{ duration: 0.9, ease: 'easeOut' }} />
            </div>
            <small>{skill.value}%</small>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const isDocumentIntelligence = study.slug === 'document-intelligence';
  const isProductionCase = study.slug === 'nxtmobility-production-saas';

  return (
    <motion.article
      className={`case-card spotlight-card ${isDocumentIntelligence ? 'case-card-featured' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
    >
      {isDocumentIntelligence && <DocumentIntelligenceVisual />}
      {isProductionCase && <div className="production-badge">Production Engineering Proof</div>}
      <h3>{study.title}</h3>
      {isDocumentIntelligence && (
        <p className="case-intro">
          Agentic document intelligence workspace for PDFs, scanned pages, tables, visual artifacts, grounded citations, and confidence-scored answers.
        </p>
      )}
      <div className="tag-row">
        {study.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      {!isDocumentIntelligence && (
        <>
          <dl className="case-details compact-case-details">
            <div>
              <dt>Problem</dt>
              <dd>{study.problem}</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>{study.role}</dd>
            </div>
            <div>
              <dt>Business impact</dt>
              <dd>{study.impact}</dd>
            </div>
          </dl>
          <div className="proof-list">
            {study.proof.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </>
      )}
      {isProductionCase && (
        <div className="system-card-actions">
          <Link to={`/project/${caseStudySlug(study)}`}>Open full case page</Link>
        </div>
      )}
      {isDocumentIntelligence && (
        <div className="system-card-actions">
          <Link to={`/project/${caseStudySlug(study)}`}>Open full case page</Link>
          {study.githubUrl && (
            <a href={study.githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
        </div>
      )}
      {!isDocumentIntelligence && (
        <ArchitectureDiagram title={`${study.title} architecture`} description="System design preview." mermaidCode={study.mermaid} />
      )}
    </motion.article>
  );
}

function CaseStudyDetailPage({ study }: { study: CaseStudy }) {
  const isProductionCase = study.slug === 'nxtmobility-production-saas';
  const useCases = [
    'Ask citation-backed questions across PDFs, markdown, scanned pages, charts, and tables.',
    'Extract clauses, risks, tables, figures, and evidence cards into a searchable workspace.',
    'Run agentic RAG with context memory, retrieval planning, domain reasoning, and verification.',
    'Stream final answers with confidence, citations, visual cards, artifact cards, and agent trace.',
  ];

  return (
    <div className="project-detail-shell">
      <section className="project-detail-hero doc-detail-hero">
        <Link className="back-link" to="/#systems">
          Back to AI systems
        </Link>
        <div className="project-detail-grid">
          <div>
            <span className="section-kicker">{isProductionCase ? 'Production SaaS Case Page' : 'Agentic RAG Case Page'}</span>
            <h1>{study.title}</h1>
            <p>{isProductionCase ? study.problem : 'A workspace for enterprise document understanding: ingestion, OCR, artifact extraction, hybrid retrieval, reranking, multi-agent reasoning, grounded answer synthesis, and citation-ready evidence review.'}</p>
            {study.confidentialityNote && <p className="confidential-note">{study.confidentialityNote}</p>}
            <div className="project-detail-actions">
              {study.githubUrl && (
                <a className="primary-button" href={study.githubUrl} target="_blank" rel="noreferrer">
                  Open GitHub
                </a>
              )}
              <a className="secondary-button" href="#project-architecture">
                View Architecture
              </a>
            </div>
          </div>
          {isProductionCase ? <ProductPreviewVisual product={products[0]} /> : <DocumentIntelligenceVisual />}
        </div>
      </section>

      <section className="project-detail-section">
        <SectionHeader
          kicker="About The Project"
          title={isProductionCase ? 'Production SaaS deployment for real internal operations' : 'Document intelligence built as an AI workspace, not a simple PDF chatbot'}
          copy={study.problem}
        />
        <div className="project-detail-panels">
          <div className="detail-panel">
            <h3>Technology Stack</h3>
            <div className="tag-row">
              {study.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="detail-panel">
            <h3>Role & Impact</h3>
            <p>{study.role}</p>
            <p>{study.impact}</p>
          </div>
        </div>
      </section>

      {isProductionCase && (
        <>
          <section className="project-detail-section">
            <SectionHeader
              kicker="Systems Delivered"
              title="Aiwana HRMS and ERP in NXTMobility operations"
              copy="The proof is positioned as production engineering delivery, with sensitive business data intentionally excluded."
            />
            <div className="project-detail-panels">
              <div className="detail-panel">
                <h3>Systems Delivered</h3>
                <ul className="case-bullet-list">
                  {study.systemsDelivered?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="detail-panel">
                <h3>Technical Ownership</h3>
                <ul className="case-bullet-list">
                  {study.technicalOwnership?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="project-detail-section">
            <SectionHeader
              kicker="Impact"
              title="Conservative production impact"
              copy="No invented numbers, no private dashboard data, and no confidential financial or employee data."
            />
            <div className="proof-list personal-proof-list">
              {study.proof.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>
        </>
      )}

      {!isProductionCase && <section className="project-detail-section">
        <SectionHeader
          kicker="Use Cases"
          title="Where this system is useful"
          copy="Designed for teams that need grounded answers, evidence review, and repeatable document workflows."
        />
        <div className="doc-use-case-grid">
          {useCases.map((item) => (
            <div className="detail-panel" key={item}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>}

      {!isProductionCase && <section className="project-detail-section">
        <SectionHeader
          kicker="Demo & Proof"
          title="Demo video and proof assets"
          copy="The page is ready for the recording and screenshot assets once the demo is exported."
        />
        <div className="proof-grid detail-proof-grid">
          <MediaPlaceholder
            label="Document intelligence answer screenshot"
            kind="Screenshot"
            expectedPath={study.screenshotFile ?? 'public/screenshots/document-intelligence/rag-answer.png'}
            folder="public/screenshots/document-intelligence"
          />
          <MediaPlaceholder
            label="Document intelligence demo video"
            kind="Video"
            expectedPath={study.demoFile ?? 'public/videos/document-intelligence/document-demo.mp4'}
            folder="public/videos/document-intelligence"
          />
        </div>
      </section>}

      <section className="project-detail-section architecture-wide" id="project-architecture">
        <ArchitectureDiagram
          title={isProductionCase ? 'NXTMobility production SaaS architecture' : 'Document Intelligence full architecture'}
          description={isProductionCase ? 'Confidentiality-safe system architecture across HRMS, ERP, APIs, database, RBAC, deployment, testing, and maintenance.' : 'End-to-end architecture across frontend, FastAPI, ingestion, OCR, embeddings, Qdrant, metadata, agents, LLM, evidence canvas, and readiness checks.'}
          mermaidCode={study.mermaid}
        />
      </section>
    </div>
  );
}

function PersonalProjectDetailPage({ project }: { project: ResearchProject }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      label: 'Architecture',
      title: `${project.title} architecture`,
      description: 'A clear system view of how the personal project works end to end.',
      content: <ArchitectureDiagram title={`${project.title} architecture`} description="Architecture slide." mermaidCode={project.mermaid} />,
    },
    {
      label: 'Proof',
      title: 'Proof and artifacts',
      description: 'Evidence slots and publication/project references for this work.',
      content: (
        <div className="proof-list personal-proof-list">
          {project.proof.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ),
    },
    {
      label: 'Stack',
      title: 'Technology stack',
      description: 'Tools and concepts used in the project.',
      content: (
        <div className="tag-row personal-stack-row">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="project-detail-shell">
      <section className="project-detail-hero personal-detail-hero">
        <Link className="back-link" to="/#personal-projects">
          Back to personal projects
        </Link>
        <div className="project-detail-grid">
          <div>
            <span className="section-kicker">{project.category}</span>
            <h1>{project.title}</h1>
            <p>{project.note}</p>
            <div className="project-detail-actions">
              {project.githubUrl && (
                <a className="primary-button" href={project.githubUrl} target="_blank" rel="noreferrer">
                  Open GitHub
                </a>
              )}
              <a className="secondary-button" href="#project-slides">
                View Slides
              </a>
            </div>
          </div>
          <div className="personal-hero-panel spotlight-card">
            <span>{project.category}</span>
            <strong>{project.outcome}</strong>
            {project.publication && <p>Published research: {project.publication}</p>}
          </div>
        </div>
      </section>

      <section className="project-detail-section">
        <SectionHeader kicker="About The Project" title="What this personal project proves" copy={project.role} />
        <div className="project-detail-panels">
          <div className="detail-panel">
            <h3>Outcome</h3>
            <p>{project.outcome}</p>
          </div>
          <div className="detail-panel">
            <h3>Proof</h3>
            <div className="proof-list">
              {project.proof.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="project-detail-section personal-slide-section" id="project-slides">
        <SectionHeader
          kicker="Slide Screen"
          title="Architecture, proof, and stack in one focused view"
          copy="Use the slide controls to inspect the project story without mixing it into the homepage."
        />
        <div className="slide-shell">
          <div className="slide-tabs">
            {slides.map((slide, index) => (
              <button type="button" className={activeSlide === index ? 'active' : ''} key={slide.label} onClick={() => setActiveSlide(index)}>
                {slide.label}
              </button>
            ))}
          </div>
          <div className="slide-screen">
            <span>{slides[activeSlide].label}</span>
            <h3>{slides[activeSlide].title}</h3>
            <p>{slides[activeSlide].description}</p>
            {slides[activeSlide].content}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const payload = Object.fromEntries(formData.entries());

    setContactStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Primary email service failed.');
      }

      setContactStatus('sent');
      formElement.reset();
    } catch {
      setContactStatus('fallback');
      window.setTimeout(() => {
        formRef.current?.submit();
      }, 650);
    }
  };

  return (
    <form ref={formRef} className="contact-form" action="https://formsubmit.co/shankranand332@gmail.com" method="POST" onSubmit={submitContact}>
      <input type="hidden" name="_subject" value="New Portfolio Inquiry" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <div className="form-row">
        <label>
          Name
          <input name="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone
          <input name="phone" type="tel" />
        </label>
        <label>
          Company
          <input name="company" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Service
          <select name="service" defaultValue="Enterprise AI system">
            <option>Enterprise AI system</option>
            <option>RAG / Document Intelligence</option>
            <option>SaaS product build</option>
            <option>AI agents / voice bot</option>
            <option>Hiring / founder conversation</option>
          </select>
        </label>
      </div>
      <label>
        Message
        <textarea
          name="message"
          rows={4}
          placeholder="Tell me what you want to build or discuss."
          required
        />
      </label>
      <button type="submit" disabled={contactStatus === 'sending' || contactStatus === 'fallback'}>
        {contactStatus === 'sending' ? 'Sending...' : 'Send inquiry'}
      </button>
      {contactStatus === 'sent' && <small className="form-status sent">Message sent successfully.</small>}
      {contactStatus === 'fallback' && <small className="form-status fallback">Email service unavailable, opening secure fallback submission.</small>}
      <small>Primary delivery uses the private portfolio email service. If unavailable, the same inquiry securely falls back to FormSubmit.</small>
    </form>
  );
}

const credentialDocs = [
  {
    kind: 'Publication',
    title: 'AI-Assisted Scam Detection and Notification System',
    detail: 'Taylor & Francis / CRC Press',
    href: '/project/ai-scam-detection',
  },
  {
    kind: 'Certification',
    title: 'AWS Cloud Practitioner Essentials',
    detail: 'Document proof slot ready for certificate upload.',
    href: '/documents/aws-cloud-practitioner-essentials.html',
  },
  {
    kind: 'Certification',
    title: 'AWS AICTE Data Analytics Internship',
    detail: 'Document proof slot ready for certificate upload.',
    href: '/documents/aws-aicte-data-analytics-internship.html',
  },
  {
    kind: 'Certification',
    title: 'Wipro TalentNext Program',
    detail: 'Document proof slot ready for certificate upload.',
    href: '/documents/wipro-talentnext-program.html',
  },
];

export function FounderPortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { projectId } = useParams();
  const selectedProduct = projectId ? products.find((product) => projectSlug(product.name) === projectId) : undefined;
  const selectedPersonalProject = projectId ? researchProjects.find((project) => personalProjectSlug(project) === projectId) : undefined;
  const selectedCaseStudy = projectId && !selectedPersonalProject ? enterpriseSystems.find((study) => study.slug && caseStudySlug(study) === projectId) : undefined;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    rootRef.current?.style.setProperty('--cursor-x', `${event.clientX}px`);
    rootRef.current?.style.setProperty('--cursor-y', `${event.clientY}px`);
  };

  useEffect(() => {
    if (!rootRef.current) return;
    gsap.fromTo(
      rootRef.current.querySelectorAll('.proof-metric'),
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, duration: 0.55, ease: 'power2.out', delay: 0.25 },
    );
  }, []);

  return (
    <div className="portfolio-shell" ref={rootRef} onPointerMove={handlePointerMove}>
      <div className="cursor-spotlight" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />
      <header className="site-nav">
        <a className="brand-mark" href="#home" aria-label="Go to hero">
          <span>SNS</span>
          <small>Aiwana</small>
        </a>
        <nav>
          <a href="#home">Hero</a>
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label === 'Clients' ? 'Client Work' : label}
            </a>
          ))}
          <a href="#agents">Agents</a>
        </nav>
        <a className="nav-cta" href="mailto:shankranand332@gmail.com">
          Book AI Systems Call
        </a>
      </header>

      {selectedProduct ? (
        <main>
          <ProductDetailPage product={selectedProduct} />
        </main>
      ) : selectedCaseStudy ? (
        <main>
          <CaseStudyDetailPage study={selectedCaseStudy} />
        </main>
      ) : selectedPersonalProject ? (
        <main>
          <PersonalProjectDetailPage project={selectedPersonalProject} />
        </main>
      ) : (
      <main>
        <section className="hero-section" id="home">
          <div className="hero-bg-photo" style={{ backgroundImage: `url(${ceoBackground})` }} aria-hidden="true" />
          <div className="hero-grid">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <motion.div className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                AI Lead Architect for enterprise AI and SaaS systems
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                Shankranand Sarswati
              </motion.h1>
              <h2>AI Lead Architect building enterprise AI systems, SaaS products, RAG platforms, and agentic automation through Aiwana Solution.</h2>
              <p>
                I design and ship production-grade AI products across HRTech, ComplianceTech, enterprise knowledge management,
                CRM automation, ERP, and business workflow intelligence.
              </p>
              <div className="hero-actions">
                <MagneticButton className="primary-button" href="mailto:shankranand332@gmail.com">
                  Book AI Systems Call
                </MagneticButton>
                <MagneticButton className="secondary-button" href="#systems">
                  View Technical Case Studies
                </MagneticButton>
                <MagneticButton className="ghost-button" href="#products">
                  Explore Aiwana Products
                </MagneticButton>
              </div>
              <div className="floating-badges">
                {heroBadges.map((badge, index) => (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 + index * 0.06 }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            <HeroVisual />
          </div>
        </section>

        <AboutSection />

        <SkillsSection />

        <section className="proof-section" aria-label="Proof metrics">
          <div className="proof-grid-main">
            {proofMetrics.map((metric) => (
              <div className="proof-metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
          <div className="brand-strip">
            {brands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </section>

        <section className="content-section" id="products">
          <SectionHeader
            kicker="Aiwana SaaS Products"
            title="Flagship products built around business operations"
            copy="Each product is positioned with real links, architecture, modules, and proof slots for screenshots and recordings."
          />
          <div className="product-stack">
            {products.map((product) => (
              <ProductPreviewCard key={product.name} product={product} />
            ))}
          </div>
        </section>

        <section className="content-section orbit-section" id="orbit">
          <SectionHeader
            kicker="Aiwana Product Orbit"
            title="One operating system vision, multiple AI-first business products"
            copy="A visual map of the product ecosystem around Aiwana Solution."
          />
          <div className="product-orbit">
            <div className="orbit-core">
              <strong>Aiwana</strong>
              <span>Solution</span>
            </div>
            {orbitNodes.map((node, index) => (
              <span className="orbit-node" style={{ '--i': index } as CSSProperties} key={node}>
                {node}
              </span>
            ))}
          </div>
        </section>

        <section className="content-section" id="systems">
          <SectionHeader
            kicker="Case Studies"
            title="Production SaaS deployment and AI architecture proof"
            copy="Production usage is separated from private data, with confidentiality-safe language and no invented scale claims."
          />
          <div className="case-grid">
            {enterpriseSystems.filter((study) => ['nxtmobility-production-saas', 'document-intelligence'].includes(study.slug ?? '')).map((study) => (
              <CaseStudyCard key={study.title} study={study} />
            ))}
          </div>
        </section>

        <section className="content-section" id="clients">
          <SectionHeader
            kicker="Client Projects"
            title="Client platforms and production business systems"
            copy="External work is grouped separately from owned Aiwana SaaS products."
          />
          <div className="client-link-strip" aria-label="Client project links">
            {[
              ['NXTMobility', 'https://nxtmobility.com'],
              ['KWICK', 'https://kwick.in'],
              ['Iconica Globex', 'https://iconicaglobex.com'],
              ['GoRidePE', 'https://goridepe.com'],
            ].map(([label, href]) => (
              <a href={href} target="_blank" rel="noreferrer" key={href}>
                {label}
              </a>
            ))}
          </div>
          <div className="client-grid">
            {clientProjects
              .filter((project) => !['Aiwana Solution', 'MSME Guard', 'GST Guard Shield'].includes(project.name))
              .map((project) => (
              <motion.article className="client-card spotlight-card" key={project.name} whileHover={{ y: -6, rotateX: 1 }}>
                <div className="card-topline">
                  <span>{project.role}</span>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noreferrer">
                      Visit
                    </a>
                  ) : (
                    <span>Proof slot</span>
                  )}
                </div>
                <h3>{project.name}</h3>
                {'linkNote' in project && project.linkNote ? <p className="link-note">{project.linkNote}</p> : null}
                <p><strong>Problem:</strong> {project.problem}</p>
                <p><strong>Solution:</strong> {project.solution}</p>
                <p><strong>Outcome:</strong> {project.outcome}</p>
                <div className="tag-row">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <HireServicesSection />

        <section className="content-section" id="personal-projects">
          <SectionHeader
            kicker="Personal Projects"
            title="Research, agents, review systems, and acquisition automation"
            copy="Personal and research work is grouped here, separate from SaaS products and client projects."
          />
          <div className="research-grid">
            {researchProjects.map((project) => (
              <PersonalProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="content-section" id="architecture">
          <SectionHeader
            kicker="Architecture Gallery"
            title="Swipe through reusable system diagrams in one focused architecture console"
            copy="One fixed panel keeps the page smooth while still making each product and AI workflow inspectable."
          />
          <ArchitectureCarousel />
        </section>

        <section className="content-section agents-section" id="agents">
          <SectionHeader
            kicker="AI Agents, Voice Bots & RAG Chatbots"
            title="Production-ready AI automation capability stack"
            copy="Built as part of Aiwana's AI automation capability stack for sales, support, HR, operations, real estate, clinics, education, and enterprise knowledge."
          />
          <div className="agent-layout">
            <div className="agent-grid">
              {agentUseCases.map((useCase) => (
                <motion.article className="agent-card spotlight-card" key={useCase} whileHover={{ y: -5 }}>
                  <h3>{useCase}</h3>
                  <p>
                    Grounded retrieval, workflow automation, escalation, tool calling, logs, and analytics for the relevant business process.
                  </p>
                </motion.article>
              ))}
            </div>
            <ArchitectureDiagram
              title="AI Agent and Voice Bot Workflow"
              description="Unified web chat, WhatsApp, and voice architecture with RAG and tool calling."
              mermaidCode={architectureGallery[4].mermaid}
            />
          </div>
        </section>

        <section className="content-section" id="experience">
          <SectionHeader
            kicker="Experience Timeline"
            title="Founder first, with AI engineering and product execution underneath"
            copy="The timeline now reflects the resume positioning without making the older employee role the primary identity."
          />
          <div className="timeline">
            {experience.map((item) => (
              <motion.article
                className="timeline-item spotlight-card"
                key={`${item.org}-${item.date}`}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
              >
                <span>{item.date}</span>
                <h3>{item.org}</h3>
                <strong>{item.role}</strong>
                <p>{item.detail}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="content-section founder-story">
          <SectionHeader
            kicker="Founder Story"
            title="Why I built Aiwana Solution"
            copy="Indian SMBs and growing businesses need more than websites. They need AI-first operating systems."
          />
          <div className="story-panel">
            <p>
              Aiwana Solution is positioned as an external AI + IT growth team for businesses: HRMS, CRM, ERP, automation,
              data intelligence, and intelligent agents that reduce manual operations and improve decision-making.
            </p>
            <p>
              The thesis is simple: businesses do not need another disconnected tool. They need connected operating systems
              where AI can retrieve knowledge, execute workflows, generate evidence, and help teams move faster with auditability.
            </p>
          </div>
        </section>

        <section className="content-section">
          <SectionHeader
            kicker="Tech Stack"
            title="Capabilities grouped by system responsibility"
            copy="No fake skill percentages. Just the stack used to build AI products, backend systems, data layers, cloud deployments, and secure workflows."
          />
          <div className="tech-grid">
            {techGroups.map((group) => (
              <motion.article className="tech-card spotlight-card" key={group.title} whileHover={{ y: -5 }}>
                <h3>{group.title}</h3>
                <div className="tag-row">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <SectionHeader
            kicker="Publications & Certifications"
            title="Research and validated training"
            copy="Credibility signals are stated plainly without fake certificate IDs or inflated claims."
          />
          <div className="publication-grid">
            {credentialDocs.map((doc) => (
              <a className="publication-card credential-card" href={doc.href} key={doc.title}>
                <span>{doc.kind}</span>
                <h3>{doc.title}</h3>
                <p>{doc.detail}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div>
            <span className="section-kicker">Contact / CTA</span>
            <h2>Discuss an enterprise AI project, SaaS build, or automation system.</h2>
            <p>
              For clients, hiring teams, and partners who need a founder-engineer who can architect and ship.
            </p>
            <div className="contact-actions">
              <MagneticButton className="primary-button" href="mailto:shankranand332@gmail.com">
                Book AI Systems Call
              </MagneticButton>
              <MagneticButton className="ghost-button" href="/Shankranand-Sarswati-Resume.pdf" download>
                Download Resume
              </MagneticButton>
            </div>
          </div>
          <ContactForm />
          <div className="contact-links">
            {contactLinks.map((link) => (
              <a href={link.href} key={link.label} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>
      )}
      <AIAssistantDock />
    </div>
  );
}
