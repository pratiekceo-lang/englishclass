import { Course, SuccessStory, Testimonial } from "./types";

export const COURSES: Course[] = [
  {
    id: "spoken-english",
    title: "Spoken English",
    shortDesc: "Build natural fluency, sentence structure, and active speaking habits for daily conversation.",
    fullDesc: "Designed to remove stage fright and hesitations, this course focuses on everyday vocabulary, proper pronunciation, and active conversation simulations. Transition from thinking in your native language to thinking in fluent English.",
    whoIsItFor: ["Beginners", "Working Professionals", "Homemakers", "Senior Citizens", "School and College Students"],
    keyTopics: [
      "Everyday Conversational Scenarios",
      "Confidence Building and Hesitation Removal",
      "Sentence Construction Rules",
      "Pronunciation and Accent Improvement",
      "Role-playing and Group Discussions"
    ],
    duration: "2 - 3 Months",
    category: "spoken",
    iconName: "MessageCircle"
  },
  {
    id: "ielts-prep",
    title: "IELTS Preparation",
    shortDesc: "Comprehensive coaching to hit Band 7+ in Academic and General Training modules.",
    fullDesc: "Targeted strategy and intensive training on all 4 modules (Listening, Reading, Writing, Speaking) under professional IELTS standards. Includes customized mock tests, speaking evaluations, and essay analysis.",
    whoIsItFor: ["IELTS Aspirants", "Students Planning to Study Abroad", "Professionals Migrating Abroad"],
    keyTopics: [
      "Listening: Practice on diverse accents and map/diagram labeling",
      "Reading: Speed scanning, matching headings, and TFNG strategies",
      "Writing: Task 1 and Task 2 structuring and band-boosters",
      "Speaking: Part 1, 2, and 3 mock examiner practices",
      "Time Management under official test conditions"
    ],
    duration: "1 - 2 Months",
    category: "academic",
    iconName: "GraduationCap"
  },
  {
    id: "interview-prep",
    title: "Interview Preparation",
    shortDesc: "Master corporate dialogue, resume representation, and win your dream employment role.",
    fullDesc: "Specially tailored for IT professionals and job seekers. Learn how to articulate your experience, handle difficult Behavioral/situational inquiry questions, negotiate salaries, and project executive presence.",
    whoIsItFor: ["IT Professionals", "Job Seekers", "College Freshers"],
    keyTopics: [
      "Resume and LinkedIn Representation Advice",
      "Tell Me About Yourself - Perfect Pitch",
      "STAR Method for Behavioral Questions",
      "Salary Negotiation and Offer Queries",
      "Mock Interviews with Live Evaluation"
    ],
    duration: "4 - 6 Weeks",
    category: "career",
    iconName: "Briefcase"
  },
  {
    id: "personality-dev",
    title: "Personality Development",
    shortDesc: "Transform your body language, social confidence, executive posture, and self-belief.",
    fullDesc: "Unlock your finest personal self. Improve your presentation style, conversational etiquette, assertive communication skills, and critical soft skills required to leading in a competitive workspace.",
    whoIsItFor: ["Working Professionals", "College Students", "Job Seekers", "IT Engineers"],
    keyTopics: [
      "Assertive vs Passive Communication",
      "Body Language, Posture and Eye Contact",
      "Public Presence and Networking Advice",
      "Overcoming Stage Fear and Self-Doubt",
      "Mindset Coaching and Goal Alignment"
    ],
    duration: "2 Months",
    category: "career",
    iconName: "Sparkles"
  },
  {
    id: "business-english",
    title: "Business English",
    shortDesc: "Command respect in the boardroom with elite corporate writing and speech styles.",
    fullDesc: "Learn formal drafting and corporate vernacular. Ideal for IT Leaders, product managers, and professionals dealing with global clients. Includes actual email drafts, client calls, and presentation training.",
    whoIsItFor: ["IT Professionals", "Working Professionals", "Business Owners", "Freelancers"],
    keyTopics: [
      "Professional Email Writing and Corporate Correspondence",
      "Client Presentation Styles and Dynamic Pitching",
      "Meeting Facilitation and Negotiation Phrases",
      "Cross-cultural Workplace Communication Styles",
      "Structuring Briefings and Reports clearly"
    ],
    duration: "2 Months",
    category: "career",
    iconName: "Globe"
  },
  {
    id: "grammar-vocab",
    title: "Grammar and Vocabulary Development",
    shortDesc: "Solidify root language concepts and replace simple words with advanced synonyms.",
    fullDesc: "Learn the core mechanics of English without boring rote academic learning. Strengthen tenses, prepositions, voices, and syntax while acquiring smart vocabulary to express complex ideas effortlessly.",
    whoIsItFor: ["Children (6+ years)", "School Students", "Beginner Adults", "Job Seekers"],
    keyTopics: [
      "Tenses, Active-Passive and Subject-Verb Agreement",
      "Prepositions, Articles and Common Structural Traps",
      "Advanced Synonyms and Sentence Enrichment",
      "Idiomatic Expressions and Common Phrasal Verbs",
      "Sentence Flow Correction Techniques"
    ],
    duration: "2 - 3 Months",
    category: "grammar",
    iconName: "BookOpen"
  },
  {
    id: "public-speaking",
    title: "Public Speaking",
    shortDesc: "Overcome fear, hold audience attention, and present your ideas like a leader.",
    fullDesc: "Learn how to deliver speeches, handle Q&A panels, structure impromptu speeches (extempore), and maintain a rich, modulation-packed vocal signature that keeps audiences at the edge of their seats.",
    whoIsItFor: ["College Students", "Working Professionals", "IT Leaders", "Business Owners"],
    keyTopics: [
      "Structuring High-Impact Speeches",
      "Vocal Modulation and Breathing Controls",
      "Extempore and Impromptu Presentation Tactics",
      "Audience Engagement and Eye Scanning Techniques",
      "Stage Movement and Visual Presentation Alignment"
    ],
    duration: "6 - 8 Weeks",
    category: "spoken",
    iconName: "Volume2"
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "story-ielts",
    category: "ielts",
    title: "300+ Students Achieved IELTS Band 7+",
    stat: "300+",
    audience: "IELTS Aspirants and Study Abroad Applicants",
    badge: "IELTS Target Band 7.5+",
    description: "More than 300 of our students have achieved outstanding IELTS Band scores (7.0, 7.5, 8.0+) with many scaling up from initial hesitation levels, enabling them to successfully move abroad to nations like Canada, United Kingdom, USA, and Australia for higher education and global careers."
  },
  {
    id: "story-it",
    category: "it",
    title: "250+ IT Professionals Enhanced Their Career",
    stat: "250+",
    audience: "Software Engineers, Managers and IT Analysts",
    badge: "Global Client Communications",
    description: "Over 250 software engineers and IT professionals from prominent hubs across Pune and India transformed their daily communication skills. Through personalized 1-on-1 speaking clinics, they gained confidence in leading client calls, handling foreign interview loops, and successfully securing salary promotions or international relocations."
  },
  {
    id: "story-homemaker",
    category: "homemaker",
    title: "Personal Empowerment for Homemakers",
    stat: "Empowered",
    audience: "Homemakers and Local Community Members",
    badge: "Confident Social Interactions",
    description: "Dozens of homemakers transformed their household and social lives by mastering fluent English dialogue. From tutoring their school-going children to confidently speaking in parent-teacher meetings, bank interactions, and foreign family travel, they conquered their speaking fear and built independent social personalities."
  }
];

