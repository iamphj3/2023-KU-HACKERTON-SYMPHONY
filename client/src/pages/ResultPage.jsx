import { useEffect } from 'react';
import { BaseLayout } from '../layouts/BaseLayout';
import { Result } from '../components/Result';
import { SearchBox } from '../components/SearchBox';
import { SearchList } from '../components/SearchList';

export default function ResultPage() {
  return (
    <BaseLayout>
      <SearchBox />
      <SearchList />
      <Result />
    </BaseLayout>
  );
}
