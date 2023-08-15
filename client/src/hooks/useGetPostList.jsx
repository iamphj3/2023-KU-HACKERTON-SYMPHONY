import useSWRInfinite from 'swr/infinite';
import { instagGetFetcher } from '../apis/axios';

const useGetPostList = () => {
  const { data, isLoading, error, size, setSize } = useSWRInfinite(instagGetFetcher, {
    errorRetryCount: 3,
  });

  return {
    postListResult: data,
    isLoading,
    isError: error,
    size,
    setSize,
  };
};

export default useGetPostList;
