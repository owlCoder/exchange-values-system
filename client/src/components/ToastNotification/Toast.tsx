import React from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CustomToastProps {
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ message }) => {
  return (
    <div className="p-3 rounded-md shadow-md">
      {message}
    </div>
  );
};

export const showSuccessToast = (message: string): void => {
  toast.success(<CustomToast message={message} />, {
    position: toast.POSITION.TOP_RIGHT, theme: "dark"
  });
};

export const showErrorToast = (message: string): void => {
  toast.error(<CustomToast message={message} />, {
    position: toast.POSITION.TOP_RIGHT, theme: "dark"
  });
};

export const showWarningToast = (message: string): void => {
  toast.warn(<CustomToast message={message} />, {
    position: toast.POSITION.TOP_RIGHT, theme: "dark"
  });
};

const Toast: React.FC = () => {
  return (
    <div className="toast-container">
      <ToastContainer
      
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme='dark'
      />
    </div>
  );
};

export default Toast;
