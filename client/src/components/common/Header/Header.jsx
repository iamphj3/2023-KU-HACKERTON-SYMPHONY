import { styled } from 'styled-components';
import { IcLogo } from '../../../assets/icons';

export default function Header() {
  return (
    <StHeader>
      <IcLogo />
    </StHeader>
  );
}

const StHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 7.2rem;
`;
