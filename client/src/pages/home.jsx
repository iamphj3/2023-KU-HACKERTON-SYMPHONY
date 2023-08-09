import { styled } from 'styled-components';

export default function Home() {
  return (
    <St>
      국문, 영문, 숫자 모두 Pretendard 글꼴을 사용합니다.
    </St>
  );
}

const St = styled.div`
  ${({ theme }) => theme.fonts.Head1};
`;
