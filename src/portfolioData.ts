export type Link = {
  label: string;
  href: string;
};

export type Product = {
  name: string;
  url: string;
  linkLabel: string;
  linkNote?: string;
  productionBadge?: string;
  confidentialityNote?: string;
  proofBullets?: string[];
  description: string;
  stack: string[];
  modules: string[];
  impact: string;
  screenshotSlot: string;
  videoSlot: string;
  screenshotFile: string;
  videoFile: string;
  mermaid: string;
};

export type CaseStudy = {
  title: string;
  slug?: string;
  githubUrl?: string;
  demoFile?: string;
  screenshotFile?: string;
  stack: string[];
  problem: string;
  role: string;
  impact: string;
  proof: string[];
  systemsDelivered?: string[];
  technicalOwnership?: string[];
  confidentialityNote?: string;
  mermaid: string;
};

export type ResearchProject = {
  title: string;
  slug: string;
  category: string;
  note: string;
  role: string;
  outcome: string;
  stack: string[];
  proof: string[];
  githubUrl?: string;
  publication?: string;
  mermaid: string;
};

export const navItems = [
  ['About', 'about'],
  ['Products', 'products'],
  ['AI Systems', 'systems'],
  ['Personal Projects', 'personal-projects'],
  ['Clients', 'clients'],
  ['Architecture', 'architecture'],
  ['Experience', 'experience'],
  ['Contact', 'contact'],
];

export const proofMetrics = [
  { value: '85%', label: 'knowledge retrieval efficiency improvement' },
  { value: '70%', label: 'manual workflow reduction' },
  { value: '40%', label: 'retrieval accuracy improvement' },
  { value: '30%', label: 'ETL runtime reduction' },
  { value: '10+ hrs', label: 'weekly operational time saved' },
  { value: 'AI + SaaS', label: 'enterprise products shipped' },
];

export const brands = [
  'Aiwana Solution',
  'NXTMobility',
  'KWICK',
  'GoRidePE',
  'Iconica Globex',
  'Aiwana HRMS',
  'Aiwana CRM',
  'Aiwana ERP',
];

const saasBase = `flowchart LR
  User[Business Users] --> Web[React / Next UI]
  Web --> API[FastAPI / Django APIs]
  API --> Auth[RBAC + Audit Logs]
  API --> DB[(PostgreSQL / MySQL)]
  API --> Agents[AI Automation Layer]
  Agents --> Reports[Insights + Reports]
  API --> AWS[AWS Deployment]`;

