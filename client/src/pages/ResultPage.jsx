import { BaseLayout } from '../layouts/BaseLayout';
import { Result } from '../components/Result';
import { SearchBox } from '../components/SearchBox';
import SearchList from '../components/Result/SearchList';

export default function ResultPage() {
  return (
    <BaseLayout>
      <SearchBox />
      <SearchList />
      <Result />
    </BaseLayout>
  );
}
