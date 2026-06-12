import { notFound } from "next/navigation";

/**
 * Any path under /ar or /en that no real page claims lands here and is
 * handed to the branded not-found boundary with a true 404 status.
 */
export default function CatchAll() {
  notFound();
}
