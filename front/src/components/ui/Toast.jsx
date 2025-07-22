import { Toaster, toast as baseToast } from 'react-hot-toast'

export const showToast = {
  success: (msg) => baseToast.success(msg),
  error: (msg) => baseToast.error(msg),
  info: (msg) => baseToast(msg),
  loading: (msg) => baseToast.loading(msg),
  dismiss: (id) => baseToast.dismiss(id),
};

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
        },
      }}
    />
  )
}

export default Toast 