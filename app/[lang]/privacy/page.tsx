import type { Metadata } from "next";
import LedgerPage, { type LedgerSection } from "@/components/LedgerPage";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

/**
 * The privacy ledger. Every claim below mirrors how the product and this
 * site actually behave (local processing, offline verification with a
 * periodic license check, no analytics, Stripe-held payment data) — if
 * behavior ever changes, this page changes in the same commit.
 */

const CONTENT: Record<
  Locale,
  { label: string; title: string; updated: string; intro: string; sections: LedgerSection[] }
> = {
  en: {
    label: "The ledger · Privacy",
    title: "Your images never leave. Neither does much else.",
    updated: "Last updated · 2026-06-11",
    intro:
      "STRATA was built on one promise: the photograph belongs to the photographer. This page lists, plainly, the little we touch and the much we never do.",
    sections: [
      {
        h: "The photographs",
        body: [
          "Every stage — developing, aligning, merging, refining, exporting — runs on your machine. Your RAW files, previews, and finished images are never uploaded, transmitted, or seen by us.",
          "Nothing you make with STRATA is used to train anything, ever.",
        ],
      },
      {
        h: "The application",
        body: [
          "STRATA contains no analytics, no telemetry, and no advertising identifiers.",
          "License verification happens on your machine, offline, at every launch. Periodically the app confirms your subscription with the licensing server; that check carries your license identifier and its validity — never your images, never your file names, never anything about your work.",
        ],
      },
      {
        h: "This website",
        body: [
          "The site sets no tracking cookies and runs no analytics. Standard, short-lived server logs (IP address, requested page) exist for security and are not used to profile anyone.",
          "During checkout, Stripe sets the cookies it needs to process payment securely — that is Stripe's, not ours.",
        ],
      },
      {
        h: "When you buy",
        body: [
          "Payment is processed entirely by Stripe. Your card number never touches our systems.",
          "From a purchase we receive and keep: your email address, the kit you chose, and the subscription's status. That is the entire customer record.",
        ],
      },
      {
        h: "Your email",
        body: [
          "It is used to deliver your license and essential service messages (renewal problems, critical fixes). No marketing is sent without your explicit consent, and there is no list to be sold — to anyone, ever.",
        ],
      },
      {
        h: "Your rights",
        body: [
          "Write to the maker at any time to see, correct, or delete the record we hold about you. Deleting it ends the subscription; it never touches the photographs on your machine — those were always only yours.",
        ],
      },
      {
        h: "Changes",
        body: [
          "If this page changes in any way that matters, the date above changes with it and active subscribers are told by email.",
        ],
      },
    ],
  },
  ar: {
    label: "السجلّ · الخصوصية",
    title: "صورك لا تغادر. وما عداها قليلٌ بالكاد يغادر.",
    updated: "آخر تحديث · 2026-06-11",
    intro:
      "بُني ستراتا على وعدٍ واحد: الصورة ملك المصوّر. هذه الصفحة تسرد بوضوح القليلَ الذي نلمسه، والكثيرَ الذي لا نفعله أبدًا.",
    sections: [
      {
        h: "الصور",
        body: [
          "كل مرحلة — التحميض، المحاذاة، الدمج، التنقيح، التصدير — تجري على جهازك. ملفات RAW والمعاينات والصور النهائية لا تُرفع ولا تُرسل ولا نراها أبدًا.",
          "ولا شيء مما تصنعه بستراتا يُستخدم لتدريب أي شيء، إطلاقًا.",
        ],
      },
      {
        h: "التطبيق",
        body: [
          "لا يحتوي ستراتا على أي تحليلات ولا قياس عن بُعد ولا معرّفات إعلانية.",
          "التحقق من الرخصة يجري على جهازك، دون اتصال، في كل تشغيل. ودوريًا يؤكد التطبيق اشتراكك لدى خادم الترخيص؛ وهذا الفحص يحمل معرّف رخصتك وصلاحيتها فقط — لا صورك، ولا أسماء ملفاتك، ولا أي شيء عن عملك.",
        ],
      },
      {
        h: "هذا الموقع",
        body: [
          "الموقع لا يضع أي ملفات تتبّع ولا يشغّل أي تحليلات. توجد سجلات خادم قياسية قصيرة الأمد (عنوان IP والصفحة المطلوبة) لأغراض الأمان، ولا تُستخدم لرسم ملامح أحد.",
          "أثناء الدفع، يضع Stripe ملفات تعريف الارتباط التي يحتاجها لمعالجة الدفع بأمان — وتلك له، لا لنا.",
        ],
      },
      {
        h: "عند الشراء",
        body: [
          "الدفع يعالجه Stripe بالكامل. رقم بطاقتك لا يلمس أنظمتنا أبدًا.",
          "ما نستلمه ونحتفظ به من عملية الشراء: بريدك الإلكتروني، والعُدّة التي اخترتها، وحالة الاشتراك. هذا هو سجلّ العميل بأكمله.",
        ],
      },
      {
        h: "بريدك الإلكتروني",
        body: [
          "يُستخدم لتسليم رخصتك ولرسائل الخدمة الضرورية (مشاكل التجديد، الإصلاحات الحرجة). لا تُرسل أي رسائل تسويقية دون موافقتك الصريحة، ولا توجد قائمة تُباع — لأي جهة، أبدًا.",
        ],
      },
      {
        h: "حقوقك",
        body: [
          "راسل الصانع في أي وقت للاطلاع على السجل الذي نحتفظ به عنك أو تصحيحه أو حذفه. حذفه يُنهي الاشتراك؛ ولا يمسّ الصور على جهازك أبدًا — فتلك كانت دائمًا لك وحدك.",
        ],
      },
      {
        h: "التغييرات",
        body: [
          "إن تغيّرت هذه الصفحة بأي شكل مؤثّر، يتغيّر التاريخ أعلاه معها، ويُخطَر المشتركون النشطون بالبريد.",
        ],
      },
    ],
  },
};

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  return { title: lang === "ar" ? "الخصوصية" : "Privacy", description: CONTENT[lang].intro };
}

export default function PrivacyPage({ params }: { params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  const c = CONTENT[lang];
  return (
    <LedgerPage
      lang={lang}
      header={getDict(lang).header}
      label={c.label}
      title={c.title}
      updated={c.updated}
      intro={c.intro}
      sections={c.sections}
    />
  );
}
