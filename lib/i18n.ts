import { TIERS, TRIAL_DAYS, type TierId } from "./tiers";

/* Price lookups for precomputed strings — the `nine` dict crosses the
   server→client boundary, so it must contain plain data, never functions. */
const PRICE = Object.fromEntries(TIERS.map((t) => [t.id, t])) as Record<
  TierId,
  (typeof TIERS)[number]
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
    docs: "Field guide",
    get: "Get STRATA",
    fromPrice: "from $9/mo",
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
    farLabel: "FAR · the dune holds focus",
    nearLabel: "NEAR · the flower holds focus",
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
    chapter: "Chapter four · The field",
    h: "Made in STRATA. All of it.",
    p: "No renders, no stock. These photographs are the instrument's own output, shown the way they left it.",
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
    printTitle: "Bloom, refined by hand",
    printChip: "merged · refined · exported in STRATA",
    altPrint: "A finished STRATA photograph — refined by hand, exported once",
    h: "Take STRATA into the field.",
    p: "Three kits. Same engine, same sixteen bits, same authorship.",
    from: "from",
    perMonth: "/ month",
    cta: "Choose your kit",
    credit: "an instrument by Ahmed Alshehhi · made for the field",
    navPricing: "Pricing",
    navDocs: "Field guide",
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
    drag: "We won't tell you it's sharp. Drag — and see.",
    beforeLabel: "ONE FRAME",
    afterLabel: "STRATA MERGE",
    credit:
      "A real pair from the field: two RAW frames, Nikon Z 6 (24 MP) — one focused on the flowers, one on the peaks.",
    trust: "Arabic-first · runs on your machine · your images never leave it",
    altBefore: "A single frame — the flowers sharp, the mountains soft",
    altAfter: "The STRATA merge — flowers and mountains both sharp",
    provokeLabel: "The compromise",
    provoke1: "Zoom into any old photograph in your archive and you'll find it.",
    provoke2:
      "Even at f/16, with the flower an arm's length away and the summit on the horizon, no single frame can hold them both.",
    provoke3: "It isn't your lens — it's physics. And physics is solved in layers.",
    creedLabel: "The creed",
    depthLine: "Depth isn't a number in the EXIF; it's a place you stand.",
    creed1: "The tool suggests.",
    creed2: "The artist decides.",
    creedBody:
      "STRATA reads your stack and returns three readings of the scene — not a verdict. You choose, and the brush confesses its source frame before you commit a single stroke.",
    howLabel: "How it works",
    steps: ["Drop the folder from the field", "Approve the merge plan", "Refine by hand, then export"],
    howTrust1: "Alignment is computed on a derived view; your pixels are never touched.",
    howTrust2: "Sixteen bits from RAW to export.",
    notTitle: "And what it won't do",
    nots: [
      "It won't fix tripod shake.",
      "It won't invent detail you didn't capture.",
      "It doesn't promise magic; it promises sharpness.",
    ],
    custodyLabel: "Custody",
    custodyBig: "No cloud. No upload. No training on your art.",
    custodyLic:
      "Your license activates once and verifies on your machine — offline — every launch.",
    cancelQ: "And if you cancel?",
    cancelA:
      "Your photographs are plain TIFF and DNG files on your own disk — they open in any program, forever. The subscription buys development and support, never access to your archive.",
    galleryLede: "You walked the scene. STRATA walks your layers.",
    manifestoLabel: "The manifesto",
    manifesto: [
      "The photograph belongs to the photographer",
      "The tool suggests; it never decides",
      "No pixel leaves the machine",
      "Sixteen bits, kept honest",
      "Beauty is a decision, not an accident",
    ],
    exclusion: "And if you want software that decides for you — there is plenty of it elsewhere.",
    refund:
      "Full refund within 14 days, no questions asked · cancel anytime and your kit stays until its period ends",
    closeH: "Stop choosing.",
    /* The Maker's Letter — the winning pricing strategy's spine: answers
       why-subscription, solo-maker continuity, and the rent-vs-own attack,
       in the creed's own voice, signed. */
    letterLabel: "A letter from the maker",
    letter1: "Fellow photographer —",
    letter2:
      "STRATA has no investors, no ads, no data to sell. Your subscription is the entire company: it is what makes a 2027 camera readable in its own season, and the brush more honest every month. Less than one filter a year.",
    letter3:
      "And your photographs never depend on it: whatever you export stays your files, on your disk, forever — subscribed or not.",
    letterSign: "— Ahmed Alshehhi, maker of STRATA",
    counterLine: "Your subscription is the entire company.",
    weld: "Full refund within 14 days — and your exports stay yours even if you do.",
    annual: {
      personal: `or $${PRICE.personal.priceAnnual}/year — two months free`,
      professional: `or $${PRICE.professional.priceAnnual}/year — two months free`,
      studio: `or $${PRICE.studio.priceAnnual}/year — two months free`,
    } as Record<TierId, string>,
    payAnnual: {
      personal: `Pay yearly — $${PRICE.personal.priceAnnual} (two months free)`,
      professional: `Pay yearly — $${PRICE.professional.priceAnnual} (two months free)`,
      studio: `Pay yearly — $${PRICE.studio.priceAnnual} (two months free)`,
    } as Record<TierId, string>,
    trialLine:
      TRIAL_DAYS > 0
        ? `First ${TRIAL_DAYS} days free — try it on your own stacks before the first charge.`
        : "",
    takePro: "Take the Professional kit",
  },
  pricing: {
    metaTitle: "Pricing",
    metaDesc:
      "Three field kits — Personal, Professional, Studio. Same engine, same sixteen bits, same authorship.",
    register: "The trailhead register",
    h1a: "Choose the kit.",
    h1b: "Keep the authorship.",
    p: "Every kit carries the full instrument — develop, align, merge, refine, all on your machine. The tiers differ only in what leaves the print room.",
    badge: "the working choice",
    perMonth: "/ month",
    take: (name: string) => `Take the ${name} kit`,
    note: "Licenses activate offline and are verified on your machine · cancel anytime, your exported work is yours forever",
  },
  checkout: {
    metaTitle: "Checkout",
    yourKit: "Your kit",
    perMonth: "/ month",
    perYear: "/ year",
    annualNote: "billed yearly — two months free",
    room: "The payment room · run by Stripe — your card never touches us",
    after:
      "After payment your license arrives by email and activates inside STRATA — verified on your machine, offline, every launch.",
    back: "← choose a different kit",
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
    h: (tier: string | null) => (tier ? `The ${tier} kit is yours.` : "The kit is yours."),
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
      reading: "For the photographer learning to walk the depth of a scene.",
      carries: [
        "The full pipeline — develop, align, merge, refine",
        "Every camera RAW format, ordered near → far",
        "16-bit intact through every stage",
        "JPEG and TIFF export, sRGB",
        "The finishing room — all four brushes",
      ],
      edge: "Scene-linear DNG and wide-gamut export belong to Professional.",
    },
    professional: {
      name: "Professional",
      reading: "For work that continues in Camera Raw after the merge.",
      carries: [
        "Everything in Personal",
        "DNG export — a scene-linear negative, graded in Camera Raw",
        "Wide-gamut 16-bit TIFF",
        "The grade stays yours: STRATA develops faithfully, you interpret",
      ],
    },
    studio: {
      name: "Studio",
      reading: "For the working studio — several machines, one license.",
      carries: [
        "Everything in Professional",
        "Activation on up to three machines",
        "Priority answers from the maker",
        "Early access to field builds",
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
    docs: "الدليل الميداني",
    get: "احصل على ستراتا",
    fromPrice: "من $9 شهريًا",
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
    farLabel: "البعيد · الكثيب يمسك البؤرة",
    nearLabel: "القريب · الزهرة تمسك البؤرة",
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
    chapter: "الفصل الرابع · الميدان",
    h: "صُنع في ستراتا. كلّه.",
    p: "لا تصيير ولا صور جاهزة. هذه الصور ناتج الأداة نفسها، كما خرجت منها.",
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
    printTitle: "زهرٌ نُقِّح يدويًا",
    printChip: "دُمجت · نُقِّحت · صُدِّرت في ستراتا",
    altPrint: "صورة ستراتا منتهية — نُقِّحت يدويًا وصُدِّرت مرة واحدة",
    h: "خذ ستراتا إلى الميدان.",
    p: "ثلاث عُدد. المحرّك نفسه، الستة عشر بت نفسها، التأليف نفسه.",
    from: "من",
    perMonth: "/ شهريًا",
    cta: "اختر عُدّتك",
    credit: "أداة من صنع أحمد الشحّي · صُنعت للميدان",
    navPricing: "التسعير",
    navDocs: "الدليل الميداني",
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
      "تبقى عُدّتك فعّالة حتى نهاية المدة المدفوعة",
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
    heroL1: "في كل صورة منظرٍ التقطتَها،",
    heroL2: "اخترتَ من يضيع:",
    heroL3: "الزهرة — أم الجبل.",
    drag: "لن نقول لك إنها حادّة. اسحب وانظر.",
    beforeLabel: "إطار واحد",
    afterLabel: "دمج ستراتا",
    credit:
      "زوجٌ حقيقي من الميدان: إطارا RAW من نيكون Z 6 ‏(24 ميجابكسل) — أحدهما بؤرته الزهور، والآخر القمم.",
    trust: "يُصنع بالعربية أولًا · يعمل على جهازك · صورك لا تغادره",
    altBefore: "إطار واحد — الزهور حادّة والجبال ليّنة",
    altAfter: "دمج ستراتا — الزهور والجبال حادّتان معًا",
    provokeLabel: "التنازل",
    provoke1: "كبّر أي صورة قديمة في أرشيفك وستجده.",
    provoke2:
      "حتى عند f/16، حين تكون الزهرة على ذراعٍ منك والقمة في الأفق، لا يحملهما إطار واحد.",
    provoke3: "ليست عدستك المشكلة — إنها الفيزياء. والفيزياء تُحَلّ بالطبقات.",
    creedLabel: "العقيدة",
    depthLine: "العمق ليس رقمًا في الإكزيف؛ إنه مكانٌ تقف فيه.",
    creed1: "الأداة تقترح.",
    creed2: "والفنان يقرّر.",
    creedBody:
      "يقرأ ستراتا رزمتك ويعود بثلاث قراءاتٍ للمشهد — لا بحُكم. أنت تختار، والفرشاة تُفصح عن إطارها المصدر قبل أن تعتمد ضربةً واحدة.",
    howLabel: "الآلية",
    steps: ["أسقط مجلد الرحلة", "وافق على خطة الدمج", "نقّح بيدك، ثم صدّر"],
    howTrust1: "المحاذاة تُحسب على نسخةٍ مشتقة؛ بكسلاتك لا تُمسّ.",
    howTrust2: "ستة عشر بت من RAW إلى التصدير.",
    notTitle: "وما لا يفعله",
    nots: [
      "لا يصلح اهتزاز الحامل.",
      "لا يخترع تفاصيل لم تلتقطها.",
      "لا يعدك بالسحر؛ يعدك بالحدّة.",
    ],
    custodyLabel: "العُهدة",
    custodyBig: "لا سحابة. لا رفع. لا تدريب على فنّك.",
    custodyLic: "رخصتك تُفعَّل مرةً وتُتحقَّق على جهازك — دون اتصال — في كل تشغيل.",
    cancelQ: "وإن ألغيت؟",
    cancelA:
      "صورك ملفات TIFF وDNG عاديةٌ على قرصك، تفتحها بأي برنامج، إلى الأبد. الاشتراك يشتري التطوير والدعم — لا حقَّ الوصول إلى أرشيفك.",
    galleryLede: "أنت مشيتَ المشهد. ستراتا يمشي طبقاتك.",
    manifestoLabel: "البيان",
    manifesto: [
      "الصورة ملك المصوّر",
      "الأداة تقترح ولا تقرّر",
      "لا بكسل يغادر الجهاز",
      "ستة عشر بت أمانة",
      "الجمال قرارٌ لا مصادفة",
    ],
    exclusion: "وإن كنت تريد برنامجًا يقرّر عنك — فثمّة كثيرٌ غيرنا.",
    refund: "استرداد كامل خلال 14 يومًا بلا أسئلة · ألغِ متى شئت وتبقى عُدّتك حتى نهاية مدّتها",
    closeH: "توقف عن الاختيار.",
    letterLabel: "رسالة من الصانع",
    letter1: "صديقي المصوّر —",
    letter2:
      "ستراتا بلا مستثمرين، بلا إعلانات، بلا بياناتٍ تُباع. اشتراكك هو الشركة كلها: هو ما يجعل كاميرا 2027 تُقرأ في موسمها، والفرشاة تزداد صدقًا كل شهر. أقل من ثمن فلترٍ واحد في العام.",
    letter3:
      "وصورك لا تعتمد عليه أبدًا: ما صدّرته يبقى ملفاتك، على قرصك، إلى الأبد — اشتركتَ أم ألغيت.",
    letterSign: "— أحمد الشحّي، صانع ستراتا",
    counterLine: "اشتراكك هو الشركة كلها.",
    weld: "استرداد كامل خلال 14 يومًا — وما صدّرته يبقى لك حتى لو استرددت.",
    annual: {
      personal: `أو $${PRICE.personal.priceAnnual} سنويًا — شهران مجانًا`,
      professional: `أو $${PRICE.professional.priceAnnual} سنويًا — شهران مجانًا`,
      studio: `أو $${PRICE.studio.priceAnnual} سنويًا — شهران مجانًا`,
    },
    payAnnual: {
      personal: `ادفع سنويًا — $${PRICE.personal.priceAnnual} (شهران مجانًا)`,
      professional: `ادفع سنويًا — $${PRICE.professional.priceAnnual} (شهران مجانًا)`,
      studio: `ادفع سنويًا — $${PRICE.studio.priceAnnual} (شهران مجانًا)`,
    },
    trialLine:
      TRIAL_DAYS > 0 ? `أول ${TRIAL_DAYS} يومًا مجانًا — جرّبه على رزمك أنت قبل أول خصم.` : "",
    takePro: "خذ عُدّة الاحترافية",
  },
  pricing: {
    metaTitle: "التسعير",
    metaDesc: "ثلاث عُدد ميدانية — شخصية، احترافية، استوديو. المحرّك نفسه، الستة عشر بت نفسها، التأليف نفسه.",
    register: "سجلّ نقطة الانطلاق",
    h1a: "اختر العُدّة.",
    h1b: "واحتفظ بالتأليف.",
    p: "كل عُدّة تحمل الأداة كاملةً — تحميض ومحاذاة ودمج وتنقيح، كلها على جهازك. لا تختلف الفئات إلا فيما يخرج من غرفة الطباعة.",
    badge: "خيار العمل",
    perMonth: "/ شهريًا",
    take: (name: string) => `خذ عُدّة ${name}`,
    note: "الرُّخص تُفعَّل دون اتصال وتُتحقَّق على جهازك · ألغِ متى شئت، وما صدّرته يبقى لك للأبد",
  },
  checkout: {
    metaTitle: "الدفع",
    yourKit: "عُدّتك",
    perMonth: "/ شهريًا",
    perYear: "/ سنويًا",
    annualNote: "فوترة سنوية — شهران مجانًا",
    room: "غرفة الدفع · يديرها Stripe — بطاقتك لا تمرّ بنا أبدًا",
    after: "بعد الدفع تصلك الرخصة بالبريد وتُفعَّل داخل ستراتا — تُتحقَّق على جهازك، دون اتصال، في كل تشغيل.",
    back: "→ اختر عُدّةً أخرى",
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
    h: (tier: string | null) => (tier ? `عُدّة «${tier}» صارت لك.` : "العُدّة صارت لك."),
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
      reading: "للمصوّر الذي يتعلّم أن يمشي عمق المشهد.",
      carries: [
        "خط الإنتاج كاملًا — تحميض، محاذاة، دمج، تنقيح",
        "كل صيغ RAW، مرتّبةً من القريب إلى البعيد",
        "16 بت سليمة عبر كل مرحلة",
        "تصدير JPEG وTIFF بمجال sRGB",
        "غرفة التشطيب — الفُرش الأربع كلها",
      ],
      edge: "تصدير DNG الخطّي والمجال اللوني الواسع من نصيب الاحترافية.",
    },
    professional: {
      name: "احترافية",
      reading: "لعملٍ يستمرّ في Camera Raw بعد الدمج.",
      carries: [
        "كل ما في الشخصية",
        "تصدير DNG — نيجاتيف خطّي المشهد، تُدرِّجه في Camera Raw",
        "TIFF بعمق 16 بت ومجالٍ لونيّ واسع",
        "التدريج يبقى لك: ستراتا يحمّض بأمانة، وأنت تفسّر",
      ],
    },
    studio: {
      name: "استوديو",
      reading: "للاستوديو العامل — عدة أجهزة، رخصة واحدة.",
      carries: [
        "كل ما في الاحترافية",
        "تفعيل على ثلاثة أجهزة كحدٍّ أقصى",
        "أولوية في الإجابات من الصانع",
        "وصول مبكّر لإصدارات الميدان",
      ],
    },
  },
};

const DICTS: Record<Locale, Dict> = { en, ar };

export function getDict(lang: Locale): Dict {
  return DICTS[lang];
}
