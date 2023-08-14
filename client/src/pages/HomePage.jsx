import { BaseLayout } from '../layouts/BaseLayout';
import { Trending } from '../components/Trending';
import { SearchBox } from '../components/SearchBox';

export default function HomePage() {
  return (
    <BaseLayout>
      <SearchBox />
      <Trending />
    </BaseLayout>
  );
}
