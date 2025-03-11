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

  // White background with light hover
  const buttonBackground = "#FFFFFF"; // white
  const hoverBackground = "#F9FAFB"; // gray-50
  const itemHoverBackground = "#F3F4F6"; // gray-100

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
            background: buttonBackground,
            boxShadow: "0 2px 8px rgba(156, 163, 175, 0.25)",
            border: "2px solid #000000"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = hoverBackground;
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(156, 163, 175, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = buttonBackground;
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(156, 163, 175, 0.25)";
          }}
        >
          <Globe className="h-5 w-5 text-black" />
          <span className="sr-only">Select language</span>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-medium text-black border border-black">
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
            language === "en" ? "bg-gray-100" : "hover:bg-gray-100/50"
          )}
          style={{
            color: language === "en" ? "#000000" : undefined
          }}
          onMouseEnter={(e) => {
            if (language !== "en") {
              e.currentTarget.style.background = itemHoverBackground;
              e.currentTarget.style.color = "#000000";
            }
          }}
          onMouseLeave={(e) => {
            if (language !== "en") {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "inherit";
            }
          }}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("fr")}
          className={cn(
            "cursor-pointer transition-all duration-300",
            language === "fr" ? "bg-gray-100" : "hover:bg-gray-100/50"
          )}
          style={{
            color: language === "fr" ? "#000000" : undefined
          }}
          onMouseEnter={(e) => {
            if (language !== "fr") {
              e.currentTarget.style.background = itemHoverBackground;
              e.currentTarget.style.color = "#000000";
            }
          }}
          onMouseLeave={(e) => {
            if (language !== "fr") {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "inherit";
            }
          }}
        >
          Français
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("ar")}
          className={cn(
            "cursor-pointer transition-all duration-300",
            language === "ar" ? "bg-gray-100" : "hover:bg-gray-100/50"
          )}
          style={{
            color: language === "ar" ? "#000000" : undefined
          }}
          onMouseEnter={(e) => {
            if (language !== "ar") {
              e.currentTarget.style.background = itemHoverBackground;
              e.currentTarget.style.color = "#000000";
            }
          }}
          onMouseLeave={(e) => {
            if (language !== "ar") {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "inherit";
            }
          }}
        >
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
