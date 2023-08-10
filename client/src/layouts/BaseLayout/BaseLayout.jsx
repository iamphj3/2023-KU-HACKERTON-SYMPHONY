import { styled } from 'styled-components';
import { Header } from '../../components/common/Header';

function BaseLayout({ children }) {
  return (
    <StBaseLayout>
      <Header />
      <StMain>
        {children}
      </StMain>
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
