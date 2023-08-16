import { useRecoilState } from 'recoil';
import { BaseLayout } from '../layouts/BaseLayout';
import { Trending } from '../components/Trending';
import { SearchBox } from '../components/SearchBox';
import { SearchList } from '../components/SearchList';
import { HashtagList, IdLoadingState } from '../recoil/atom';
import { PostLayout } from '../layouts/PostLayout';

export default function HomePage() {
  const [idLoading, setIdloading] = useRecoilState(IdLoadingState);
  const [hashtagList, setHashtagList] = useRecoilState(HashtagList);

  return (
    <BaseLayout>
      <SearchBox />
      {hashtagList.length > 0 ? <SearchList /> : <Trending />}
      {idLoading ? <PostLayout /> : null}
    </BaseLayout>
  );
}
