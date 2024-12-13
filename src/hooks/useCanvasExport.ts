import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { RefObject, useCallback } from 'react';
import { useToastify } from '.';

type useCanvasExportProps = {
  canvasRef: RefObject<HTMLDivElement>;
};

const HTML2CANVAS_OPTIONS = {
  scale: 4, // 화질 개선
  backgroundColor: null, // 투명한 배경
  logging: false, // 성능을 위해 디버깅 로그 비활성화
  useCORS: false, // 외부 리소스를 사용할 일이 없으므로 false
  allowTaint: false, // 보안을 위해 taint된 리소스 비활성화
};

const useCanvasExport = ({ canvasRef }: useCanvasExportProps) => {
  const { showToast } = useToastify();

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

  const handleDownloadScreenshot = useCallback(async () => {
    if (!canvasRef.current) {
      showToast('캔버스를 찾을 수 없습니다.', 'error');
      return;
    }

    try {
      const blob = await generateImage(canvasRef.current);
      saveAs(blob, 'canvas.png');
      showToast('스크린샷이 성공적으로 다운로드되었습니다.', 'success');
    } catch (error) {
      console.error('Screenshot download failed:', error);
      showToast('스크린샷 다운로드에 실패했습니다.', 'error');
    }
  }, [canvasRef, generateImage]);

  return { handleDownloadScreenshot };
};

export default useCanvasExport;
