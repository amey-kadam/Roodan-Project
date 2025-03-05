import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  title: string;
  image: string;
  description: string;
  details: string[];
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
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
        <img 
          src={image} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="mb-4">
          {details.map((detail, index) => (
            <div 
              key={index} 
              className="text-sm text-foreground/70 mb-1 flex items-start"
            >
              <span className="mr-2">•</span>
              {detail}
            </div>
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