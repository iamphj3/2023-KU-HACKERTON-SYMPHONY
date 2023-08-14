import { styled } from 'styled-components';
import { useState } from 'react';
import ImageSearch from './ImageSearch';
import HashtagSearch from './HashtagSearch';
import DetailFilter from './DetailFilter';

const SEARCH_TABS = ['해시태그 검색', '이미지 검색'];

export default function SearchBox() {
  const [activeTab, setActiveTab] = useState(SEARCH_TABS[0]);

  const handleTabClick = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <StSearchBox>
      <StTabBar>
        {SEARCH_TABS.map((tab) => (
          <StTabBtn type="button" key={tab} isActive={activeTab === tab} onClick={() => handleTabClick(tab)}>
            {tab}
          </StTabBtn>
        ))}
        <StInputWrapper>
          {activeTab === SEARCH_TABS[1] ? <ImageSearch /> : null}
          <HashtagSearch />
          <DetailFilter />
        </StInputWrapper>
      </StTabBar>
    </StSearchBox>
  );
}

const StSearchBox = styled.section`
  width: 100%;
  margin-bottom: 2rem;

  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.White};
`;

const StTabBar = styled.div`
  margin: 0;
  padding: 0;
`;

const StTabBtn = styled.button`
  width: 50%;
  margin: 0;
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
`;
