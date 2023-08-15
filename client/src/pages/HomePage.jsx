import { BaseLayout } from '../layouts/BaseLayout';
import { Trending } from '../components/Trending';
import { SearchBox } from '../components/SearchBox';
import { SearchList } from '../components/SearchList';

export default function HomePage() {
  return (
    <BaseLayout>
      <SearchBox />
      <SearchList />
      <Trending />
    </BaseLayout>
  );
}
