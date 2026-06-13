import { Hero } from "@/components/hero/Hero";
import { Message } from "@/components/message/Message";
import { Figure } from "@/components/figure/Figure";
import { Worlds } from "@/components/worlds/Worlds";
import { WorkIndex } from "@/components/index/WorkIndex";
import { Marquee } from "@/components/marquee/Marquee";
import { NowLog } from "@/components/nowlog/NowLog";
import { Footer } from "@/components/footer/Footer";
import { getHeroChip, getNowLog } from "@/lib/nowlog";

export default async function Home() {
  const [chip, nowlog] = await Promise.all([getHeroChip(), getNowLog()]);

  return (
    <main id="main">
      <Hero chip={chip} />
      <Message />
      <Worlds />
      <WorkIndex />
      <Marquee />
      <NowLog data={nowlog} />
      <Footer />
      {/* The figure closes the page: a final sign-off below "the best resume is
          a git log" — the engineer dissolving back into the bits. */}
      <Figure />
    </main>
  );
}
