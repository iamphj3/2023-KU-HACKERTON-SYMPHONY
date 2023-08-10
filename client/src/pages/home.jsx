import { BaseLayout } from '../layouts/BaseLayout';
import { Trending } from '../components/Home';

export default function home() {
  return (
    <BaseLayout>
      <Trending />
    </BaseLayout>
  );
}
