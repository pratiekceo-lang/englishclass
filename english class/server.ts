import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // Store contact submissions in-memory
  const bookings: any[] = [];

  // API endpoints
  app.post("/api/contact", (req, res) => {
    try {
      const { name, phone, course, message } = req.body;
      if (!name || !phone || !course) {
        return res.status(400).json({ error: "Name, phone, and course are required fields." });
      }
      const newBooking = {
        id: Date.now(),
        name,
        phone,
        course,
        message: message || "",
        createdAt: new Date().toISOString(),
      };
      bookings.push(newBooking);
      console.log("New booking registered:", newBooking);
      return res.status(201).json({
        success: true,
        message: "Thank you! Your seat registration/consultation request has been booked successfully. Our experts will contact you on WhatsApp/Call within 24 hours.",
        booking: newBooking
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/contact", (req, res) => {
    return res.json({ bookings });
  });

  // AI English Assistant Endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    const { message, history, mode } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Gemini API key is missing. Please make sure the administrator has configured the GEMINI_API_KEY secret in the Secrets panel."
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      let systemInstruction = `You are "Ivan's AI Assistant" – the official AI English Coach at SUCCESS ENGLISH CLASSES (founded in 2019 by Atharva Naik / Ivan, featuring a team of 21+ elite trainers).
The institute specializes in Spoken English, IELTS Preparation (where over 300+ students achieved Band 7+ and went abroad), Interview Preparation (over 250+ IT Professionals empowered to secure jobs), Personality Development, Business English, Grammar, and Public Speaking.

We train Children (6+ years), Students, Working Professionals, Homemakers, and Senior Citizens in One-to-One Personal Training sessions between 7:00 AM and 11:00 PM.

Selected practice mode: ${mode || 'free_chat'}.

Strict constraints on your conversational output:
1. Always be extremely supportive, encouraging, polite, and professional.
2. Analyze the user's input. If there are any grammatical errors, spelling slips, improper tenses, or punctuation mistakes:
   - Provide a clean, formatted Markdown table summarizing:
     | Original | Suggested Correction | Reason / Rule Explained |
   - Point this out gently before responding to the message content!
3. Format feedback nicely. If their input is correct, commend their fluent composition briefly!
4. Keep your text conversational, engaging, and focused. Do not speak in long, dense essays. Break your thoughts into highly readable points.
`;

      if (mode === 'level_check') {
        systemInstruction += `
Specific task for "Diagnostic Level Check":
- Ask short, situational questions to assess their vocabulary, sentence flow, and speech habits (e.g., \"Tell me about a hobby you enjoy, or why you want to master English\").
- Give a brief evaluation of their CEFR level (A1, A1-A2, B1, B2, C1) in your response.
- Map interest to appropriate Success English Classes course (such as IELTS Preparation, Spoken English, or Personality Development). Promote WhatsApp booking (+91 89996 30240) in a helpful manner.
`;
      } else if (mode === 'ielts_interview') {
        systemInstruction += `
Specific task for "IELTS Mock Speaking Examiner":
- Ask typical IELTS Part 1 or Part 2 Speaking questions.
- Benchmark user's answers against official IELTS parameters: Coherence, Grammatical range, and Lexical resource.
- Assign an estimated Band (e.g., 6.0, 7.5) with exact points on how to progress to Band 8 or 9.
- Mention that at Success English Classes, physical or 1-to-1 live online lessons prepare students to reach IELTS Band 7.5+ easily.
`;
      } else if (mode === 'interview_prep') {
        systemInstruction += `
Specific task for "Job Interview Prep":
- Act as a corporate HR manager or technical lead in their field.
- Ask challenging interview questions (e.g. "Tell me about yourself", "What are your career expectations", "Explain a difficult challenge you solved").
- Give direct critique on body text, professionalism, word choices, confidence indicators, and draft better-sounding answers.
`;
      } else {
        systemInstruction += `
Specific task for "Spoken English Conversation Partner":
- Act as a close friend / dialogue partner.
- Initiate interesting and fun conversations (e.g., travel plans, favorite foods, movie discussions).
- Help them naturally adopt useful idioms and expand their spoken English vocabulary.
`;
      }

      const contentsList: any[] = [];
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          contentsList.push({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          });
        });
      }
      contentsList.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contentsList,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      return res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API error in Express server:", err);
      return res.status(500).json({ error: err.message || "An error occurred with the AI English Coach service." });
    }
  });

  // Serve static files in production, use Vite middleware in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
