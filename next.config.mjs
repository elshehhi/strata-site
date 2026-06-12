/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Imagery ships pre-sized (docs-site capture pipeline) — skip the optimizer so
  // the site builds and serves identically on any machine, no sharp required.
  images: { unoptimized: true },
  // The field guide (public/docs, a junction to ../docs-site/site) is plain
  // static HTML with RELATIVE asset paths — its folder URLs must keep their
  // trailing slash or every ../assets/… reference breaks. Next strips
  // trailing slashes by default, so we take over slash handling in
  // middleware.ts (docs folders get slash + index.html; app routes keep the
  // usual no-slash form).
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