export const products: Product[] = [
  {
    name: 'Aiwana HRMS',
    url: 'https://hrms.aiwanasolution.com',
    linkLabel: 'Live product',
    productionBadge: 'Live in Production — Used by NXTMobility Operations',
    confidentialityNote: 'Some screenshots and metrics are redacted for confidentiality. Confidential metrics available on request.',
    description:
      'AI-powered HRMS for attendance, payroll, leave, recruitment, employee workflows, HR command center, RBAC, audit logging, and intelligent insights.',
    stack: ['FastAPI', 'Next.js', 'MySQL', 'Redis', 'AWS EC2/RDS', 'Docker', 'RBAC'],
    modules: ['Face + geofence attendance', 'Payroll', 'Leave', 'Documents', 'HR dashboards', 'Reporting'],
    impact: 'Production HRMS used in daily business operations at NXTMobility, with confidential metrics available on request.',
    proofBullets: [
      'Designed and deployed a production HRMS used in daily business operations at NXTMobility.',
      'Includes face + geofence attendance, leave management, payroll workflows, role-based access, documents, HR dashboards, and reporting.',
      'Built with FastAPI, Next.js, MySQL, Redis, AWS EC2/RDS, Docker, and role-based security.',
      'Owned end-to-end delivery: architecture, backend, frontend integration, deployment, testing, and maintenance.',
    ],
    screenshotSlot: 'public/screenshots/hrms',
    videoSlot: 'public/videos/hrms',
    screenshotFile: 'public/screenshots/hrms/dashboard.png',
    videoFile: 'public/videos/hrms/hrms-demo.mp4',
    mermaid: saasBase.replace('Reports[Insights + Reports]', 'Reports[Payroll + HR Insights]'),
  },
  {
    name: 'Aiwana ERP',
    url: 'https://erp.aiwanasolution.com',
    linkLabel: 'Live product',
    productionBadge: 'Production System — Used for NXTMobility Business Operations',
    confidentialityNote: 'Some screenshots and metrics are redacted for confidentiality. Confidential metrics available on request.',
    description:
      'Enterprise ERP platform covering inventory, purchase, finance, production, compliance, reports, workflow automation, and operational intelligence.',
    stack: ['FastAPI', 'Next.js', 'MySQL', 'Redis', 'AWS EC2/RDS', 'Docker', 'RBAC'],
    modules: ['Purchase', 'Inventory', 'Production', 'Sales', 'Finance', 'Dispatch', 'Service', 'Reporting'],
    impact: 'Production ERP modules used for NXTMobility internal operational workflows and business visibility.',
    proofBullets: [
      'Built and deployed ERP modules used for operational workflows at NXTMobility.',
      'Covers purchase, inventory, production, sales, finance, dispatch, service, reporting, and role-based workflows.',
      'Added accounting lifecycle, GST/compliance-ready workflows, audit logs, and operational dashboards.',
      'Owned system design, implementation, deployment, testing, and ongoing improvements.',
    ],
    screenshotSlot: 'public/screenshots/erp',
    videoSlot: 'public/videos/erp',
    screenshotFile: 'public/screenshots/erp/dashboard.png',
    videoFile: 'public/videos/erp/erp-demo.mp4',
    mermaid: `flowchart LR
  Ops[Operations] --> UI[ERP Command Center]
  UI --> API[API Gateway]
  API --> Inventory[Inventory]
  API --> Finance[Finance]
  API --> Purchase[Procurement]
  API --> Compliance[Compliance]
  Inventory --> BI[Operational Intelligence]
  Finance --> BI
  Purchase --> BI
  Compliance --> Audit[Audit Trail]`,
  },
  {
    name: 'Aiwana CRM',
    url: 'https://crm.aiwanasolution.com',
    linkLabel: 'Preview / Coming Online',
    linkNote: 'CRM domain is kept as a product proof target, but it may be coming online or temporarily unavailable.',
    description:
      'AI-powered CRM for lead capture, lead scoring, follow-ups, pipeline management, WhatsApp automation, customer engagement, and business visibility.',
    stack: ['React', 'FastAPI', 'LangChain', 'WhatsApp APIs', 'PostgreSQL', 'Automation'],
    modules: ['Lead capture', 'Lead scoring', 'Pipeline', 'Follow-ups', 'WhatsApp automation', 'AI agents'],
    impact: 'Designed to reduce follow-up leakage and improve visibility across sales and customer conversations.',
    screenshotSlot: 'public/screenshots/crm',
    videoSlot: 'public/videos/crm',
    screenshotFile: 'public/screenshots/crm/pipeline.png',
    videoFile: 'public/videos/crm/crm-demo.mp4',
    mermaid: `flowchart LR
  Lead[Lead Sources] --> CRM[CRM Pipeline]
  CRM --> Score[AI Lead Scoring]
  Score --> Agent[Follow-up Agent]
  Agent --> WhatsApp[WhatsApp / Email]
  Agent --> Calendar[Meeting Booking]
  Agent --> DB[(Customer Timeline)]
  DB --> Analytics[Sales Visibility]`,
  },
];

