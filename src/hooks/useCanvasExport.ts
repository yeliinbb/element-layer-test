import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { RefObject, useCallback } from 'react';

type useCanvasExportProps = {
  canvasRef: RefObject<HTMLDivElement>;
};

const HTML2CANVAS_OPTIONS = {
  scale: 4,
  backgroundColor: null,
  logging: false, // 성능을 위해 로깅 비활성화
  useCORS: true, // 외부 이미지 리소스 처리를 위해 필요할 수 있음
  allowTaint: false, // 보안을 위해 false로 유지
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

  const downloadImage = async ({ dataUrl, fileName }: { dataUrl: string; fileName: string }) => {
    try {
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      saveAs(blob, fileName);
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      return false;
    }
  };

  const handleDownloadScreenshot = async () => {
    if (!canvasRef.current) {
      return;
    }

    const blob = await generateImage(canvasRef.current);
    const reader = new FileReader();

    reader.onloadend = async () => {
      if (typeof reader.result === 'string') {
        await downloadImage({
          dataUrl: reader.result,
          fileName: 'canvas.png',
        });
      }
    };

    reader.readAsDataURL(blob);
  };

  return { handleDownloadScreenshot };
};

export default useCanvasExport;