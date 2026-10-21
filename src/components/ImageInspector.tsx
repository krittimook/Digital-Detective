import React, { useState, useRef } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, Eye } from 'lucide-react';

interface ImageInspectorProps {
  imageSrc: string;
  altText: string;
  isInspecting?: boolean;
}

export const ImageInspector: React.FC<ImageInspectorProps> = ({
  imageSrc,
  altText
}) => {
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className={`relative w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-[#241B35]/90 p-4 md:p-8 flex flex-col justify-center items-center' : ''}`}>
      {/* Container Card */}
      <div 
        className={`relative w-full rounded-2xl overflow-hidden border border-[#E4DDF3] bg-[#F7F5FF] select-none transition-all duration-200 shadow-sm ${
          isFullscreen ? 'max-w-5xl h-[85vh] bg-white' : 'aspect-4/3 max-h-[500px]'
        }`}
      >
        {/* Loading Skeleton */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-[#EDE9FE]/50 animate-pulse flex flex-col items-center justify-center text-[#7C3AED] gap-3">
            <Eye className="w-8 h-8 animate-spin" />
            <span className="text-xs font-medium">กำลังโหลดหลักฐานภาพถ่าย...</span>
          </div>
        )}

        {/* Fallback Container if asset fails */}
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#EDE9FE]/30 p-6 text-center text-[#241B35]">
            <Eye className="w-12 h-12 text-[#7C3AED] mb-3" />
            <p className="font-semibold text-sm">ไม่สามารถแสดงผลไฟล์ภาพได้</p>
            <p className="text-xs text-[#756B86] mt-1">กำลังตรวจสอบข้อมูลความถูกต้องของไฟล์</p>
          </div>
        ) : (
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchMove={handleTouchMove}
            onTouchStart={() => setIsHovering(true)}
            onTouchEnd={() => setIsHovering(false)}
            className={`relative w-full h-full overflow-hidden flex items-center justify-center ${isZoomActive ? 'cursor-crosshair' : 'cursor-default'}`}
          >
            <img
              src={imageSrc}
              alt={altText}
              referrerPolicy="no-referrer"
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              style={
                isZoomActive && isHovering
                  ? {
                      transform: `scale(2.4)`,
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                      transition: 'transform 0.08s ease-out'
                    }
                  : {
                      transform: 'scale(1)',
                      transition: 'transform 0.2s ease-out'
                    }
              }
              className="w-full h-full object-contain pointer-events-none"
            />

            {/* Subtle Scanning Crosshair Overlay when zoom active */}
            {isZoomActive && isHovering && (
              <div 
                className="pointer-events-none absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#7C3AED] shadow-[0_0_15px_rgba(124,58,237,0.4)] flex items-center justify-center bg-[#7C3AED]/10 backdrop-blur-[1px]"
                style={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
              >
                <div className="w-1.5 h-1.5 bg-[#7C3AED] rounded-full" />
              </div>
            )}
          </div>
        )}

        {/* Inspection Control Bar */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E4DDF3] text-xs text-[#241B35] shadow-md">
          <button
            type="button"
            onClick={() => setIsZoomActive(!isZoomActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              isZoomActive 
                ? 'bg-[#7C3AED] text-white font-semibold' 
                : 'hover:bg-[#EDE9FE] text-[#5B21B6]'
            }`}
            title={isZoomActive ? 'ปิดโหมดส่องขยาย' : 'เปิดโหมดส่องขยาย (ซูม 2.4x)'}
          >
            {isZoomActive ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
            <span>{isZoomActive ? 'ปิดแว่นขยาย' : 'ส่องขยาย (Zoom 2.4x)'}</span>
          </button>

          <span className="text-[#E4DDF3]">|</span>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 hover:bg-[#EDE9FE] rounded-lg text-[#5B21B6] transition-colors cursor-pointer"
            title={isFullscreen ? 'ย่อหน้าจอ' : 'ขยายเต็มจอ'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Loupe Guide Prompt when zoom is active */}
      {isZoomActive && (
        <div className="mt-2 text-center text-xs text-[#756B86] flex items-center justify-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>เลื่อนเมาส์หรือแตะสัมผัสบนภาพเพื่อส่องขยายรายละเอียดระดับพิกเซล</span>
        </div>
      )}
    </div>
  );
};
