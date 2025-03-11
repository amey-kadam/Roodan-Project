import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  title: string;
  image: string;
  description: string;
  details: string[];
  className?: string;
}

// Separate list item component to optimize rendering of list items
const DetailItem = memo(({ detail }: { detail: string }) => (
  <div className="text-sm text-foreground/70 mb-1 flex items-start">
    <span className="mr-2 text-emerald-600">•</span>
    {detail}
  </div>
));

// Display name for debugging purposes
DetailItem.displayName = 'DetailItem';

const ProductCardComponent: React.FC<ProductCardProps> = ({
  title,
  image,
  description,
  details,
  className
}) => {
  return (
    <div className={cn(
      "bg-white border border-emerald-600/20 rounded-xl shadow-sm hover:shadow-emerald-500/20 overflow-hidden flex flex-col transition-all duration-300",
      className
    )}>
      <div className="relative pt-[60%]">
        {/* Replace standard img with LazyLoadImage for performance */}
        <LazyLoadImage
          src={image}
          alt={title}
          effect="blur"
          wrapperClassName="absolute inset-0 w-full h-full"
          className="object-cover w-full h-full"
          threshold={300} // Start loading when 300px from viewport
          placeholderSrc="/placeholder-image.jpg" // Optional: low-res placeholder
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 
          className="text-xl font-semibold mb-3 bg-clip-text text-transparent" 
          style={{ 
            backgroundImage: "linear-gradient(to right, #059669, #10b981)" // Updated to Hero colors
          }}
        >
          {title}
        </h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="mb-4">
          {/* Map through details array just once with memoized child components */}
          {details.map((detail, index) => (
            <DetailItem key={index} detail={detail} />
          ))}
        </div>

        {/* Push the button to the bottom */}
        <div className="mt-auto">
          <Button 
            className="w-full group flex items-center justify-center gap-2 h-12 px-6 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
          >
            Request Quote
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Export memoized component to prevent unnecessary re-renders
export const ProductCard = memo(ProductCardComponent);