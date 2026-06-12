import TerrainCanvas from "@/components/canvas/TerrainCanvas";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Hero9 from "@/components/nine/Hero9";
import MakerLetter from "@/components/nine/MakerLetter";
import CreedSetpiece from "@/components/nine/CreedSetpiece";
import {
  Provoke9,
  How9,
  Custody9,
  Manifesto9,
  Pricing9,
  Close9,
} from "@/components/nine/Sections9";
import FieldChapter from "@/components/chapters/FieldChapter";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

/**
 * "النسخة التاسعة" — the landing that survived five judges:
 * accusation (hook) → drag-proof under the visitor's own hand → the
 * compromise → the creed → mechanism + honest limits → custody (and
 * what remains after cancelling) → real work at native aspect →
 * compressed manifesto → pricing with the risk removed → "Stop
 * choosing." closing the arc the first line opened.
 * The WebGL land still runs beneath the whole walk.
 */
export default function Home({ params }: { params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar";
  const t = getDict(lang);

  return (
    <>
      <TerrainCanvas />
      <SiteHeader lang={lang} t={t.header} />
      <main className="relative z-10">
        <Hero9 t={t.nine} />
        <Provoke9 t={t.nine} />
        <CreedSetpiece
          t={t.nine}
          layers={t.layers}
          shot={t.artist.strategyShot}
          shotAlt={t.artist.altStrategy}
        />
        <How9 t={t.nine} />
        <Custody9 t={t.nine} />
        <FieldChapter t={t.field} lede={t.nine.galleryLede} />
        <Manifesto9 t={t.nine} />
        <div className="relative px-6 pb-4">
          <MakerLetter t={t.nine} />
        </div>
        <Pricing9 lang={lang} t={t.nine} closing={t.closing} tiersT={t.tiers} />
        <Close9 lang={lang} t={t.nine} closing={t.closing} />
      </main>
      <div className="relative z-10">
        <SiteFooter lang={lang} t={t.closing} />
      </div>
    </>
  );
}
