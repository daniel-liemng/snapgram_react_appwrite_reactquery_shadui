import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import { getCurrentUser, getPostById, getRecentPosts } from '../appwrite/api';

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

export const useGetPostByIdQuery = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};
