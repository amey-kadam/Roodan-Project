import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
    <span className="mr-2">•</span>
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
      "bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col",
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
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="mb-4">
          {/* Map through details array just once with memoized child components */}
          {details.map((detail, index) => (
            <DetailItem key={index} detail={detail} />
          ))}
        </div>

        {/* Push the button to the bottom */}
        <div className="mt-auto">
          <Button className="w-full">
            Request Quote
          </Button>
        </div>
      </div>
    </div>
  );
};

// Export memoized component to prevent unnecessary re-renders
export const ProductCard = memo(ProductCardComponent);