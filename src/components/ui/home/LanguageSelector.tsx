import { useI18n } from "@/utils/i18n";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LanguageSelector({ className }: { className?: string }) {
  const { language, setLanguage } = useI18n();

  // Gradient styles
  const buttonGradient = "linear-gradient(135deg, #0f9d58, #66bb6a)";
  const hoverGradient = "linear-gradient(135deg, #15803d, #86efac)";
  const itemHoverGradient = "linear-gradient(to right, #0a5d36, #4ade80)";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "relative transition-all duration-300 hover:scale-105",
            className
          )}
          style={{
            background: buttonGradient,
            boxShadow: "0 2px 8px rgba(15, 157, 88, 0.25)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = hoverGradient;
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(15, 157, 88, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = buttonGradient;
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(15, 157, 88, 0.25)";
          }}
        >
          <Globe className="h-5 w-5 text-white" />
          <span className="sr-only">Select language</span>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-medium text-emerald-600">
            {language.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 backdrop-blur-lg bg-background/95 border-border/50"
      >
        <DropdownMenuItem 
          onClick={() => setLanguage("en")}
          className={cn(
            "cursor-pointer transition-all duration-300",
            language === "en" ? "bg-emerald-50" : "hover:bg-emerald-50/50"
          )}
          style={{
            color: language === "en" ? "#0a5d36" : undefined
          }}
          onMouseEnter={(e) => {
            if (language !== "en") {
              e.currentTarget.style.background = itemHoverGradient;
              e.currentTarget.style.webkitBackgroundClip = "text";
              e.currentTarget.style.webkitTextFillColor = "transparent";
            }
          }}
          onMouseLeave={(e) => {
            if (language !== "en") {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.webkitBackgroundClip = "none";
              e.currentTarget.style.webkitTextFillColor = "inherit";
            }
          }}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("fr")}
          className={cn(
            "cursor-pointer transition-all duration-300",
            language === "fr" ? "bg-emerald-50" : "hover:bg-emerald-50/50"
          )}
          style={{
            color: language === "fr" ? "#0a5d36" : undefined
          }}
          onMouseEnter={(e) => {
            if (language !== "fr") {
              e.currentTarget.style.background = itemHoverGradient;
              e.currentTarget.style.webkitBackgroundClip = "text";
              e.currentTarget.style.webkitTextFillColor = "transparent";
            }
          }}
          onMouseLeave={(e) => {
            if (language !== "fr") {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.webkitBackgroundClip = "none";
              e.currentTarget.style.webkitTextFillColor = "inherit";
            }
          }}
        >
          Français
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("ar")}
          className={cn(
            "cursor-pointer transition-all duration-300",
            language === "ar" ? "bg-emerald-50" : "hover:bg-emerald-50/50"
          )}
          style={{
            color: language === "ar" ? "#0a5d36" : undefined
          }}
          onMouseEnter={(e) => {
            if (language !== "ar") {
              e.currentTarget.style.background = itemHoverGradient;
              e.currentTarget.style.webkitBackgroundClip = "text";
              e.currentTarget.style.webkitTextFillColor = "transparent";
            }
          }}
          onMouseLeave={(e) => {
            if (language !== "ar") {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.webkitBackgroundClip = "none";
              e.currentTarget.style.webkitTextFillColor = "inherit";
            }
          }}
        >
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
