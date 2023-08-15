import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { HashtagList } from '../../recoil/atom';
import HashTag from './HashTag';

export default function SearchList() {
  const [hashtagList, setHashtagList] = useRecoilState(HashtagList);

  const handleAllDelete = () => {
    setHashtagList([]);
  };

  return (
    <StSearchList>
      <StSearchInfo>
        <h3>검색어 목록</h3>
        <button type="button" onClick={handleAllDelete}>
          전체 삭제
        </button>
      </StSearchInfo>
      <StHashtagList>
        {hashtagList.map((hashtag) => (
          <HashTag key={hashtag} hashtag={hashtag} />
        ))}
      </StHashtagList>
    </StSearchList>
  );
}
const StSearchList = styled.section``;

const StSearchInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.6rem;

  & > h3 {
    ${({ theme }) => theme.fonts.Title1};
  }
  & > button {
    color: ${({ theme }) => theme.colors.Gray6};
    ${({ theme }) => theme.fonts.Body2};
  }
`;

const StHashtagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 0.6rem;
`;
