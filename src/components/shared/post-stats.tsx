import { checkIsLiked } from '@/lib/helpers';
import {
  useDeleteSavedPostMutation,
  useLikePostMutation,
  useSavePostMutation,
} from '@/lib/react-query/mutations';
import { useGetCurrentUserQuery } from '@/lib/react-query/queries';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';
import Loader from './loader';

interface PostStatsProps {
  post: Models.Document;
  userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost, isPending: isLikingPost } = useLikePostMutation();
  const { mutate: savePost, isPending: isSavingPost } = useSavePostMutation();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedPostMutation();

  const { data: currentUser } = useGetCurrentUserQuery();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    // setIsSaved(savedPostRecord ? true : false);
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);

    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post.$id, userId });
      setIsSaved(true);
    }
  };

  return (
    <div className='flex justify-between items-center z-20'>
      <div className='flex gap-2 mr-5'>
        {isLikingPost ? (
          <Loader />
        ) : (
          <img
            onClick={handleLikePost}
            src={
              checkIsLiked(likes, userId)
                ? '/assets/icons/liked.svg'
                : '/assets/icons/like.svg'
            }
            alt='like'
            width={20}
            height={20}
            className='cursor-pointer'
          />
        )}

        <p className='small-medium lg:base-medium'>{likes.length}</p>
      </div>

      <div className='flex gap-2'>
        {isSavingPost || isDeletingSavedPost ? (
          <Loader />
        ) : (
          <img
            onClick={handleSavePost}
            src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
            alt='save'
            width={20}
            height={20}
            className='cursor-pointer'
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
