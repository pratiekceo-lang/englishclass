import React, { useState } from "react";
import { GraduationCap, ArrowRight, Share2, Sparkles, CheckCircle } from "lucide-react";

export default function IeltsCalculator() {
  const [listening, setListening] = useState<number>(6.5);
  const [reading, setReading] = useState<number>(6.0);
  const [writing, setWriting] = useState<number>(5.5);
  const [speaking, setSpeaking] = useState<number>(6.0);

  // IELTS Rounding Logic
  // Average is calculated by dividing total sum by 4.
  // Rounded up or down to the nearest half band.
  // If average ends in .25, it rounds up to .5
  // If average ends in .75, it rounds up to the next whole band.
  // Otherwise, if average ends in < .25 it rounds down to .0, if >= .25 and < .75 it rounds to .5, if >= .75 rounds to .0 of next
  const calculateOverallBand = (l: number, r: number, w: number, s: number): number => {
    const sum = l + r + w + s;
    const average = sum / 4;
    const decimal = average - Math.floor(average);

    if (decimal < 0.25) {
      return Math.floor(average);
    } else if (decimal >= 0.25 && decimal < 0.75) {
      return Math.floor(average) + 0.5;
    } else {
      return Math.floor(average) + 1.0;
    }
  };

  const overallBand = calculateOverallBand(listening, reading, writing, speaking);

  const getTargetAdvice = (score: number) => {
    if (score >= 8.0) {
      return {
        level: "Expert Speaker (C2 equivalent)",
        advice: "Outstanding! You are ready for elite universities or executive roles in major English speaking nations. Success English Classes can help you maintain this with premium 1-to-1 mock setups.",
        color: "text-emerald-600 bg-emerald-50 border-emerald-200"
      };
    } else if (score >= 7.0) {
      return {
        level: "Good User (C1 equivalent)",
        advice: "Great! You satisfy the requirement (> Band 7.0) for most top-tier international educational institutions and overseas employment. At SUCCESS ENGLISH CLASSES, we've helped 300+ students secure this score!",
        color: "text-indigo-700 bg-indigo-50 border-indigo-200"
      };
    } else if (score >= 6.0) {
      return {
        level: "Competent User (B2 equivalent)",
        advice: "Strong base, but many global universities demand at least Band 6.5 or 7.0 overall with no section below 6.0. Secure your desired score through our personalized IELTS course.",
        color: "text-amber-600 bg-amber-50 border-amber-200"
      };
    } else {
      return {
        level: "Modest User (B1 equivalent)",
        advice: "You require structured booster training. We recommend starting with our Grammar and Spoken English foundation, then entering our intensive IELTS coaching track for optimal results.",
        color: "text-rose-600 bg-rose-50 border-rose-200"
      };
    }
  };

  const bandOptions = [
    1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0
  ];

  const advice = getTargetAdvice(overallBand);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden" id="ielts-calculator">
      {/* Header Accent */}
      <div className="bg-gradient-to-r from-indigo-700 to-violet-850 px-6 py-5 text-white flex items-center gap-3">
        <div className="p-2 bg-white/10 rounded-xl">
          <GraduationCap className="h-6 w-6 text-indigo-100" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg leading-tight text-white">
            IELTS Band Score Calculator
          </h3>
          <p className="text-xs text-indigo-200">
            Estimate your overall band score using IELTS official rounding rule
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sliders Area */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-4">
            {/* Listening */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Listening band
                </span>
                <span className="text-sm font-bold font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  Band {listening.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="3.0"
                max="9.0"
                step="0.5"
                value={listening}
                onChange={(e) => setListening(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] font-medium text-slate-400 px-1 mt-1">
                <span>Band 3.0</span>
                <span>Band 6.0</span>
                <span>Band 9.0</span>
              </div>
            </div>

            {/* Reading */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Reading band
                </span>
                <span className="text-sm font-bold font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  Band {reading.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="3.0"
                max="9.0"
                step="0.5"
                value={reading}
                onChange={(e) => setReading(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] font-medium text-slate-400 px-1 mt-1">
                <span>Band 3.0</span>
                <span>Band 6.0</span>
                <span>Band 9.0</span>
              </div>
            </div>

            {/* Writing */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                  Writing band
                </span>
                <span className="text-sm font-bold font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  Band {writing.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="3.0"
                max="9.0"
                step="0.5"
                value={writing}
                onChange={(e) => setWriting(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] font-medium text-slate-400 px-1 mt-1">
                <span>Band 3.0</span>
                <span>Band 6.0</span>
                <span>Band 9.0</span>
              </div>
            </div>

            {/* Speaking */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  Speaking band
                </span>
                <span className="text-sm font-bold font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  Band {speaking.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="3.0"
                max="9.0"
                step="0.5"
                value={speaking}
                onChange={(e) => setSpeaking(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] font-medium text-slate-400 px-1 mt-1">
                <span>Band 3.0</span>
                <span>Band 6.0</span>
                <span>Band 9.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Circular Area */}
        <div className="md:col-span-5 bg-slate-50/50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-between items-center text-center">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
              Your overall score
            </span>
            
            <div className="relative flex items-center justify-center my-2">
              <div className="absolute w-28 h-28 rounded-full border-4 border-indigo-100 animate-pulse"></div>
              <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex flex-col items-center justify-center shadow-lg shadow-indigo-600/35">
                <span className="text-3xl font-display font-extrabold leading-none">
                  {overallBand.toFixed(1)}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-200 mt-1">
                  Overall band
                </span>
              </div>
            </div>

            <div className={`text-xs font-bold px-3 py-1 rounded-full border inline-block ${advice.color}`}>
              {advice.level}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mb-4">
              {advice.advice}
            </p>

            <a
              href="#contact-section"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition duration-250 cursor-pointer shadow-md shadow-slate-900/10"
            >
              Contact IELTS Expert Atharva
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
