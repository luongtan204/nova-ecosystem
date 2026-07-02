import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import FeaturesSection from "@/components/FeaturesSection";
import NewsletterFooter from "@/components/NewsletterFooter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductGrid />
        <FeaturesSection />
      </main>
      <NewsletterFooter />
    </div>
  );
}
