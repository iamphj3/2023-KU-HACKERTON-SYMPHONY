import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TabSwitcher from '../common/TabSwitcher/TabSwitcher';
import PostResult from './PostResult';
import { getSortedResult } from '../../apis/result';

const RESULT_TABS = {
  tabList: ['최신순', '좋아요 순', '댓글 많은 순'],
  selectedStyle: { color: '#597CFF' },
  noSelectedStyle: { color: '#626273' },
  contents: [],
  queryParameters: {
    최신순: { isLast: true, isLike: false, isComment: false },
    '좋아요 순': { isLast: false, isLike: true, isComment: false },
    '댓글 많은 순': { isLast: false, isLike: false, isComment: true },
  },
};

export default function Result() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchDataId = params.get('tagid');
  console.log(searchDataId);

  const { tabList, selectedStyle, noSelectedStyle } = RESULT_TABS;
  const [selectedTab, setSeletedTab] = useState('최신순');

  const handleTabChange = async (tab) => {
    setSeletedTab(tab);
    const queryParams = RESULT_TABS.queryParameters[tab];
    const { isLast, isLike, isComment } = queryParams;

    const res = await getSortedResult(searchDataId, isLast, isLike, isComment);
    // console.log(res);
  };

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  return (
    <StResult>
      <div>
        <h2>검색 결과</h2>
        <TabSwitcher
          tabList={tabList}
          selectedStyle={selectedStyle}
          noSelectedStyle={noSelectedStyle}
          onTabChange={handleTabChange}
        />
      </div>
      <PostResult searchDataId={searchDataId} />
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
