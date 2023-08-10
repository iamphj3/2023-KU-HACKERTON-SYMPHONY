import { styled } from 'styled-components';

export default function Trending() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const today = `${year}.${month}.${day}`;
  const datetime = `${year}-${month}-${day}`;

  return (
    <StTrending>
      <h3>
        트렌딩 해시태그
        <span> TOP10</span>
      </h3>
      <time dateTime={datetime}>{today}</time>
    </StTrending>
  );
}

const StTrending = styled.section`  
  height: 23.1rem;
  padding: 2.4rem 1.6rem;

  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 1.2rem;

  & > h3 {
      ${({ theme }) => theme.fonts.Head2};

    & > span {
        ${({ theme }) => theme.fonts.Head2};
        color : ${({ theme }) => theme.colors.main};
    }
  }
`;
