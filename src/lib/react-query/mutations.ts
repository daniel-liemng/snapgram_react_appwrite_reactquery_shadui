import { useMutation } from '@tanstack/react-query';

import {
  createPost,
  createUserAccount,
  signInAccount,
  signOutAccount,
} from '../appwrite/api';
import { INewPost, INewUser } from '@/types';

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccountMutation = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccountMutation = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

// POST
export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
  });
};
