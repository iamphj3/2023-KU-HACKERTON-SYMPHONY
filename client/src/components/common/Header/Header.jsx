import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { IcInstagLogo } from '../../../assets/icons';

export default function Header() {
  const location = useLocation();
  const handleLogoClick = () => {
    window.location.reload(); // Reload the current page
  };

  return (
    <StHeader>
      <h1 className="sr-only">insTAG</h1>
      <a href={location.pathname} onClick={handleLogoClick}>
        <IcInstagLogo />
      </a>
    </StHeader>
  );
}

const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 7.2rem;

  & > .sr-only {
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
    clip-path: inset(0px 0px 99.9% 99.9%);
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
  }
`;
