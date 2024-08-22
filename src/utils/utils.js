import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MySwal = withReactContent(Swal);

export const deleteSweetAlert = ({
    title = "Are You Sure?",
    icon = "warning",
    confirmBtnText = "Delete",
  }) => {
    return Swal.fire({
        title: title,
        text: "You won't be able to revert this!",
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmBtnText
      })
  };

  const IsNotValue = [null, 'null', undefined, 'undefined', '', 0, '0'];


  // Show Toaster
  export const handleToast = (type, message) => {
    const toastConfig = {
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