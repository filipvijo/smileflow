import Link from "next/link";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  CONTENT_DATES,
  createPageMetadata,
  serializeJsonLd,
} from "@/lib/seo";

const title = "AI smile analysis for dental clinics: a practical guide";
const description = "Learn how patient-facing AI smile analysis works, what it should never claim, and how dental clinics can evaluate privacy, workflow and conversion quality.";
const path = "/guides/ai-smile-analysis-dental-clinics";

export const metadata = createPageMetadata({ title, description, path });

const article = articleJsonLd({
  headline: title,
  description,
  path,
  datePublished: CONTENT_DATES.aiSmileAnalysisGuide,
  about: ["AI smile analysis", "Dental clinic software", "Virtual dental consultation"],
});

const questions = [
  ["Is AI smile analysis a diagnosis?", "No. A patient-facing photo can support a general aesthetic orientation, but it cannot replace examination, radiographs, medical history or a licensed dentist's judgment."],
  ["What should a clinic measure?", "Measure qualified leads, booked consultations, attendance and accepted treatment. Uploads and generated reports are engagement metrics, not business outcomes."],
  ["Should the tool store patient photos?", "Only when storage is necessary, disclosed and protected under an appropriate retention policy. A transient-processing design reduces exposure, but clinics must still review every service provider involved."],
];

export default function AiSmileAnalysisGuide() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  };

  return (
    <main className="editorial-page">
      {[article, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: "AI smile analysis guide", path }]), faqJsonLd].map((data, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
      ))}
      <article className="editorial-wrap editorial-wrap-narrow">
        <header className="editorial-hero">
          <Link href="/resources" className="editorial-back">&larr; Resources</Link>
          <div className="editorial-meta">Technology guide · Reviewed {CONTENT_DATES.aiSmileAnalysisGuide}</div>
          <h1>AI smile analysis for <em>dental clinics.</em></h1>
          <p>
            A patient-facing smile experience can create a valuable first conversation. Its role is to
            orient and engage—not diagnose, prescribe or imply treatment certainty from a photograph.
          </p>
        </header>

        <div className="editorial-prose">
          <h2>What AI smile analysis actually does</h2>
          <p>
            The visitor submits a smile photograph. A vision-capable model identifies visible aesthetic
            characteristics and returns plain-language possibilities, such as whitening, alignment or
            restorative topics worth discussing. The useful outcome is not a treatment plan; it is a
            better-informed reason to contact the clinic.
          </p>

          <h2>The clinical boundary</h2>
          <p>
            A photograph cannot establish oral health, bone condition, occlusion, periodontal status or
            treatment suitability. Responsible software should state that limitation before and after
            analysis, avoid alarming language and direct every recommendation to an in-person examination.
          </p>

          <h2>Five questions to ask a vendor</h2>
          <ol>
            <li><strong>What is retained?</strong> Ask separately about photos, contact details, generated reports and infrastructure logs.</li>
            <li><strong>Which processors receive data?</strong> Identify the AI, email, hosting and payment providers involved.</li>
            <li><strong>How is consent captured?</strong> Patients should understand who may contact them and why.</li>
            <li><strong>How are claims constrained?</strong> Results should remain orientational and consistently require clinical examination.</li>
            <li><strong>Can outcomes be measured?</strong> The clinic should be able to connect leads to bookings and accepted cases.</li>
          </ol>

          <h2>Where SmileFlow fits</h2>
          <p>
            SmileFlow analyzes the uploaded image in the request, returns an orientational report and does
            not write the photo to a SmileFlow database or file store. If the visitor consents and submits
            contact details, the clinic receives those details and a short analysis summary by email.
            The clinic remains responsible for follow-up and every clinical decision.
          </p>
        </div>

        <section className="editorial-faqs">
          {questions.map(([question, answer]) => <div key={question}><h2>{question}</h2><p>{answer}</p></div>)}
        </section>

        <aside className="editorial-callout">
          <h2>The simplest evaluation rule</h2>
          <p>If a tool makes a patient feel diagnosed before a dentist has examined them, it has crossed the line. If it helps the patient ask a better question and book the right conversation, it is doing useful work.</p>
        </aside>

        <div className="editorial-actions">
          <Link href="/#experience" className="button button-primary">Try the patient experience</Link>
          <Link href="/privacy" className="text-link">Read how data is handled →</Link>
        </div>
      </article>
    </main>
  );
}
