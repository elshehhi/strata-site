import { TIERS, TRIAL_DAYS, annualSaving, discountPct, type TierId } from "./tiers";

/* Price lookups for precomputed strings — the `nine` dict crosses the
   server→client boundary, so it must contain plain data, never functions. */
const PRICE = Object.fromEntries(TIERS.map((t) => [t.id, t])) as Record<
  TierId,
  (typeof TIERS)[number]
>;

/* Whole-dollar yearly saving per tier, precomputed for the annual lines. */
const SAVE = Object.fromEntries(TIERS.map((t) => [t.id, annualSaving(t)])) as Record<
  TierId,
  number
>;

/* Founding discount percentage per tier (the headline figure). */
const OFF = Object.fromEntries(TIERS.map((t) => [t.id, discountPct(t)])) as Record<
  TierId,
  number
>;

/**
 * Site copy, both voices. Arabic is the product's first language
 * (the app itself defaults to AR) — the marketing site honors that.
 * `en` is the source of truth for shape; `ar` must mirror it exactly.
 */
export const LOCALES = ["ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(x: string | undefined | null): x is Locale {
  return x === "ar" || x === "en";
}

export function dirFor(lang: Locale): "rtl" | "ltr" {
  return lang === "ar" ? "rtl" : "ltr";
}

/** The bilingual field guide (docs-site/site). In production publish it at
 *  /docs on the same host; locally a junction public/docs → docs-site/site
 *  serves the identical tree. */
export function docsUrl(lang: Locale): string {
  const base = process.env.NEXT_PUBLIC_DOCS_URL ?? "/docs";
  // Link the index file directly: zero redirects (no trailing-slash dance,
  // nothing for a browser to mis-cache) and the guide's relative asset
  // paths resolve against /docs/<lang>/ exactly as its build expects.
  return `${base}/${lang}/index.html`;
}

export interface TierStrings {
  name: string;
  reading: string;
  carries: string[];
  edge?: string;
}

