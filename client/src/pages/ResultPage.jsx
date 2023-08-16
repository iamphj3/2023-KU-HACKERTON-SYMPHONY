import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { BaseLayout } from '../layouts/BaseLayout';
import { Result } from '../components/Result';
import { SearchBox } from '../components/SearchBox';
import { SearchList } from '../components/SearchList';

import { HashtagList, LastIdState } from '../recoil/atom';

export default function ResultPage() {
  const [hashtagList, setHashtagList] = useRecoilState(HashtagList);
  const [lastId, setLastId] = useRecoilState(LastIdState);
  const [isShowing, setIsShowing] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    setLastId('000000000000000000000000');
    // navigate('/');
    // window.location.reload();
    setIsShowing(false);
  }, [hashtagList]);

  return (
    <BaseLayout>
      <SearchBox />
      <SearchList />
      <Result />
    </BaseLayout>
  );
}
