import { useI18n } from "@/utils/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Flag component for each language
const FlagIcon = ({ language }: { language: string }) => {
  // Return the appropriate flag based on language
  switch (language) {
    case "en":
      return (
        <div className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0 mr-2">
          <div className="w-full h-full bg-blue-900 relative">
            {/* US flag stripes and stars */}
            <div className="absolute inset-0 flex flex-col">
              <div className="h-[7.7%] bg-red-600"></div>
              <div className="h-[7.7%] bg-white"></div>
              <div className="h-[7.7%] bg-red-600"></div>
              <div className="h-[7.7%] bg-white"></div>
              <div className="h-[7.7%] bg-red-600"></div>
              <div className="h-[7.7%] bg-white"></div>
              <div className="h-[7.7%] bg-red-600"></div>
              <div className="h-[7.7%] bg-white"></div>
              <div className="h-[7.7%] bg-red-600"></div>
              <div className="h-[7.7%] bg-white"></div>
              <div className="h-[7.7%] bg-red-600"></div>
              <div className="h-[7.7%] bg-white"></div>
              <div className="h-[7.7%] bg-red-600"></div>
            </div>
            <div className="absolute top-0 left-0 w-[40%] h-[53.85%] bg-blue-900 flex items-center justify-center">
              <div className="text-white text-[4px] grid grid-cols-6 gap-[1px]">
                {"★★★★★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case "fr":
      return (
        <div className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0 mr-2">
          <div className="w-full h-full flex">
            <div className="w-1/3 h-full bg-blue-900"></div>
            <div className="w-1/3 h-full bg-white"></div>
            <div className="w-1/3 h-full bg-red-600"></div>
          </div>
        </div>
      );
    case "ar":
      return (
        <div className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0 mr-2">
          <div className="w-full h-full bg-green-600 flex items-center justify-center">
            <div className="text-white text-xs">☪</div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export function LanguageSelector({ className }: { className?: string }) {
  const { language, setLanguage } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className={cn(
            "relative transition-all duration-300 hover:scale-105 h-auto px-2 py-1",
            className
          )}
          style={{
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            border: "none"
          }}
        >
          <div className="flex items-center">
            <FlagIcon language={language} />
            <span className="text-xs font-medium">
              {language === "en" ? "ENG" : language === "fr" ? "FRA" : "ARB"}
            </span>
          </div>
          {/* Speech bubble tail */}
          <div 
            className="absolute top-1/2 -left-1.5 w-3 h-3 bg-white" 
            style={{ 
              clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
              transform: "translateY(-50%)"
            }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 backdrop-blur-lg bg-background/95 border-border/50"
      >
        <DropdownMenuItem 
          onClick={() => setLanguage("en")}
          className={cn(
            "cursor-pointer transition-all duration-300 flex items-center",
            language === "en" ? "bg-gray-100" : "hover:bg-gray-100/50"
          )}
        >
          <FlagIcon language="en" />
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("fr")}
          className={cn(
            "cursor-pointer transition-all duration-300 flex items-center",
            language === "fr" ? "bg-gray-100" : "hover:bg-gray-100/50"
          )}
        >
          <FlagIcon language="fr" />
          <span>Français</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("ar")}
          className={cn(
            "cursor-pointer transition-all duration-300 flex items-center",
            language === "ar" ? "bg-gray-100" : "hover:bg-gray-100/50"
          )}
        >
          <FlagIcon language="ar" />
          <span>العربية</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
