import Header from "@/components/Header";
import HeroScrollytelling from "@/components/HeroScrollytelling";
import ProductGrid from "@/components/ProductGrid";
import FeaturesSection from "@/components/FeaturesSection";
import RecentlyViewed from "@/components/RecentlyViewed";
import NewsletterFooter from "@/components/NewsletterFooter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Header />
      <main className="flex-1">
        <HeroScrollytelling />
        <ProductGrid />
        <RecentlyViewed />
        <FeaturesSection />
      </main>
      <NewsletterFooter />
    </div>
  );
}
