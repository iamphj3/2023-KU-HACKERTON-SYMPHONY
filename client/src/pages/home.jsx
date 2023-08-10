import { styled } from 'styled-components';

export default function Home() {
  return (
    <St>
      홈
    </St>
  );
}

const St = styled.div`
  width: 100%;
  ${({ theme }) => theme.fonts.Head1};
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.Gray3};;
`;
