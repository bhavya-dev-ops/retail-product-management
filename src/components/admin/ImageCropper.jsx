import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { X, RotateCw, ZoomIn, ZoomOut, Check, RefreshCw } from 'lucide-react';
import getCroppedImg from '../../utils/cropImage';

const ASPECT_RATIOS = [
  { label: 'Square (1:1)', value: 1 / 1 },
  { label: 'Portrait (4:5)', value: 4 / 5 },
  { label: 'Landscape (16:9)', value: 16 / 9 },
];

export default function ImageCropper({ imageSrc, onCropComplete, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize aspect ratio from localStorage or default to 1:1
  const [aspect, setAspect] = useState(() => {
    const saved = localStorage.getItem('cropperAspectRatio');
    return saved ? parseFloat(saved) : 1 / 1;
  });

  const handleAspectChange = (newAspect) => {
    setAspect(newAspect);
    localStorage.setItem('cropperAspectRatio', newAspect.toString());
  };

  const onCropChange = useCallback((crop) => {
    setCrop(crop);
  }, []);

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      setIsProcessing(true);
      const croppedFile = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
        { horizontal: false, vertical: false },
        'cropped-product.jpeg'
      );
      onCropComplete(croppedFile);
    } catch (e) {
      console.error(e);
      alert('Failed to crop image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Main Crop Area */}
        <div className="relative h-[50vh] md:h-[600px] flex-1 bg-zinc-100 dark:bg-zinc-950">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            rotation={rotation}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            showGrid={true}
            style={{
              containerStyle: { background: 'transparent' },
            }}
          />
          
          {/* Safe Area Warning Overlay */}
          <div className="absolute top-4 left-0 right-0 z-10 flex justify-center pointer-events-none">
            <div className="bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
              Ensure the footwear is fully visible inside the crop area.
            </div>
          </div>
        </div>

        {/* Controls Sidebar */}
        <div className="w-full md:w-80 bg-white dark:bg-zinc-900 border-l border-black/10 dark:border-white/10 p-6 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[600px]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-brand-ink dark:text-white">Adjust Product Image</h2>
              <button 
                onClick={onCancel}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Aspect Ratio Picker */}
              <div>
                <label className="text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-wider mb-3 block">
                  Crop Ratio
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {ASPECT_RATIOS.map((ratio) => (
                    <button
                      key={ratio.label}
                      onClick={() => handleAspectChange(ratio.value)}
                      className={`px-3 py-2 text-sm rounded-lg border font-medium transition ${
                        aspect === ratio.value
                          ? 'bg-brand-red border-brand-red text-white'
                          : 'border-black/10 dark:border-white/10 hover:border-brand-red/50 dark:text-white dark:hover:border-brand-red/50'
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zoom Control */}
              <div>
                <div className="flex items-center justify-between mb-2 text-sm text-black/70 dark:text-white/70 font-medium">
                  <span>Zoom</span>
                  <span>{Math.round(zoom * 100)}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <ZoomOut className="h-4 w-4 text-black/40 dark:text-white/40" />
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="flex-1 accent-brand-red"
                  />
                  <ZoomIn className="h-4 w-4 text-black/40 dark:text-white/40" />
                </div>
              </div>

              {/* Rotation Control */}
              <div>
                <div className="flex items-center justify-between mb-2 text-sm text-black/70 dark:text-white/70 font-medium">
                  <span>Rotation</span>
                  <span>{rotation}°</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCw className="h-4 w-4 text-black/40 dark:text-white/40" />
                  <input
                    type="range"
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="Rotation"
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="flex-1 accent-brand-red"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 space-y-3">
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-black/10 dark:border-white/10 text-sm font-bold text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-red text-white text-sm font-bold hover:bg-brand-redDark transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-brand-red/20"
            >
              {isProcessing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {isProcessing ? 'Processing...' : 'Save Crop'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
