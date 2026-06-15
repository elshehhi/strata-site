import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import StrataMark from "@/components/StrataMark";
import { getStripe } from "@/lib/stripe";
import { getTier } from "@/lib/tiers";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  return { title: getDict(lang).success.metaTitle, robots: { index: false } };
}

/**
 * The print room, after the purchase: quiet confirmation, what happens
 * next — and the door straight into the field guide.
 */
export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { session_id?: string };
}) {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  const d = getDict(lang);
  const t = d.success;

  let email: string | null = null;
  let tierName: string | null = null;
  let paid = false;

  const stripe = getStripe();
  if (stripe && searchParams.session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(searchParams.session_id);
      paid = session.payment_status === "paid" || session.status === "complete";
      email = session.customer_details?.email ?? null;
      const tier = getTier(session.metadata?.strata_tier);
      tierName = tier ? d.tiers[tier.id].name : null;
    } catch {
      // an unknown session falls through to the generic welcome
    }
  }

  return (
    <>
      <SiteHeader lang={lang} t={d.header} />
      <main className="relative min-h-screen px-6 pt-36 pb-24 bg-ink-0">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <StrataMark size={34} />
          </div>

          <p className="micro-label mt-10 mb-4">{paid ? t.confirmed : t.welcome}</p>
          <h1 className="voice-moment text-4xl sm:text-5xl text-paper-hi leading-tight">
            {t.h(paid ? tierName : null)}
          </h1>
          <p className="mt-6 text-paper-mid text-body leading-relaxed max-w-md mx-auto">
            {email ? t.bodyWithEmail(email) : t.body}
          </p>

          <div className="mt-14 mx-auto max-w-md matted rounded overflow-hidden">
            <Image
              src="/img/dunes_result.jpg"
              alt={t.altDunes}
              width={840}
              height={560}
              className="w-full h-auto"
            />
          </div>
          <p className="voice-truth mt-5 text-micro tracking-micro uppercase text-paper-low">
            {t.caption}
          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${lang}/download`} className="cta">
              {t.download}
            </Link>
            <Link href={`/${lang}`} className="ghost">
              {t.again}
            </Link>
          </div>
          <p className="mt-8">
            <a
              href="mailto:a.elshehhi@gmail.com?subject=STRATA%20activation"
              className="text-caption text-paper-low hover:text-paper-mid transition-colors duration-fast"
            >
              {t.help}
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
