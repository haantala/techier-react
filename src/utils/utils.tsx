import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MySwal = withReactContent(Swal);

// Define type for SweetAlert options
interface SweetAlertOptions {
  title?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmBtnText?: string;
}

// Define the function with default values and TypeScript type
export const deleteSweetAlert = ({
  title = 'Are You Sure?',
  icon = 'warning',
  confirmBtnText = 'Delete',
}: SweetAlertOptions) => {
  return Swal.fire({
    title,
    text: "You won't be able to revert this!",
    icon,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmBtnText,
  });
};

// Define possible values that are considered as "not value"
const IsNotValue = [null, 'null', undefined, 'undefined', '', 0, '0'];

// Define the function for showing toasts with TypeScript type for parameters
export const handleToast = (type: boolean, message: string) => {
  const toastConfig: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  if (type) {
    toast.success(message, toastConfig);
  } else {
    toast.error(
      IsNotValue.includes(message) ? 'Something Went Wrong Please Try Again Later' : message,
      { ...toastConfig, toastId: 'custom-id-yes' }
    );
  }
};
