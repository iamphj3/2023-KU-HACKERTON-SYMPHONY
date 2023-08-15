import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IcSearch } from '../../assets/icons';
import { HashtagList } from '../../recoil/atom';

export default function HashtagSearch() {
  const [hashtagInput, setHashtagInput] = useState('');
  const [hashtagList, setHashtagList] = useRecoilState(HashtagList);

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/result');
  };
  const handleKeUp = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (hashtagInput.trim() !== '') {
        setHashtagList((prevList) => [...prevList, hashtagInput]);
        setHashtagInput('');
      }
    }
  };
  const handleHashtagInputChange = (e) => {
    setHashtagInput(e.target.value.replace(/ /g, ''));
  };

  return (
    <StHashtagSearch>
      <StSearchInput>
        <input
          type="text"
          value={hashtagInput}
          onChange={(e) => handleHashtagInputChange(e)}
          onKeyUp={handleKeUp}
          placeholder="해시태그를 입력하세요."
        />
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
