import { BaseLayout } from '../layouts/BaseLayout';
import { Result } from '../components/Result';
import { SearchBox } from '../components/SearchBox';

export default function ResultPage() {
  return (
    <BaseLayout>
      <SearchBox />
      <Result />
    </BaseLayout>
  );
}
