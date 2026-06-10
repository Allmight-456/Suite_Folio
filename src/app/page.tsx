import { Hero } from "@/components/hero/Hero";
import { getHeroChip } from "@/lib/nowlog";

export default async function Home() {
  const chip = await getHeroChip();

  return (
    <main id="main">
      <Hero chip={chip} />
      {/* M2: message → strip → two worlds → hall of fame → stack → now.log → contact */}
    </main>
  );
}
