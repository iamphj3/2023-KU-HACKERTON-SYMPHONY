import { styled, keyframes } from 'styled-components';
import { useRecoilState } from 'recoil';
import { ToastMessage } from '../../../recoil/atom';

function Toast() {
  const [toastMessage, setToastMessage] = useRecoilState(ToastMessage);

  setTimeout(() => {
    setToastMessage(null);
  }, 5000);

  return toastMessage && <StToast>{toastMessage}</StToast>;
}

export default Toast;

const slideUpAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideDownAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(150%);
  }
`;

const StToast = styled.div`
  display: flex;
  align-items: center;

  position: fixed;
  bottom: 2rem;

  width: 92%;
  max-width: 40rem;
  height: 4.7rem;
  padding-left: 2rem;
  box-sizing: border-box;

  border-radius: 0.8rem;
  color: ${({ theme }) => theme.colors.White};
  background-color: ${({ theme }) => theme.colors.Gray6};
  ${({ theme }) => theme.fonts.Body3};

  animation: ${slideUpAnimation} 0.5s ease-out, ${slideDownAnimation} 0.5s 3s ease-in;
  animation-fill-mode: forwards;
  z-index: 1000;
`;
