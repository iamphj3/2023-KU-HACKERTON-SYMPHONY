import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IcInstagLogo } from '../../../assets/icons';

export default function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <StHeader>
      <h1 className="sr-only">insTAG</h1>
      <button type="button" onClick={handleLogoClick}>
        <IcInstagLogo />
      </button>
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