export const enterpriseSystems: CaseStudy[] = [
  {
    title: 'NXTMobility - Production SaaS Deployment',
    slug: 'nxtmobility-production-saas',
    stack: ['FastAPI', 'Next.js', 'MySQL', 'Redis', 'AWS EC2/RDS', 'Docker', 'RBAC', 'Testing'],
    problem:
      'NXTMobility needed internal systems to reduce manual operational work across HR, attendance, payroll, inventory, finance, and business workflows.',
    role:
      'Production AI/Product Engineer and AI Solutions Architect responsible for end-to-end delivery across architecture, APIs, frontend integration, deployment, testing, and maintenance.',
    impact:
      'Currently used in production business operations, reduced dependency on manual processes, improved visibility across HR and operational workflows, and created a scalable foundation for future automation and AI workflows.',
    proof: [
      'Production usage in daily business operations',
      'Internal operational workflows',
      'Confidential metrics available on request',
      'Some screenshots and metrics are redacted for confidentiality',
    ],
    systemsDelivered: [
      'HRMS for employee attendance, payroll, leave, documents, HR workflows, and reporting.',
      'ERP for inventory, purchase, sales, finance, dispatch, service, and operational reporting.',
    ],
    technicalOwnership: [
      'System architecture',
      'Backend APIs',
      'Frontend integration',
      'Database design',
      'AWS deployment',
      'Docker deployment',
      'RBAC/security',
      'Testing',
      'Maintenance',
    ],
    confidentialityNote:
      'This case study intentionally excludes employee personal data, salary data, customer data, credentials, internal financial numbers, and private dashboards.',
    mermaid: `flowchart LR
  Ops[NXTMobility Operations] --> HRMS[Aiwana HRMS]
  Ops --> ERP[Aiwana ERP]
  HRMS --> Attendance[Face + Geofence Attendance]
  HRMS --> Leave[Leave + Payroll Workflows]
  HRMS --> HRDocs[Documents + HR Dashboards]
  ERP --> Purchase[Purchase + Inventory]
  ERP --> Finance[Finance + GST Workflows]
  ERP --> Dispatch[Sales + Dispatch + Service]
  HRMS --> API[FastAPI Backend APIs]
  ERP --> API
  API --> DB[(MySQL / Redis)]
  API --> Security[RBAC + Audit Logs]
  API --> Deploy[AWS EC2/RDS + Docker]
  Deploy --> Maintenance[Testing + Maintenance]
  Maintenance --> Future[Foundation for AI Automation]`,
  },
  {
    title: 'Enterprise Document Intelligence Platform',
    slug: 'document-intelligence',
    githubUrl: 'https://github.com/Sruwat',
    demoFile: 'public/videos/document-intelligence/document-demo.mp4',
    screenshotFile: 'public/screenshots/document-intelligence/rag-answer.png',
    stack: ['Next.js', 'FastAPI', 'LangGraph', 'Qdrant', 'SQLite', 'BGE-M3', 'BGE Reranker', 'Groq', 'OCR'],
    problem:
      'Enterprise teams need citation-backed answers from long, messy documents without losing auditability or context.',
    role:
      'Architected the Agentic RAG pipeline, hybrid retrieval design, graph-aware reasoning layer, and API surface.',
    impact:
      'Resume-backed impact includes 85% knowledge retrieval efficiency improvement and 40% retrieval accuracy improvement.',
    proof: [
      'Screenshot: public/screenshots/document-intelligence/rag-answer.png',
      'Video: public/videos/document-intelligence/document-demo.mp4',
      'Architecture diagram',
      'Audit-log explanation',
    ],
    mermaid: `flowchart TD
    U["User in Browser<br/>localhost:3000"] --> FE["Next.js Frontend<br/>Aiwana Workspace UI"]

    FE -->|"REST/SSE API calls"| API["FastAPI Backend<br/>localhost:8000"]

    API --> WS["Workspace + Chat APIs"]
    API --> ING["Ingestion APIs"]
    API --> QUERY["Query / Agentic RAG APIs"]
    API --> READY["Readiness / Launch Checks"]

    ING --> PARSE["Document Parser<br/>PDF, text, markdown, images"]
    PARSE --> OCR["OCR / Visual Extraction<br/>scanned pages, page previews, figures"]
    PARSE --> ART["Artifact Extraction<br/>clauses, risks, charts, tables"]
    PARSE --> CHUNK["Chunk Builder<br/>text/table/visual chunks"]

    CHUNK --> EMB["Embedding Runtime<br/>BGE-M3, 1024-dim"]
    EMB --> QDRANT["Qdrant Vector Store<br/>aiwana_chunks_v2"]

    QDRANT --> VECTORS["Named Dense Vectors<br/>text_dense<br/>table_dense<br/>visual_dense"]
    QDRANT --> FILTERS["Payload Indexes<br/>tenant_id<br/>workspace_id<br/>document_id<br/>content_type<br/>objective_profile<br/>page_number"]

    API --> META["Metadata Store<br/>SQLite metadata.db"]
    META --> DOCS["Documents"]
    META --> SESS["Chat Sessions"]
    META --> AUDIT["Audit / Memory / Job Records"]

    QUERY --> UNDERSTAND["Query Understanding<br/>language, objective, mode"]
    QUERY --> RETRIEVE["Hybrid Retrieval<br/>Qdrant + metadata filters"]
    RETRIEVE --> RERANK["Reranker<br/>BGE Reranker v2 M3"]
    RERANK --> AGENTS["Agent Pipeline"]

    AGENTS --> CA["ContextAgent<br/>chat memory + document memory"]
    AGENTS --> RA["RetrievalAgent<br/>top-k grounded evidence"]
    AGENTS --> PA["PlannerAgent<br/>query plan"]
    AGENTS --> DA["Domain Agent<br/>Legal / Research / Enterprise"]
    AGENTS --> SA["SynthesisAgent<br/>answer drafting"]
    AGENTS --> VA["VerifierAgent<br/>grounding + confidence"]

    SA --> LLM["Hosted LLM<br/>Groq<br/>llama-3.3-70b-versatile"]
    LLM --> VA

    VA --> ANSWER["Final Answer<br/>citations + confidence"]
    VA --> CANVAS["Evidence Canvas<br/>citations<br/>visual cards<br/>artifact cards<br/>agent trace"]

    ANSWER --> API
    CANVAS --> API
    API -->|"streaming / final response"| FE
    FE --> U

    READY --> EMB
    READY --> QDRANT
    READY --> META
    READY --> LLM`,
  },
  {
    title: 'Agentic Research Assistant',
    stack: ['LangGraph', 'LangChain', 'Qdrant', 'Groq', 'FastAPI'],
    problem:
      'Research workflows often split search, synthesis, citation handling, and follow-up reasoning across disconnected tools.',
    role:
      'Designed a multi-step agent workflow for retrieval, synthesis, verification, and report generation.',
    impact:
      'Structured to reduce repetitive research work and turn source-backed findings into reusable briefs.',
    proof: ['Workflow recording placeholder', 'Prompt/eval notes placeholder', 'Architecture diagram'],
    mermaid: `flowchart LR
  Query[Research Query] --> Planner[Planner Agent]
  Planner --> Search[Retrieval Tools]
  Search --> Sources[Source Store]
  Sources --> Synth[Synthesis Agent]
  Synth --> Verify[Verification Agent]
  Verify --> Report[Brief with Citations]`,
  },
  {
    title: 'Agentic Code Review System',
    stack: ['LangChain', 'Neo4j', 'GitHub API', 'FastAPI'],
    problem:
      'Code review needs repository context, dependency understanding, and issue prioritization beyond single-file comments.',
    role:
      'Built the system design for code graph ingestion, PR analysis, finding generation, and review summaries.',
    impact:
      'Positions AI review as an engineering quality layer, not a generic chatbot over code.',
    proof: ['Repository graph placeholder', 'Review demo placeholder', 'Architecture diagram'],
    mermaid: `flowchart LR
  PR[GitHub PR] --> Ingest[Code Ingestion]
  Ingest --> Graph[Neo4j Code Graph]
  Ingest --> Diff[Diff Analyzer]
  Graph --> Reviewer[Review Agent]
  Diff --> Reviewer
  Reviewer --> Findings[Ranked Findings]
  Findings --> Summary[PR Summary]`,
  },
];

