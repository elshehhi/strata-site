import { redirect } from "next/navigation";
import { activateUrl, getTier, isBilling, type Billing } from "@/lib/tiers";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * The website never charges directly any more — a desktop license must be
 * bound to a Supabase account, so payment lives on the activation page
 * (sign in → pay → the app unlocks). Any old link or bookmark to /checkout
 * forwards there with its tier/billing intact.
 */
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
  redirect(activateUrl(tier.id, billing));
}
