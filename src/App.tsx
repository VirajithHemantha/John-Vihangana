import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Cross, Play, Pause } from "lucide-react";
import { translations, type Lang, type Translation } from "./translations";

/**
 * Premium White & Green Wedding Invitation Theme
 * Names: Vihangana & John
 * Background: White
 * Accents: Green
 */

const backgroundMusic = "/fani_ellie-goulding-love-me-like-you-do-mp3.mp3";


const flowerCornerImage = "/silver_orchid_corner.png";
const flowerArchImage = "/silver_orchid_arch.png";
const brideImage = "/vihangana_bride_1791369616091.jpg";
const groomImage = "/john_groom_1791369632715.jpg";

type InviteImageProps = React.ComponentProps<"img"> & {
  eager?: boolean;
};

function InviteImage({ eager = false, loading, decoding, ...props }: InviteImageProps) {
  return (
    <img
      loading={loading ?? (eager ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      {...props}
    />
  );
}

function GoldRings({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 110" className={className} role="img" aria-label="Two gold wedding rings">
      <defs>
        <linearGradient id="goldBand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF3C4" />
          <stop offset="25%" stopColor="#E8C46A" />
          <stop offset="50%" stopColor="#B8862E" />
          <stop offset="75%" stopColor="#F1D58A" />
          <stop offset="100%" stopColor="#9C6F1E" />
        </linearGradient>
        <linearGradient id="goldBand2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF3C4" />
          <stop offset="30%" stopColor="#D9AE52" />
          <stop offset="55%" stopColor="#A87A26" />
          <stop offset="80%" stopColor="#F4DC98" />
          <stop offset="100%" stopColor="#8F6419" />
        </linearGradient>
        <filter id="ringShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#7a5a1a" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#ringShadow)">
        {/* Left ring */}
        <ellipse cx="60" cy="58" rx="36" ry="34" fill="none" stroke="url(#goldBand)" strokeWidth="9" />
        <ellipse cx="60" cy="58" rx="36" ry="34" fill="none" stroke="#FFF8DC" strokeOpacity="0.55" strokeWidth="1.5" transform="translate(-1.5 -1.5)" />
        {/* Right ring */}
        <ellipse cx="100" cy="52" rx="36" ry="34" fill="none" stroke="url(#goldBand2)" strokeWidth="9" />
        <ellipse cx="100" cy="52" rx="36" ry="34" fill="none" stroke="#FFF8DC" strokeOpacity="0.55" strokeWidth="1.5" transform="translate(-1.5 -1.5)" />
        {/* Re-draw part of the left ring on top so the rings interlock */}
        <path d="M 89 38 A 36 34 0 0 1 93 72" fill="none" stroke="url(#goldBand)" strokeWidth="9" strokeLinecap="butt" />
      </g>
      {/* Sparkles */}
      <path d="M128 14 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 z" fill="#F4DC98" />
      <path d="M30 20 l1.3 4 4 1.3 -4 1.3 -1.3 4 -1.3 -4 -4 -1.3 4 -1.3 z" fill="#E8C46A" />
    </svg>
  );
}

function MandalaFrame({ minimal = false }: { minimal?: boolean }) {
  return (
    <div className="mandala-frame pointer-events-none fixed inset-0 z-[12] overflow-hidden" aria-hidden="true">
    </div>
  );
}

function FloatingPetals({ disabled = false, vibrant = false }: { disabled?: boolean; vibrant?: boolean }) {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    if (disabled) {
      setPetals([]);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    // Only a few flakes on screen at a time
    const flakeCount = isMobile ? 4 : 5;
    const newPetals = Array.from({ length: flakeCount }).map((_, i) => ({
      id: i,
      // Spread evenly across the width so the few flakes don't bunch together
      x: ((i + 0.2 + Math.random() * 0.6) / flakeCount) * 100,
      // Mix of small and larger flakes for depth
      size: Math.random() * 14 + (isMobile ? 10 : 12),
      rotation: Math.random() * 360,
      duration: Math.random() * 8 + 12,
      // Spread start points across the cycle so snow is already falling on load
      delay: Math.random() * 20,
      // Which of the six snowflake images (flake1.webp ... flake6.webp) to use
      color: `/flake${(i % 6) + 1}.webp`,
      drift: Math.random() * 6 - 3,
    }));

    setPetals(newPetals);
  }, [disabled, vibrant]);

  if (disabled) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-40" aria-hidden="true">
      <style>{`
        @keyframes snow-fall {
          0%   { transform: translate3d(0, -6vh, 0) rotate(var(--rot)); opacity: 0; }
          6%   { opacity: 0.95; }
          50%  { transform: translate3d(var(--drift), 50vh, 0) rotate(calc(var(--rot) + 90deg)); }
          92%  { opacity: 0.85; }
          100% { transform: translate3d(0, 106vh, 0) rotate(calc(var(--rot) + 180deg)); opacity: 0; }
        }
      `}</style>
      {petals.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-0 will-change-transform"
          style={{
            left: `${flake.x}vw`,
            ["--rot" as string]: `${flake.rotation}deg`,
            ["--drift" as string]: `${flake.drift}vw`,
            animation: `snow-fall ${isLowPowerMode ? flake.duration * 1.15 : flake.duration}s ease-in-out ${-flake.delay}s infinite`,
          }}
        >
          <img
            src={flake.color}
            alt=""
            width={flake.size}
            height={flake.size}
            draggable={false}
            className="block select-none"
            style={{ width: flake.size, height: flake.size, opacity: flake.size > 20 ? 0.85 : 0.95 }}
          />
        </div>
      ))}
    </div>
  );
}

