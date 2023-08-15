import { styled } from 'styled-components';
import { useState } from 'react';
import TabSwitcher from '../common/TabSwitcher/TabSwitcher';
import PostResult from './PostResult';

const RESULT_TABS = {
  tabList: ['최신순', '좋아요 순', '댓글 많은 순'],
  selectedStyle: { color: '#597CFF' },
  noSelectedStyle: { color: '#626273' },
  contents: [],
};

export default function Result() {
  const { tabList, selectedStyle, noSelectedStyle } = RESULT_TABS;
  const [selectedTab, setSeletedTab] = useState('최신순');

  const handleTabChange = (tab) => {
    setSeletedTab(tab);
  };
  return (
    <StResult>
      <div>
        <h2>검색 결과</h2>
        <TabSwitcher tabList={tabList} selectedStyle={selectedStyle} noSelectedStyle={noSelectedStyle} onTabChange={handleTabChange} />
      </div>
      <PostResult />
    </StResult>
  );
}

const StResult = styled.section`
  margin-bottom: 12rem;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 2.4rem;

    & > h2 {
      ${({ theme }) => theme.fonts.Head1};
    }
  }
`;
