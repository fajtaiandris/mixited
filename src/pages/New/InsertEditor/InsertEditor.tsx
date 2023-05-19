import { faPrint } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import React, { FC, useRef } from 'react';

import { Button } from '@ui/Button';

import { ImageEditor } from './ImageEditor/ImageEditor';

export const InsertEditor: FC = () => {
  const frontPreviewCanvasRef = useRef<HTMLCanvasElement>(null);
  const spinePreviewCanvasRef = useRef<HTMLCanvasElement>(null);
  const backPreviewCanvasRef = useRef<HTMLCanvasElement>(null);
  const insertRef = React.useRef<HTMLDivElement>(null);

  const handleDownloadImage = async () => {
    if (!insertRef.current) {
      return;
    }
    const element = insertRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'cassette-insert.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <>
      <div className="grid gap-2 lg:grid-cols-3">
        <ImageEditor previewCanvasRef={frontPreviewCanvasRef} aspect={65 / 101.5} title="Front Panel" />
        <ImageEditor previewCanvasRef={spinePreviewCanvasRef} aspect={12.5 / 101.5} title="Spine" />
        <ImageEditor previewCanvasRef={backPreviewCanvasRef} aspect={26.5 / 101.5} title="Rare Tab" />
      </div>

      <div className="flex justify-center">
        <div ref={insertRef} className="flex aspect-[104/101.5] w-[100%] max-w-3xl bg-white">
          <div className="h-[100%] w-[62.5%] bg-neutral-100">
            <canvas ref={frontPreviewCanvasRef} className=" h-[100%] w-[100%]" />
          </div>
          <div className="h-[100%] w-[12.02%] bg-neutral-300">
            <canvas ref={spinePreviewCanvasRef} className="h-[100%] w-[100%]" />
          </div>
          <div className="h-[100%] w-[25.48%] bg-neutral-100">
            <canvas ref={backPreviewCanvasRef} className="h-[100%] w-[100%]" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button icon={faPrint} onClick={handleDownloadImage} text="Print Insert" />
      </div>
    </>
  );
};