export const clientProjects = [
  {
    name: 'NXTMobility',
    url: 'https://nxtmobility.com',
    linkNote: 'External client link may be temporarily unavailable.',
    role: 'AI & Full Stack Software Developer / Tech Partner',
    problem: 'Mobility teams needed scalable web platforms, admin workflows, and business dashboards.',
    solution: 'Built APIs, dashboards, authentication, RBAC, payment flows, and deployment-ready web systems.',
    stack: ['PHP', 'Laravel', 'Java', 'APIs', 'Dashboards', 'Payments'],
    outcome: 'Production business systems and operational visibility for mobility workflows.',
  },
  {
    name: 'KWICK',
    url: 'https://kwick.in',
    role: 'Platform Builder',
    problem: 'Vehicle rental operations require booking, KYC, payments, and admin oversight.',
    solution: 'Delivered rental workflows, tracking-oriented admin dashboards, and transaction flows.',
    stack: ['Laravel', 'MySQL', 'Payments', 'KYC', 'Admin dashboards'],
    outcome: 'A focused mobility rental platform with customer and admin workflows.',
  },
  {
    name: 'GoRidePE',
    url: 'https://goridepe.com',
    role: 'Full Stack Developer',
    problem: 'EV/mobility business needed a digital platform and workflow system.',
    solution: 'Built web workflows for discovery, booking, authentication, and business operations.',
    stack: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
    outcome: 'Customer-facing platform with operational workflows.',
  },
  {
    name: 'Iconica Globex',
    url: 'https://iconicaglobex.com',
    linkNote: 'External client link may be temporarily unavailable.',
    role: 'Web Platform Developer',
    problem: 'The business needed a credible digital presence and operational web foundation.',
    solution: 'Created business website/platform structure and digital presence workflows.',
    stack: ['Web platform', 'Responsive UI', 'Business workflows'],
    outcome: 'Digital presence and business-facing web platform.',
  },
  {
    name: 'Aiwana Solution',
    url: 'https://aiwanasolution.com',
    role: 'Founder & AI Solutions Architect',
    problem: 'SMBs need more than websites: they need AI-first operating systems and automation.',
    solution: 'Built company positioning and AI/SaaS product ecosystem around HRMS, CRM, ERP, and agents.',
    stack: ['AI strategy', 'SaaS products', 'Enterprise automation'],
    outcome: 'Founder-led AI + IT growth team for business operations.',
  },
  {
    name: 'MSME Guard',
    url: '',
    role: 'AI Product Architect',
    problem: 'MSME compliance workflows need vendor verification, delayed payment exposure, and audit evidence.',
    solution: 'Designed compliance automation for Section 43B(h), Form 3CD support, and evidence packs.',
    stack: ['Compliance automation', 'Document workflows', 'Audit reporting'],
    outcome: 'Proof placeholder ready for screenshots and workflow recordings.',
  },
  {
    name: 'GST Guard Shield',
    url: '',
    role: 'AI Product Architect',
    problem: 'GST workflows need validation, reporting, and risk visibility.',
    solution: 'Designed compliance intelligence workflows for validation and business-risk reporting.',
    stack: ['Compliance intelligence', 'Reporting', 'Validation workflows'],
    outcome: 'Proof placeholder ready for product assets.',
  },
];

