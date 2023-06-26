import Toaster, {ToastPosition} from 'react-native-toast-message';

const Toast = {
  error: ({
    primaryText,
    secondaryText,
    position = 'top',
  }: {
    primaryText: string;
    secondaryText?: string;
    position?: ToastPosition;
  }) => {
    Toaster.show({
      position,
      type: 'error',
      text1: primaryText,
      text2: secondaryText,
      props: {fontSize: '30px'},
    });
  },

  success: ({
    primaryText,
    secondaryText,
    position = 'top',
  }: {
    primaryText: string;
    secondaryText?: string;
    position?: ToastPosition;
  }) => {
    Toaster.show({
      position,
      type: 'success',
      text1: primaryText,
      text2: secondaryText,
    });
  },
};

export default Toast;
