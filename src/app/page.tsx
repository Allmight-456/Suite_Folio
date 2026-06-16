import { Hero } from "@/components/hero/Hero";
import { Whoami } from "@/components/whoami/Whoami";
import { Journey } from "@/components/journey/Journey";
import { Figure } from "@/components/figure/Figure";
import { Marquee } from "@/components/marquee/Marquee";
import { NowLog } from "@/components/nowlog/NowLog";
import { Footer } from "@/components/footer/Footer";
import { getHeroChip, getNowLog } from "@/lib/nowlog";

export default async function Home() {
  const [chip, nowlog] = await Promise.all([getHeroChip(), getNowLog()]);

  return (
    <main id="main">
      <Hero chip={chip} />
      {/* whoami terminal: the signature statement as a boot sequence. */}
      <Whoami />
      {/* Pinned horizontal scroll — experience, shipped work, interests, links.
          Replaces the two ON/OFF PROD doors; the exhaustive index lives at /work
          so no fact is stated in two places. */}
      <Journey />
      <Marquee />
      <NowLog data={nowlog} />
      <Footer />
      {/* The figure closes the page: a final sign-off below "the best resume is
          a git log" — the engineer dissolving back into the bits. */}
      <Figure />
    </main>
  );
}