export const researchProjects: ResearchProject[] = [
  {
    title: 'AI-Assisted Scam Detection and Notification System',
    slug: 'ai-scam-detection',
    category: 'Published Research',
    note: 'Published research paper in Taylor & Francis / CRC Press.',
    role: 'Built and documented an AI-assisted detection and notification workflow for scam-risk identification.',
    outcome: 'Research credibility signal showing applied AI thinking beyond portfolio demos.',
    stack: ['AI', 'Detection', 'Notification workflows', 'Research publication'],
    proof: ['Published research paper', 'Taylor & Francis / CRC Press', 'Architecture slide'],
    publication: 'Taylor & Francis / CRC Press',
    mermaid: `flowchart LR
  Input[User / Message / Signal] --> Detect[AI Scam Detection]
  Detect --> Features[Risk Features]
  Features --> Score[Threat Score]
  Score --> Notify[Notification Workflow]
  Notify --> User[User Warning]
  Score --> Logs[Evidence Logs]`,
  },
  {
    title: 'Agentic Research Assistant',
    slug: 'agentic-research-assistant',
    category: 'Personal AI Project',
    note: 'Multi-step AI assistant for retrieval, synthesis, verification, and cited reports.',
    role: 'Designed the multi-agent flow for planning, retrieval, synthesis, verification, and cited report generation.',
    outcome: 'Shows ability to convert RAG from simple search into a structured research workflow.',
    stack: ['LangGraph', 'LangChain', 'Qdrant', 'Groq'],
    proof: ['Workflow architecture', 'Demo slot', 'Prompt/eval notes slot'],
    githubUrl: 'https://github.com/Sruwat',
    mermaid: `flowchart LR
  Query[Research Query] --> Planner[Planner Agent]
  Planner --> Search[Retrieval Tools]
  Search --> Sources[Source Store]
  Sources --> Synth[Synthesis Agent]
  Synth --> Verify[Verification Agent]
  Verify --> Report[Cited Research Brief]`,
  },
  {
    title: 'Agentic Code Review System',
    slug: 'agentic-code-review-system',
    category: 'Personal AI Project',
    note: 'Repository-aware review system using graph context and GitHub API workflows.',
    role: 'Designed repository ingestion, code graph context, diff analysis, finding prioritization, and review summaries.',
    outcome: 'Demonstrates AI engineering depth across code intelligence, graph context, and developer tooling.',
    stack: ['LangChain', 'Neo4j', 'GitHub API', 'FastAPI'],
    proof: ['Repository graph architecture', 'Review demo slot', 'GitHub workflow slot'],
    githubUrl: 'https://github.com/Sruwat',
    mermaid: `flowchart LR
  PR[GitHub PR] --> Ingest[Code Ingestion]
  Ingest --> Graph[Neo4j Code Graph]
  Ingest --> Diff[Diff Analyzer]
  Graph --> Reviewer[Review Agent]
  Diff --> Reviewer
  Reviewer --> Findings[Ranked Findings]
  Findings --> Summary[PR Summary]`,
  },
  {
    title: 'Lead Intelligence / Customer Acquisition Automation',
    slug: 'lead-intelligence-automation',
    category: 'Personal Automation Project',
    note: 'AI automation for lead capture, scoring, qualification, follow-up, and CRM updates.',
    role: 'Designed the automation flow for lead intake, scoring, qualification, follow-up, and CRM handoff.',
    outcome: 'Connects AI agents to business growth workflows instead of standalone chat experiences.',
    stack: ['Voice AI', 'CRM automation', 'WhatsApp', 'RAG'],
    proof: ['Automation architecture', 'Voice/chat demo slot', 'CRM handoff slot'],
    mermaid: `flowchart LR
  Lead[Inbound Lead] --> Capture[Lead Capture]
  Capture --> Score[AI Lead Scoring]
  Score --> Qualify[Qualification Agent]
  Qualify --> Follow[WhatsApp / Email Follow-up]
  Follow --> CRM[CRM Update]
  CRM --> Meeting[Meeting / Sales Handoff]`,
  },
];

