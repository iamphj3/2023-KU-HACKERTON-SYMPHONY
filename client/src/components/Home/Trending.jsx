import { styled } from 'styled-components';

export default function Trending() {
  return (
    <StTrending>
      트렌딩 해시태그
    </StTrending>
  );
}

const StTrending = styled.section`  
  /* width: 90%; */
  height: 27.9rem;
  /* padding: 0 1.5rem; */

  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 1.2rem;
`;
