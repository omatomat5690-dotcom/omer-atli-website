import { useState, useEffect, useRef } from "react";

// ─── CONFIGURATION ──────────────────────────────────────────────────────────
const CONFIG = {
  name: "Dr Omer ATLI",
  credential: "GMC UK-Registered Doctor",
  gmcNumber: "8126471",
  email: "dr@omeratli.com",
  whatsapp: "+447385273502",
  whatsappLink:
    "https://wa.me/447385273502?text=Hello%20Dr%20Omer%20ATLI%2C%20I%20would%20like%20to%20book%20an%20online%20consultation.%20My%20name%20is%20%5Bname%5D%20and%20my%20main%20concern%20is%20%5Bbrief%20issue%5D.",
  whatsappSimple: "https://wa.me/447385273502",
  mailto: "mailto:dr@omeratli.com",
  pricing: "£20 – £40",
};

// ─── ICONS (inline SVG to avoid dependencies) ───────────────────────────────
const WhatsAppIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 4L12 13 2 4" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

// ─── SERVICES DATA ──────────────────────────────────────────────────────────
const services = [
  {
    title: "Acute Illness Assessment",
    description: "Prompt evaluation of new symptoms — fever, pain, infections — with clear guidance on next steps and when to seek emergency care.",
    icon: "🩺",
  },
  {
    title: "Respiratory & GI Symptoms",
    description: "Cough, sore throat, breathlessness, nausea, diarrhoea, abdominal pain — assessed thoroughly via video consultation.",
    icon: "🫁",
  },
  {
    title: "Urinary & Skin Conditions",
    description: "UTIs, rashes, minor skin infections, allergic reactions — diagnosed and treated remotely where clinically safe.",
    icon: "🔬",
  },
  {
    title: "Prescriptions & Refills",
    description: "Medication refills, travel prescriptions, and short-course treatments — issued only where clinically appropriate.",
    icon: "💊",
  },
  {
    title: "Medical Notes & Reports",
    description: "Fit notes, medical letters, and consultation summaries for work, travel, or personal records.",
    icon: "📋",
  },
  {
    title: "Telemedicine Consultations",
    description: "Comprehensive video or audio consultations with follow-up plans, referrals, and ongoing care coordination.",
    icon: "📱",
  },
];

