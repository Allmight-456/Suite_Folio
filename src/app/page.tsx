import { Hero } from "@/components/hero/Hero";
import { Whoami } from "@/components/whoami/Whoami";
import { Journey } from "@/components/journey/Journey";
import { Figure } from "@/components/figure/Figure";
import { Stack } from "@/components/stack/Stack";
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
      {/* Skills as a neofetch "stack" card — every skill in one gaze, no crawl;
          its colour-blocks footer is the live theme picker. Replaced the marquee. */}
      <Stack />
      <NowLog data={nowlog} />
      {/* The figure is the visual sign-off — the engineer dissolving back into the
          bits — placed right before the footer so it lands in everyone's path to
          contact and hands off into "the best resume is a git log" (its caption,
          "the engineer behind the commits", sits adjacent to that line). It used to
          sit AFTER the footer/copyright, where it was easy to miss. */}
      <Figure />
      <Footer />
    </main>
  );
}
