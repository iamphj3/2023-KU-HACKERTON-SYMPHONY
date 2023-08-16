import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { Header } from '../../components/common/Header';
import { ToastMessage } from '../../recoil/atom';
import { Toast } from '../../components/common/Toast';

function BaseLayout({ children }) {
  const [toastMessage, setToastMessage] = useRecoilState(ToastMessage);

  return (
    <StBaseLayout>
      <Header />
      <StMain>{children}</StMain>
      <Toast />
    </StBaseLayout>
  );
}

export default BaseLayout;

const StBaseLayout = styled.div`
  padding: 0 1.5rem;
`;

const StMain = styled.main`
  width: 100%;
`;