const en = {
  meta: {
    title: "STRATA — Focus stacking for landscape photographers",
    description:
      "Every flower sharp. Every mountain sharp. One image. STRATA merges your focus brackets into a single all-in-focus photograph — on your machine, under your hand. The tool suggests. The artist decides.",
  },
  header: {
    pricing: "Pricing",
    docs: "Guide",
    get: "Get STRATA",
    fromPrice: "50% off · from $5/mo",
    switchLabel: "العربية",
  },
  hero: {
    l1: "Every flower sharp.",
    l2: "Every mountain sharp.",
    l3: "One image.",
    sub: "STRATA — focus stacking for landscape photographers.",
    trust: "Runs on your machine · your images never leave it",
    walkIn: "Walk in",
  },
  layers: {
    farLabel: "FAR · dunes sharp",
    nearLabel: "NEAR · flower sharp",
    chapter: "Chapter one · The strata",
    h1a: "A lens carries one plane of focus.",
    h1b: "The land carries hundreds.",
    p1: "So you bracket — near, then deeper, then deeper still — and the scene arrives as layers, the way the land itself was laid down.",
    mergeLabel: "The merge",
    h2a: "STRATA reads every layer,",
    h2b: "and keeps what each one knows.",
    p2: "Petal from the near frame. Ridge from the far. Sixteen bits, intact, end to end — one photograph with the whole walk in focus.",
    note: "Shown: an actual STRATA merge — two of its frames, then its result",
    altNear: "Near-focused frame — the flower sharp, the dunes soft",
    altFar: "Far-focused frame — the dunes sharp, the flower soft",
    altResult: "The merged photograph — flower and dunes both sharp",
  },
  depth: {
    chapter: "Chapter two · Depth",
    h1a: "Depth is not a number here.",
    h1b: "It is a place you can stand.",
    near: "NEAR · 0.42 m",
    mid: "the walk through the scene",
    far: "FAR · ∞",
    h2: "The instrument shows its work.",
    p: "For every region of the photograph, STRATA can show you which frame held the sharpest moment — a focus map drawn on the warm near, cool far axis. Not a black box. A field report you can read, question, and overrule.",
    note: "warm = near · cool = far · the gradient never means anything else",
    altMap:
      "STRATA's focus map — which frame won each region of the photograph, drawn on the depth axis",
  },
  artist: {
    chapter: "Chapter three · Authorship",
    strategyShot: "/screens/en_07_strategy.png",
    brushShot: "/screens/en_13_brush.png",
    b1h: "First, the tool reads the scene.",
    b1p: "It walks your stack the way you walked the land — and comes back with a reading, not a verdict.",
    b2h: "It proposes. Three readings of one scene.",
    b2p: "The recommendation glows with its confidence stated. The alternates wait in the shade. Nothing happens until you choose.",
    readings: ["Continuous depth", "Two distances", "Frame within frame"],
    b3h: "Then the brush is yours.",
    b3p: "Every stroke confesses its source — which frame, what depth — before you commit it. You are not correcting software. You are choosing moments of focus.",
    creed1: "The tool suggests.",
    creed2: "The artist decides.",
    creed3: "The final image belongs to the photographer.",
    altStrategy:
      "STRATA proposes three readings of the scene — continuous depth, two distances, frame within frame — with its confidence stated",
    altBrush: "The Refine brush — every stroke shows its donor frame before you commit it",
  },
  field: {
    chapter: "Real examples",
    h: "Every photo here is from STRATA.",
    p: "No stock photos, no renders — every photo here is STRATA's own output, straight from the app.",
    chip: "STRATA merge",
    altSuffix: "merged in STRATA",
    titles: {
      dunes: "Dune field",
      poppies: "Poppy field",
      towers: "Stone towers",
      wadi: "Wadi floor",
      bloom: "Low bloom",
      ridges: "Far ridges",
    },
  },
  trust: {
    chapter: "Chapter five · Custody",
    h: "Your art stays yours.",
    p: "Every pixel from your lens. Every decision in your hands. No account required to make a photograph, no server in the loop, nothing trained on your work.",
    promises: [
      {
        k: "16-BIT · INTACT",
        line: "Sixteen bits from RAW to export. Alignment computes on a derived view; your pixels are never thinned to be processed.",
      },
      {
        k: "NO CLOUD · NO UPLOAD",
        line: "STRATA is a desktop instrument. Develop, align, merge, refine — all of it on your machine. Your images never leave it.",
      },
      {
        k: "EVERY DECISION · REVERSIBLE",
        line: "The merge proposes; nothing bakes until you export. Strokes undo. The original frames stay untouched on disk.",
      },
    ],
  },
  closing: {
    printTitle: "A flower, refined by hand",
    printChip: "merged · refined · exported in STRATA",
    altPrint: "A finished STRATA photo — refined by hand",
    h: "Try STRATA on your next shoot.",
    p: "Three plans, same engine and 16-bit quality. They differ only in export formats.",
    from: "from",
    perMonth: "/ month",
    cta: "Choose your plan",
    credit: "software by Ahmed Alshehhi · for landscape photographers",
    navPricing: "Pricing",
    navDocs: "Guide",
    navDownload: "Download",
    navAccount: "Your subscription",
    navPrivacy: "Privacy",
    navTerms: "Terms",
    navWrite: "Write to the maker",
  },
  download: {
    metaTitle: "Download",
    label: "The instrument",
    h1a: "Take it to your machine.",
    h1b: "That's where it lives.",
    p: "STRATA is a desktop instrument — one install, no account to make a photograph, nothing that phones home while you work.",
    winTitle: "Windows",
    winSpec: "64-bit · Windows 10 / 11",
    version: "version 1.0",
    get: "Download for Windows",
    notUp:
      "The final build is being prepared for release. Write to the maker and it will reach you the moment it ships.",
    notify: "Ask for the build",
    smartscreen:
      "First run: Windows SmartScreen may pause an app it hasn't met yet. Choose “More info”, then “Run anyway” — the installer is checksummed on this page, and the warning fades as the release earns its reputation.",
    macTitle: "macOS",
    macLine: "Not yet. The field came first; the Mac build follows. Write if you want to be told the day it lands.",
    reqTitle: "What it asks of the machine",
    reqs: [
      "Windows 10 or 11, 64-bit",
      "16 GB RAM recommended for full-resolution stacks",
      "RAW from every major maker — Canon, Nikon, Sony, Fujifilm and more",
      "No GPU required; every core you have is used politely",
    ],
    afterTitle: "After the install",
    afterSteps: [
      "Open STRATA — it greets you in Arabic or English",
      "Choose Activate and sign in with your license",
      "Verification happens on your machine, offline, every launch",
    ],
    guideLine: "The field guide walks the whole journey, in both languages.",
    guideCta: "Open the field guide",
  },
  account: {
    metaTitle: "Your subscription",
    label: "The register, revisited",
    h: "Your subscription, your hands.",
    p: "Change the card, move between kits, download invoices, or cancel — all of it through the secure billing room, no email required, no questions asked.",
    open: "Open the billing room",
    portalNote:
      "You'll be asked for the email you purchased with; a sign-in link arrives there. Stripe runs this room — we never see your card.",
    notUp:
      "The billing room opens with the register. Until then the maker handles every change personally — usually within a day.",
    write: "Write to the maker",
    cancelTitle: "If you cancel",
    cancelLines: [
      "Your kit stays active until the end of the paid period",
      "Every photograph you exported remains yours, forever",
      "Your RAW files never depended on us in the first place",
    ],
  },
  notFound: {
    code: "404",
    h: "Off the trail.",
    p: "This path isn't on the map. The land shifts; links sometimes don't.",
    home: "Back to the trailhead",
    docs: "Open the field guide",
  },
  /* The "ninth version" — the judged-and-merged landing structure:
     accusation hook → drag-proof → creed → mechanism+honesty → custody
     → gallery → compressed manifesto → pricing+risk-removal → close. */
  nine: {
    heroL1: "In every landscape you've ever taken,",
    heroL2: "you chose what goes soft:",
    heroL3: "the flower — or the mountain.",
    drag: "Don't take our word for it — drag to see the difference.",
    beforeLabel: "ONE FRAME",
    afterLabel: "STRATA MERGE",
    credit:
      "A real pair from the field: two RAW frames, Nikon Z 6 (24 MP) — one focused on the flowers, one on the peaks.",
    trust: "Arabic-first · runs on your machine · your images never leave it",
    /* Hook → Story → Offer, in the first screen (Russell Brunson). The hook is
       the headline above; this is the epiphany-bridge story + the launch offer. */
    heroStory:
      "Here's the fix: shoot a few frames, each focused at a different distance, and STRATA merges them into one photo that's sharp front to back — the near flower and the far peak, both. It all runs on your own computer, and your photos never leave it.",
    heroOfferLabel: "Founding launch · 50% off",
    heroOfferCta: "Claim the founding price",
    heroOfferSub: "From $5/mo · try it free for 14 days · cancel anytime.",
    altBefore: "A single frame — the flowers sharp, the mountains soft",
    altAfter: "The STRATA merge — flowers and mountains both sharp",
    provokeLabel: "The problem",
    provoke1: "Open any old landscape in your archive and zoom in — you'll find a soft spot.",
    provoke2:
      "Even at f/16, when the flower is close and the mountain is far, no single shot can keep both sharp.",
    provoke3: "It's not your lens — it's the limit of depth of field. The fix is simple: combine a few shots into one.",
    creedLabel: "Our principle",
    depthLine: "Two focus layers — near and far — merged into one photo.",
    creed1: "STRATA suggests.",
    creed2: "You decide.",
    creedBody:
      "STRATA reads your shots and proposes three ways to merge them — it never forces anything. You choose, and when you refine, you can see which shot every detail comes from before you keep it.",
    howLabel: "How it works",
    steps: ["Drop in your folder of shots", "Review the merge plan and approve", "Refine by hand, then export"],
    howTrust1: "Alignment is computed on a temporary copy; your original pixels are never touched.",
    howTrust2: "Full 16-bit quality, from RAW to export.",
    notTitle: "And what STRATA won't do",
    nots: [
      "It won't fix camera or tripod shake.",
      "It won't invent detail you didn't shoot.",
      "It doesn't promise magic — just a photo that's sharp front to back.",
    ],
    custodyLabel: "Your privacy",
    custodyBig: "No cloud. No uploads. No AI trained on your work.",
    custodyLic:
      "Activate your license once, then it verifies on your computer offline, every time you open it.",
    cancelQ: "And if you cancel?",
    cancelA:
      "Your exported photos are plain TIFF and DNG files on your computer — they open in any program and stay yours forever. You pay for development and support, not for access to your own photos.",
    galleryLede: "You shoot the scene; STRATA merges its focus layers into one photo.",
    manifestoLabel: "What we believe",
    manifesto: [
      "The photo belongs to the photographer",
      "The software suggests; you decide",
      "Your photos never leave your computer",
      "Full 16-bit quality, no compromise",
      "A beautiful photo is a decision, not an accident",
    ],
    exclusion: "If you want software that decides everything for you, there's plenty of it elsewhere.",
    refund:
      "Full refund within 14 days, no questions asked · cancel anytime and your plan stays active until the period ends",
    closeH: "Stop choosing.",
    /* The Maker's Letter — the winning pricing strategy's spine: answers
       why-subscription, solo-maker continuity, and the rent-vs-own attack,
       in the creed's own voice, signed. */
    letterLabel: "A letter from the maker",
    letter1: "Dear photographer,",
    letter2:
      "STRATA has no investors, no ads, and no data to sell. Your subscription is what keeps it alive: it's how we add support for new cameras every year and improve the tools month after month. Less than the price of one filter a year.",
    letter3:
      "And your photos never depend on the subscription: whatever you export stays as files on your computer forever, subscribed or not.",
    letterRise:
      "The price goes up as STRATA grows. Subscribe now and your price stays fixed for your entire first year.",
    letterSign: "— Ahmed Alshehhi, maker of STRATA",
    counterLine: "Your subscription is what keeps STRATA alive.",
    weld: "Full refund within 14 days — and your exports stay yours even if you ask for one.",
    /* founding-price (direct-response) layer — honest scarcity: the rate
       genuinely rises, so we anchor against it instead of inventing a timer. */
    foundingBadge: "Founding price",
    regularLabel: "regular",
    off: {
      personal: `${OFF.personal}% off`,
      professional: `${OFF.professional}% off`,
      studio: `${OFF.studio}% off`,
    } as Record<TierId, string>,
    foundingNote: "Launch price — half the regular price. It goes up with future updates.",
    priceLock:
      "Subscribe now and your price is locked for 12 months. The price rises with updates — yours doesn't, all year.",
    foundingBanner:
      "STRATA is new, and early subscribers get 50% off — half of its future price. Subscribe before it goes up.",
    guarantee:
      "Try it free for 14 days, with another 14 days to get a refund if it's not for you. Whatever you export stays as files on your computer forever. The risk is ours, not yours.",
    countdown: {
      label: "50% off ends in",
      days: "days",
      hours: "hrs",
      mins: "min",
      secs: "sec",
    },
    annual: {
      personal: `or $${PRICE.personal.priceAnnual}/year — save $${SAVE.personal}`,
      professional: `or $${PRICE.professional.priceAnnual}/year — save $${SAVE.professional}`,
      studio: `or $${PRICE.studio.priceAnnual}/year — save $${SAVE.studio}`,
    } as Record<TierId, string>,
    payAnnual: {
      personal: `Pay yearly — $${PRICE.personal.priceAnnual} (save $${SAVE.personal})`,
      professional: `Pay yearly — $${PRICE.professional.priceAnnual} (save $${SAVE.professional})`,
      studio: `Pay yearly — $${PRICE.studio.priceAnnual} (save $${SAVE.studio})`,
    } as Record<TierId, string>,
    trialLine:
      TRIAL_DAYS > 0
        ? `First ${TRIAL_DAYS} days free — try it on your own stacks before the first charge.`
        : "",
    takePro: "Choose the Professional plan",
  },
  pricing: {
    metaTitle: "Pricing",
    metaDesc:
      "Three plans — Personal, Professional, Studio. Same engine and same 16-bit quality; they differ only in export formats.",
    register: "Start here",
    h1a: "Choose your plan.",
    h1b: "Stay in control.",
    p: "Every plan includes the full app — develop, align, merge, refine, all on your computer. The only difference is which export formats you get.",
    badge: "Recommended",
    perMonth: "/ month",
    take: (name: string) => `Choose the ${name} plan`,
    note: "Your license activates and verifies on your computer, offline · cancel anytime, your exported work is yours forever",
  },
  checkout: {
    metaTitle: "Checkout",
    yourKit: "Your plan",
    perMonth: "/ month",
    perYear: "/ year",
    annualNote: "billed yearly — a lower rate than monthly",
    room: "The payment room · run by Stripe — your card never touches us",
    after:
      "After payment your license arrives by email and activates inside STRATA — verified on your machine, offline, every launch.",
    back: "← choose a different plan",
    closedH: "The register isn't open yet.",
    closedFail:
      "Checkout couldn't be reached just now. Nothing was charged — try again in a moment.",
    closedDemo:
      "This build is running without payment keys — a field demo. The full site takes payment here, in this room, without leaving it.",
    write: "Write to the maker",
  },
  success: {
    metaTitle: "Welcome to the field",
    confirmed: "The register confirms",
    welcome: "Welcome",
    h: (tier: string | null) => (tier ? `The ${tier} plan is yours.` : "The plan is yours."),
    bodyWithEmail: (email: string) =>
      `Your license is on its way to ${email}. Open STRATA, choose Activate, and the instrument verifies it on your machine — offline, every launch after.`,
    body: "Your license arrives by email. Open STRATA, choose Activate, and the instrument verifies it on your machine — offline, every launch after.",
    caption: "now go make one of these",
    again: "Walk the journey again",
    help: "Need a hand? Write to the maker",
    guide: "Open the field guide",
    download: "Download STRATA",
    altDunes: "A STRATA merge of a dune field — the kind of photograph waiting for you",
  },
  tiers: {
    personal: {
      name: "Personal",
      reading: "For photographers who want fully sharp photos, starting out.",
      carries: [
        "The full workflow — develop, align, merge, refine",
        "Every RAW format, with your shots ordered near → far",
        "Full 16-bit quality at every stage",
        "JPEG and TIFF export in sRGB",
        "All four refine tools",
      ],
      edge: "DNG and wide-gamut export are in the Professional plan.",
    },
    professional: {
      name: "Professional",
      reading: "For photographers who keep editing in Camera Raw after the merge.",
      carries: [
        "Everything in Personal",
        "DNG export — a raw file you fully grade in Camera Raw",
        "Wide-gamut 16-bit TIFF export",
        "STRATA develops faithfully; you control the color and look",
      ],
    },
    studio: {
      name: "Studio",
      reading: "For studios — one license across several computers.",
      carries: [
        "Everything in Professional",
        "Activate on up to 3 computers",
        "Priority support straight from the maker",
        "Early access to new updates",
      ],
    },
  } as Record<TierId, TierStrings>,
};