function CountdownTimer({ t }: { t: Translation }) {
  const targetDate = new Date("Apr 08, 2027 08:30:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: t.days, value: days },
    { label: t.hours, value: hours },
    { label: t.minutes, value: minutes },
    { label: t.seconds, value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          {/* Ornamental Frame container */}
          <div className="relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 bg-gradient-to-b from-white to-gold-50 rounded-t-full shadow-[0_15px_35px_-10px_rgba(30,50,88,0.18)] border border-gold-300/70 flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 group-hover:-translate-y-3">
            <div className="absolute top-0 right-0 opacity-[0.03] paper-grain w-full h-full pointer-events-none" />
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] border-theme-300/70 rounded-t-full pointer-events-none" />

            {/* The Number */}
            <span className="text-[25px] sm:text-3xl md:text-5xl font-cinzel font-bold gold-text leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110">
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className="text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-stone-500 font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-stone-50 rounded-full border border-theme-100/50 shadow-sm whitespace-nowrap">
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 bg-theme-300" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxuGTj0NvL9KnWdpCBx7rawtYHWRtHSwllWSYEONdnhaIPyTnFvJGOp2srwBrNpoant/exec";

// Wedding event for "Save Our Date" (8:30 AM Sri Lanka time = 03:00 UTC)
const EVENT = {
  title: "John & Vihangana's Wedding",
  start: "20270408T030000Z",
  end: "20270408T070000Z",
  location: "St. Mary's Church, Bambalapitiya, Sri Lanka",
  details: "Holy Mass & Wedding Ceremony, followed by the wedding tea table. https://john-vihangana-weddinginvitation.vercel.app/",
};

const googleCalendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(EVENT.title)}` +
  `&dates=${EVENT.start}/${EVENT.end}` +
  `&location=${encodeURIComponent(EVENT.location)}` +
  `&details=${encodeURIComponent(EVENT.details)}`;

function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//John & Vihangana//Wedding//EN",
    "BEGIN:VEVENT",
    "UID:john-vihangana-wedding-20270408",
    `DTSTAMP:${EVENT.start}`,
    `DTSTART:${EVENT.start}`,
    `DTEND:${EVENT.end}`,
    `SUMMARY:${EVENT.title}`,
    `LOCATION:${EVENT.location.replace(/,/g, "\\,")}`,
    `DESCRIPTION:${EVENT.details.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "john-vihangana-wedding.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Envelope opening screen shown before the intro video.
 * Closed envelope floats over the gate background; tapping opens it to reveal the card.
 */
function EnvelopeIntro({
  t,
  greeting,
  onOpen,
  onContinue,
}: {
  t: Translation;
  greeting: string | null;
  onOpen: () => void;
  onContinue: () => void;
}) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    onOpen();
  };

  // After the card has been shown for a moment, move on to the intro video automatically
  const onContinueRef = React.useRef(onContinue);
  onContinueRef.current = onContinue;
  useEffect(() => {
    if (!opened) return;
    const timer = setTimeout(() => onContinueRef.current(), 3500);
    return () => clearTimeout(timer);
  }, [opened]);

  return (
    <motion.div
      key="envelope-intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Gate background: wide image on desktop, tall image on mobile */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none">
        <source media="(min-width: 768px)" srcSet="/gate-web.webp" />
        <img src="/gate-mobile.webp" alt="" className="w-full h-full object-cover" />
      </picture>
      <div className="absolute inset-0 bg-white/20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-4 w-full">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex flex-col items-center mb-4 md:mb-6"
        >
          <img src="/floral-spray.webp" alt="" className="w-[260px] md:w-[360px] h-auto opacity-90" />
          <h1 className="font-playball text-[2.6rem] md:text-[3.5rem] text-theme-900 leading-tight drop-shadow-sm -mt-1">
            {t.youAreInvited}
          </h1>
          {greeting && (
            <p className="font-cinzel text-[13px] md:text-base text-gold-600 font-semibold tracking-[0.2em] mt-1">
              {greeting}
            </p>
          )}
        </motion.div>

        {/* Envelope */}
        <motion.button
          type="button"
          onClick={handleOpen}
          aria-label={t.tapToOpen}
          initial={{ opacity: 0, y: 40 }}
          animate={opened ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
          transition={opened ? { duration: 0.5 } : { opacity: { duration: 1, delay: 0.6 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
          className={`relative w-[min(86vw,420px)] aspect-[1099/1299] ${opened ? "cursor-default" : "cursor-pointer"}`}
          style={{ containerType: "inline-size" }}
        >
          {/* Closed envelope */}
          <motion.img
            src="/envelope-closed.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(30,50,88,0.35)]"
            animate={{ opacity: opened ? 0 : 1 }}
            transition={{ duration: 0.7 }}
          />
          {/* Open envelope with card */}
          <motion.img
            src="/envelope-open-card.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(30,50,88,0.35)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 20 }}
            transition={{ duration: 0.8, delay: opened ? 0.2 : 0 }}
          />

          {/* Card text, placed over the white card */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.9 }}
                className="absolute left-[20%] right-[20%] top-[28.5%] flex flex-col items-center text-center text-theme-900"
              >
                <p className="font-cinzel text-[3cqw] tracking-[0.15em] text-theme-700">{t.cardFamilies}</p>
                <p className="font-playball text-[7.5cqw] leading-tight mt-[1.5cqw]">
                  {t.groomFirst} <span className="text-gold-500">&amp;</span> {t.brideFirst}
                </p>
                <p className="font-serif italic text-[3.2cqw] text-zinc-600 mt-[1.5cqw] leading-snug">{t.cardInvite}</p>
                <div className="flex items-center gap-[2cqw] mt-[2cqw]">
                  <span className="h-px w-[6cqw] bg-gold-400" />
                  <span className="font-cinzel text-[3.6cqw] font-bold text-gold-600 tracking-[0.2em]">08 · 04 · 2027</span>
                  <span className="h-px w-[6cqw] bg-gold-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Tap prompt (hidden once opened) */}
        <div className="h-12 mt-5 flex items-start justify-center">
          <AnimatePresence>
            {!opened && (
              <motion.p
                key="tap"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                className="font-cinzel text-[12px] md:text-sm uppercase tracking-[0.4em] text-theme-800 font-bold"
              >
                {t.tapToOpen}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Language (English / Sinhala). ?lang=si in the link also opens in Sinhala.
  const [lang, setLang] = useState<Lang>(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "si" || fromUrl === "en") return fromUrl;
    try {
      const saved = localStorage.getItem("invite-lang");
      if (saved === "si" || saved === "en") return saved;
    } catch {}
    return "en";
  });
  const t = translations[lang];
  const changeLang = (next: Lang) => {
    setLang(next);
    try { localStorage.setItem("invite-lang", next); } catch {}
  };
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const languageSwitch = (
    <div className="flex items-center bg-white/90 backdrop-blur-md rounded-full border-2 border-theme-400/40 p-1" role="group" aria-label="Language">
      {(["en", "si"] as const).map((code) => (
        <button
          key={code}
          onClick={() => changeLang(code)}
          aria-pressed={lang === code}
          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all duration-300 ${lang === code ? "bg-theme-800 text-white shadow" : "text-theme-800 hover:text-gold-600"}`}
        >
          {code === "en" ? "EN" : "සිං"}
        </button>
      ))}
    </div>
  );

  // RSVP attendance choice
  const [attending, setAttending] = useState(true);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(e => console.log("Audio play failed", e));
    } else {
      audio.pause();
    }
  };

  // Guest Details from URL
  const params = new URLSearchParams(window.location.search);
  const guestPrefix = params.get('p');
  const guestName = params.get('n');
  const hasGuest = guestPrefix && guestName;

  // Form State
  const [rsvpData, setRsvpData] = useState({ name: guestName || "", guests: "1", dietary: "" });
  const [wishData, setWishData] = useState({ name: guestName || "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "rsvp_success" | "wish_success" | "error">(null);

  const handleSubmit = async (formName: "rsvp" | "wish", data: any) => {
    if (!SCRIPT_URL) {
      alert("Please configure the SCRIPT_URL in App.tsx to enable form submissions.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const params = new URLSearchParams();
      params.append("formName", formName);

      // Explicit mapping of keys to Sheet Headers
      const fieldMapping: Record<string, string> = {
        name: "Name",
        guests: "Guests",
        dietary: "Dietary Notes",
        message: "Message"
      };

      Object.keys(data).forEach(key => {
        const headerName = fieldMapping[key] || key;
        params.append(headerName, data[key]);
      });

      // Using GET with no-cors is the most reliable way to trigger Google Apps Script
      // even if the browser blocks the JSON response due to CORS redirects.
      await fetch(`${SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache'
      });

      // Since we use no-cors, we can't read the response, so we assume success if no exception
      setSubmitStatus(`${formName}_success` as any);

      // Reset forms
      if (formName === "rsvp") { setRsvpData({ name: guestName || "", guests: "1", dietary: "" }); setAttending(true); }
      else setWishData({ name: guestName || "", message: "" });

    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };


  const openInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
  };

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    }).connection;
    const getDeviceMemory = () => (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    const updatePerformanceMode = () => {
      const constrainedNetwork = Boolean(connection?.saveData) || /2g/.test(connection?.effectiveType ?? "");
      const lowMemory = typeof getDeviceMemory() === "number" && getDeviceMemory()! <= 4;
      const smallScreen = window.innerWidth < 768;
      setIsLowPerformanceMode(motionMedia.matches || constrainedNetwork || lowMemory || smallScreen);
    };

    updatePerformanceMode();
    motionMedia.addEventListener("change", updatePerformanceMode);
    window.addEventListener("resize", updatePerformanceMode);
    connection?.addEventListener?.("change", updatePerformanceMode);

    return () => {
      motionMedia.removeEventListener("change", updatePerformanceMode);
      window.removeEventListener("resize", updatePerformanceMode);
      connection?.removeEventListener?.("change", updatePerformanceMode);
    };
  }, []);

  return (
    <main
      lang={lang}
      className={`h-[100dvh] w-full bg-[#FFFFFF] transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden smooth-mobile-scroll" : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <audio
        ref={audioRef}
        src={backgroundMusic}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {/* Language Switch */}
      <div className="fixed top-6 left-6 z-[300] shadow-xl rounded-full">{languageSwitch}</div>
      <MandalaFrame minimal={isLowPerformanceMode} />
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {showEnvelope ? (
          <EnvelopeIntro
            t={t}
            greeting={hasGuest ? (guestPrefix!.toLowerCase() === "dear" ? `${t.dear} ${guestName}` : `${t.dear} ${guestPrefix} ${guestName}`) : null}
            onOpen={() => {
              audioRef.current?.play().catch(e => console.log("Audio play failed", e));
            }}
            onContinue={() => setShowEnvelope(false)}
          />
        ) : !isOpened ? (
          <motion.div
            key="video-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              transition: { duration: 1, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden"
          >
            {/* Soft blue & gold background glows */}
            <div className="absolute inset-0 bg-gradient-to-br from-theme-50 via-white to-theme-100" />

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
                x: [-20, 20, -20],
                y: [-20, 20, -20]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] -left-[10%] w-[60%] aspect-square bg-gradient-to-br from-theme-300/40 to-theme-200/30 blur-[120px] rounded-full"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.15, 0.25, 0.15],
                x: [20, -20, 20],
                y: [20, -20, 20]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[15%] -right-[15%] w-[70%] aspect-square bg-gradient-to-tl from-gold-200/50 to-theme-200/40 blur-[140px] rounded-full"
            />

            <FloatingPetals disabled={isLowPerformanceMode} vibrant={true} />

            <div className="absolute inset-0 opacity-10 paper-grain pointer-events-none" />

            {/* Background Video Strip for Mobile / Full for Desktop */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-[35vh] md:h-full group">
                <video
                  autoPlay
                  muted
                  playsInline
                  onEnded={openInvitation}
                  onError={openInvitation}
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (v.duration) setVideoProgress(v.currentTime / v.duration);
                  }}
                  className="w-full h-full object-cover shadow-[0_25px_60px_-15px_rgba(30,50,88,0.25)] mix-blend-multiply"
                  src="/Use_the_uploaded_202604161807.mp4"
                />
                {/* Gold hairlines framing the strip on mobile */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent md:hidden" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 md:hidden" />
              </div>
            </div>

            {/* Soft fade at the bottom so the caption reads clearly on desktop */}
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-white/90 via-white/50 to-transparent pointer-events-none" />

            {/* Elegant caption: names, date and a gold line that fills as the video plays */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="relative z-[101] mt-auto mb-16 md:mb-20 flex flex-col items-center text-center px-6 pointer-events-none"
            >
              <p className="font-playball text-[2.4rem] md:text-[3.5rem] text-theme-900 leading-tight drop-shadow-sm">
                {t.groomFirst} <span className="text-gold-500">&amp;</span> {t.brideFirst}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-gold-400" />
                <span className="font-cinzel text-[12px] md:text-sm font-bold text-gold-600 tracking-[0.35em]">08 · 04 · 2027</span>
                <span className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-gold-400" />
              </div>
              <div className="mt-6 w-40 md:w-56 h-[2px] rounded-full bg-theme-200/60 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 transition-[width] duration-300 ease-linear"
                  style={{ width: `${Math.round(videoProgress * 100)}%` }}
                />
              </div>
            </motion.div>

            {/* Monogram */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <p className="font-cinzel text-[11px] tracking-[0.8em] font-bold uppercase flex flex-col items-center gap-3">
                <span className="text-gold-600 opacity-90">{t.monogram}</span>
                <span className="h-px w-8 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              </p>
            </div>

            {/* Corner flowers */}
            <div className="absolute top-0 left-0 w-44 h-44 pointer-events-none overflow-hidden z-20">
              <img src={flowerCornerImage} className="w-full h-full object-contain -rotate-90" alt="" />
            </div>
            <div className="absolute top-0 right-0 w-44 h-44 pointer-events-none overflow-hidden z-20">
              <img src={flowerCornerImage} className="w-full h-full object-contain" alt="" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >
            {/* Sticky Return Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border-2 border-theme-400/40 text-theme-800 hover:bg-theme-50 transition-all hover:scale-110"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">{t.close}</div>
              </div>
            </motion.button>

            {/* Music Play / Pause Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              onClick={toggleMusic}
              aria-label={isPlaying ? t.pauseMusic : t.playMusic}
              className="fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-xl border-2 border-theme-400/40 text-theme-800 hover:bg-theme-50 transition-all hover:scale-110"
            >
              {isPlaying && (
                <span className="absolute inset-0 rounded-full border-2 border-theme-400/50 animate-ping pointer-events-none" />
              )}
              {isPlaying ? (
                <Pause className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Play className="w-5 h-5 md:w-6 md:h-6 ml-0.5" />
              )}
            </motion.button>

            {/* Hero Section */}
            <section id="home" 
              className="min-h-[100dvh] w-full flex items-center justify-center p-4 md:p-12 relative overflow-hidden bg-center bg-cover"
              style={{ backgroundImage: "url('/ChatGPT Image Aug 29, 2026, 04_06_21 AM.png')" }}
            >
              {/* Background texture (optional, keep for effect) */}
              <div className="absolute inset-0 opacity-[0.03] paper-grain" />

              {/* Large Watermark Monogram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-cinzel text-[40vw] text-theme-900 pointer-events-none whitespace-nowrap leading-none select-none z-0"
              >
                {t.monogramLarge}
              </motion.div>

              {/* Central Content Container */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                className="relative z-10 w-full max-w-[420px] min-h-[500px] h-[85vh] md:h-[80vh] flex flex-col items-center justify-center p-6 pt-12 md:p-10 md:pt-16"
              >

                <div className="mb-10" />

                <div className="flex flex-col items-center text-center space-y-4 flex-1 w-full relative z-10">
                  <div className="mb-4" />

                  <div className="space-y-0 py-4 flex-1 flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                      className="flex justify-center mb-4 md:mb-6"
                    >
                      <GoldRings className="w-24 md:w-32 h-auto" />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                      className="font-cinzel text-[12px] md:text-[15px] uppercase tracking-[0.35em] md:tracking-[0.45em] text-gold-600 font-semibold mb-4 md:mb-6"
                    >
                      {t.walkingDownAisle}
                    </motion.p>
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="font-playball text-[3.4rem] sm:text-[4rem] md:text-[5.6rem] script-gradient leading-[1.1] drop-shadow-sm"
                    >
                      {t.groomFirst}
                    </motion.h1>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="font-playball text-[36px] md:text-6xl gold-text font-light my-1 md:my-3"
                    >
                      &
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                      className="font-playball text-[3.4rem] sm:text-[4rem] md:text-[5.6rem] script-gradient leading-[1.1] drop-shadow-sm"
                    >
                      {t.brideFirst}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6, duration: 0.8 }}
                      className="font-cinzel text-[14px] md:text-[18px] tracking-[0.15em] md:tracking-[0.2em] text-theme-800 font-semibold mt-4 md:mt-6"
                    >
                      {t.heroDate}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8, duration: 1 }}
                      className="mt-6 md:mt-10"
                    >
                      <span className="inline-block text-[10px] md:text-[13px] uppercase tracking-[0.6em] md:tracking-[0.8em] text-zinc-800 font-bold px-5 py-2 rounded-full bg-theme-100/40 border border-theme-200/30">
                        {t.pleaseJoinUs}
                      </span>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="mt-auto pb-4 w-full flex flex-col items-center"
                  >
                    <div className="flex items-center justify-center gap-4 mb-6 opacity-70 w-full px-8">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-300 to-gold-400" />
                      <div className="w-1.5 h-1.5 rotate-45 bg-gold-500 shrink-0" />
                      <div className="h-px w-full bg-gradient-to-l from-transparent via-gold-300 to-gold-400" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group"
              >
                <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-stone-400 font-bold group-hover:text-theme-600 transition-colors">{t.begin}</span>
                <div className="w-px h-10 md:h-12 relative overflow-hidden bg-stone-200">
                  <motion.div
                    animate={{ y: [-40, 60] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-full h-8 bg-theme-500"
                  />
                </div>
              </motion.div>

            </section>


            {/* Wedding Details Section */}
            <section id="details" className="scroll-mt-20 cv-auto py-24 md:py-32 w-full flex flex-col items-center px-4 relative bg-gradient-to-b from-white via-theme-50 to-gold-50">
              <div className="section-floral-overlay absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
              </div>

              <div className="max-w-[1000px] w-full flex flex-col items-center text-center relative z-10">
                {/* Bible Verses */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full max-w-[320px] md:max-w-xl flex flex-col items-center mb-4 md:mb-8"
                >
                  <Sparkles className="w-6 h-6 text-gold-400 mb-6" />

                  <div className="space-y-4 flex flex-col items-center text-center">
                    <p className="font-serif italic text-[20px] md:text-[1.7rem] text-theme-800 leading-relaxed px-4">
                      {t.verse1}
                    </p>
                    <h4 className="font-cinzel text-[14px] md:text-lg text-gold-600 tracking-[0.2em] font-bold px-4">
                      {t.verse1Ref}
                    </h4>
                  </div>

                  <div className="my-6 md:my-8 flex items-center gap-3 opacity-60">
                    <div className="h-px w-10 bg-gold-300" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-gold-400" />
                    <div className="h-px w-10 bg-gold-300" />
                  </div>

                  <div className="space-y-4 flex flex-col items-center text-center">
                    <p className="font-serif italic text-[20px] md:text-[1.7rem] text-theme-800 leading-relaxed px-4">
                      {t.verse2}
                    </p>
                    <h4 className="font-cinzel text-[14px] md:text-lg text-gold-600 tracking-[0.2em] font-bold px-4">
                      {t.verse2Ref}
                    </h4>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-8 md:mb-16"
                >
                  <div className="w-[2px] h-16 md:h-24 bg-gradient-to-b from-transparent via-theme-400 to-transparent mb-8 md:mb-12 shadow-[0_0_10px_rgba(192,192,192,0.3)]" />
                  <div className="text-zinc-800 text-center max-w-2xl px-6">
                    <span className="text-gold-600 block text-[10px] md:text-xs uppercase font-cinzel mb-4 md:mb-6 tracking-[0.5em] md:tracking-[0.6em] font-semibold drop-shadow-sm">
                      {t.sacredPromise}
                    </span>
                    <span className="text-theme-600 block text-[12px] md:text-sm font-cinzel mb-8 md:mb-12 tracking-[0.2em] font-medium drop-shadow-sm">
                      {t.twoHearts}
                    </span>
                    {hasGuest && (
                      <span className="block text-[31px] md:text-4xl font-playball text-gold-600 mb-8 capitalize tracking-wide drop-shadow-sm">
                        {guestPrefix.toLowerCase() === 'dear' ? `${t.dear} ${guestName},` : `${t.dear} ${guestPrefix} ${guestName},`}
                      </span>
                    )}
                    <p className="font-serif text-[18px] md:text-[1.4rem] leading-[1.8] md:leading-loose text-zinc-700 italic">
                      {t.inviteText}
                    </p>
                  </div>
                  <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-theme-400 to-transparent mt-8 md:mt-10 shadow-[0_0_10px_rgba(192,192,192,0.3)]" />
                </motion.div>

                {/* Couple Photo */}
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative mb-10 md:mb-14"
                >
                  <div className="absolute -inset-3 md:-inset-4 rounded-[2rem] bg-theme-200/35 blur-xl" />
                  <div className="relative bg-white/90 p-2.5 md:p-3 rounded-[2rem] border border-theme-200 shadow-[0_20px_50px_-20px_rgba(75,85,99,0.45)]">
                    <InviteImage
                      src="/WhatsApp Image 2026-10-09 at 04.58.44.jpeg"
                      alt="John and Vihangana"
                      className="w-[200px] h-[240px] md:w-[270px] md:h-[320px] object-cover rounded-[1.6rem] border border-theme-100"
                    />
                  </div>
                </motion.div>

                <div className="relative w-full flex flex-col md:flex-row items-center justify-center md:items-stretch gap-6 md:gap-10 my-12 md:my-20 z-10 px-2 lg:px-8">

                  {/* Vishan's Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[130px] md:rounded-br-[130px] overflow-hidden group flex flex-col justify-center text-center items-center"
                  >
                    <div className="absolute inset-2 border-[1.5px] border-theme-300/70 rounded-tl-[90px] rounded-br-[90px] md:rounded-tl-[120px] md:rounded-br-[120px] pointer-events-none shadow-[inset_0_0_15px_rgba(192,192,192,0.1)]" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="relative mb-8 group-hover:-translate-y-2 transition-transform duration-700">
                        <div className="absolute -inset-3 bg-gradient-to-tr from-theme-200 to-theme-100 rounded-t-full rounded-b-3xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                        <div className="relative w-32 h-44 md:w-40 md:h-56 rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] bg-theme-100">
                           <div className="absolute inset-0 border-[1.5px] border-theme-200/50 rounded-t-full rounded-b-3xl z-10 pointer-events-none" />
                           <img src={brideImage} alt="Bride" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 text-theme-400 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-700 delay-100">
                          <Sparkles className="w-6 h-6 md:w-8 md:h-8 drop-shadow-sm" />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">{t.daughterOf}</p>
                        <p className="text-[11px] md:text-xs font-cinzel text-stone-600 tracking-wide leading-relaxed">{t.brideFather}<br />{t.and} {t.brideMother}</p>
                      </div>
                      <h3 className="text-[22px] md:text-3xl font-playball script-gradient group-hover:scale-105 transition-transform duration-700 pt-5 drop-shadow-sm leading-tight">{t.brideFull}</h3>
                    </div>
                  </motion.div>

                  {/* Vertical Divider / AMPERSAND */}
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 py-4 md:py-0 relative z-20">
                    <div className="hidden md:block w-px h-32 bg-gradient-to-t from-theme-300 to-transparent" />
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-theme-500 to-theme-700 rounded-full flex items-center justify-center shadow-xl shadow-theme-900/20 border-4 border-gold-300"
                    >
                      <span className="text-[31px] md:text-5xl font-playball text-white md:-mt-1 drop-shadow-md">&</span>
                    </motion.div>
                    <div className="hidden md:block w-px h-32 bg-gradient-to-b from-theme-300 to-transparent" />
                  </div>

                  {/* Nathasha's Card - Offset structurally on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: 30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tr-[100px] rounded-bl-[100px] md:rounded-tr-[130px] md:rounded-bl-[130px] overflow-hidden group flex flex-col justify-center text-center items-center md:mt-24"
                  >
                    <div className="absolute inset-2 border-[1.5px] border-theme-300/70 rounded-tr-[90px] rounded-bl-[90px] md:rounded-tr-[120px] md:rounded-bl-[120px] pointer-events-none shadow-[inset_0_0_15px_rgba(192,192,192,0.1)]" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="relative mb-8 group-hover:-translate-y-2 transition-transform duration-700">
                        <div className="absolute -inset-3 bg-gradient-to-tr from-theme-200 to-theme-100 rounded-t-full rounded-b-3xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                        <div className="relative w-32 h-44 md:w-40 md:h-56 rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] bg-theme-100">
                           <div className="absolute inset-0 border-[1.5px] border-theme-200/50 rounded-t-full rounded-b-3xl z-10 pointer-events-none" />
                           <img src={groomImage} alt="Groom" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                        </div>
                        <div className="absolute -bottom-2 -left-2 text-theme-400 opacity-0 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-700 delay-100">
                          <Sparkles className="w-6 h-6 md:w-8 md:h-8 drop-shadow-sm" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-stone-400">{t.sonOf}</p>
                        <p className="text-[11px] md:text-xs font-cinzel text-stone-600 tracking-wide leading-relaxed">{t.late} {t.groomFather}<br />{t.and} {t.groomMother}</p>
                      </div>
                      <h3 className="text-[25px] md:text-3xl font-playball script-gradient group-hover:scale-105 transition-transform duration-700 pt-5 drop-shadow-sm leading-tight">{t.groomFull}</h3>
                    </div>
                  </motion.div>
                </div>

                {/* Date & Time Luxury Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center space-y-6 md:space-y-10 mt-2 md:mt-16 w-full"
                >
                  <div className="w-1.5 h-1.5 rotate-45 bg-theme-300" />

                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-32 text-center w-full max-w-4xl px-4">
                    <div className="flex flex-col items-center flex-1">
                      <Calendar className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-2 md:mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-1 md:mb-3">{t.theDate}</p>
                      <p className="font-cinzel text-[21px] md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">2027.04.08</p>
                      <p className="font-cinzel text-[19px] md:text-xl text-theme-600 tracking-[0.3em] font-normal mt-1 md:mt-2">{t.thursday}</p>
                    </div>

                    <div className="hidden md:flex flex-col items-center gap-3">
                      <div className="w-px h-12 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="w-px h-12 bg-theme-200" />
                    </div>

                    <div className="md:hidden flex flex-row items-center gap-3">
                      <div className="h-px w-10 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="h-px w-10 bg-theme-200" />
                    </div>

                    <div className="flex flex-col items-center flex-1">
                      <Clock className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-2 md:mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 font-bold mb-1 md:mb-3">{t.theTime}</p>
                      <p className="font-cinzel text-[21px] md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">{t.time}</p>
                      <p className="font-cinzel text-[13px] md:text-sm text-theme-600 tracking-[0.2em] mt-1 md:mt-3 uppercase">{t.onwards}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Countdown Section */}
            <section className="cv-auto py-24 md:py-36 bg-gradient-to-br from-theme-100 via-white to-gold-100 relative border-y border-gold-200/60 flex flex-col items-center overflow-hidden">
              {/* Premium Background Elements */}
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-theme-100 blur-[120px] rounded-full opacity-30 pointer-events-none" />

              <div className="w-full max-w-[1000px] px-4 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full flex flex-col items-center"
                >
                  {/* Watermark text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[12vw] md:text-[140px] text-gold-200/50 whitespace-nowrap pointer-events-none z-0 select-none">
                    {t.forever}
                  </div>

                  <div className="flex items-center gap-4 md:gap-8 justify-center relative z-10 w-full mb-6 mt-4 opacity-70">
                    <div className="h-[2px] w-16 md:w-32 bg-gradient-to-r from-transparent to-theme-500 shadow-[0_0_8px_rgba(192,192,192,0.4)]" />
                    <div className="w-2 h-2 rotate-45 bg-gold-500 shrink-0" />
                    <div className="h-[2px] w-16 md:w-32 bg-gradient-to-l from-transparent to-theme-500 shadow-[0_0_8px_rgba(192,192,192,0.4)]" />
                  </div>

                  <h2 className="font-cinzel text-[31px] md:text-5xl text-theme-900 mb-8 relative z-10 tracking-widest font-bold drop-shadow-sm px-4 leading-[1.4]">
                    {t.waitBefore}<span className="font-playball gold-text lowercase tracking-normal text-[42px] md:text-7xl mx-2">{t.magic}</span>{t.waitAfter}
                  </h2>

                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-theme-600 font-bold bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full border border-theme-200/50 inline-flex items-center gap-3 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] relative z-10">
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                    {t.countingDown}
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                  </p>
                </motion.div>

                <CountdownTimer t={t} />
                <p className="mt-10 md:mt-14 font-serif italic text-[18px] md:text-2xl text-theme-800">
                  {t.untilDate}
                </p>
              </div>
            </section>

            {/* Venue Location Section */}
            <section id="venue" className="scroll-mt-20 cv-auto py-24 md:py-36 bg-gradient-to-b from-gold-50 via-white to-theme-50 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-200 blur-[150px] rounded-full opacity-20 pointer-events-none" />

              <div className="container mx-auto px-6 max-w-3xl relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8 flex flex-col items-start"
                  >
                    <div className="flex flex-col items-start gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-[2px] bg-gold-400 shadow-[0_0_8px_rgba(217,180,90,0.45)]" />
                        <span className="text-gold-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">{t.theVenue}</span>
                      </div>
                      <h2 className="font-playball text-[3.7rem] sm:text-[4.3rem] md:text-[5.8rem] script-gradient leading-[1.05] drop-shadow-sm ml-[-4px]">
                        {t.churchName}
                      </h2>
                    </div>

                    <div className="space-y-6 pt-4 relative">
                      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-theme-300 to-transparent" />

                      <div className="pl-8 space-y-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-theme-100 absolute -left-5 top-0">
                          <MapPin className="w-4 h-4 text-theme-500" />
                        </div>
                        <p className="text-[19px] md:text-xl text-stone-700 font-cinzel font-medium leading-relaxed tracking-wide">
                          {t.addressLine1}<br /> {t.addressLine2}
                        </p>
                      </div>
                    </div>

                    {/* Church Image */}
                    <div className="w-full rounded-[1.5rem] overflow-hidden shadow-[0_20px_45px_-15px_rgba(0,0,0,0.3)] group">
                      <img
                        src="/WhatsApp Image 2026-10-09 at 04.54.03 (1).jpeg"
                        className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                        alt="St. Mary's Church"
                      />
                    </div>

                    {/* The Sacred Ceremony */}
                    <div className="w-full space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-[2px] bg-gold-400 shadow-[0_0_8px_rgba(217,180,90,0.45)]" />
                        <span className="text-gold-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">{t.sacredCeremony}</span>
                      </div>
                      <div className="pl-0 md:pl-14 space-y-5 text-stone-500 text-[15px] md:text-base tracking-wide font-light leading-relaxed text-left">
                        <p>{t.ceremonyP1}</p>
                        <p>{t.ceremonyP2}</p>
                      </div>
                    </div>

                    {/* Ceremony Details */}
                    <div className="w-full flex flex-col items-center text-center space-y-4">
                      <div className="flex items-center gap-3 w-full max-w-[260px] opacity-70">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-theme-300" />
                        <Sparkles className="w-4 h-4 text-gold-400" />
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-theme-300" />
                      </div>
                      <div className="w-12 h-12 rounded-full bg-theme-50 border border-theme-100 shadow-sm flex items-center justify-center">
                        <Cross className="w-6 h-6 text-gold-500" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-cinzel text-[18px] md:text-2xl text-theme-900 tracking-wide">
                        {t.holyMass}
                      </h3>
                      <p className="font-cinzel text-[16px] md:text-xl text-theme-800 tracking-wide">
                        {t.ceremonyDate}
                      </p>
                      <p className="font-cinzel text-[20px] md:text-2xl text-gold-600 font-semibold tracking-wider">
                        {t.ceremonyTime}
                      </p>
                      <p className="text-stone-500 text-[14px] md:text-base tracking-wide font-light leading-relaxed max-w-md">
                        {t.ceremonyBlessing}
                      </p>

                      {/* Save Our Date */}
                      <div className="w-full max-w-md mt-4 p-5 rounded-2xl bg-gradient-to-br from-white to-gold-50 border border-gold-200 shadow-[0_10px_30px_-15px_rgba(30,50,88,0.3)] flex flex-col items-center gap-3">
                        <p className="font-playball text-[2rem] md:text-[2.4rem] leading-none script-gradient">{t.saveOurDate}</p>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-gold-600 font-bold">{t.addToCalendar}</p>
                        <div className="flex flex-wrap justify-center gap-2 mt-1">
                          <a
                            href={googleCalendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-theme-800 text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-theme-900 transition-colors"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            Google
                          </a>
                          <button
                            type="button"
                            onClick={downloadIcs}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-theme-800 text-theme-800 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-theme-800 hover:text-white transition-colors"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            Apple / Outlook
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 w-full">
                      <button
                        onClick={() => window.open('https://maps.app.goo.gl/3WctRkxj8PBqHfUy6', '_blank')}
                        className="w-full flex items-center justify-center gap-4 bg-theme-800 text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-theme-900 hover:shadow-xl hover:shadow-theme-900/20 transition-all duration-300 group"
                      >
                        <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                        {t.getDirections}
                      </button>
                    </div>
                  </motion.div>
              </div>
            </section>

            {/* Tea Table Section */}
            <section className="cv-auto py-20 md:py-32 bg-gradient-to-br from-theme-100 via-gold-50 to-theme-50 relative overflow-hidden border-y border-gold-200/60">
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
              <div className="container mx-auto px-6 max-w-3xl relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center space-y-8"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-[2px] bg-gold-400 shadow-[0_0_8px_rgba(217,180,90,0.45)]" />
                      <span className="text-gold-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">{t.afterCeremony}</span>
                      <div className="w-10 h-[2px] bg-gold-400 shadow-[0_0_8px_rgba(217,180,90,0.45)]" />
                    </div>
                    <h2 className="font-playball text-[3.2rem] sm:text-[3.8rem] md:text-[4.8rem] script-gradient leading-[1.1] drop-shadow-sm">
                      {t.teaTable}
                    </h2>
                  </div>

                  <div className="w-full rounded-[1.5rem] overflow-hidden shadow-[0_20px_45px_-15px_rgba(0,0,0,0.3)] group">
                    <InviteImage
                      src="/WhatsApp Image 2026-10-09 at 05.34.30.jpeg"
                      alt="Wedding tea table"
                      className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                    />
                  </div>

                  <p className="font-serif italic text-[19px] md:text-2xl text-theme-800 leading-relaxed max-w-2xl">
                    {t.teaText}
                  </p>
                </motion.div>
              </div>
            </section>

            {/* RSVP Section */}
            <section id="rsvp" className="scroll-mt-20 cv-auto py-24 md:py-36 bg-gradient-to-br from-[#14264a] via-theme-900 to-[#0d1a33] text-white relative overflow-hidden flex flex-col items-center">
              {/* Opulent dark background */}
              <div className="absolute inset-0 opacity-10 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-800 blur-[150px] rounded-full opacity-30 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-900 blur-[150px] rounded-full opacity-40 pointer-events-none" />

              <div className="container mx-auto px-4 max-w-2xl text-center relative z-10 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <img src="/floral-spray.webp" alt="" className="w-[260px] md:w-[360px] h-auto mb-6 opacity-80 brightness-125" />
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-gold-300 font-bold mb-6">{t.willYouJoin}</p>
                  <h2 className="font-playball text-[3.7rem] sm:text-[4.3rem] md:text-[5.8rem] gold-text mb-6 drop-shadow-md">{t.rsvpTitle}</h2>
                  <div className="flex items-center gap-4 justify-center w-full mb-8 opacity-60">
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-theme-300" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-white" />
                    <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-theme-300" />
                  </div>
                  <p className="text-stone-300 text-[15px] md:text-base max-w-md mx-auto leading-relaxed mb-16 tracking-wide font-light">
                    {t.rsvpText}
                  </p>

                  {/* Premium RSVP Form */}
                  <div className="w-full bg-white/5 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
                    <form className="space-y-8 text-left" onSubmit={(e) => { e.preventDefault(); handleSubmit("rsvp", rsvpData); }}>
                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">{t.fullName}</label>
                        <input
                          type="text"
                          required
                          value={rsvpData.name}
                          onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                          placeholder={t.yourName}
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-[19px] md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">{t.willAttend}</label>
                        <div className="grid grid-cols-2 gap-3">
                          {([true, false] as const).map((yes) => (
                            <button
                              key={String(yes)}
                              type="button"
                              onClick={() => {
                                setAttending(yes);
                                setRsvpData({ ...rsvpData, guests: yes ? (rsvpData.guests === "0" ? "1" : rsvpData.guests) : "0" });
                              }}
                              aria-pressed={attending === yes}
                              className={`py-3 px-2 rounded-full border text-[11px] md:text-xs font-bold tracking-[0.1em] transition-all duration-300 ${attending === yes ? "bg-gold-300 border-gold-300 text-theme-900 shadow-[0_0_20px_rgba(217,180,90,0.35)]" : "border-white/25 text-white/80 hover:border-gold-300/70"}`}
                            >
                              {yes ? t.accepts : t.declines}
                            </button>
                          ))}
                        </div>
                      </div>

                      {attending && (
                        <div className="space-y-3">
                          <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">{t.guests}</label>
                          <div className="flex items-center justify-between border-b border-white/20 px-2 py-2">
                            <button
                              type="button"
                              onClick={() => setRsvpData({ ...rsvpData, guests: String(Math.max(1, Number(rsvpData.guests) - 1)) })}
                              className="w-10 h-10 rounded-full border border-gold-300/60 text-gold-300 text-xl leading-none hover:bg-gold-300 hover:text-theme-900 transition-colors"
                              aria-label="-"
                            >
                              −
                            </button>
                            <span className="font-cinzel text-[22px] md:text-2xl text-white">{rsvpData.guests}</span>
                            <button
                              type="button"
                              onClick={() => setRsvpData({ ...rsvpData, guests: String(Math.min(10, Number(rsvpData.guests) + 1)) })}
                              className="w-10 h-10 rounded-full border border-gold-300/60 text-gold-300 text-xl leading-none hover:bg-gold-300 hover:text-theme-900 transition-colors"
                              aria-label="+"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">{t.wish}</label>
                        <input
                          type="text"
                          value={rsvpData.dietary}
                          onChange={(e) => setRsvpData({ ...rsvpData, dietary: e.target.value })}
                          placeholder={t.wishPlaceholder}
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-[19px] md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="pt-10">
                        <button
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-gold-400 via-gold-200 to-gold-500 text-theme-900 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm hover:brightness-110 hover:shadow-[0_0_30px_rgba(217,180,90,0.45)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group inline-flex justify-center items-center gap-4"
                        >
                          {isSubmitting ? t.sending : (submitStatus === "rsvp_success" ? t.thankYou : t.sendRsvp)}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Wishing Section and Footer Wrapper */}
            <div className="relative bg-gradient-to-b from-theme-50 via-white to-gold-50">
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />

              <section className="cv-auto py-24 md:py-36 relative flex flex-col items-center overflow-hidden">

                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >


                    <div className="mt-12 md:mt-24 space-y-8 flex flex-col items-center relative w-full px-4">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[18vw] md:text-[180px] text-gold-200/45 whitespace-nowrap pointer-events-none z-0 select-none">
                        {t.thankYouWatermark}
                      </div>
                      
                      <div className="relative z-10 space-y-6 max-w-2xl text-center">
                        <p className="font-serif italic text-[20px] md:text-[1.7rem] text-theme-800 leading-relaxed px-4">
                          {t.loveQuote}
                        </p>

                        <div className="w-16 h-px bg-theme-300 mx-auto" />

                        <div className="space-y-4 font-serif text-[15px] md:text-lg text-zinc-600 font-light leading-relaxed px-2">
                          <p>{t.thanks1}</p>
                          <p>{t.thanks2}</p>
                        </div>

                        {/* Message from the Couple */}
                        <div className="pt-10 md:pt-14 space-y-6 flex flex-col items-center">
                          <div className="flex items-center gap-3 opacity-60">
                            <div className="h-px w-10 bg-gold-300" />
                            <div className="w-1.5 h-1.5 rotate-45 bg-gold-400" />
                            <div className="h-px w-10 bg-gold-300" />
                          </div>
                          <motion.div
                            initial={{ opacity: 0, y: 24, scale: 0.96 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative my-2"
                          >
                            <div className="absolute -inset-3 rounded-t-full rounded-b-[2rem] bg-theme-200/40 blur-xl" />
                            <div className="relative p-2 md:p-2.5 bg-white rounded-t-full rounded-b-[2rem] border-2 border-gold-300 shadow-[0_20px_50px_-20px_rgba(30,50,88,0.45)]">
                              <InviteImage
                                src="/WhatsApp Image 2026-10-09 at 04.48.15 (1).jpeg"
                                alt="John and Vihangana"
                                className="w-[220px] h-[293px] md:w-[300px] md:h-[400px] object-cover object-top rounded-t-full rounded-b-[1.6rem]"
                              />
                            </div>
                          </motion.div>
                          <h4 className="font-cinzel text-[13px] md:text-base uppercase tracking-[0.3em] text-gold-600 font-bold">
                            {t.messageFromCouple}
                          </h4>
                          <div className="space-y-4 font-serif italic text-[15px] md:text-lg text-zinc-600 font-light leading-relaxed px-2">
                            <p>{t.couple1}</p>
                            <p>{t.couple2}</p>
                            <p>{t.couple3}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-8 flex flex-col items-center gap-4 relative z-10">
                        <img src="/floral-spray.webp" alt="" className="w-[240px] md:w-[340px] h-auto opacity-90" />
                        <p className="text-[9px] md:text-[11px] uppercase tracking-[0.8em] text-gold-600 font-bold bg-[#FFFFFF] px-6 py-2 rounded-full border border-gold-300/60 shadow-sm">{t.withLove}</p>
                        <h3 className="font-playball text-[3.4rem] sm:text-6xl md:text-7xl text-theme-900 drop-shadow-sm px-4 pt-2 leading-none"><span className="script-gradient">{t.groomFirst}</span> <span className="gold-text">&amp;</span> <span className="script-gradient">{t.brideFirst}</span></h3>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-20 border-t border-gold-200/70 text-center relative z-10 space-y-6 bg-gradient-to-b from-transparent to-theme-100/70">
                <p className="text-[9px] md:text-[11px] uppercase tracking-[0.5em] text-stone-500 font-bold">
                  {t.rights}
                </p>

                <div className="flex flex-col items-center gap-2 pt-8">
                  <a
                    href="https://wa.me/94707819074"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center"
                  >
                    <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold group-hover:text-theme-600 transition-colors">
                      {t.designBy}
                    </span>
                    <span className="font-playball text-[25px] md:text-3xl text-theme-800 group-hover:scale-110 transition-transform duration-500">
                      invitemint
                    </span>
                    <span className="text-[9px] md:text-[11px] tracking-[0.2em] text-stone-400 font-medium mt-1">
                      +94 70 781 9074
                    </span>
                    <div className="w-8 h-px bg-theme-300 group-hover:w-20 transition-all duration-500 mt-2" />
                  </a>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-very {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        .animate-spin-slow-very {
          animation: spin-slow-very linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #FFFFFF;
        }
        ::-webkit-scrollbar-thumb {
          background: #C0C0C0;
          border-radius: 10px;
        }
      `}} />
    </main>
  );
}
