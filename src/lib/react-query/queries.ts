import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import { getCurrentUser, getRecentPosts } from '../appwrite/api';

// **** USER ****
export const useGetCurrentUserQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

// **** POST ****
export const useGetRecentPostsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};
