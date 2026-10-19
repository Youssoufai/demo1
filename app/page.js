import Hero from "@/components/Hero";
import Fragrances from "@/components/Fragrances";
import Editorial from "@/components/Editorial";
import Finder from "@/components/Finder";
import Philosophy from "@/components/Philosophy";
import Discovery from "@/components/Discovery";
import Journal from "@/components/Journal";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  return (
    <main id="content">
      <Hero />
      <Fragrances />
      <Editorial />
      <Finder />
      <Philosophy />
      <Discovery />
      <Journal />
      <Newsletter />
    </main>
  );
}
