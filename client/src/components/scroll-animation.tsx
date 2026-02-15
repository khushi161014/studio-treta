import { useEffect, useRef, useState } from "react";

interface ScrollAnimationProps {
  totalFrames: number;
  framePrefix: string;
  frameExtension: string;
}

export function ScrollAnimation({
  totalFrames = 116,
  framePrefix = "ezgif-frame-",
  frameExtension = ".jpg",
}: ScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, "0");
      img.src = `/images/frames/${framePrefix}${frameNum}${frameExtension}`;
      img.onload = () => {
        loadedCount++;
        setProgress((loadedCount / totalFrames) * 100);
        if (loadedCount === totalFrames) {
          setIsLoading(false);
        }
      };
      loadedImages[i] = img;
    }
    setImages(loadedImages);
  }, [totalFrames, framePrefix, frameExtension]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate progress based on how much of the section has been scrolled past the top
      // We start at 0 when the section top reaches the viewport top
      // We reach 1 when the section bottom reaches the viewport bottom
      const scrollDistance = -rect.top;
      const totalScrollableDistance = sectionHeight - viewportHeight;
      
      const currentProgress = Math.max(0, Math.min(1, scrollDistance / totalScrollableDistance));

      setScrollProgress(currentProgress);
      const newFrameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(currentProgress * (totalFrames - 1)))
      );
      setFrameIndex(newFrameIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalFrames]);

  useEffect(() => {
    if (isLoading || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[frameIndex];
    if (img && img.complete) {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      
      // Image is 1920x1080 (16:9)
      const imageWidth = 1920;
      const imageHeight = 1080;
      const imageAspect = imageWidth / imageHeight;
      const containerAspect = containerWidth / containerHeight;
      
      let drawWidth, drawHeight, offsetX, offsetY;

      if (containerAspect > imageAspect) {
        // Container is wider than image aspect ratio
        drawWidth = containerWidth;
        drawHeight = containerWidth / imageAspect;
        offsetX = 0;
        offsetY = (containerHeight - drawHeight) / 2;
      } else {
        // Container is taller than image aspect ratio
        drawHeight = containerHeight;
        drawWidth = containerHeight * imageAspect;
        offsetX = (containerWidth - drawWidth) / 2;
        offsetY = 0;
      }

      // Only resize canvas if dimensions changed to prevent flickering
      if (canvas.width !== containerWidth || canvas.height !== containerHeight) {
        canvas.width = containerWidth;
        canvas.height = containerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  }, [frameIndex, images, isLoading]);

  const getOpacity = (start: number, end: number) => {
    const percentage = scrollProgress * 100;
    if (percentage < start || percentage > end) return 0;
    if (percentage < start + 5) return (percentage - start) / 5;
    if (percentage > end - 5) return (end - percentage) / 5;
    return 1;
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F5F5F0]">
        <div className="font-serif text-2xl mb-4 text-[#2d2d2d] tracking-widest text-center px-4">Loading Experience...</div>
        <div className="w-64 h-0.5 bg-gray-200 overflow-hidden">
          <div 
            className="h-full bg-[#2d2d2d] transition-all duration-200" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full bg-[#F5F5F0] overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="block w-full h-full object-cover" />
        
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-center">
          <div className="relative w-full max-w-2xl px-4">
            <div style={{ opacity: getOpacity(0, 20) }} className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700">
              <h2 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4">The State of Becoming</h2>
              <p className="text-sm md:text-lg uppercase tracking-[0.3em]">Studio Treta</p>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div style={{ opacity: getOpacity(25, 45) }} className="transition-opacity duration-700">
                <h2 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4">Drishti</h2>
                <p className="text-sm md:text-lg uppercase tracking-[0.3em]">The Vision</p>
              </div>
              <div style={{ opacity: getOpacity(50, 70) }} className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700">
                <h2 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4">Shilp</h2>
                <p className="text-sm md:text-lg uppercase tracking-[0.3em]">The Craft</p>
              </div>
              <div style={{ opacity: getOpacity(75, 100) }} className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700">
                <h2 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4">Rasa</h2>
                <p className="text-sm md:text-lg uppercase tracking-[0.3em]">The Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