export const WHO_WE_TRAIN = [
  { title: "Children (6+ years)", desc: "Building core grammar foundations, vocabulary, and active speaking habits in young brains.", icon: "Baby" },
  { title: "School and College Students", desc: "Crushing presentation stage fear, organizing academic talks, and building stellar campus communication.", icon: "GraduationCap" },
  { title: "Working and IT Professionals", desc: "Directing office meetings, writing professional emails, and hosting confident global client calls.", icon: "Laptop" },
  { title: "Job Seekers", desc: "Nailing HR interviews, mastering common questions, salary negotiation, and confident presentation pitch.", icon: "UserCheck" },
  { title: "IELTS Aspirants", desc: "Perfecting Band 7+ reading techniques, vocabulary, exam structures, and timed mock speaking segments.", icon: "Globe2" },
  { title: "Homemakers and Senior Citizens", desc: "Removing social hesitation, speaking fluently in community networks, parent-teacher reviews, and everyday trips.", icon: "Smile" }
];

export const CORE_BENEFITS = [
  {
    title: "Personalized One-to-One Training",
    description: "No crowded background classrooms of 30+ students. It is strictly your personal trainer focusing full attention on your gaps, vocabulary, and fluency pacing.",
    icon: "User"
  },
  {
    title: "Flexible Learning Schedule (7 AM – 11 PM)",
    description: "Choose your hourly slots dynamically to match corporate job shifts, home duties, or school hours. Classes are held online, making location zero obstacle.",
    icon: "Clock"
  },
  {
    title: "Practical, Speaking-First Approach",
    description: "We focus on conversation fluency, quick-sentence thinking, real roleplays, and interactive talking models, rather than boring rote written worksheets.",
    icon: "MessageSquareText"
  },
  {
    title: "Team of 21+ Expert Trainers",
    description: "Under the guidance of Founder Atharva Naik (Ivan), benefit from seasoned, polite, professional coaches certified in IELTS and linguistic pedagogy.",
    icon: "Users"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-dilip",
    name: "Dilip Prajapati",
    location: "Raviwar Peth, Pune",
    role: "Business Owner (Amrut Artificial Flowers)",
    text: "I joined Success English Classes for my business at Raviwar Peth. Earlier, I had trouble writing bills and communicating, but now I feel amazing. Ivan Sir takes my classes online every morning, which is extremely convenient!",
    rating: 5
  },
  {
    id: "test-asif",
    name: "Asif Talafdar",
    location: "Solapur",
    role: "10th Class Student",
    text: "As a 10th-grade student in Solapur, I struggled to speak or understand English since it wasn't spoken around me. After joining the online classes, my understanding and spoken English improved dramatically, making my school exams feel effortless.",
    rating: 5
  },
  {
    id: "test-revathi",
    name: "Revathi Siri",
    location: "Hyderabad",
    role: "Mother & Tech Professional",
    text: "I was hesitant to speak in English and lacked confidence. As a mother and a tech professional, managing classes was tough, but Ivan's constant encouragement helped me speak with absolute confidence. It was worth every rupee!",
    rating: 5
  },
  {
    id: "test-lakshmi",
    name: "Lakshmi Nellore",
    location: "Nellore / Andhrapradesh",
    role: "Professional Student",
    text: "My uncle recommended Ivan's classes. Under his motivation, my English communication has improved immensely over 6 months of training. The combination of 1-on-1 sessions and weekend group practice is phenomenal. The best online platform I've ever experienced!",
    rating: 5
  },
  {
    id: "test-noopur",
    name: "Noopur Parwat",
    location: "Pune",
    role: "Working Professional",
    text: "Success English Classes have been highly beneficial. The interactive sessions and real-life conversational scenarios significantly boosted my fluency, reduced my hesitation, and gave me practical professional confidence.",
    rating: 5
  },
  {
    id: "test-abhay",
    name: "Abhay Dubey",
    location: "London / University of East London (from India)",
    role: "Study Abroad Aspirant",
    text: "I trained with Ivan for 6 months to prepare for IELTS and studying abroad. His speaking-first focus was a total game-changer. Thanks to his help and constant support, I successfully cleared my pre-CAS interview for the University of East London!",
    rating: 5
  },
  {
    id: "test-prashant",
    name: "Prashant Mohite",
    location: "Pune",
    role: "Active Student",
    text: "I love the unique teaching style here. The sessions are highly engaging, especially the weekend group classes and interactive tasks. They are incredibly helpful for realistic speaking practice. Highly recommended!",
    rating: 5
  },
  {
    id: "test-puja",
    name: "Puja Oswal",
    location: "Pune / Remote",
    role: "Professional Graduate",
    text: "Success English Class has successfully bridged my speaking gaps. Ivan's emphasis on consistency and regular speaking tasks boosted my fluency and confidence. Thank you for the amazing transformation!",
    rating: 5
  }
];