export const architectureGallery = [
  enterpriseSystems[0],
  {
    title: 'HRMS Multi-Tenant SaaS',
    problem: 'Tenant-aware HR workflows require secure role boundaries and auditable employee actions.',
    role: 'System architect',
    impact: 'Reusable product architecture for HR operations.',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'RBAC', 'AWS'],
    proof: [],
    mermaid: products[0].mermaid,
  },
  {
    title: 'ERP Modular Architecture',
    problem: 'ERP systems need modular domains without losing shared business intelligence.',
    role: 'System architect',
    impact: 'Operational visibility across inventory, purchase, finance, production, and compliance.',
    stack: ['Django', 'React', 'PostgreSQL', 'Workflow automation'],
    proof: [],
    mermaid: products[1].mermaid,
  },
  {
    title: 'CRM Lead Automation',
    problem: 'Lead follow-ups leak when sales teams rely on manual reminders.',
    role: 'AI automation architect',
    impact: 'Automated scoring, follow-up, CRM update, and meeting handoff flow.',
    stack: ['LangChain', 'WhatsApp APIs', 'FastAPI', 'CRM'],
    proof: [],
    mermaid: products[2].mermaid,
  },
  {
    title: 'Voice Bot / Chatbot RAG Architecture',
    problem: 'Support and sales agents need grounded answers plus tool access.',
    role: 'AI automation architect',
    impact: 'One architecture for chat, WhatsApp, voice, CRM, HRMS, ERP, and calendar actions.',
    stack: ['RAG', 'STT/TTS', 'Tool calling', 'WhatsApp', 'CRM APIs'],
    proof: [],
    mermaid: `flowchart LR
  User[User / Caller] --> Channel[Web Chat / WhatsApp / Voice]
  Channel --> STT[STT if Voice]
  STT --> Intent[Intent Detection]
  Channel --> Intent
  Intent --> RAG[RAG Retrieval]
  RAG --> Agent[Tool Calling Agent]
  Agent --> Tools[CRM / HRMS / ERP / Calendar / WhatsApp APIs]
  Tools --> Response[Grounded Response]
  Response --> TTS[TTS if Voice]
  Response --> Analytics[Logs + Analytics]`,
  },
  {
    title: 'AI Agent Tool-Calling Workflow',
    problem: 'Business agents need safe action execution, not just text generation.',
    role: 'Agent workflow architect',
    impact: 'Planner, tool execution, verification, and audit loop.',
    stack: ['LangGraph', 'Tools', 'Guardrails', 'Audit logs'],
    proof: [],
    mermaid: `flowchart LR
  Goal[User Goal] --> Plan[Planner]
  Plan --> Select[Tool Selection]
  Select --> Execute[Execute Tool]
  Execute --> Verify[Verifier]
  Verify -->|Pass| Done[Action Complete]
  Verify -->|Fail| Plan
  Execute --> Audit[Audit Log]`,
  },
  {
    title: 'AWS Deployment Architecture',
    problem: 'Enterprise SaaS needs a deployable, observable, and secure cloud layout.',
    role: 'Cloud implementation lead',
    impact: 'Deployment structure for APIs, databases, storage, and background jobs.',
    stack: ['EC2', 'S3', 'RDS', 'Docker', 'GitHub Actions'],
    proof: [],
    mermaid: `flowchart LR
  GitHub[GitHub Actions] --> Docker[Docker Build]
  Docker --> EC2[AWS EC2]
  EC2 --> API[FastAPI / Django API]
  API --> RDS[(RDS Database)]
  API --> S3[S3 Storage]
  API --> Queue[Background Jobs]
  API --> Logs[Monitoring + Logs]`,
  },
  {
    title: 'Auth / RBAC / Security Flow',
    problem: 'Enterprise workflows need strict role access and auditable actions.',
    role: 'Security flow designer',
    impact: 'RBAC, JWT/OAuth2, API security, and action logs for business systems.',
    stack: ['JWT', 'OAuth2', 'RBAC', 'Audit logs'],
    proof: [],
    mermaid: `flowchart LR
  User[User] --> Login[Login / OAuth2]
  Login --> Token[JWT Session]
  Token --> RBAC[Role Permission Check]
  RBAC --> API[Protected API]
  API --> Action[Business Action]
  Action --> Audit[Audit Log]
  RBAC -->|Denied| Block[Access Denied]`,
  },
];

