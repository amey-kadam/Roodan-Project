
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { Hero } from "@/components/ui/home/Hero";
import { Strengths } from "@/components/ui/home/Strengths";
import { ProductOverview } from "@/components/ui/home/ProductOverview";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Strengths />
        <ProductOverview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
