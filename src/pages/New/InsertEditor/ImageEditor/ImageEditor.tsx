import { faImage, faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { Button } from '@ui/Button';

import { canvasPreview } from './CanvasPreview';
import { useDebounceEffect } from './useDebounceEffect';

interface ImageEditorProps {
  previewCanvasRef: RefObject<HTMLCanvasElement>;
  aspect: number;
  title: string;
}

export const ImageEditor: FC<ImageEditorProps> = ({ previewCanvasRef, aspect, title }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [imgSrc, setImgSrc] = useState('');
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [rotate, setRotate] = useState(0);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, 1, rotate);
      }
    },
    100,
    [completedCrop, rotate],
  );

  useEffect(() => {
    setRotate(0);
  }, [imgSrc]);

  return (
    <div className="space-y-4 bg-neutral-300 p-4">
      <div className="space-y-2">
        <h2 className="font-mono">{title}</h2>
        <div className="flex space-x-2">
          <Button icon={faRotateLeft} onClick={() => setRotate(rotate - 5)} />
          <Button icon={faRotateRight} onClick={() => setRotate(rotate + 5)} />
          <Button
            icon={faImage}
            onClick={() => {
              fileInputRef.current?.click();
            }}
          />
          <input
            className="hidden bg-neutral-100 font-mono file:cursor-pointer file:border-none file:bg-neutral-400 file:font-mono"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={onSelectFile}
          />
        </div>
      </div>
      {imgSrc && (
        <ReactCrop
          crop={crop}
          className="max-w-96 absolute left-1/2 max-h-96 -translate-x-1/2 transform bg-neutral-100"
          onChange={(c) => setCrop(c)}
          aspect={aspect}
          onComplete={(c) => setCompletedCrop(c)}
        >
          <img ref={imgRef} alt="Crop me" src={imgSrc} style={{ transform: `rotate(${rotate}deg)` }} />
        </ReactCrop>
      )}
    </div>
  );
};
