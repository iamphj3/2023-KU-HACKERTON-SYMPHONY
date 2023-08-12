import { styled } from 'styled-components';
import { useState } from 'react';

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
          <StTabBtn
            type="button"
            key={tab}
            isActive={activeTab === tab}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </StTabBtn>
        ))}
      </StTabBar>
      SearchBox
    </StSearchBox>
  );
}

const StSearchBox = styled.section`
  width: 100%;
  height: 15.9rem;
  margin-bottom: 2.4rem;

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
  &:last-child {
    border-radius: 0rem 1.2rem 0rem 0rem;
  }
`;
