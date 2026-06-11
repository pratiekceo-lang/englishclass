import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Sparkles,
  Phone,
  MapPin,
  Star,
  Clock,
  ArrowRight,
  Search,
  Check,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Laptop,
  Users,
  MessageCircle,
  Baby,
  Smile,
  Instagram,
  Facebook,
  Database,
  Calendar,
  Layers,
  BookOpen,
  PlusCircle,
  Briefcase,
  X,
  Menu,
  Info,
  User,
  Globe,
  Volume2,
  UserCheck,
  Globe2
} from "lucide-react";
import Logo from "./components/Logo";
import { COURSES, WHO_WE_TRAIN, SUCCESS_STORIES, CORE_BENEFITS, TESTIMONIALS } from "./data";
import { Course, Booking } from "./types";
import { motion } from "motion/react";

// Premium Scrolling Spring Physics Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, mass: 0.8 }
  }
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 85, damping: 14 }
  }
};

const fadeInLeftVariants = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 85, damping: 14 }
  }
};

const fadeInRightVariants = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 85, damping: 14 }
  }
};

export default function App() {
  // Navigation active tab
  const [activeSection, setActiveSection] = useState("home");

  // Ensure theme is reset to light mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, []);
  
  // Custom Dynamic Header and Mobile Menu states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Courses search & category states
  const [courseSearch, setCourseSearch] = useState("");
  const [courseCategory, setCourseCategory] = useState<"all" | "spoken" | "academic" | "career" | "grammar">("all");
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Course | null>(null);

  // Seat / Free Trial Booking Form State
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingCourse, setBookingCourse] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [submittedBooking, setSubmittedBooking] = useState<{ name: string; phone: string; course: string; message?: string } | null>(null);

  // Admin Leads monitoring list
  const [leadsList, setLeadsList] = useState<Booking[]>([]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);
  
  // Testimonial location filter state
  const [selectedTestimonialLocation, setSelectedTestimonialLocation] = useState("all");

  // Fetch leads when admin toggler is triggered
  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setLeadsList(data.bookings || []);
        }
      }
    } catch (err) {
      console.error("Failed to load registrants", err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (showAdminPanel) {
      fetchLeads();
    }
  }, [showAdminPanel]);

  // Handle consultation form submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingCourse) {
      setBookingError("Please input your Name, WhatsApp Phone, and choose a Course.");
      return;
    }

    setIsSubmittingBooking(true);
    setBookingError(null);
    setBookingSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingName,
          phone: bookingPhone,
          course: bookingCourse,
          message: bookingMessage
        })
      });

      let data: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server responded with unexpected format (${response.status}): ${text.substring(0, 80) || "Empty response"}`);
      }

      if (!response.ok) {
        throw new Error(data.error || "Form submission failed.");
      }

      setSubmittedBooking({
        name: bookingName,
        phone: bookingPhone,
        course: bookingCourse,
        message: bookingMessage
      });
      setBookingSuccess(data.message);
      // Clean up fields
      setBookingName("");
      setBookingPhone("");
      setBookingCourse("");
      setBookingMessage("");

      // Automatically refresh leads database in background
      if (showAdminPanel) {
        fetchLeads();
      }
    } catch (err: any) {
      setBookingError(err.message || "An unexpected issue occurred. Please check your network and submit again.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Filter courses based on categories & search term
  const filteredCourses = COURSES.filter((c) => {
    const matchesCategory = courseCategory === "all" || c.category === courseCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.shortDesc.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.fullDesc.toLowerCase().includes(courseSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Direct WhatsApp links for classes contact
  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/918999630240?text=${encodeURIComponent(message)}`;
  };

  const defaultWAUrl = getWhatsAppLink("Hi Ivan, I visited Success English Classes website and would like to ask some questions regarding admissions!");

  const directRegisterWAUrl = (courseTitle: string) => {
    return getWhatsAppLink(`Hi Ivan Atharva, I would like to book a Free 1-to-1 Personal Trial slot for: ${courseTitle}! Please check schedule availability.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#0B132B] font-sans antialiased text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* HEADER / NAVIGATION BAR */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF9F6]/90 dark:bg-[#0B132B]/90 backdrop-blur-md py-2.5 shadow-md border-b border-slate-200/80 dark:border-slate-800/80"
          : "bg-[#FAF9F6] dark:bg-[#0B132B] py-4 border-b border-slate-200/50 dark:border-slate-800/40"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#hero-section" id="nav-brand" className="transition-transform duration-200 hover:scale-[1.02] flex items-center">
            <Logo className="h-10 w-10 sm:h-11 sm:w-11" darkBackground={false} />
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-100">
            <a href="#hero-section" className="relative py-1 text-slate-900 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-amber-400 transition duration-200 group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-600 dark:bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#courses-section" className="relative py-1 text-slate-900 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-amber-400 transition duration-200 group">
              Our Courses
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-600 dark:bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#why-us-section" className="relative py-1 text-slate-900 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-amber-400 transition duration-200 group">
              About Atharva
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-600 dark:bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#success-stories-section" className="relative py-1 text-slate-900 hover:text-indigo-600 dark:text-slate-100 dark:hover:text-amber-400 transition duration-200 group">
              Success Stories
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-600 dark:bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Right Area: CTA & Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop Direct WhatsApp CTA */}
            <a
              href={defaultWAUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-full cursor-pointer shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:scale-105 active:scale-98 transition duration-200"
              id="cta-whatsapp-header"
            >
              <Phone className="h-3.5 w-3.5 stroke-[2.5]" />
              WhatsApp: +91 89996 30240
            </a>

            {/* Mobile Action Icon */}
            <a
              href={defaultWAUrl}
              target="_blank"
              rel="noreferrer"
              className="md:hidden flex items-center justify-center p-2.5 bg-amber-400 text-slate-950 rounded-full hover:scale-102 active:scale-95 transition"
              id="cta-whatsapp-header-mobile"
            >
              <Phone className="h-4 w-4 stroke-[2.5]" />
            </a>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-hidden cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5.5 w-5.5 stroke-[2.5]" />
              ) : (
                <Menu className="h-5.5 w-5.5 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu panel overlay sheet */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-[60px] sm:top-[68px] z-50 bg-[#FAF9F6]/98 dark:bg-[#0B132B]/98 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 py-6 px-4 flex flex-col justify-between h-[calc(100vh-60px)] sm:h-[calc(100vh-68px)] animate-fade-in transition duration-300 overflow-y-auto text-slate-800 dark:text-slate-100">
            <div className="flex flex-col gap-4 pt-2">
              {/* Prominent Quick Call CTA at the very top */}
              <div className="px-1 pb-3 border-b border-slate-200 dark:border-slate-800 mb-1">
                <a
                  href="tel:+918999630240"
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] text-white rounded-2xl text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-lg shadow-indigo-950/20 border border-indigo-500/20"
                >
                  <Phone className="h-4 w-4 stroke-[2.5] text-indigo-200 animate-pulse" />
                  <span>Quick Call: +91 89996 30240</span>
                </a>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-450 px-3">
                Main Academy Navigation
              </span>
              <nav className="flex flex-col gap-1.5">
                <a
                  href="#hero-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-slate-100/80 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-amber-400 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center"
                >
                  Home
                </a>
                <a
                   href="#courses-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-slate-100/80 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-amber-400 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center"
                >
                  Our courses and programs
                </a>
                <a
                  href="#why-us-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-slate-100/80 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-amber-400 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center"
                >
                  About Atharva
                </a>
                <a
                  href="#success-stories-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:bg-slate-100/80 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-amber-400 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center"
                >
                  Success Stories
                </a>
              </nav>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col gap-4 mt-8 mb-16">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">
                  Online Learning Excellence
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Unlock high fluency and dynamic vocabulary 1-on-1 with Atharva Naik and certified senior academic mentors.
              </p>
              <a
                href={defaultWAUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl text-center text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition duration-200 active:scale-98 cursor-pointer"
              >
                <Phone className="h-3.5 w-3.5 stroke-[2.5]" />
                WhatsApp: +91 89996 30240
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden bg-transparent pt-10 pb-16 sm:pb-24 border-b border-slate-100/60"
        id="hero-section"
      >
        {/* Subtle background graphics */}
        <div className="absolute inset-0 bg-[radial-gradient(1300px_at_50%_top,rgba(99,102,241,0.075),transparent)] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            
            {/* Direct Headline Column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="space-y-6 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-950 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40 rounded text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                Founded by Atharva Naik (Ivan) • Est. 2019
              </div>

              <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-800 dark:text-white leading-[1.1] tracking-tight">
                Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 font-extrabold">Fluency</span> and Confidence.
              </h2>

              <p className="text-base text-slate-650 dark:text-slate-450 leading-relaxed max-w-2xl mx-auto">
                A leading online training institute dedicated to helping learners across India achieve international opportunities through professional English mastery. SUCCESS ENGLISH CLASSES offers premier 1-on-1 personal coaching tailored to target your vocabulary gaps, speaking fears, or IELTS milestones.
              </p>

              {/* Main action triggers */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href="#contact-section"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition duration-200 shadow-lg shadow-indigo-655/15 border border-indigo-600 cursor-pointer"
                  id="cta-book-demo-hero"
                >
                  Book Free 1-to-1 Trial Demo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Quick Trust statistics badges with stagger scroll animations */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-100/80 dark:border-slate-800/80 w-full"
              >
                <motion.div variants={itemVariants} className="bg-slate-800 dark:bg-slate-900/85 text-white p-4 rounded-xl flex flex-col justify-between shadow-xs border dark:border-slate-800/50">
                  <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white">300+</h4>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase mt-1 leading-tight font-semibold tracking-tight">IELTS Successes (7+ Band)</p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-indigo-600/90 text-white p-4 rounded-xl flex flex-col justify-between shadow-xs border border-indigo-500/30">
                  <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white">250+</h4>
                  <p className="text-[9px] sm:text-[10px] text-indigo-100 uppercase mt-1 leading-tight font-semibold tracking-tight">IT Professionals Trained</p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 p-4 rounded-xl flex flex-col justify-between shadow-xs">
                  <h4 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white">21+</h4>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-450 uppercase mt-1 leading-tight font-semibold tracking-tight">Expert Mentors Onboard</p>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CORE BENEFITS SECTION */}
      <section
        className="py-14 bg-transparent border-b border-slate-100/60 overflow-hidden"
        id="methodology-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            className="text-center max-w-3xl mx-auto space-y-3 mb-12"
          >
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-650 bg-indigo-50/55 dark:text-indigo-300 dark:bg-indigo-950/40 px-3 py-1 rounded-md">
              Why We Are Different
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              A Direct Focus on Fluency and Real Conversation.
            </h2>
            <p className="text-slate-650 dark:text-slate-400 text-sm max-w-lg mx-auto">
              Traditional classrooms give worksheets. We give focused, real-time speaking practice where correction happens in a live feedback loop.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {CORE_BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="bg-white dark:bg-slate-900/45 p-6 rounded-2xl border border-slate-205 dark:border-slate-800 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between hover:border-indigo-200 dark:hover:border-indigo-500/50"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/45 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 border border-indigo-100/50 dark:border-indigo-800/40">
                    {b.title.includes("One-to-One") && <User className="h-5 w-5" />}
                    {b.title.includes("Flexible") && <Clock className="h-5 w-5" />}
                    {b.title.includes("Practical") && <MessageCircle className="h-5 w-5" />}
                    {b.title.includes("Trainers") && <Users className="h-5 w-5" />}
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SUBTLE HORIZONTAL GRADIENT LINE FOR VISUAL SEPARATION */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 via-slate-350/60 via-indigo-500/10 to-transparent" />
      </div>

      {/* DETAILED INTERACTIVE COURSE CATALOG */}
      <section
        className="py-16 bg-transparent border-b border-slate-100/60 overflow-hidden"
        id="courses-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header titles */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/80"
          >
            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 dark:text-indigo-350 px-3 py-1 rounded-md mb-2 inline-block">
                Course Catalog
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
                Personalized Training Programs
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                Find the perfect program built for your age group, corporate aspirations, or IELTS preparation goals.
              </p>
            </div>

            {/* Filter Categories and Search Input combined */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 dark:text-slate-550" />
                <input
                  type="text"
                  placeholder="Search syllabus..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="w-full sm:w-60 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100/60 dark:hover:bg-slate-850 border border-slate-205 dark:border-slate-800 py-2.5 pl-10 pr-4 rounded-xl text-xs font-medium focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Tab Filter Sliders */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold scrollbar-none">
            {[
              { id: "all", label: "All Programs" },
              { id: "spoken", label: "Spoken and Public English" },
              { id: "academic", label: "IELTS Exam Preparation" },
              { id: "career", label: "Corporate Careers and Interviews" },
              { id: "grammar", label: "Grammar Foundations" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCourseCategory(tab.id as any)}
                className={`py-2 px-4 rounded-full border whitespace-nowrap cursor-pointer transition ${
                  courseCategory === tab.id
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/15 font-bold"
                    : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filter results label */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-10 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 text-xs">No matching courses found. Try sorting by category or clearing search parameters.</p>
              <button
                onClick={() => {
                  setCourseSearch("");
                  setCourseCategory("all");
                }}
                className="mt-3 text-xs bg-indigo-50 dark:bg-indigo-950/45 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full font-bold border border-indigo-100 dark:border-indigo-900/50 hover:bg-indigo-105"
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* Grid Layout of Courses with beautiful stagger animations */}
          <motion.div 
            key={`${courseCategory}-${courseSearch}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course) => {
              return (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 22 } }}
                  className="bg-white dark:bg-slate-900/40 border border-slate-205 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all flex flex-col justify-between group"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/45 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-800/40 rounded-xl">
                        {course.iconName === "MessageCircle" && <MessageCircle className="h-5 w-5" />}
                        {course.iconName === "GraduationCap" && <GraduationCap className="h-5 w-5" />}
                        {course.iconName === "Briefcase" && <Briefcase className="h-5 w-5" />}
                        {course.iconName === "Sparkles" && <Sparkles className="h-5 w-5" />}
                        {course.iconName === "Globe" && <Globe className="h-5 w-5" />}
                        {course.iconName === "BookOpen" && <BookOpen className="h-5 w-5" />}
                        {course.iconName === "Volume2" && <Volume2 className="h-5 w-5" />}
                      </div>
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-450 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                        {course.duration}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {course.shortDesc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100/60 dark:border-slate-800/85">
                      <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Topics Covered include:</h4>
                      <ul className="space-y-1">
                        {course.keyTopics.slice(0, 3).map((topic, index) => (
                           <li key={index} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-350">
                             <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                             <span className="line-clamp-1">{topic}</span>
                           </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom triggers */}
                  <div className="bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedCourseDetail(course)}
                      className="text-xs font-semibold text-slate-650 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 cursor-pointer"
                    >
                      View Syllabus and Details
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>

                    <a
                      href="#contact-section"
                      onClick={() => {
                        setBookingCourse(course.title);
                        setBookingMessage(`Please register a slot for: ${course.title}.`);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg uppercase tracking-wider"
                    >
                      Book 1-on-1
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* WHOM WE TRAIN CARD EXPANSIONS */}
      <section
        className="py-14 bg-transparent border-b border-slate-100/60 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            className="text-center max-w-3xl mx-auto space-y-3 mb-10"
          >
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 dark:text-indigo-350 px-3 py-1 rounded-md mb-2 inline-block">
              Who is It For?
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Curated for All Educational Backgrounds and Ages.
            </h2>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {WHO_WE_TRAIN.map((person, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.01, transition: { type: "spring", stiffness: 350, damping: 20 } }}
                className="bg-white dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/50 transition duration-200 flex items-start gap-3.5"
              >
                <div className="p-2.5 rounded-full bg-indigo-50 dark:bg-indigo-950/45 border border-indigo-100 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-400 flex-shrink-0">
                  {person.icon === "Baby" && <Baby className="h-5 w-5" />}
                  {person.icon === "GraduationCap" && <GraduationCap className="h-5 w-5" />}
                  {person.icon === "Laptop" && <Laptop className="h-5 w-5" />}
                  {person.icon === "UserCheck" && <UserCheck className="h-5 w-5" />}
                  {person.icon === "Globe2" && <Globe2 className="h-5 w-5" />}
                  {person.icon === "Smile" && <Smile className="h-5 w-5" />}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-1">
                    {person.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    {person.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SUCCESS STORIES & EVIDENCE OF IMPACT */}
      <section
        className="py-16 bg-transparent border-b border-slate-100/60 overflow-hidden"
        id="success-stories-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            className="text-center max-w-3xl mx-auto space-y-3 mb-12"
          >
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 dark:text-indigo-350 px-3 py-1 rounded-md mb-2 inline-block">
              Student Results and Impact
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight animate-fade-in">
              Guiding Students Toward Global Achievements
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              We measure our merit purely through the accomplishments of our community. Explore key milestones our graduates achieved since 2019.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {SUCCESS_STORIES.map((story) => (
              <motion.div
                key={story.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="bg-slate-50/55 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900/60 p-6 rounded-2xl border border-slate-205 dark:border-slate-800 hover:border-indigo-305 dark:hover:border-indigo-500/40 hover:shadow-lg transition duration-250 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-indigo-750 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/45 border border-indigo-100 dark:border-indigo-900/50 font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {story.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                      {story.category === "ielts" && "Study / Migrate"}
                      {story.category === "it" && "Career Grow"}
                      {story.category === "homemaker" && "Personal Confidence"}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-lg text-slate-900 dark:text-white leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                    &ldquo;{story.description}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block mb-0.5">Audience Focus:</span>
                  <span className="text-xs font-semibold text-slate-705 dark:text-slate-300">{story.audience}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* DIVIDER */}
          <div className="my-16 border-t border-slate-100 dark:border-slate-800/80" />

          {/* INDIVIDUAL CLIENT TESTIMONIALS */}
          <div className="space-y-10" id="testimonials-block">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="text-center space-y-2"
            >
              <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 dark:text-indigo-350 px-3 py-1 rounded-md mb-2 inline-block">
                Verified Feedback
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                Authentic Student Testimonials
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                Read genuine stories showing how Atharva Naik (Ivan) helped them conquer hesitation, speaking online from all across the regions. <span className="text-indigo-600 dark:text-indigo-400 font-semibold block sm:inline mt-1 sm:mt-0 sm:ml-1">💬 Hover to pause scroll</span>
              </p>
            </motion.div>

            {/* Interactive Location Tabs Filter */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pb-2 text-xs font-semibold">
              {[
                { id: "all", label: "All Locations" },
                { id: "pune", label: "Pune" },
                { id: "solapur", label: "Solapur" },
                { id: "hyderabad", label: "Hyderabad" },
                { id: "nellore", label: "Nellore" },
                { id: "london", label: "London/UK" }
              ].map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedTestimonialLocation(loc.id)}
                  className={`px-4 py-1.5 rounded-full transition-all border outline-none cursor-pointer duration-200 ${
                    selectedTestimonialLocation === loc.id
                      ? "bg-indigo-650 border-indigo-650 text-white shadow-xs"
                      : "bg-slate-55 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>

            {/* Testimonials Bento/Card Grid */}
            <div className="relative w-full overflow-hidden py-4 select-none">
              {/* Gradient Fades for ultra-professional modern feel */}
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-[#FAF9F6] dark:from-[#0B132B] to-transparent pointer-events-none z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-[#FAF9F6] dark:from-[#0B132B] to-transparent pointer-events-none z-10" />

              <div
                key={selectedTestimonialLocation}
                className="flex gap-6 animate-marquee py-2"
              >
                {(() => {
                  const filtered = TESTIMONIALS.filter((t) => {
                    if (selectedTestimonialLocation === "all") return true;
                    return t.location.toLowerCase().includes(selectedTestimonialLocation.toLowerCase());
                  });
                  // Repeat elements 3 times for seamless 33.333% marquee looping
                  const duplicates = [...filtered, ...filtered, ...filtered];
                  
                  return duplicates.map((t, idx) => {
                    const initials = t.name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase();
                    return (
                      <div
                        key={`${t.id}-marquee-${idx}`}
                        className="w-[290px] xs:w-[325px] sm:w-[360px] flex-shrink-0 bg-slate-50/40 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-205 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between whitespace-normal text-left"
                      >
                        <div className="space-y-4">
                          {/* Avatar Profile Box */}
                          <div className="flex items-start gap-3 w-full">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 border border-indigo-100/60 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {initials}
                            </div>
                            <div className="text-left flex-1 min-w-0">
                              <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm truncate max-w-[150px] xs:max-w-[180px] sm:max-w-[210px]">
                                {t.name}
                              </h4>
                              <span className="text-[10px] font-bold text-indigo-650 dark:text-indigo-400 tracking-wide block truncate max-w-[150px] xs:max-w-[180px] sm:max-w-[210px] mb-1">
                                {t.role}
                              </span>
                              {/* Star Rating indicator */}
                              <div className="flex items-center gap-0.5 text-amber-400 mt-1 flex-shrink-0">
                                {[...Array(t.rating || 5)].map((_, ratingIdx) => (
                                  <Star key={ratingIdx} className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Handwritten student message content */}
                          <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed italic text-left pl-1">
                            &ldquo;{t.text}&rdquo;
                          </p>
                        </div>

                        {/* Bottom Location Marker Footer */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mt-5 flex items-center gap-1.5 text-slate-400/80 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest justify-start text-left">
                          <MapPin className="h-3.5 w-3.5 text-slate-400/70 dark:text-slate-500 flex-shrink-0" />
                          <span>{t.location}</span>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT THE FOUNDER Atharva Naik (Ivan) */}
      <section
        className="py-14 bg-transparent border-b border-slate-100/60 overflow-hidden"
        id="why-us-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 lg:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual illustrative grid */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeftVariants}
              className="lg:col-span-5 flex justify-center w-full"
            >
              <div className="w-full max-w-sm aspect-square bg-gradient-to-tr from-indigo-50/60 to-slate-50 border border-indigo-100/50 rounded-3xl p-6 flex flex-col justify-between text-slate-800 relative shadow-sm">
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full border border-slate-200 text-slate-400 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>

                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500">
                    Master Coach Profiler
                  </span>
                  <h3 className="font-display font-black text-xl text-slate-950 mt-1">Ivan Atharva Naik</h3>
                  <p className="text-xs text-indigo-600 font-bold">Founder, Success English Classes</p>
                </div>

                <div className="space-y-2 mt-4 text-xs text-slate-600 line-clamp-4 leading-relaxed font-semibold">
                  Atharva Naik has over 6+ years of rigorous experience tutoring local, regional, and international student candidates on speech confidence, public presentations, and core grammatical mastery.
                </div>

                <div className="flex gap-2.5 items-center bg-indigo-50/60 border border-indigo-100/50 p-3 rounded-2xl">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-600">Certified IELTS and Corporate Speech Mentor</span>
                </div>
              </div>
            </motion.div>

            {/* Biography content */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRightVariants}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-600 bg-indigo-50/50 px-3 py-1 rounded-md inline-block">
                Meet your Mentor
              </span>
              
              <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                About Founder Atharva Naik (Ivan)
              </h2>

              <p className="text-sm text-slate-800 leading-relaxed">
                SUCCESS ENGLISH CLASSES was founded with a clear, singular mandate: to bridge the bridge of communication for struggling career holders and students. Our personalized, highly tailored training pattern represents the direct strategy of Ivan, whose customized training methods have empowered hundreds across Pune and India.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-2 items-center text-xs font-semibold text-slate-700">
                  <Check className="h-4.5 w-4.5 text-indigo-600" />
                  6+ Years of Tutoring Experience
                </div>
                <div className="flex gap-2 items-center text-xs font-semibold text-slate-700">
                  <Check className="h-4.5 w-4.5 text-indigo-600" />
                  International student portfolio
                </div>
                <div className="flex gap-2 items-center text-xs font-semibold text-slate-700">
                  <Check className="h-4.5 w-4.5 text-indigo-600" />
                  Corporate client training background
                </div>
                <div className="flex gap-2 items-center text-xs font-semibold text-slate-700">
                  <Check className="h-4.5 w-4.5 text-indigo-600" />
                  1-on-1 dynamic syllabus architect
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  &ldquo;A perfect accent is never the core criteria. Real communication means speaking expressively, confidently, and accurately without hesitation when standing before an audience or an international interviewer.&rdquo;
                </p>
                <span className="text-xs font-extrabold text-slate-700 block mt-2">— Atharva Naik (Ivan), Founder</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CORE ADVICE / WHATSAPP ACTION CHANNELS */}
      <section
        className="py-14 bg-transparent border-b border-slate-100/60 overflow-hidden"
      >
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariants}
          className="max-w-4xl mx-auto px-4 text-center space-y-6"
        >
          <div className="inline-flex p-3.5 bg-emerald-50 rounded-2xl text-emerald-600">
            <Phone className="h-7 w-7" />
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-950 tracking-tight">
            Have Questions? Talk with Ivan Immediately
          </h2>

          <p className="text-xs text-slate-500 leading-relaxed max-w-lg mx-auto">
            You don't need a formal booking process to ask basic questions. Tap below to send a direct WhatsApp message.
          </p>

          <a
            href={defaultWAUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-550 hover:scale-105 transform transition duration-200 text-white font-extrabold text-sm rounded-xl cursor-pointer"
          >
            Ask Questions on WhatsApp (+91 89996 30240)
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </section>

      {/* BOOK SEAT / CONSULTATION FORM SECTION */}
      <section
        className="py-16 bg-transparent overflow-hidden"
        id="contact-section"
      >
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden"
          >
            
            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Infobar Left */}
              <div className="md:col-span-5 bg-[#FAF9F6] dark:bg-slate-950/45 border-r border-slate-200/60 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#008080] dark:text-teal-450 bg-teal-50 dark:bg-teal-950/30 px-3 py-1 rounded inline-block">
                    ADMISSION INQUIRIES
                  </span>

                  <h3 className="font-display font-black text-2xl text-slate-900 dark:text-white leading-tight">
                    Start Your Fluency Transformation today!
                  </h3>

                  <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                    Submit this query sheet, and Atharva Naik's core trainer desk will construct a free, personalized 1-on-1 speaking diagnostic session.
                  </p>
                </div>

                <div className="space-y-4 pt-10 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex gap-2.5 items-start text-xs text-slate-650 dark:text-slate-300">
                    <MapPin className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>Guruwar Peth, Pune – 411042</span>
                  </div>

                  <div className="flex gap-2.5 items-start text-xs text-slate-650 dark:text-slate-300">
                    <CheckCircle className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                    <span>7:00 AM – 11:00 PM (IST) Slotting</span>
                  </div>

                  <a
                    href="https://maps.app.goo.gl/mmq77X3JPQMBjueDA?g_st=ac"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:underline"
                  >
                    View Class Map Location
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Consultation Input Form Right */}
              <div className="md:col-span-12 lg:col-span-7 p-6 sm:p-8 dark:bg-slate-900/30">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-indigo-610 dark:text-indigo-400 animate-pulse" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#008080] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 px-3 py-1 rounded inline-block">
                      Free Trial Assignment
                    </span>
                  </div>
                  <h4 className="font-display font-black text-xl text-slate-900 dark:text-white leading-tight">
                    Book Consultation and Free Slot
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-semibold leading-normal">
                    Fill the form below to claim your guaranteed 1-on-1 counselor audit. Available 24/7.
                  </p>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Atharva Thorat"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100/50 dark:hover:bg-slate-950/60 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:border-indigo-550 focus:dark:focus:border-indigo-400 focus:bg-white focus:dark:bg-slate-950 rounded-xl py-2.5 px-3.5 text-xs font-semibold dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 shadow-xs"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 89996 30240"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100/50 dark:hover:bg-slate-950/60 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:border-indigo-550 focus:dark:focus:border-indigo-400 focus:bg-white focus:dark:bg-slate-950 rounded-xl py-2.5 px-3.5 text-xs font-semibold dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 shadow-xs"
                    />
                  </div>

                  {/* Choose program */}
                  <div>
                    <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Choose Your Program *
                    </label>
                    <select
                      required
                      value={bookingCourse}
                      onChange={(e) => setBookingCourse(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:border-indigo-550 focus:dark:focus:border-indigo-400 focus:bg-white focus:dark:bg-slate-950 rounded-xl py-2.5 px-3.5 text-xs font-semibold dark:text-slate-100 cursor-pointer transition-all duration-200 shadow-xs"
                    >
                      <option value="" className="dark:bg-slate-900 dark:text-white">-- Choose a course --</option>
                      {COURSES.map((c) => (
                        <option key={c.id} value={c.title} className="dark:bg-slate-900 dark:text-white">
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message message-box */}
                  <div>
                    <label className="block text-xs font-bold text-slate-555 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Brief Goals / Level details (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. I need to achieve IELTS Band 7.5 for my master's degree in Australia, or need help with workplace spoken fluency."
                      value={bookingMessage}
                      onChange={(e) => setBookingMessage(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100/50 dark:hover:bg-slate-950/60 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:border-indigo-555 focus:dark:focus:border-indigo-400 focus:bg-white focus:dark:bg-slate-950 rounded-xl py-2.5 px-3.5 text-xs font-semibold dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 resize-none shadow-xs"
                    ></textarea>
                  </div>

                  {/* Form alerts */}
                  {bookingSuccess && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-350 text-xs rounded-xl font-medium flex items-center gap-2"
                     >
                       <CheckCircle className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 animate-bounce" />
                       <span>{bookingSuccess}</span>
                     </motion.div>
                  )}

                  {bookingError && (
                     <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/30 text-rose-800 dark:text-rose-350 text-xs rounded-xl font-medium flex items-center gap-2"
                     >
                       <X className="h-4.5 w-4.5 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                       <span>{bookingError}</span>
                     </motion.div>
                  )}

                  {/* Action triggers */}
                  <motion.button
                    whileHover={{ scale: 1.015, y: -0.5 }}
                    whileTap={{ scale: 0.985 }}
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-500 hover:opacity-95 shadow-lg shadow-indigo-500/20 text-white text-xs font-black rounded-xl uppercase tracking-widest transition duration-200 disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2 border border-indigo-500/20 group"
                  >
                    <span>{isSubmittingBooking ? "Booking Slot..." : "Secure My Free Personal Slot"}</span>
                    <ArrowRight className="h-4 w-4 stroke-[2.5] text-indigo-200 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </form>
              </div>

            </div>

          </motion.div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#F3F2EC] dark:bg-[#070c1e] text-slate-600 dark:text-slate-400 text-xs border-t border-slate-200/80 dark:border-slate-800/80 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200/60 dark:border-slate-800/40">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4 text-left">
            <a 
              href="#hero-section" 
              className="inline-block transition-transform duration-200 hover:scale-[1.01] active:scale-98"
              aria-label="Back to top"
            >
              <Logo showText={true} className="h-9 w-9" darkBackground={false} />
            </a>
            <p className="text-slate-600 dark:text-slate-350 text-xs leading-relaxed max-w-sm mt-3">
              SUCCESS ENGLISH CLASSES is a premier online training institute founded in 2019 by Atharva Naik (Ivan). We have helped over 300+ IELTS participants and 250+ IT professionals achieve their communication and speaking objectives.
            </p>
            <div className="flex gap-3 pt-1 text-slate-550 dark:text-slate-400">
              <span className="p-1.5 bg-[#FAF9F6] dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-amber-400 transition">
                <Instagram className="h-4 w-4" />
              </span>
              <span className="p-1.5 bg-[#FAF9F6] dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-amber-400 transition">
                <Facebook className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3.5 text-left">
            <h4 className="font-display font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Explore Programs
            </h4>
            <ul className="space-y-2">
              {COURSES.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <a href="#courses-section" className="text-slate-500 dark:text-slate-400 hover:text-indigo-650 dark:hover:text-amber-400 transition-colors duration-200">
                    Custom {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address channels */}
          <div className="md:col-span-4 space-y-3.5 text-left">
            <h4 className="font-display font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Our Location and Contact
            </h4>
            <ul className="space-y-4 text-slate-500 dark:text-slate-400">
              <li className="flex gap-2.5 items-start">
                <MapPin className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>
                  Guruwar Peth, Pune – 411042, Maharashtra, India.
                </span>
              </li>
              <li className="flex gap-2.5 items-start">
                <Phone className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                <a href={defaultWAUrl} className="hover:text-indigo-600 dark:hover:text-amber-400 transition font-bold font-mono text-slate-700 dark:text-slate-200">
                  +91 89996 30240
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/mmq77X3JPQMBjueDA?g_st=ac"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-605 dark:text-indigo-400 font-bold hover:underline py-1.5 px-3 bg-[#FAF9F6] dark:bg-slate-900/65 border border-slate-200/60 dark:border-slate-800/80 rounded-lg text-[10px] uppercase tracking-wider shadow-xs hover:bg-[#F3F2EC] dark:hover:bg-slate-800/80"
                >
                  Direct Google Maps Link
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Brand footer bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 dark:text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} SUCCESS ENGLISH CLASSES. Estd 2019. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Founded by Atharva Naik (Ivan)</span>
            <span className="text-slate-500 dark:text-slate-400 font-medium">Online 1-to-1 Learning</span>
          </div>
        </div>
      </footer>

      {/* DETAILED COURSE MODEL EXPANSION DRAWER */}
      {selectedCourseDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-slate-100 shadow-2xl animate-fade-in text-slate-850 flex flex-col justify-between">
            
            {/* Modal Title bar */}
            <div className="bg-gradient-to-r from-sky-750 to-sky-850 text-white p-6 relative">
              <button
                onClick={() => setSelectedCourseDetail(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-1.5 rounded-full text-white transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-sky-200 uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded-md inline-block">
                  Syllabus Breakdown • {selectedCourseDetail.duration}
                </span>
                <h3 className="font-display font-black text-xl text-white pr-6">
                  {selectedCourseDetail.title}
                </h3>
              </div>
            </div>

            {/* Modal Content area */}
            <div className="p-6 overflow-y-auto space-y-5 max-h-[360px]">
              <div>
                <h4 className="text-[10px] uppercase font-bold text-sky-600 tracking-wider mb-1.5">Course overview</h4>
                <p className="text-xs text-slate-650 leading-relaxed">
                  {selectedCourseDetail.fullDesc}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase font-bold text-sky-600 tracking-wider mb-1.5">Target student background:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCourseDetail.whoIsItFor.map((who, wIdx) => (
                    <span key={wIdx} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-slate-200/45">
                      {who}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-[10px] uppercase font-bold text-sky-600 tracking-wider mb-1.5">Key topics trained</h4>
                <ul className="space-y-2">
                  {selectedCourseDetail.keyTopics.map((topic, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex-shrink-0 flex items-center justify-center font-bold text-[9px] text-indigo-700 mt-0.5">
                        {tIdx + 1}
                      </span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Action panel */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <a
                href={directRegisterWAUrl(selectedCourseDetail.title)}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5"
              >
                <Phone className="h-3.5 w-3.5" />
                Register via WhatsApp
              </a>

              <button
                onClick={() => {
                  setBookingCourse(selectedCourseDetail.title);
                  setBookingMessage(`Hi, I'm interested in the ${selectedCourseDetail.title} course.`);
                  setSelectedCourseDetail(null);
                  document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 px-4 rounded-xl"
              >
                Book 1-on-1 Online Slot
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SUCCESS THANK YOU MODAL */}
      {submittedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full overflow-hidden border border-slate-100 dark:border-slate-850 shadow-2xl flex flex-col text-slate-850 dark:text-slate-100"
          >
            {/* Celebration header header */}
            <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-8 text-white text-center relative overflow-hidden">
              {/* Confetti decoration circles */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-violet-500/20 rounded-full blur-xl animate-pulse"></div>
              
              <button
                onClick={() => {
                  setSubmittedBooking(null);
                  setBookingSuccess(null);
                }}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mx-auto w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mb-4 border border-white/25 shadow-lg animate-bounce">
                <CheckCircle className="h-10 w-10 text-emerald-400 fill-white" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" />
                  <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest">
                    Slot Reserved Successfully
                  </span>
                  <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
                </div>
                <h3 className="font-display font-black text-2xl text-white tracking-tight">
                  Thank You, {submittedBooking.name}!
                </h3>
              </div>
            </div>

            {/* Modal details block */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-705 dark:text-slate-300">
              <p className="text-sm text-center leading-relaxed font-semibold">
                Your consultation request has been recorded. Our team will design a personalized syllabus preview and get in touch with you shortly!
              </p>

              {/* Booking metadata card */}
              <div className="bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-4 sm:p-5 border border-slate-150 dark:border-slate-800 space-y-3.5">
                <h4 className="text-[10px] uppercase font-bold text-indigo-650 dark:text-indigo-400 tracking-widest border-b border-indigo-100/50 dark:border-indigo-900/30 pb-2">
                  Session Confirmation Summary
                </h4>
                
                <div className="grid grid-cols-1 gap-3 text-xs leading-relaxed">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-650 dark:text-indigo-400">
                      <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Assigned Program</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{submittedBooking.course}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-650 dark:text-indigo-400">
                      <Phone className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Registered WhatsApp Number</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{submittedBooking.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-650 dark:text-indigo-400">
                      <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Guaranteed Response Time</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-405">Within 24 Hours on WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center space-y-1 bg-[#EEF2FF] dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-1">What happens next?</span>
                Ivan Atharva (Founder) or a senior training counselor will send a welcome note to schedule your free 1-to-1 live audio/video mock evaluation slot.
              </div>
            </div>

            {/* Quick Actions Footer Footer */}
            <div className="bg-slate-50 dark:bg-slate-950/20 px-6 py-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppLink(`Hi Ivan, I've just submitted a secure consultation form for the ${submittedBooking.course} program. Let's arrange my free trial demo!`)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-2 transition duration-200 shadow-md hover:shadow-emerald-500/10 cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
                Chat Now on WhatsApp
              </a>
              
              <button
                onClick={() => {
                  setSubmittedBooking(null);
                  setBookingSuccess(null);
                }}
                className="bg-slate-200 dark:bg-slate-850 hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition duration-200 cursor-pointer text-center font-display"
              >
                Explore Site
              </button>
            </div>

          </motion.div>
        </div>
      )}

      {/* FLOATING QUICK WHATSAPP CHAT BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-40"
      >
        <a
          href={getWhatsAppLink("Hi Ivan Atharva, I'm visiting the Success English Classes website and would like instant guidance for spoken English or IELTS courses. Please connect me to a mentor.")}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-3.5 rounded-full shadow-xl hover:shadow-emerald-500/20 active:scale-95 transition-all duration-300 hover:scale-105 group"
          id="floating-quick-chat"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <MessageCircle className="h-4 w-4 stroke-[2.5]" />
          <span className="font-display font-extrabold uppercase tracking-widest text-[9px] sm:text-[10px]">
            Quick Chat
          </span>
        </a>
      </motion.div>

    </div>
  );
}