// ─── TRUST ITEMS ────────────────────────────────────────────────────────────
const trustItems = [
  { icon: <ShieldIcon />, label: "GMC UK Registered", sublabel: `No. ${CONFIG.gmcNumber}` },
  { icon: <GlobeIcon />, label: "Turkish Ministry of Health", sublabel: "Registered Physician" },
  { icon: <CheckCircle />, label: "Evidence-Based Practice", sublabel: "NICE & NHS Aligned" },
  { icon: <UserIcon />, label: "Safety-First Approach", sublabel: "Patient-Centred Care" },
];

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function DrOmerAtliWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bookingRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToBooking = (e) => {
    e.preventDefault();
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#booking" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif" }} className="bg-white text-gray-800 min-h-screen">
      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white bg-opacity-95"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="text-lg font-semibold text-gray-900 tracking-tight">
              Dr Omer <span className="text-teal-600">ATLI</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={l.href === "#booking" ? scrollToBooking : undefined}
                  className="text-sm text-gray-600 hover:text-teal-600 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <WhatsAppIcon size={16} />
                Book Now
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-100">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => {
                    setMenuOpen(false);
                    if (l.href === "#booking") scrollToBooking(e);
                  }}
                  className="block py-3 px-2 text-gray-600 hover:text-teal-600 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 bg-teal-600 text-white font-medium px-4 py-3 rounded-lg"
              >
                <WhatsAppIcon size={18} />
                Book via WhatsApp
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
                <ShieldIcon />
                GMC UK-Registered Doctor
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Dr Omer <span className="text-teal-600">ATLI</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 font-light mb-4 leading-relaxed">
                Fast, clear online medical advice<br className="hidden sm:inline" /> when GP access is slow.
              </p>
              <p className="text-gray-500 max-w-lg mx-auto md:mx-0 mb-4 leading-relaxed">
                Independent telemedicine physician providing remote consultations,
                prescriptions, and acute care support — delivered to UK-standard,
                evidence-based practice. Consultations also available in Turkish.
              </p>
              <p className="text-teal-700 font-semibold text-lg mb-8">
                From {CONFIG.pricing} per consultation
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a
                  href={CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:shadow-xl hover:shadow-green-600/30 text-base"
                >
                  <WhatsAppIcon size={22} />
                  Book Consultation
                </a>
                <a
                  href={CONFIG.whatsappSimple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-teal-300 text-gray-700 font-medium px-8 py-4 rounded-xl transition-all text-base"
                >
                  <PhoneIcon />
                  Message on WhatsApp
                </a>
              </div>
            </div>

            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-gray-200/60 bg-gray-100">
                  <img
                    src="dr-omer-atli.jpeg"
                    alt="Dr Omer ATLI"
                    className="w-full h-full object-cover object-[center_15%]"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100"><span class="text-6xl font-light text-teal-400">OA</span></div>';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  ● Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ───────────────────────────────────────────── */}
      <section className="py-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
                <div className="text-teal-600 flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────── */}
      <section id="about" className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center">About</h2>
          <div className="w-12 h-1 bg-teal-500 mx-auto rounded-full mb-10"></div>
          <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
            <p>
              I am a GMC-registered medical doctor (No. {CONFIG.gmcNumber}) with clinical
              training from <strong className="text-gray-800">Akdeniz University Faculty of Medicine</strong>,
              one of Turkey's leading medical schools. My background spans Emergency Medicine and
              Primary Care — environments where quick, accurate clinical decisions matter most.
            </p>
            <p>
              After years of frontline practice, I moved into independent telemedicine to address
              a problem I saw repeatedly: patients waiting days or weeks for basic GP access when
              their concern needed attention now. My consultations follow UK-standard protocols
              aligned with <strong className="text-gray-800">NICE guidelines and NHS best practice</strong>.
            </p>
            <p>
              My approach is straightforward — listen carefully, assess thoroughly, explain clearly,
              and treat appropriately. No unnecessary tests, no vague advice. If something needs
              face-to-face review or specialist input, I will tell you directly. Consultations
              are available in both English and Turkish.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────── */}
      <section id="services" className="py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center">Services</h2>
          <div className="w-12 h-1 bg-teal-500 mx-auto rounded-full mb-4"></div>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Comprehensive remote medical care — from initial assessment through to treatment and follow-up.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-100 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-8 italic">
            Prescriptions are issued only where clinically appropriate.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────── */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center">How It Works</h2>
          <div className="w-12 h-1 bg-teal-500 mx-auto rounded-full mb-12"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Book Your Consultation",
                desc: "Message via WhatsApp or email with your name and a brief description of your concern. You'll receive a prompt response with available times.",
                icon: <PhoneIcon />,
              },
              {
                step: "2",
                title: "Assessment & Treatment",
                desc: "A thorough video or audio consultation. I'll take a full history, assess your symptoms, and provide a clear diagnosis and treatment plan.",
                icon: <ClockIcon />,
              },
              {
                step: "3",
                title: "Follow-Up & Guidance",
                desc: "Receive your prescriptions, referral letters, or medical notes. Ongoing support and follow-up are available as needed.",
                icon: <CheckCircle />,
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-teal-600">
                  {item.icon}
                </div>
                <div className="text-xs font-bold text-teal-500 tracking-widest uppercase mb-2">
                  Step {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────── */}
      <section id="pricing" className="py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Consultation Fees</h2>
          <div className="w-12 h-1 bg-teal-500 mx-auto rounded-full mb-10"></div>
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {CONFIG.pricing}
            </div>
            <p className="text-gray-500 mb-6">per consultation</p>
            <ul className="text-left max-w-sm mx-auto space-y-3 mb-8">
              {[
                "Video or audio consultation",
                "Prescriptions where appropriate",
                "Medical notes and letters",
                "Follow-up guidance included",
                "No hidden fees",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <span className="text-teal-500 mt-0.5 flex-shrink-0"><CheckCircle /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all text-base w-full sm:w-auto"
            >
              <WhatsAppIcon size={20} />
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 text-center">Patient Feedback</h2>
          <div className="w-12 h-1 bg-teal-500 mx-auto rounded-full mb-4"></div>
          <p className="text-center text-gray-500 mb-10">Real reviews from verified patients.</p>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "thin" }}>
            {[
              { quote: "Saved my life during a short trip. Got the needed prescription after a good detailed consultation. Doctor Omer is very knowledgeable and involved in the process from consultation till the end. I felt heard and comfortable. Found this site through a Google search and I will definitely keep this in my emergency list for trips!", name: "C. S.", detail: "March 2026 · Verified Patient" },
              { quote: "The service was excellent: I had a pleasant, professional conversation with Dr. Atli, with the result that I was able to simply pick up a suitable prescription medication at the nearest pharmacy. Everything worked out perfectly, and my condition is improving steadily. My business trip can continue.", name: "P. D.", detail: "March 2026 · Verified Patient" },
              { quote: "Quick and easy to book, with a professional Doctor who listened carefully and gave clear, reassuring advice. A convenient, reliable service that makes accessing quality healthcare simple and stress-free.", name: "S. T.", detail: "March 2026 · Verified Patient" },
              { quote: "The doctor was excellent, very professional and empathetic to my problem. Offered practical solutions and I left the appointment happy and knowledgeable about what steps to take.", name: "B. T.", detail: "March 2026 · Verified Patient" },
              { quote: "Dr Atli was very professional and thorough in his questions. He filled me with confidence and I found the appointment very reassuring and helpful. He is a very caring doctor.", name: "C. L.", detail: "March 2026 · Verified Patient" },
              { quote: "Great Doctor — listened carefully to my issue and recommended a great solution! Highly recommended Doctor!!", name: "A. J.", detail: "March 2026 · Verified Patient" },
              { quote: "Dr Atli was very nice and available to listen to my health issues. I recommend him for the professionality.", name: "G. N.", detail: "March 2026 · Verified Patient" },
              { quote: "Excellent service and clear. Calm and very helpful.", name: "R. J.", detail: "March 2026 · Verified Patient" },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 min-w-[320px] max-w-[380px] flex-shrink-0 snap-start">
                <div className="text-amber-400 text-sm tracking-widest mb-3">★★★★★</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">{t.quote}</p>
                <div className="border-t border-gray-200 pt-3">
                  <div className="font-semibold text-gray-800 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING / CONTACT ───────────────────────────────────── */}
      <section id="booking" ref={bookingRef} className="py-16 sm:py-24 px-4 bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-teal-100 max-w-xl mx-auto mb-4 leading-relaxed">
            Choose the fastest way to get in touch. You can message directly on WhatsApp
            to request an appointment, ask about availability, or follow up after a consultation.
          </p>
          <p className="text-teal-200 text-sm mb-4">
            Please include your name and a brief description of your medical concern.
          </p>
          <p className="text-teal-200 text-sm italic mb-10">
            Prescriptions are issued only where clinically appropriate.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
            <a
              href={CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-4 rounded-xl shadow-lg transition-all text-base"
            >
              <WhatsAppIcon size={22} />
              Book via WhatsApp
            </a>
            <a
              href={CONFIG.mailto}
              className="flex items-center justify-center gap-3 bg-white bg-opacity-15 hover:bg-opacity-25 text-white font-medium px-6 py-4 rounded-xl border border-white border-opacity-25 transition-all text-base"
            >
              <MailIcon />
              Email Dr ATLI
            </a>
          </div>
          <p className="text-teal-200 text-xs">
            Email for reports, prescriptions, or general queries: <a href={CONFIG.mailto} className="underline text-white">{CONFIG.email}</a>
          </p>
        </div>
      </section>

      {/* ── PRIVACY NOTICE ──────────────────────────────────────── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Privacy & Data Protection</h3>
          <div className="text-sm text-gray-500 leading-relaxed space-y-3">
            <p>
              Your privacy matters. All personal and medical information shared during consultations
              is treated as strictly confidential and handled in accordance with the UK General Data
              Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
            <p>
              Your data is used solely for the purpose of providing medical care and will not be
              shared with third parties without your explicit consent, unless required by law or
              to protect your safety. Medical records are stored securely and retained in line
              with NHS record-keeping guidelines.
            </p>
            <p>
              By booking a consultation, you consent to the collection and processing of your
              personal and health data for clinical purposes. You have the right to access,
              correct, or request deletion of your data at any time by contacting{" "}
              <a href={CONFIG.mailto} className="text-teal-600 underline">{CONFIG.email}</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ──────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-amber-600 mb-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span className="text-sm font-semibold">Medical Disclaimer</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
            This service does not replace emergency care. If you are experiencing severe
            chest pain, difficulty breathing, signs of stroke, heavy bleeding, or any
            life-threatening symptoms, call 999 (UK) or 112 (Turkey) immediately.
            Telemedicine has limitations — a face-to-face assessment may be required for certain conditions.
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="py-10 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-white font-semibold text-lg mb-1">
                Dr Omer <span className="text-teal-400">ATLI</span>
              </div>
              <div className="text-sm">GMC UK-Registered Doctor · No. {CONFIG.gmcNumber}</div>
              <div className="text-sm">Independent Telemedicine Practice</div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={CONFIG.whatsappSimple}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </a>
              <a
                href={CONFIG.mailto}
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-teal-600 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
                aria-label="Email"
              >
                <MailIcon />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Dr Omer ATLI. All rights reserved. · Independent medical practice.
          </div>
        </div>
      </footer>

      {/* ── FLOATING WHATSAPP BUTTON ────────────────────────────── */}
      <a
        href={CONFIG.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl shadow-green-500/30 transition-all hover:scale-110 flex items-center gap-2 group"
        aria-label="Book via WhatsApp"
      >
        <WhatsAppIcon size={28} />
        <span className="hidden sm:inline text-sm font-semibold pr-1 max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-300 whitespace-nowrap">
          Book Now
        </span>
      </a>
    </div>
  );
}
