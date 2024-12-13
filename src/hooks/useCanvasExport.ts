import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { RefObject, useCallback } from 'react';

type useCanvasExportProps = {
  canvasRef: RefObject<HTMLDivElement>;
};

const HTML2CANVAS_OPTIONS = {
  scale: 2,
  backgroundColor: null, // 투명한 배경
  logging: false, // 성능을 위해 디버깅 로그 비활성화
  useCORS: false, // 외부 리소스를 사용할 일이 없으므로 false
  allowTaint: false, // 보안을 위해 taint된 리소스 비활성화
};

const useCanvasExport = ({ canvasRef }: useCanvasExportProps) => {
  const generateImage = useCallback(async (element: HTMLDivElement): Promise<Blob> => {
    try {
      const canvas = await html2canvas(element, HTML2CANVAS_OPTIONS);

      return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob from canvas'));
            }
          },
          'image/png',
          1.0,
        );
      });
    } catch (error) {
      console.error('Error in generating image:', error);
      throw error;
    }
  }, []);

  const handleDownloadScreenshot = async () => {
    if (!canvasRef.current) {
      return;
    }

    try {
      const blob = await generateImage(canvasRef.current);
      saveAs(blob, 'canvas.png');
    } catch (error) {
      console.error('Screenshot download failed:', error);
    }
  };

  return { handleDownloadScreenshot };
};

export default useCanvasExport;
