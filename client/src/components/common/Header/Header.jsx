import { styled } from 'styled-components';
import { IcInstagLogo } from '../../../assets/icons';

export default function Header() {
  return (
    <StHeader>
      <h1 className="sr-only">insTAG</h1>
      <IcInstagLogo />
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
