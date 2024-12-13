import { toast, ToastOptions } from 'react-toastify';

const useToastify = () => {
  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    options?: ToastOptions,
  ) => {
    const toastFunction = toast[type] || toast.info;
    toastFunction(message, options); // 예시로 toast.info(message, options): 이와 같이 동작
  };

  return { showToast };
};

export default useToastify;
