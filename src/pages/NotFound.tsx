
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="page-container py-16">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-8xl font-display font-bold mb-4 text-primary/70">404</h1>
            <h2 className="text-3xl font-display font-semibold mb-6">Page Not Found</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We couldn't find the page you were looking for. It might have been removed, renamed, or doesn't exist.
            </p>
            <Button size="lg" asChild className="hover-scale">
              <NavLink to="/">
                Return to Home
              </NavLink>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
