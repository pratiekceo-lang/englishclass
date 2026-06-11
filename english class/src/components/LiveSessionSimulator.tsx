import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  BookOpen,
  Volume2,
  Users,
  Mic,
  ArrowRight,
  UserCheck,
  Award
} from "lucide-react";

// Types for Simulator
interface PresetAnswer {
  label: string;
  type: "weak" | "mid" | "elite";
  text: string;
  fluencyScore: number;
  estBand: string;
  originalTextMarked: React.ReactNode;
  grammarFix: React.ReactNode;
  synonyms: Array<{ word: string; replace: string }>;
  coachTip: string;
}

interface Scenario {
  id: string;
  title: string;
  badge: string;
  question: string;
  role: string;
  tutorSpeech: string;
  presets: PresetAnswer[];
}

export default function LiveSessionSimulator() {
  const scenarios: Scenario[] = [
    {
      id: "ielts",
      title: "IELTS Candidate Assessment",
      badge: "IELTS Cue Card Q1",
      question: "Could you describe some of your favorite recreational activities during your weekly leisure hours?",
      role: "Speaking Examiner / Head Coach",
      tutorSpeech: "Hello there! Let's kick off your active speaking test. Try answering: 'Could you describe some of your favorite recreational activities during your weekly leisure hours?' Let's see your fluency level.",
      presets: [
        {
          label: "Attempt A: Weak Response (Stuttering & Fillers - Band 5.0)",
          type: "weak",
          text: "I like to playing computer games... uh... It is make me feel very happy after work... um... because my job is very hard, you know.",
          fluencyScore: 45,
          estBand: "Band 5.0",
          originalTextMarked: (
            <span>
              "I like <span className="bg-rose-500/25 px-1 py-0.5 rounded text-rose-350 line-through">to playing</span> computer games... <span className="bg-amber-500/25 px-1.5 py-0.5 rounded text-amber-300 font-bold">uh</span>... It <span className="bg-rose-500/25 px-1 py-0.5 rounded text-rose-350 line-through">is make</span> me feel <span className="bg-indigo-500/25 px-1 py-0.5 rounded text-indigo-300">very happy</span> after work... <span className="bg-amber-500/25 px-1.5 py-0.5 rounded text-amber-300 font-bold">um</span>... because my job is <span className="bg-indigo-500/25 px-1 py-0.5 rounded text-indigo-300">very hard</span>, <span className="bg-amber-500/25 px-1.5 py-0.5 rounded text-amber-300 font-bold">you know</span>."
            </span>
          ),
          grammarFix: (
            <div className="space-y-1 text-slate-300 text-xs">
              <p>&bull; Replace <code className="text-rose-400">to playing</code> with <code className="text-emerald-400 font-semibold">playing</code> or <code className="text-emerald-400 font-semibold">to play</code>.</p>
              <p>&bull; Replace <code className="text-rose-400">is make me</code> with <code className="text-emerald-400 font-semibold">makes me</code> (simple present third-person conjugation).</p>
            </div>
          ),
          synonyms: [
            { word: "very happy", replace: "exhilarated / immensely relieved" },
            { word: "very hard", replace: "demanding / physically and mentally grueling" }
          ],
          coachTip: "Avoid appending lazy discourse markers like 'you know' or 'etc.' in professional speaking rounds! It indicates to writing and speaking examiners that your active vocabulary has reached a biological end-point. Instead of voicing audio gaps with 'uh' or 'um', train your throat to hold silent breathing pauses."
        },
        {
          label: "Attempt B: Average Response (Repetitive structure - Band 6.5)",
          type: "mid",
          text: "In my free time, I usually play video games and read science books. It is good for mind relaxation.",
          fluencyScore: 70,
          estBand: "Band 6.5",
          originalTextMarked: (
            <span>
              "In my <span className="bg-indigo-500/20 px-1 text-indigo-300">free time</span>, I usually play video games and read science <span className="bg-indigo-500/20 px-1 text-indigo-300">books</span>. It is good for mind <span className="bg-rose-500/25 px-1 rounded text-rose-350 line-through">relaxation</span>."
            </span>
          ),
          grammarFix: (
            <div className="space-y-1 text-slate-300 text-xs">
              <p>&bull; Re-phrase <code className="text-rose-400">mind relaxation</code> to <code className="text-emerald-400 font-semibold">relaxing my mind</code> or <code className="text-emerald-450 font-semibold">acts as an effective form of mental decompression</code>.</p>
            </div>
          ),
          synonyms: [
            { word: "free time", replace: "recreational hours / leisure windows" },
            { word: "books", replace: "fictional and historical literature" }
          ],
          coachTip: "Your sentence structures are grammatically correct but highly formulaic. To cross into a Band 7.5+, we must inject compound structures using subordinate conjunctions ('whilst doing x, I also find myself...')."
        },
        {
          label: "Attempt C: Elite Performance (Commanding English - Band 8.5+)",
          type: "elite",
          text: "I primarily indulge in strategic gaming sessions and immersive literature, which serves as a vital counterweight to my demanding corporate schedule.",
          fluencyScore: 98,
          estBand: "Band 8.5",
          originalTextMarked: (
            <span>
              "I <span className="text-emerald-400 font-bold">primarily indulge</span> in <span className="text-emerald-400 font-bold">strategic gaming sessions</span> and <span className="text-emerald-400 font-bold">immersive literature</span>, which serves as a <span className="text-emerald-400 font-bold">vital counterweight</span> to my <span className="text-emerald-400 font-bold">demanding corporate schedule</span>."
            </span>
          ),
          grammarFix: (
            <div className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Perfect syntactic architecture and vocabulary placement. No corrections needed!
            </div>
          ),
          synonyms: [],
          coachTip: "Fantastic lexical richness! Words like 'indulge', 'vital counterweight', and 'demanding corporate schedule' demonstrate native-equivalent linguistic control. This commands respect and signals instant professional executive capability."
        }
      ]
    },
    {
      id: "corporate",
      title: "IT Lead Placement Drill",
      badge: "Tech Interview Round",
      question: "Can you introduce yourself and explain why you're looking for a change?",
      role: "MNC Lead Interviewer",
      tutorSpeech: "Welcome! To tailor your transition to our team, please provide a brief synopsis: 'Can you introduce yourself and explain why you're looking for a change?' Keep it professional.",
      presets: [
        {
          label: "Attempt A: Avoidance & Salary Grievances (Common Blunder)",
          type: "weak",
          text: "My name is Pratik... actually I have 4 years experience in Java. I looking for a change because my current company is not paying good salary and workload is too much.",
          fluencyScore: 38,
          estBand: "Needs Polish",
          originalTextMarked: (
            <span>
              "My name is Pratik... <span className="bg-amber-500/25 px-1.5 py-0.5 rounded text-amber-300 font-bold">actually</span> I have 4 years <span className="bg-rose-500/25 px-1 py-0.5 rounded text-rose-350 line-through">experience</span> in Java. I <span className="bg-rose-500/25 px-1 py-0.5 rounded text-rose-350 line-through">looking</span> for a change <span className="bg-rose-500/25 px-1 py-0.5 rounded text-rose-350 line-through">because my current company is not paying good salary</span>."
            </span>
          ),
          grammarFix: (
            <div className="space-y-1 text-slate-300 text-xs">
              <p>&bull; Replace <code className="text-rose-400">4 years experience</code> with <code className="text-emerald-400 font-semibold">four years of professional experience</code>.</p>
              <p>&bull; Replace <code className="text-rose-400">I looking</code> with the missing auxiliary <code className="text-emerald-400 font-semibold">I am looking</code> or <code className="text-emerald-400 font-semibold">I have been looking</code>.</p>
              <p>&bull; Redact complaints regarding compensation and workload; reframe completely.</p>
            </div>
          ),
          synonyms: [
            { word: "current company is not paying good", replace: "to seek growth opportunities that fully leverage and align with my capabilities" },
            { word: "workload is too much", replace: "seeking a more collaborative and structurally mature ecosystem" }
          ],
          coachTip: "Crucial rule in HR/Technical Speaking: Never highlight poor compensation or badmouth your present employer in your introduction! It immediately labels you as a flight risk. Frame your change around career projection, technical challenge, and organizational scaling."
        },
        {
          label: "Attempt B: Premium Tech Lead Delivery (Ivan's Blueprint)",
          type: "elite",
          text: "Over the past four years, I have spearheaded scalable backend microservices built on Java. I am currently keen to navigate toward an organization where I can align robust technical strategy with team leadership.",
          fluencyScore: 96,
          estBand: "Hire Core Lead",
          originalTextMarked: (
            <span>
              "Over the past four years, I have <span className="text-emerald-400 font-bold">spearheaded scalable backend microservices</span>. I am currently keen to <span className="text-emerald-400 font-bold">navigate toward an organization</span> where I can <span className="text-emerald-400 font-bold">align robust technical strategy</span> with team leadership."
            </span>
          ),
          grammarFix: (
            <div className="text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Highly authoritative professional presence. Perfect syntax structure.
            </div>
          ),
          synonyms: [],
          coachTip: "Excellent representation. This delivery positions you as a progressive solver rather than a transient job-seeker. Strong verbs like 'spearheaded' and 'navigate' project direct leadership competence."
        }
      ]
    },
    {
      id: "fillers",
      title: "Active Hesitation Assessment",
      badge: "Fluency Flow Test",
      question: "Could you share what did you do or accomplish yesterday?",
      role: "Fluency Coach Ivan",
      tutorSpeech: "Hey there! In my online 1-on-1 sessions, we tackle mental stuttering from day one. Tell me: 'What did you do or accomplish yesterday?' Be mindful of filler words.",
      presets: [
        {
          label: "Attempt A: Cognitive Stalling with Heavy Fillers",
          type: "weak",
          text: "Yesterday... uh... I woke up late... like... at 9 AM, and then, you know, I did did some coding work... um... and after that I met a friend.",
          fluencyScore: 32,
          estBand: "Stuttering Heavy",
          originalTextMarked: (
            <span>
              "Yesterday... <span className="bg-amber-500/25 px-1.5 py-0.5 rounded text-amber-300 font-bold">uh</span>... I woke up late... <span className="bg-amber-500/25 px-1.5 py-0.5 rounded text-amber-300 font-bold">like</span>... at 9 AM, and then, <span className="bg-amber-500/25 px-1.5 py-0.5 rounded text-amber-300 font-bold">you know</span>, I <span className="bg-rose-500/25 px-1 py-0.5 rounded text-rose-355 line-through">did did</span> some coding... <span className="bg-amber-500/25 px-1.5 py-0.5 rounded text-amber-300 font-bold">um</span>... and met a friend."
            </span>
          ),
          grammarFix: (
            <div className="space-y-1 text-slate-300 text-xs">
              <p>&bull; Clear stuttering repeat <code className="text-rose-450">did did</code>.</p>
              <p>&bull; Avoid stalling sounds ('uh', 'um', 'like', 'you know') which instantly decrease speaking coherence by 40%.</p>
            </div>
          ),
          synonyms: [
            { word: "woke up", replace: "commenced my morning" },
            { word: "did some coding", replace: "completed key programming tasks" }
          ],
          coachTip: "Stuttering happens when your mouth runs faster than your thoughts, or your brain is translating from your native language to English in real time. We train you to map ideas, use pre-assembled visual templates, and hold natural silent pauses instead of expressing 'verbal garbage' like uh, um, or like."
        }
      ]
    }
  ];

  // Selected scenario
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0]);
  const [selectedPreset, setSelectedPreset] = useState<PresetAnswer | null>(null);
  
  // Custom user text input
  const [customText, setCustomText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [customAnalysis, setCustomAnalysis] = useState<PresetAnswer | null>(null);

  // Soundwave animation states
  const [tutorSpeaking, setTutorSpeaking] = useState(true);

  // Trigger scenario switch
  const handleScenarioChange = (s: Scenario) => {
    setActiveScenario(s);
    setSelectedPreset(null);
    setCustomText("");
    setCustomAnalysis(null);
    setTutorSpeaking(true);
  };

  // Turn off tutor speaking after 3 seconds for mock realism
  useEffect(() => {
    if (tutorSpeaking) {
      const timer = setTimeout(() => {
        setTutorSpeaking(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [tutorSpeaking, activeScenario]);

  // Handle Preset Choice
  const handlePresetSelect = (preset: PresetAnswer) => {
    setCustomAnalysis(null);
    setSelectedPreset(preset);
    setTutorSpeaking(false);
  };

  // Analyze Custom Text Input
  const triggerCustomAnalysis = () => {
    if (!customText.trim()) return;
    setSelectedPreset(null);
    setIsAnalyzing(true);
    setAnalysisStep(0);

    // Simulate multi-step elite analyzer
    const steps = [1, 2, 3];
    steps.forEach((step, i) => {
      setTimeout(() => {
        setAnalysisStep(step);
        if (step === 3) {
          // Rule-based custom analyzer
          const text = customText.toLowerCase();
          
          // Detect fillers
          const fillerMatches: string[] = [];
          if (text.includes("uh")) fillerMatches.push("uh");
          if (text.includes("um")) fillerMatches.push("um");
          if (text.includes("like")) fillerMatches.push("like");
          if (text.includes("you know")) fillerMatches.push("you know");
          if (text.includes("actually")) fillerMatches.push("actually");
          if (text.includes("basically")) fillerMatches.push("basically");

          // Calculate a realistic fluency score
          let score = 85; 
          if (fillerMatches.length > 0) score -= fillerMatches.length * 15;
          if (customText.length < 25) score -= 25; // too short
          
          // Ensure min score is 30, max is 95 unless it is extremely neat
          score = Math.max(30, Math.min(score, 95));

          // Mock band score mapping
          let band = "Band 7.5";
          if (score < 40) band = "Band 4.5 / 5.0";
          else if (score < 60) band = "Band 5.5";
          else if (score < 75) band = "Band 6.5";
          else if (score < 90) band = "Band 7.5";
          else band = "Band 8.0+";

          // Grammar flag representation
          const originalTextMarked = (
            <span>
              "{customText.split(" ").map((word, i) => {
                const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
                const isFiller = ["uh", "um", "like", "actually", "basically"].includes(cleanWord);
                if (isFiller) {
                  return (
                    <span key={i} className="bg-amber-500/25 px-1 rounded text-amber-300 font-bold mx-0.5">
                      {word}{" "}
                    </span>
                  );
                }
                const isBasic = ["good", "bad", "happy", "hard", "job"].includes(cleanWord);
                if (isBasic) {
                  return (
                    <span key={i} className="bg-indigo-550/25 px-1 rounded text-indigo-300 mx-0.5 underline decoration-indigo-400">
                      {word}{" "}
                    </span>
                  );
                }
                return word + " ";
              })}"
            </span>
          );

          // Custom feedback setup
          const resultAnalysis: PresetAnswer = {
            label: "Custom Assessment Result",
            type: score < 55 ? "weak" : score < 80 ? "mid" : "elite",
            text: customText,
            fluencyScore: score,
            estBand: band,
            originalTextMarked: originalTextMarked,
            grammarFix: (
              <div className="space-y-1 text-slate-300 text-xs">
                {fillerMatches.length > 0 ? (
                  <p>&bull; Redact the following fillers: <span className="text-amber-400 font-bold">{fillerMatches.join(", ")}</span>. These block your pacing and reduce overall professional impact.</p>
                ) : (
                  <p>&bull; Great control! You avoided high-frequency acoustic filler syllables.</p>
                )}
                {customText.length < 35 && (
                  <p>&bull; Response is slightly concise. Try to extend answers with structured arguments (Opinion &rarr; Reason &rarr; Concrete Example).</p>
                )}
              </div>
            ),
            synonyms: [
              { word: "good / fine", replace: "exemplary / highly constructive" },
              { word: "hard / difficult", replace: "formidable / steep learning curve" },
              { word: "job / work", replace: "professional commitments / vocational focus" }
            ],
            coachTip: `Your custom answer contains ${customText.split(" ").length} words. A perfect 1-on-1 strategy requires analyzing pronunciation, breath mechanics, and syllable patterns. To master this exact topic, we would record your voice, map visual speech blocks, and replace any repetitive templates you used in high-pressure conversations.`
          };

          setCustomAnalysis(resultAnalysis);
          setIsAnalyzing(false);
        }
      }, (i + 1) * 600);
    });
  };

  const currentResult = selectedPreset || customAnalysis;

  return (
    <div className="w-full bg-slate-950 border border-slate-800/80 rounded-[32px] overflow-hidden text-white flex flex-col h-[520px] shadow-2xl relative">
      {/* GLOW ENHANCEMENTS */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER SECTION METADATA */}
      <div className="bg-slate-900/60 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-slate-405 uppercase font-bold">
            Live coaching simulator
          </span>
        </div>
        
        {/* Scenario Selection Buttons */}
        <div className="flex gap-1.5 overflow-x-auto select-none no-scrollbar py-1">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => handleScenarioChange(s)}
              className={`py-1 px-2.5 text-[9px] sm:text-[10px] font-extrabold rounded-full transition-all border whitespace-nowrap cursor-pointer ${
                activeScenario.id === s.id
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-xs"
                  : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {s.id === "ielts" && "IELTS Drill"}
              {s.id === "corporate" && "IT Interview"}
              {s.id === "fillers" && "Filler Check"}
            </button>
          ))}
        </div>
      </div>

      {/* CORE SIMULATOR SPLIT-SCREEN LAYOUT */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden z-10">
        
        {/* LEFT COMPONENT: TUTOR VIDEO CALL EMULATOR (5 columns) */}
        <div className="md:col-span-5 bg-slate-950 p-4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800/80 h-[180px] md:h-auto">
          
          {/* Active Header inside video area */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[9px] tracking-wider uppercase font-bold text-slate-400 font-mono">TUTOR: ATHARVA (IVAN)</span>
            </div>
            <div className="bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800 text-[9px] text-slate-350">
              {activeScenario.badge}
            </div>
          </div>

          {/* Coach Avatar, Speaking State and Waveform */}
          <div className="flex flex-col items-center justify-center py-2 md:py-6">
            <div className="relative">
              {/* Outer wave rings if speaking */}
              {tutorSpeaking && (
                <>
                  <span className="absolute inset-0 rounded-full bg-indigo-500/25 animate-ping" />
                  <span className="absolute inset-2 rounded-full bg-violet-500/10 animate-pulse" />
                </>
              )}
              {/* Actual Avatar Frame */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-0.5 bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center overflow-hidden border-2 border-slate-900 shadow-xl relative z-10">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-display font-black text-xl text-white">
                  AN
                </div>
              </div>
              
              {/* Mic Icon indicator */}
              <div className={`absolute bottom-0 right-0 p-1 rounded-full border border-slate-900 shadow-md ${
                tutorSpeaking ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-505"
              } z-20`}>
                <Mic className="h-3 w-3" />
              </div>
            </div>

            {/* Simulated Animated Sound Wave */}
            <div className="flex gap-0.5 items-center justify-center h-4 mt-3 select-none">
              {[...Array(12)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={tutorSpeaking ? {
                    scaleY: [1, Math.random() * 2.8 + 1, 1],
                  } : { scaleY: 1 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.45 + i * 0.05,
                    ease: "easeInOut"
                  }}
                  className={`w-0.5 rounded-full ${tutorSpeaking ? "bg-indigo-400" : "bg-slate-800"} h-2.5`}
                  style={{ transformOrigin: "center" }}
                />
              ))}
            </div>
          </div>

          {/* Dialog bubble representing Tutor speech */}
          <div className="bg-slate-900/70 border border-slate-850 p-2 rounded-xl text-left">
            <p className="text-[10px] leading-relaxed text-slate-300 font-mono line-clamp-2 md:line-clamp-none">
              <span className="text-indigo-400 font-bold font-sans">Atharva: </span>
              "{activeScenario.tutorSpeech}"
            </p>
          </div>
        </div>

        {/* RIGHT COMPONENT: INTERACTIVE RESPONSE PLAYGROUND (7 columns) */}
        <div className="md:col-span-7 bg-slate-900/25 p-4 flex flex-col justify-between overflow-y-auto max-h-[340px] md:max-h-none">
          
          <AnimatePresence mode="wait">
            {!currentResult && !isAnalyzing ? (
              // STEP 1: CHOICE INTERFACE (Select Answer or custom write)
              <motion.div
                key="step-select"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 flex flex-col justify-between h-full"
              >
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    How would you answer? Select a Preset Attempt:
                  </h3>
                  
                  {/* Preset Answer Option list */}
                  <div className="space-y-2">
                    {activeScenario.presets.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePresetSelect(preset)}
                        className={`w-full p-2.5 text-left border rounded-xl transition duration-200 cursor-pointer flex gap-2 items-start justify-between ${
                          preset.type === "weak"
                            ? "bg-slate-950/20 hover:bg-rose-950/10 border-slate-850 hover:border-rose-900/40 text-slate-300"
                            : preset.type === "mid"
                            ? "bg-slate-950/20 hover:bg-amber-950/10 border-slate-850 hover:border-amber-900/40 text-slate-300"
                            : "bg-indigo-950/10 hover:bg-indigo-955/20 border-slate-850 hover:border-indigo-800/40 text-slate-200"
                        }`}
                      >
                        <div className="flex-1">
                          <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded mr-2 ${
                            preset.type === "weak"
                              ? "bg-rose-500/10 text-rose-350 border border-rose-900/30"
                              : preset.type === "mid"
                              ? "bg-amber-500/10 text-amber-300 border border-amber-900/30"
                              : "bg-indigo-600/20 text-indigo-300 border border-indigo-700/30"
                          }`}>
                            {preset.type === "weak" && "Weak / Stuttered"}
                            {preset.type === "mid" && "Average Grammar"}
                            {preset.type === "elite" && "Elite Speaker"}
                          </span>
                          <p className="text-[11px] leading-relaxed mt-1 text-slate-300 italic truncate max-w-[340px]">
                            &ldquo;{preset.text}&rdquo;
                          </p>
                        </div>
                        <Play className="h-3.5 w-3.5 text-indigo-400 mt-1 cursor-pointer flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* CUSTOM USER TEXT BOX INTEGRATION */}
                <div className="border-t border-slate-800/85 pt-3 mt-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Or type your own spoken answer:
                    </label>
                    <span className="text-[9px] text-indigo-400 font-mono bg-indigo-500/10 px-1.5 py-0.2 rounded font-semibold">
                      Smart assessment check
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., I love playing football with my colleagues because..."
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") triggerCustomAnalysis();
                      }}
                      className="flex-1 bg-slate-950 hover:bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-sans"
                    />
                    <button
                      onClick={triggerCustomAnalysis}
                      disabled={!customText.trim()}
                      className="bg-indigo-650 hover:bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-505 disabled:border-transparent text-white px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer flex-shrink-0"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Check
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : isAnalyzing ? (
              // STEP 2: LOADING ANALYZER MODE
              <motion.div
                key="step-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <div className="relative mb-4">
                  <span className="absolute -inset-1 rounded-full bg-indigo-500/20 blur-sm animate-pulse" />
                  <div className="h-12 w-12 rounded-full border-2 border-indigo-600 border-t-white animate-spin flex items-center justify-center z-10" />
                </div>
                
                <h4 className="text-sm font-bold text-white mb-1">
                  {analysisStep === 1 && "Processing speech metrics..."}
                  {analysisStep === 2 && "Analyzing filler densities..."}
                  {analysisStep === 3 && "Injecting Ivan's corrections..."}
                </h4>
                
                <p className="text-[10px] text-slate-400 max-w-xs leading-normal">
                  Our algorithm is auditing basic vocabulary choices and syntactic flaws.
                </p>
                
                {/* Visual loading bar */}
                <div className="w-40 bg-slate-950 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full transition-all duration-300"
                    style={{ width: `${(analysisStep / 3) * 100}%` }}
                  />
                </div>
              </motion.div>
            ) : (
              // STEP 3: DETAILED CRITIQUE ASSESSMENT VISUALIZER
              <motion.div
                key="step-critique"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-4 flex flex-col justify-between h-full"
              >
                <div className="space-y-3.5">
                  
                  {/* Result Header, Est Score and Retry Button */}
                  <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded-md ${
                        currentResult?.type === "weak" ? "bg-rose-500/10 text-rose-400" :
                        currentResult?.type === "mid" ? "bg-amber-500/10 text-amber-300" :
                        "bg-emerald-500/10 text-emerald-400"
                      }`}>
                        <div className="text-[10px] font-bold font-mono">EST BAND</div>
                      </div>
                      <span className="text-sm font-display font-black text-white">
                        {currentResult?.estBand}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Fluency score percentage */}
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold leading-none">Fluency</span>
                        <span className="text-indigo-400 font-black text-xs font-mono">{currentResult?.fluencyScore}%</span>
                      </div>

                      {/* Retry */}
                      <button
                        onClick={() => {
                          setSelectedPreset(null);
                          setCustomAnalysis(null);
                          setCustomText("");
                          setTutorSpeaking(true);
                        }}
                        className="p-1 px-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-[10px] font-extrabold flex items-center gap-1 text-slate-300 hover:text-white transition cursor-pointer"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Retry
                      </button>
                    </div>
                  </div>

                  {/* Highlighted original text overlay */}
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850 text-[11px] leading-relaxed italic text-slate-350">
                    {currentResult?.originalTextMarked}
                  </div>

                  {/* Grammar Analysis Columns */}
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5 text-rose-500" />
                      Live Error Repairs (Grammar Audit):
                    </h4>
                    <div className="p-2.5 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                      {currentResult?.grammarFix}
                    </div>
                  </div>

                  {/* Synonym Upgrades */}
                  {currentResult?.synonyms && currentResult.synonyms.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Award className="h-3.5 w-3.5 text-indigo-400" />
                        Tutor's Vocabulary Upgrades (Command Enhancements):
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 p-2 bg-slate-950 border border-slate-850 rounded-xl">
                        {currentResult.synonyms.map((s, i) => (
                          <div key={i} className="text-[10px] flex gap-1.5 items-center bg-slate-900/60 p-1 px-1.5 rounded border border-slate-850">
                            <span className="text-rose-450 line-through truncate max-w-[80px]">{s.word}</span>
                            <ArrowRight className="h-2.5 w-2.5 text-slate-500 flex-shrink-0" />
                            <span className="text-emerald-450 font-bold truncate max-w-[150px]">{s.replace}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Coach Ivan Tip */}
                  <div className="text-[10px] italic leading-normal text-indigo-305 flex gap-2 items-start bg-indigo-950/15 p-2 rounded-xl border border-indigo-950/30">
                    <Sparkles className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold font-sans not-italic block text-indigo-300">Ivan's Personal Strategy Tip:</span>
                      &ldquo;{currentResult?.coachTip}&rdquo;
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>

      </div>

      {/* FOOTER CALL-TO-ACTION TRIVIA */}
      <div className="bg-slate-900/40 border-t border-slate-850 px-4 sm:px-6 py-2.5 flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 z-10 select-none">
        <span className="flex items-center gap-1 text-slate-350">
          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500" />
          Real correction loops happen in 1-on-1 calls.
        </span>
        <span className="text-indigo-400 font-extrabold uppercase">
          7:00 AM – 11:00 PM Active Matches
        </span>
      </div>
    </div>
  );
}
