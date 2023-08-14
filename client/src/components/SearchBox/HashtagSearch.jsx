import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { IcSearch } from '../../assets/icons';
import { HashtagList } from '../../recoil/atom';

export default function HashtagSearch() {
  const [hashtagInput, setHashtagInput] = useState('');
  const [hashtagList, setHashtagList] = useRecoilState(HashtagList);

  const handleSearch = () => {
    if (hashtagInput.trim() !== '') {
      // 검색어가 공백이 아닌 경우에만 추가
      setHashtagList((prevList) => [...prevList, hashtagInput]);
      setHashtagInput(''); // 검색 후 검색어 상태 초기화
    }
  };
  console.log(hashtagList);

  return (
    <StHashtagSearch>
      <StSearchInput>
        <input type="text" value={hashtagInput} onChange={(e) => setHashtagInput(e.target.value)} placeholder="해시태그를 입력하세요." />
        <button type="button" onClick={handleSearch}>
          <IcSearch />
        </button>
      </StSearchInput>
    </StHashtagSearch>
  );
}

const StHashtagSearch = styled.div``;

const StSearchInput = styled.div`
  position: relative;
  margin-bottom: 1.35rem;

  & > input {
    width: 100%;
    padding: 1.2rem 1.6rem 0.9rem 1.6rem;

    box-sizing: border-box; // padding이 너비에 영향 미치지 않게
    border: none;
    border-radius: 1rem;
    outline: none;
    background-color: ${({ theme }) => theme.colors.Gray2};
    ${({ theme }) => theme.fonts.Body3};
  }

  & > button {
    position: absolute;
    top: 0.9rem;
    right: 1.6rem;
  }
`;
