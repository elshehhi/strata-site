import type { Metadata } from "next";
import LedgerPage, { type LedgerSection } from "@/components/LedgerPage";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

/**
 * The terms ledger — subscription, refunds, fair use. Two clauses are
 * business decisions encoded here and should be reconfirmed by the maker
 * before launch: the 14-day first-purchase refund window (§5) and UAE
 * governing law (§9). Machine counts in §2 mirror lib/i18n.ts tier copy.
 */

const CONTENT: Record<
  Locale,
  { label: string; title: string; updated: string; intro: string; sections: LedgerSection[] }
> = {
  en: {
    label: "The ledger · Terms",
    title: "Plain terms for a plain promise.",
    updated: "Last updated · 2026-06-11",
    intro:
      "These terms govern your STRATA subscription. They are written to be read — short sentences, no traps. The agreement is between you and Ahmed Alshehhi, the maker of STRATA.",
    sections: [
      {
        h: "The agreement",
        body: [
          "By purchasing a subscription you accept these terms. If you do not accept them, do not purchase — and if you already have, write within the refund window below.",
        ],
      },
      {
        h: "The license",
        body: [
          "An active subscription grants you a personal, non-exclusive, non-transferable license to install and use STRATA.",
          "Personal and Professional kits cover one machine in active use at a time; the Studio kit covers up to three. Moving between your own machines is fine and costs nothing.",
        ],
      },
      {
        h: "Your work",
        body: [
          "Every photograph you develop, merge, refine, or export with STRATA is entirely yours. We claim no rights of any kind over your images, and exported work remains yours forever — including after the subscription ends.",
        ],
      },
      {
        h: "Subscription and renewal",
        body: [
          "Kits are billed monthly or annually through Stripe at the price shown when you subscribed; the annual plan includes two months free. Offers may include a trial period stated at purchase. The subscription renews automatically until you cancel.",
          "Cancel at any time from the billing room: your kit stays active until the end of the period you have paid for, and no further charge is made.",
        ],
      },
      {
        h: "Refunds",
        body: [
          "First purchase: a full refund within 14 days, no questions asked — write to the maker.",
          "Renewals: cancel before the renewal date and nothing further is charged. If a renewal charge slipped past you, write within 7 days and it will be put right.",
        ],
      },
      {
        h: "Fair use",
        body: [
          "Do not share, resell, or publish your license key; do not redistribute the application; do not reverse-engineer the licensing. Breaking these ends the license without refund.",
        ],
      },
      {
        h: "The software",
        body: [
          "STRATA is provided as it stands, maintained with care but without a warranty of perfection. Updates within your subscription are included.",
          "Features may evolve; the core promise — local processing, 16-bit integrity, your authorship — does not.",
        ],
      },
      {
        h: "Liability",
        body: [
          "To the extent the law allows, total liability is capped at the amount you paid in the twelve months before the claim. Always keep backups of RAW files — with STRATA they are never modified, but they are irreplaceable.",
        ],
      },
      {
        h: "Governing law",
        body: ["These terms are governed by the laws of the United Arab Emirates."],
      },
      {
        h: "Questions",
        body: ["Anything unclear deserves a plain answer — write to the maker."],
      },
    ],
  },
  ar: {
    label: "السجلّ · الشروط",
    title: "شروط واضحة لوعدٍ واضح.",
    updated: "آخر تحديث · 2026-06-11",
    intro:
      "تحكم هذه الشروط اشتراكك في ستراتا. كُتبت لتُقرأ — جمل قصيرة، بلا أفخاخ. والاتفاق بينك وبين أحمد الشحّي، صانع ستراتا.",
    sections: [
      {
        h: "الاتفاق",
        body: [
          "بشرائك الاشتراك فأنت تقبل هذه الشروط. إن لم تقبلها فلا تشترِ — وإن كنت اشتريت بالفعل، فراسلنا ضمن نافذة الاسترداد أدناه.",
        ],
      },
      {
        h: "الرخصة",
        body: [
          "الاشتراك الفعّال يمنحك رخصة شخصية، غير حصرية، غير قابلة للنقل، لتثبيت ستراتا واستخدامه.",
          "عُدّتا «شخصية» و«احترافية» تغطيان جهازًا واحدًا قيد الاستخدام الفعلي في الوقت نفسه؛ وعُدّة «استوديو» حتى ثلاثة أجهزة. والتنقل بين أجهزتك أنت جائز ولا يكلّف شيئًا.",
        ],
      },
      {
        h: "عملك",
        body: [
          "كل صورة تحمّضها أو تدمجها أو تنقّحها أو تصدّرها بستراتا هي لك بالكامل. لا ندّعي أي حق من أي نوع على صورك، وما صدّرته يبقى لك للأبد — حتى بعد انتهاء الاشتراك.",
        ],
      },
      {
        h: "الاشتراك والتجديد",
        body: [
          "تُفوتر العُدد شهريًا أو سنويًا عبر Stripe بالسعر المعروض عند اشتراكك — وفي الخطة السنوية شهران مجانيان. وقد تشمل العروض فترة تجربة تُعلَن عند الشراء. ويتجدد الاشتراك تلقائيًا حتى تلغيه.",
          "ألغِ في أي وقت من غرفة الفوترة: تبقى عُدّتك فعّالة حتى نهاية المدة التي دفعتها، ولا يُخصم شيء بعدها.",
        ],
      },
      {
        h: "الاسترداد",
        body: [
          "الشراء الأول: استرداد كامل خلال 14 يومًا، بلا أسئلة — راسل الصانع.",
          "التجديدات: ألغِ قبل تاريخ التجديد ولن يُخصم شيء. وإن فاتك خصم تجديد، فراسلنا خلال 7 أيام ويُصحَّح الأمر.",
        ],
      },
      {
        h: "الاستخدام العادل",
        body: [
          "لا تشارك مفتاح رخصتك ولا تبعه ولا تنشره؛ ولا تُعد توزيع التطبيق؛ ولا تحاول الهندسة العكسية للترخيص. خرق هذه البنود يُنهي الرخصة دون استرداد.",
        ],
      },
      {
        h: "البرنامج",
        body: [
          "يُقدَّم ستراتا كما هو، يُصان بعناية لكن دون ضمانٍ بالكمال. والتحديثات ضمن اشتراكك مشمولة.",
          "قد تتطور المزايا؛ أما الوعد الجوهري — معالجة محلية، سلامة 16 بت، تأليفك أنت — فلا يتغير.",
        ],
      },
      {
        h: "المسؤولية",
        body: [
          "إلى الحد الذي يجيزه القانون، تنحصر المسؤولية الإجمالية في المبلغ الذي دفعته خلال الاثني عشر شهرًا السابقة للمطالبة. واحتفظ دائمًا بنسخ احتياطية من ملفات RAW — ستراتا لا يعدّلها أبدًا، لكنها لا تُعوَّض.",
        ],
      },
      {
        h: "القانون الحاكم",
        body: ["تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة."],
      },
      {
        h: "الأسئلة",
        body: ["كل غامضٍ يستحق جوابًا واضحًا — راسل الصانع."],
      },
    ],
  },
};

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  return { title: lang === "ar" ? "الشروط" : "Terms", description: CONTENT[lang].intro };
}

export default function TermsPage({ params }: { params: { lang: string } }) {
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
