import { styled } from 'styled-components';
import { useState } from 'react';
import { IcSearch, IcExpand } from '../../assets/icons';

const SEARCH_TABS = ['해시태그 검색', '이미지 검색'];

export default function SearchBox() {
  const [activeTab, setActiveTab] = useState(SEARCH_TABS[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTabClick = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleSearch = () => {

  };

  const handleFilter = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <StSearchBox>
      <StTabBar>
        {SEARCH_TABS.map((tab) => (
          <StTabBtn
            type="button"
            key={tab}
            isActive={activeTab === tab}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </StTabBtn>
        ))}
        <StInputWrapper>
          <StSearchInput>
            <input type="text" placeholder="해시태그를 입력하세요." />
            <button type="button" onClick={handleSearch}>
              <IcSearch />
            </button>
          </StSearchInput>
          <div>
            <p>* 여러개 입력 시 스페이스, 엔터로 구분</p>
            <StFilterBtn
              type="button"
              onClick={handleFilter}
              className={isExpanded ? 'expanded' : ''}
              isExpanded={isExpanded}
            >
              상세 필터
              <IcExpand />
            </StFilterBtn>
          </div>
        </StInputWrapper>
      </StTabBar>
    </StSearchBox>
  );
}

const StSearchBox = styled.section`
  width: 100%;
  margin-bottom: 2rem;

  border-radius: 1.2rem;
  background-color : ${({ theme }) => theme.colors.White};;
`;

const StTabBar = styled.div`
  
`;

const StTabBtn = styled.button`
  width: 50%;
  padding: 1.4rem 0 0.9rem 0;

  ${({ theme }) => theme.fonts.Title2};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.main : theme.colors.Gray5)};
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.White : theme.colors.Gray2)};
  
  &:first-child {
    border-radius: 1.2rem 0rem 0rem 0rem;
  }
  &:nth-child(2) {
    border-radius: 0rem 1.2rem 0rem 0rem;
  }
`;

const StInputWrapper = styled.div`
  padding: 2rem 1.6rem;

  & > div{
    display: flex;
    justify-content: space-between;

    & > p {
      color : ${({ theme }) => theme.colors.Gray5};
      ${({ theme }) => theme.fonts.Body5};
    }
  }
`;

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

const StFilterBtn = styled.button`
  display: flex;
  align-items: center;


  & > svg {
    transform: rotate(360deg); 
    transition: transform 0.3s ease-in-out; 
  }

  &.expanded > svg {
    transform: rotate(180deg); 
  }
`;
