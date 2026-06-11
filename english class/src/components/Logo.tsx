import React, { useState } from "react";

interface LogoProps {
  className?: string; // class for the logo graphic
  showText?: boolean;
  darkBackground?: boolean;
}

export default function Logo({ className = "h-12 w-12", showText = true, darkBackground = false }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`relative ${className} flex-shrink-0 flex items-center justify-center`}>
        {/* We attempt to load the official uploaded image first */}
        {!imageError ? (
          <img
            src="/input_file_0.png"
            alt="Success English Classes Logo"
            className="w-full h-full object-contain rounded-full"
            onError={() => setImageError(true)}
          />
        ) : (
          /* High-fidelity Vector SVG replica of the thumbs-up + colorful circular badges logo */
          <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center shadow-sm p-1">
            {/* Colorful Outer Rotating Segments (Matches yellow, pink, blue, tech lines) */}
            <svg
              className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Yellow segment */}
              <path
                d="M 50 4 A 46 46 0 0 1 92 30"
                stroke="#EAB308"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Pink/Coral segment */}
              <path
                d="M 96 50 A 46 46 0 0 1 70 92"
                stroke="#EC4899"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Blue/Cyan segment */}
              <path
                d="M 50 96 A 46 46 0 0 1 8 70"
                stroke="#06B6D4"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Purple/Blue/Aqua segment */}
              <path
                d="M 4 50 A 46 46 0 0 1 30 8"
                stroke="#3B82F6"
                strokeWidth="6"
                strokeLinecap="round"
              />
              
              {/* Burst tech-lines offsets */}
              <line x1="8" y1="30" x2="16" y2="34" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="92" y1="30" x2="84" y2="34" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="15" y1="78" x2="22" y2="72" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="85" y1="78" x2="78" y2="72" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
            </svg>

            {/* Inner Thumbs up graphical area */}
            <div className="z-10 bg-slate-50 w-4/5 h-4/5 rounded-full flex items-center justify-center border border-slate-100">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-amber-700/80 fill-none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-display font-extrabold text-[15px] sm:text-lg leading-none tracking-tight uppercase ${darkBackground ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
            Success English Classes
          </span>
          <span className={`text-[10px] uppercase font-bold tracking-widest leading-none mt-1 ${darkBackground ? 'text-sky-300 opacity-80' : 'text-sky-600 dark:text-sky-400'}`}>
            Online Learning Excellence • Est. 2019
          </span>
        </div>
      )}
    </div>
  );
}