export const agentUseCases = [
  'Customer Support Agent',
  'Sales Qualification Agent',
  'HR Assistant',
  'Real Estate Lead Agent',
  'Document RAG Chatbot',
  'Voice Bot',
];

export const experience = [
  {
    org: 'Aiwana Solution',
    role: 'Founder & AI Solutions Architect',
    date: 'Apr 2026 - Present',
    detail: 'Building enterprise AI systems, SaaS products, automation agents, and business workflow intelligence.',
  },
  {
    org: 'Recohut Pvt Ltd',
    role: 'AI Engineer & Data Engineer',
    date: 'Feb 2026 - Present',
    detail: 'AI/data engineering across RAG, retrieval, ETL optimization, and production data workflows.',
  },
  {
    org: 'NXTMobility Energy Pvt Ltd',
    role: 'AI & Full Stack Software Developer',
    date: 'Apr 2025 - Feb 2026',
    detail: 'Built mobility platforms, APIs, dashboards, payment flows, authentication, and production workflows.',
  },
  {
    org: 'Galgotias University',
    role: 'B.Tech Computer Science Engineering',
    date: '2021 - 2025',
    detail: 'Computer science foundation with AI, full-stack engineering, and applied product development.',
  },
];

export const techGroups = [
  {
    title: 'AI / Agents',
    items: ['LangChain', 'LangGraph', 'MCP', 'RAG', 'Multi-Agent Systems', 'Prompt Engineering', 'Guardrails', 'OpenAI', 'Anthropic', 'Groq'],
  },
  {
    title: 'Backend',
    items: ['Python', 'FastAPI', 'Django', 'Flask', 'REST APIs', 'Microservices'],
  },
  {
    title: 'Data',
    items: ['Qdrant', 'Neo4j', 'MySQL', 'PostgreSQL', 'MongoDB', 'AWS Glue', 'PySpark'],
  },
  {
    title: 'Cloud',
    items: ['AWS EC2', 'S3', 'Lambda', 'RDS', 'Docker', 'GitHub Actions', 'CI/CD', 'Linux'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'Security',
    items: ['RBAC', 'OAuth2', 'JWT', 'API Security', 'Audit Logging', 'Responsible AI'],
  },
];

export const contactLinks: Link[] = [
  { label: 'Email', href: 'mailto:shankranand332@gmail.com' },
  { label: 'Phone', href: 'tel:+916203447902' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shankranand-sarswati-53b65622b' },
  { label: 'GitHub', href: 'https://github.com/Sruwat' },
  { label: 'Portfolio', href: 'https://advance-portfolio-phi.vercel.app/' },
];
