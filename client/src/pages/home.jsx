import { BaseLayout } from '../layouts/BaseLayout';
import { Trending } from '../components/Trending';

export default function home() {
  return (
    <BaseLayout>
      <Trending />
    </BaseLayout>
  );
}
