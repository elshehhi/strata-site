import { NextRequest, NextResponse } from "next/server";
import { LOCALES, isLocale } from "./lib/i18n";

/**
 * Two jobs (next.config sets skipTrailingSlashRedirect, so slashes are
 * ours to manage):
 *
 * 1. /docs/** — the static field guide (docs-site/site via public/docs).
 *    Its pages use relative asset paths, so folder URLs must END with a
 *    slash: /docs/ar → /docs/ar/ (redirect), /docs/ar/ → its index.html
 *    (rewrite). Files with extensions never reach the middleware.
 *
 * 2. Locale routing — every app page lives under /ar or /en. Bare paths
 *    redirect to the visitor's language; Arabic first, like the product,
 *    unless the browser clearly asks for another supported language.
 */
function preferred(req: NextRequest): string {
  const accept = req.headers.get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const code = part.split(";")[0]!.trim().slice(0, 2).toLowerCase();
    if (isLocale(code)) return code;
  }
  return "ar";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();

  // ── the field guide ─────────────────────────────────────────────────
  if (pathname === "/docs" || pathname.startsWith("/docs/")) {
    if (!pathname.endsWith("/")) {
      // extension-less docs path → folder: give it its trailing slash.
      // 302, not 308 — permanent redirects get cached forever by browsers,
      // and a flipped slash rule then loops against the stale cache.
      url.pathname = `${pathname}/`;
      return NextResponse.redirect(url, 302);
    }
    // folder URL → serve its index, URL (and relative bases) unchanged
    url.pathname = `${pathname}index.html`;
    return NextResponse.rewrite(url);
  }

  // ── app routes: keep Next's usual no-trailing-slash form ───────────
  if (pathname !== "/" && pathname.endsWith("/")) {
    url.pathname = pathname.replace(/\/+$/, "");
    return NextResponse.redirect(url, 302);
  }

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  url.pathname = `/${preferred(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // skip API routes, Next internals, and anything with a file extension
  // (fonts, images, the guide's .html/.css/.png files, sitemap.xml, …)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
