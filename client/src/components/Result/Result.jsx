import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import TabSwitcher from '../common/TabSwitcher/TabSwitcher';
import PostResult from './PostResult';
import { getSearchResult, getSortedResult } from '../../apis/result';
import { SortState, LastIdState } from '../../recoil/atom';
import ResultTab from './ResultTab';

export default function Result() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchDataId = params.get('tagid');

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  return (
    <StResult>
      <ResultTab searchDataId={searchDataId} />
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
