export type Lang = "en" | "sr";

export const SUPPORTED_LANGS: Lang[] = ["en", "sr"];

export function resolveLang(value: string | null | undefined): Lang {
  return SUPPORTED_LANGS.includes(value as Lang) ? (value as Lang) : "en";
}

export interface WidgetStrings {
  headerTitle: string;
  headerSubtitle: string;
  uploadTitle: string;
  uploadSubtitle: string;
  uploadInvalidFile: string;
  analyzeButton: string;
  analyzing: string;
  analysisDone: string;
  statusLabel: string;
  statusLow: string;
  statusMedium: string;
  statusHigh: string;
  teaserTitle: string;
  teaserFound: (count: number) => string;
  teaserSubtitle: string;
  unlockButton: string;
  formTitle: string;
  formSubtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  consentText: string;
  formErrorName: string;
  formErrorContact: string;
  formErrorConsent: string;
  submitButton: string;
  submitting: string;
  leadSuccess: string;
  impressionTitle: string;
  areasTitle: string;
  treatmentsTitle: string;
  messageTitle: string;
  newAnalysis: string;
  bookConsultation: string;
  privacyNote: string;
  genericError: string;
}

export const widgetStrings: Record<Lang, WidgetStrings> = {
  en: {
    headerTitle: "AI Smile Analysis",
    headerSubtitle: "Dental Intelligence v2.1",
    uploadTitle: "Upload Your Smile",
    uploadSubtitle: "Our AI analyzes your smile aesthetics and suggests professional treatment options in seconds.",
    uploadInvalidFile: "Please upload an image",
    analyzeButton: "Run Precision Analysis",
    analyzing: "Analyzing aesthetics...",
    analysisDone: "Analysis complete",
    statusLabel: "Assessment Status",
    statusLow: "Standard Care",
    statusMedium: "Check-up Recommended",
    statusHigh: "Priority Check-up",
    teaserTitle: "Your analysis is ready",
    teaserFound: (count: number) =>
      count === 1
        ? "1 treatment opportunity identified"
        : `${count} treatment opportunities identified`,
    teaserSubtitle: "Enter your details to unlock your full personalized smile report.",
    unlockButton: "Unlock My Full Report",
    formTitle: "Almost there",
    formSubtitle: "Your report will also be reviewed by the clinic team.",
    nameLabel: "Full name",
    namePlaceholder: "Jane Smith",
    emailLabel: "Email",
    emailPlaceholder: "jane@example.com",
    phoneLabel: "Phone (optional)",
    phonePlaceholder: "+1 555 000 0000",
    consentText: "I agree to be contacted by the clinic about my smile analysis.",
    formErrorName: "Enter your name",
    formErrorContact: "Enter a valid email address",
    formErrorConsent: "Consent is required so the clinic can contact you",
    submitButton: "Show My Report",
    submitting: "Sending...",
    leadSuccess: "Report unlocked",
    impressionTitle: "Visual Impression",
    areasTitle: "Areas for Improvement",
    treatmentsTitle: "Recommended Treatments",
    messageTitle: "A Message for You",
    newAnalysis: "New Analysis",
    bookConsultation: "Book a Consultation",
    privacyNote: "Your photo is analyzed in real time and is not stored on our servers.",
    genericError: "Something went wrong during the analysis. Try again with a clearer photo.",
  },
  sr: {
    headerTitle: "AI Analiza Osmeha",
    headerSubtitle: "Dentalna Inteligencija v2.1",
    uploadTitle: "Otpremite Vaš Osmeh",
    uploadSubtitle: "Naša AI analizira estetiku vašeg osmeha i predlaže profesionalne tretmane za nekoliko sekundi.",
    uploadInvalidFile: "Molimo otpremite sliku",
    analyzeButton: "Pokreni Preciznu Analizu",
    analyzing: "Analiziranje estetike...",
    analysisDone: "Analiza završena",
    statusLabel: "Status Procene",
    statusLow: "Standardna Nega",
    statusMedium: "Pregled Preporučen",
    statusHigh: "Prioritetni Pregled",
    teaserTitle: "Vaša analiza je spremna",
    teaserFound: (count: number) => {
      if (count === 1) return "1 preporučeni tretman identifikovan";
      if (count >= 2 && count <= 4) return `${count} preporučena tretmana identifikovana`;
      return `${count} preporučenih tretmana identifikovano`;
    },
    teaserSubtitle: "Unesite podatke da otključate kompletan personalizovani izveštaj.",
    unlockButton: "Otključaj Moj Izveštaj",
    formTitle: "Još samo korak",
    formSubtitle: "Vaš izveštaj će pregledati i tim klinike.",
    nameLabel: "Ime i prezime",
    namePlaceholder: "Jelena Jovanović",
    emailLabel: "Email",
    emailPlaceholder: "jelena@primer.rs",
    phoneLabel: "Telefon (opciono)",
    phonePlaceholder: "+381 60 000 0000",
    consentText: "Saglasan/na sam da me klinika kontaktira povodom analize osmeha.",
    formErrorName: "Unesite vaše ime",
    formErrorContact: "Unesite ispravnu email adresu",
    formErrorConsent: "Saglasnost je obavezna da bi vas klinika kontaktirala",
    submitButton: "Prikaži Moj Izveštaj",
    submitting: "Slanje...",
    leadSuccess: "Izveštaj otključan",
    impressionTitle: "Vizuelni Utisak",
    areasTitle: "Oblasti za Poboljšanje",
    treatmentsTitle: "Preporučeni Tretmani",
    messageTitle: "Poruka za Vas",
    newAnalysis: "Nova Analiza",
    bookConsultation: "Zakažite Konsultaciju",
    privacyNote: "Vaša fotografija se analizira u realnom vremenu i ne čuva se na našim serverima.",
    genericError: "Došlo je do greške pri analizi. Pokušajte ponovo sa jasnijom fotografijom.",
  },
};

export const apiStrings: Record<
  Lang,
  { noPhoto: string; onlyImages: string; analysisError: string; disclaimer: string; rateLimited: string }
> = {
  en: {
    noPhoto: "Please upload a photo of your smile.",
    onlyImages: "Only images are allowed (JPG, PNG, WEBP).",
    analysisError: "Something went wrong during the analysis. Try again with a clearer photo.",
    disclaimer:
      "This is an AI-generated orientation of aesthetic possibilities, not a medical diagnosis. All recommendations require a clinical examination and X-rays by a licensed dentist.",
    rateLimited: "Too many analyses from this device. Try again in a little while.",
  },
  sr: {
    noPhoto: "Molimo pošaljite fotografiju osmeha.",
    onlyImages: "Dozvoljene su samo slike (JPG, PNG, WEBP).",
    analysisError: "Došlo je do greške pri analizi. Molimo pokušajte ponovo sa boljom fotografijom.",
    disclaimer:
      "Ovo je AI orijentaciona analiza estetskih mogućnosti, ne medicinska dijagnoza. Sve preporuke zahtevaju klinički pregled i rendgenske snimke kod stomatologa.",
    rateLimited: "Previše analiza sa ovog uređaja. Pokušajte ponovo za koji minut.",
  },
};

export const promptLanguageInstruction: Record<Lang, string> = {
  en: "Respond EXCLUSIVELY in English, in a kind, empathetic, professional tone.",
  sr: "Odgovaraj ISKLJUČIVO na srpskom jeziku, ljubaznim, empatičnim i profesionalnim tonom.",
};