export type Dict = typeof en;

const ar: Dict = {
  meta: {
    title: "ستراتا — تكديس البؤرة لمصوّري المناظر الطبيعية",
    description:
      "كل زهرةٍ حادّة. كل جبلٍ حادّ. صورة واحدة. ستراتا يدمج لقطات البؤرة المتدرّجة في صورة واحدة كاملة الحدّة — على جهازك، وبيدك القرار. الأداة تقترح، والفنان يقرّر.",
  },
  header: {
    pricing: "التسعير",
    docs: "دليل الاستخدام",
    get: "احصل على ستراتا",
    fromPrice: "خصم 50% · من $5 شهريًا",
    switchLabel: "English",
  },
  hero: {
    l1: "كل زهرةٍ حادّة.",
    l2: "كل جبلٍ حادّ.",
    l3: "صورة واحدة.",
    sub: "ستراتا — تكديس البؤرة لمصوّري المناظر الطبيعية.",
    trust: "يعمل على جهازك · صورك لا تغادره أبدًا",
    walkIn: "ادخل",
  },
  layers: {
    farLabel: "البعيد · الكثبان واضحة",
    nearLabel: "القريب · الزهرة واضحة",
    chapter: "الفصل الأول · الطبقات",
    h1a: "العدسة تحمل مستوى بؤرةٍ واحدًا.",
    h1b: "والأرض تحمل مئات.",
    p1: "فتلتقط متدرّجًا — قريبًا، ثم أعمق، ثم أعمق — ويصلك المشهد طبقاتٍ، كما تكوّنت الأرض نفسها طبقةً فوق طبقة.",
    mergeLabel: "الدمج",
    h2a: "ستراتا يقرأ كل طبقة،",
    h2b: "ويحتفظ بما تعرفه كلٌّ منها.",
    p2: "البتلة من اللقطة القريبة. الحافة من البعيدة. ستة عشر بت، سليمةً من البداية إلى النهاية — صورة واحدة فيها الدرب كله حادّ.",
    note: "المعروض: دمج حقيقي من ستراتا — لقطتان من إطاراته، ثم نتيجته",
    altNear: "لقطة بؤرتها قريبة — الزهرة حادّة والكثبان ليّنة",
    altFar: "لقطة بؤرتها بعيدة — الكثبان حادّة والزهرة ليّنة",
    altResult: "الصورة المدموجة — الزهرة والكثبان حادّتان معًا",
  },
  depth: {
    chapter: "الفصل الثاني · العمق",
    h1a: "العمق هنا ليس رقمًا.",
    h1b: "إنه مكانٌ تقف فيه.",
    near: "القريب · 0.42 م",
    mid: "المسير عبر المشهد",
    far: "البعيد · ∞",
    h2: "الأداة تُري عملها.",
    p: "لكل منطقةٍ من الصورة، يستطيع ستراتا أن يريك أي إطارٍ أمسك اللحظة الأكثر حدّة — خريطة بؤرة مرسومة على محورٍ دافئِ القريب باردِ البعيد. ليست صندوقًا أسود، بل تقرير ميداني تقرؤه وتسائله وتتجاوزه إن شئت.",
    note: "الدافئ = قريب · البارد = بعيد · هذا التدرّج لا يعني شيئًا آخر أبدًا",
    altMap: "خريطة البؤرة في ستراتا — أي إطارٍ فاز بكل منطقة من الصورة، مرسومةً على محور العمق",
  },
  artist: {
    chapter: "الفصل الثالث · التأليف",
    // the Arabic experience shows the instrument's own Arabic interface
    strategyShot: "/screens/ar_07_strategy.png",
    brushShot: "/screens/ar_12_refine.png",
    b1h: "أولًا، تقرأ الأداة المشهد.",
    b1p: "تمشي في طبقاتك كما مشيتَ أنت في الأرض — وتعود بقراءة، لا بحُكم.",
    b2h: "تقترح. ثلاث قراءاتٍ لمشهدٍ واحد.",
    b2p: "التوصية تتوهّج وثقتها معلنة. والبدائل تنتظر في الظل. لا شيء يحدث حتى تختار أنت.",
    readings: ["عمق متّصل", "مسافتان", "إطار داخل إطار"],
    b3h: "ثم الفرشاة لك.",
    b3p: "كل ضربةٍ تُفصح عن مصدرها — أي إطار، وأي عمق — قبل أن تعتمدها. أنت لا تصحّح برنامجًا؛ أنت تختار لحظات البؤرة.",
    creed1: "الأداة تقترح.",
    creed2: "والفنان يقرّر.",
    creed3: "الصورة النهائية ملك المصوّر.",
    altStrategy:
      "ستراتا يقترح ثلاث قراءات للمشهد — عمق متّصل، مسافتان، إطار داخل إطار — مع إعلان ثقته",
    altBrush: "فرشاة التنقيح — كل ضربة تُظهر إطارها المانح قبل اعتمادها",
  },
  field: {
    chapter: "أمثلة حقيقية",
    h: "كل هذه الصور من ستراتا.",
    p: "لا صور جاهزة ولا تصيير — كل صورة هنا ناتج ستراتا مباشرةً، كما خرجت منه.",
    chip: "دمج ستراتا",
    altSuffix: "دُمجت في ستراتا",
    titles: {
      dunes: "حقل الكثبان",
      poppies: "حقل الشقائق",
      towers: "أبراج الصخر",
      wadi: "قاع الوادي",
      bloom: "زهرٌ منخفض",
      ridges: "السلاسل البعيدة",
    },
  },
  trust: {
    chapter: "الفصل الخامس · العُهدة",
    h: "فنّك يبقى لك.",
    p: "كل بكسل من عدستك. كل قرارٍ بين يديك. لا حساب يلزم لتصنع صورة، لا خادم في الطريق، ولا شيء يتدرّب على أعمالك.",
    promises: [
      {
        k: "16 بت · سليمة",
        line: "ستة عشر بت من RAW حتى التصدير. المحاذاة تُحسب على نسخةٍ مشتقّة؛ بكسلاتك لا تُرقَّق أبدًا كي تُعالَج.",
      },
      {
        k: "لا سحابة · لا رفع",
        line: "ستراتا أداة سطح مكتب. التحميض والمحاذاة والدمج والتنقيح — كلها على جهازك. صورك لا تغادره أبدًا.",
      },
      {
        k: "كل قرار · قابل للتراجع",
        line: "الدمج يقترح؛ لا شيء يُثبَّت حتى تُصدِّر. الضربات تُلغى. والإطارات الأصلية تبقى كما هي على القرص.",
      },
    ],
  },
  closing: {
    printTitle: "زهرة نُقِّحت يدويًا",
    printChip: "دُمجت ونُقِّحت وصُدِّرت في ستراتا",
    altPrint: "صورة جاهزة من ستراتا — نُقِّحت يدويًا",
    h: "جرّب ستراتا في تصويرك القادم.",
    p: "ثلاث باقات، بالمحرّك نفسه وجودة 16 بت نفسها. الفرق بينها في صيغ التصدير فقط.",
    from: "من",
    perMonth: "/ شهريًا",
    cta: "اختر باقتك",
    credit: "برنامج من صنع أحمد الشحّي · لمصوّري الطبيعة",
    navPricing: "التسعير",
    navDocs: "دليل الاستخدام",
    navDownload: "التنزيل",
    navAccount: "اشتراكك",
    navPrivacy: "الخصوصية",
    navTerms: "الشروط",
    navWrite: "راسل الصانع",
  },
  download: {
    metaTitle: "التنزيل",
    label: "الأداة",
    h1a: "خذها إلى جهازك.",
    h1b: "فهناك تعيش.",
    p: "ستراتا أداة سطح مكتب — تثبيت واحد، لا حساب يلزم لتصنع صورة، ولا شيء يتصل بأحد وأنت تعمل.",
    winTitle: "Windows",
    winSpec: "64-بت · ويندوز 10 / 11",
    version: "الإصدار 1.0",
    get: "نزّل نسخة ويندوز",
    notUp: "البناء النهائي قيد التجهيز للإصدار. راسل الصانع وسيصلك لحظة جهوزه.",
    notify: "اطلب البناء",
    smartscreen:
      "في أول تشغيل قد يتوقف Windows SmartScreen عند تطبيق لم يقابله من قبل. اختر «More info» ثم «Run anyway» — بصمة المثبّت منشورة في هذه الصفحة، والتحذير يتلاشى كلما اكتسب الإصدار سمعته.",
    macTitle: "macOS",
    macLine: "ليس بعد. الميدان جاء أولًا؛ ونسخة ماك تتبعه. راسلنا إن أردت أن تُخبَر يوم وصولها.",
    reqTitle: "ما الذي تطلبه من الجهاز",
    reqs: [
      "ويندوز 10 أو 11، 64-بت",
      "يُستحسن 16 GB من الذاكرة للرزم كاملة الدقة",
      "RAW من كل الصنّاع الكبار — كانون، نيكون، سوني، فوجي وغيرها",
      "لا حاجة لبطاقة رسوميات؛ وكل أنوية معالجك تُستخدم بأدب",
    ],
    afterTitle: "بعد التثبيت",
    afterSteps: [
      "افتح ستراتا — يستقبلك بالعربية أو الإنجليزية",
      "اختر «تفعيل» وأدخل رخصتك",
      "التحقق يجري على جهازك، دون اتصال، في كل تشغيل",
    ],
    guideLine: "الدليل الميداني يمشي معك الرحلة كاملة، باللغتين.",
    guideCta: "افتح الدليل الميداني",
  },
  account: {
    metaTitle: "اشتراكك",
    label: "السجلّ، من جديد",
    h: "اشتراكك بين يديك.",
    p: "غيّر البطاقة، انتقل بين العُدد، نزّل الفواتير، أو ألغِ — كل ذلك عبر غرفة الفوترة الآمنة، بلا مراسلات وبلا أسئلة.",
    open: "افتح غرفة الفوترة",
    portalNote:
      "سيُطلب منك بريد الشراء؛ ويصلك عليه رابط دخول. هذه الغرفة يديرها Stripe — نحن لا نرى بطاقتك أبدًا.",
    notUp: "غرفة الفوترة تُفتح مع افتتاح السجلّ. حتى ذلك الحين يتولّى الصانع كل تعديل بنفسه — عادةً خلال يوم.",
    write: "راسل الصانع",
    cancelTitle: "إن ألغيت",
    cancelLines: [
      "تبقى باقتك فعّالة حتى نهاية المدة المدفوعة",
      "كل صورة صدّرتها تبقى لك، للأبد",
      "وملفات RAW عندك لم تعتمد علينا أصلًا",
    ],
  },
  notFound: {
    code: "404",
    h: "خارج الدرب.",
    p: "هذا المسار ليس على الخريطة. الأرض تتبدّل؛ والروابط أحيانًا لا تلحق.",
    home: "عُد إلى نقطة الانطلاق",
    docs: "افتح الدليل الميداني",
  },
  nine: {
    heroL1: "في كل صورة طبيعة التقطتها،",
    heroL2: "كان عليك أن تختار ما الذي يظهر واضحًا:",
    heroL3: "الزهرة… أم الجبل.",
    drag: "لا تصدّقنا — اسحب وشاهد الفرق بنفسك.",
    beforeLabel: "إطار واحد",
    afterLabel: "دمج ستراتا",
    credit:
      "زوجٌ حقيقي من الميدان: إطارا RAW من نيكون Z 6 ‏(24 ميجابكسل) — أحدهما بؤرته الزهور، والآخر القمم.",
    trust: "يُصنع بالعربية أولًا · يعمل على جهازك · صورك لا تغادره",
    /* Hook → Story → Offer في الشاشة الأولى (أسلوب Russell Brunson). */
    heroStory:
      "هنا يأتي دور ستراتا: تلتقط عدّة صور، كل واحدة مركّزة على مسافة مختلفة، فيجمعها في صورة واحدة واضحة بالكامل — القريب والبعيد معًا. كل المعالجة تتم على جهازك، وصورك لا تخرج منه.",
    heroOfferLabel: "إطلاق المؤسِّسين · خصم 50%",
    heroOfferCta: "احجز سعر التأسيس",
    heroOfferSub: "من $5 شهريًا · جرّبه 14 يومًا مجانًا · ألغِ متى شئت.",
    altBefore: "إطار واحد — الزهور حادّة والجبال ليّنة",
    altAfter: "دمج ستراتا — الزهور والجبال حادّتان معًا",
    provokeLabel: "المشكلة",
    provoke1: "افتح أي صورة منظر قديمة في أرشيفك وكبّرها — ستجد جزءًا غير واضح.",
    provoke2:
      "حتى لو صوّرت بفتحة عدسة صغيرة (f/16)، ما دامت الزهرة قريبة منك والجبل بعيدًا، لن تخرج الصورة كلها واضحة في لقطة واحدة.",
    provoke3: "السبب ليس عدستك، بل حدود عمق المجال نفسها. والحل بسيط: عدّة لقطات تُدمج في صورة واحدة.",
    creedLabel: "مبدؤنا",
    depthLine: "طبقتان من البؤرة، القريبة والبعيدة، تتّحدان في صورة واحدة.",
    creed1: "ستراتا يقترح.",
    creed2: "وأنت تقرّر.",
    creedBody:
      "يقرأ ستراتا صورك ويقترح عليك ثلاث طرق لدمجها — لكنه لا يفرض شيئًا. أنت تختار، وعند التنقيح تعرف من أي لقطة تأتي كل تفصيلة قبل أن تعتمدها.",
    howLabel: "كيف يعمل",
    steps: ["أسقِط مجلد صورك", "راجِع خطة الدمج ووافق عليها", "نقّح يدويًا، ثم صدّر"],
    howTrust1: "المحاذاة تُحسب على نسخة مؤقتة، وبكسلاتك الأصلية لا تُمسّ.",
    howTrust2: "جودة 16 بت كاملة، من ملف RAW حتى التصدير.",
    notTitle: "وما لا يفعله ستراتا",
    nots: [
      "لا يصلح اهتزاز الكاميرا أو الحامل.",
      "لا يخترع تفاصيل لم تصوّرها أصلًا.",
      "لا يعدك بالسحر، بل بصورة واضحة من الأمام إلى الخلف.",
    ],
    custodyLabel: "خصوصيتك",
    custodyBig: "لا سحابة. لا رفع للصور. ولا تدريب ذكاء اصطناعي على أعمالك.",
    custodyLic: "تُفعّل رخصتك مرة واحدة، ثم يتحقّق منها البرنامج على جهازك بلا إنترنت في كل تشغيل.",
    cancelQ: "وإذا ألغيت الاشتراك؟",
    cancelA:
      "صورك المُصدّرة ملفات TIFF وDNG عادية محفوظة على جهازك، تفتحها بأي برنامج وتبقى لك للأبد. أنت تدفع مقابل التطوير والدعم، لا مقابل الوصول إلى صورك.",
    galleryLede: "أنت تصوّر المشهد، وستراتا يدمج طبقات البؤرة في صورة واحدة.",
    manifestoLabel: "ما نؤمن به",
    manifesto: [
      "الصورة ملك المصوّر",
      "البرنامج يقترح، والقرار لك",
      "صورك لا تغادر جهازك",
      "جودة 16 بت كاملة بلا تنازل",
      "الصورة الجميلة قرار، لا مصادفة",
    ],
    exclusion: "إن كنت تبحث عن برنامج يقرّر كل شيء بدلًا منك، فهناك خيارات كثيرة غيرنا.",
    refund: "استرداد كامل خلال 14 يومًا بلا أسئلة · ألغِ متى شئت وتبقى باقتك فعّالة حتى نهاية مدّتها",
    closeH: "لا تختر بعد اليوم.",
    letterLabel: "رسالة من الصانع",
    letter1: "عزيزي المصوّر،",
    letter2:
      "ستراتا بلا مستثمرين ولا إعلانات ولا بيانات تُباع. اشتراكك هو ما يُبقي البرنامج حيًّا: به نضيف دعم الكاميرات الجديدة كل عام، ونحسّن الأدوات شهرًا بعد شهر. وكلفته أقل من ثمن فلتر واحد في السنة.",
    letter3:
      "وصورك لا تعتمد على الاشتراك: ما صدّرته يبقى ملفات على جهازك للأبد، سواء بقيت مشتركًا أو لا.",
    letterRise:
      "وكلما تطوّر ستراتا ارتفع سعره. اشترك الآن، وسيبقى سعرك ثابتًا طوال سنتك الأولى.",
    letterSign: "— أحمد الشحّي، صانع ستراتا",
    counterLine: "اشتراكك هو ما يُبقي ستراتا حيًّا.",
    weld: "استرداد كامل خلال 14 يومًا — وما صدّرته يبقى لك حتى لو طلبت الاسترداد.",
    /* طبقة سعر التأسيس — ندرة صادقة: السعر يرتفع فعلًا، فنشطب عليه بدل اختلاق عدّاد. */
    foundingBadge: "سعر تأسيسي",
    regularLabel: "العادي",
    off: {
      personal: `خصم ${OFF.personal}%`,
      professional: `خصم ${OFF.professional}%`,
      studio: `خصم ${OFF.studio}%`,
    } as Record<TierId, string>,
    foundingNote: "سعر إطلاق مخفّض — نصف السعر العادي. سيرتفع مع التحديثات القادمة.",
    priceLock:
      "اشترك الآن ويثبت سعرك 12 شهرًا. السعر سيرتفع مع التحديثات، أمّا سعرك أنت فلا — طوال سنتك الأولى.",
    foundingBanner:
      "ستراتا منتج جديد، وسعر إطلاقه مخفّض 50% للمشتركين الأوائل — نصف سعره القادم. اشترك قبل أن يرتفع.",
    guarantee:
      "جرّبه 14 يومًا مجانًا، ولك 14 يومًا أخرى لاسترداد أموالك إن لم يعجبك. وما صدّرته يبقى ملفاتك على جهازك للأبد. المخاطرة علينا، لا عليك.",
    countdown: {
      label: "ينتهي خصم 50% بعد",
      days: "يوم",
      hours: "ساعة",
      mins: "دقيقة",
      secs: "ثانية",
    },
    annual: {
      personal: `أو $${PRICE.personal.priceAnnual} سنويًا — وفّر $${SAVE.personal}`,
      professional: `أو $${PRICE.professional.priceAnnual} سنويًا — وفّر $${SAVE.professional}`,
      studio: `أو $${PRICE.studio.priceAnnual} سنويًا — وفّر $${SAVE.studio}`,
    },
    payAnnual: {
      personal: `ادفع سنويًا — $${PRICE.personal.priceAnnual} (وفّر $${SAVE.personal})`,
      professional: `ادفع سنويًا — $${PRICE.professional.priceAnnual} (وفّر $${SAVE.professional})`,
      studio: `ادفع سنويًا — $${PRICE.studio.priceAnnual} (وفّر $${SAVE.studio})`,
    },
    trialLine:
      TRIAL_DAYS > 0 ? `أول ${TRIAL_DAYS} يومًا مجانًا — جرّبه على صورك أنت قبل أي خصم.` : "",
    takePro: "اختر الباقة الاحترافية",
  },
  pricing: {
    metaTitle: "التسعير",
    metaDesc: "ثلاث باقات — شخصية واحترافية واستوديو. المحرّك نفسه وجودة 16 بت نفسها؛ الفرق في صيغ التصدير.",
    register: "ابدأ من هنا",
    h1a: "اختر باقتك.",
    h1b: "وابقَ صاحب القرار.",
    p: "كل باقة فيها البرنامج كاملًا — تحميض ومحاذاة ودمج وتنقيح، كلها على جهازك. الفرق الوحيد بين الباقات هو صيغ التصدير المتاحة.",
    badge: "الخيار الأنسب",
    perMonth: "/ شهريًا",
    take: (name: string) => `اختر باقة ${name}`,
    note: "الرخصة تُفعّل وتُتحقّق على جهازك بلا إنترنت · ألغِ متى شئت، وما صدّرته يبقى لك للأبد",
  },
  checkout: {
    metaTitle: "الدفع",
    yourKit: "باقتك",
    perMonth: "/ شهريًا",
    perYear: "/ سنويًا",
    annualNote: "فوترة سنوية — بسعر أوفر من الشهري",
    room: "غرفة الدفع · يديرها Stripe — بطاقتك لا تمرّ بنا أبدًا",
    after: "بعد الدفع تصلك الرخصة بالبريد وتُفعَّل داخل ستراتا — تُتحقَّق على جهازك، دون اتصال، في كل تشغيل.",
    back: "→ اختر باقة أخرى",
    closedH: "السجلّ لم يُفتح بعد.",
    closedFail: "تعذّر الوصول إلى الدفع الآن. لم يُخصم شيء — حاول بعد قليل.",
    closedDemo:
      "هذه النسخة تعمل بلا مفاتيح دفع — عرضٌ ميداني. الموقع الكامل يستقبل الدفع هنا، في هذه الغرفة، دون مغادرتها.",
    write: "راسل الصانع",
  },
  success: {
    metaTitle: "أهلًا بك في الميدان",
    confirmed: "السجلّ يؤكّد",
    welcome: "أهلًا",
    h: (tier: string | null) => (tier ? `باقة «${tier}» صارت لك.` : "صارت الباقة لك."),
    bodyWithEmail: (email: string) =>
      `رخصتك في طريقها إلى ${email}. افتح ستراتا، اختر «تفعيل»، وستتحقّق الأداة منها على جهازك — دون اتصال، في كل تشغيلٍ لاحق.`,
    body: "رخصتك تصلك بالبريد. افتح ستراتا، اختر «تفعيل»، وستتحقّق الأداة منها على جهازك — دون اتصال، في كل تشغيلٍ لاحق.",
    caption: "والآن اذهب واصنع واحدةً مثلها",
    again: "اعبر الرحلة من جديد",
    help: "تحتاج مساعدة؟ راسل الصانع",
    guide: "افتح الدليل الميداني",
    download: "نزّل ستراتا",
    altDunes: "دمج ستراتا لحقل كثبان — من الصور التي تنتظرك",
  },
  tiers: {
    personal: {
      name: "شخصية",
      reading: "لمن يريد صورًا واضحة بالكامل، ويبدأ خطوة بخطوة.",
      carries: [
        "كل مراحل العمل — تحميض ومحاذاة ودمج وتنقيح",
        "يدعم كل صيغ RAW، ويرتّب لقطاتك من الأقرب إلى الأبعد",
        "جودة 16 بت كاملة في كل مرحلة",
        "تصدير JPEG و TIFF بمساحة ألوان sRGB",
        "أدوات التنقيح الأربع كاملة",
      ],
      edge: "تصدير DNG ومساحة الألوان الواسعة متاحان في الباقة الاحترافية.",
    },
    professional: {
      name: "احترافية",
      reading: "لمن يُكمل تعديل صوره في Camera Raw بعد الدمج.",
      carries: [
        "كل ما في الباقة الشخصية",
        "تصدير DNG — ملف خام تتحكّم بألوانه كاملًا في Camera Raw",
        "تصدير TIFF بجودة 16 بت ومساحة ألوان واسعة",
        "ستراتا يحمّض الصورة بأمانة، وأنت تتحكّم بألوانها ومظهرها",
      ],
    },
    studio: {
      name: "استوديو",
      reading: "للاستوديوهات — رخصة واحدة تعمل على عدة أجهزة.",
      carries: [
        "كل ما في الباقة الاحترافية",
        "تفعيل على 3 أجهزة",
        "دعم بأولوية مباشرة من الصانع",
        "وصول مبكّر للتحديثات الجديدة",
      ],
    },
  },
};

const DICTS: Record<Locale, Dict> = { en, ar };

export function getDict(lang: Locale): Dict {
  return DICTS[lang];
}
