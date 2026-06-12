import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import CheckoutClient from "./CheckoutClient";
import { getTier, isBilling, type Billing } from "@/lib/tiers";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  return { title: getDict(lang).checkout.metaTitle, robots: { index: false } };
}

export default function CheckoutPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { tier?: string; billing?: string };
}) {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  const tier = getTier(searchParams.tier);
  if (!tier) redirect(`/${lang}/pricing`);

  const billing: Billing = isBilling(searchParams.billing) ? searchParams.billing : "monthly";
  const d = getDict(lang);
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? null;

  return (
    <>
      <SiteHeader lang={lang} t={d.header} />
      <main className="relative min-h-screen px-6 pt-32 pb-24 bg-ink-0">
        <div className="mx-auto max-w-5xl">
          <CheckoutClient
            lang={lang}
            tier={tier}
            billing={billing}
            tierT={d.tiers[tier.id]}
            t={d.checkout}
            nine={d.nine}
            publishableKey={publishableKey}
          />
        </div>
      </main>
    </>
  );
}
