import { ToastContainer, ToastContainerProps, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToastContainer = ({
  closeOnClick = true,
  position = 'bottom-center',
  autoClose = 1500,
  hideProgressBar = true,
  limit = 1,
  ...props
}: ToastContainerProps) => {
  return (
    <ToastContainer
      closeOnClick={closeOnClick}
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      limit={limit}
      style={{ zIndex: 9999, bottom: '4em', paddingRight: '16px', paddingLeft: '16px' }}
      icon={false}
      transition={Slide}
      className="custom-toast-container"
      {...props}
    />
  );
};

export default CustomToastContainer;
