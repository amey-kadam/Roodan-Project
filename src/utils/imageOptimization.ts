import { useEffect, useState } from 'react';

export interface ImageSizes {
  sm: string;
  md: string;
  lg: string;
}

export interface OptimizedImageUrls {
  webp: ImageSizes;
  fallback: ImageSizes;
}

export const IMAGE_SIZES = {
  sm: { width: 400, height: 225 },
  md: { width: 600, height: 338 },
  lg: { width: 800, height: 450 },
};

export const useImagePreload = (imageUrl: string) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setIsLoaded(true);
  }, [imageUrl]);

  return isLoaded;
};

export const getOptimizedImageUrls = (basePath: string): OptimizedImageUrls => {
  return {
    webp: {
      sm: `${basePath}-400.webp`,
      md: `${basePath}-600.webp`,
      lg: `${basePath}-800.webp`,
    },
    fallback: {
      sm: `${basePath}-400.jpg`,
      md: `${basePath}-600.jpg`,
      lg: `${basePath}-800.jpg`,
    },
  };
};

export const generateSrcSet = (urls: ImageSizes): string => {
  return Object.entries(urls)
    .map(([size, url]) => `${url} ${IMAGE_SIZES[size as keyof ImageSizes].width}w`)
    .join(', ');
};

export const generateSizes = (): string => {
  return '(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px';
}; 