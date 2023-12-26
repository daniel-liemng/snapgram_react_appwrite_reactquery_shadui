import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';
import {
  getCurrentUser,
  getInfinitePosts,
  getPostById,
  getRecentPosts,
  searchPosts,
} from '../appwrite/api';

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

export const useGetInfinitePostsQuery = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts,
    getNextPageParam: (lastPage) => {
      // If no data, there are no more pages
      if (lastPage && lastPage?.documents.length === 0) return null;

      // Use the $id of the last document as the cursor
      const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;

      return lastId;
    },
  });
};

export const useSearchPostsQuery = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm,
  });
};
