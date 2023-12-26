import Loader from '@/components/shared/loader';
import PostStats from '@/components/shared/post-stats';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/auth-context';
import { multiFormatDateString } from '@/lib/helpers';
import { useGetPostByIdQuery } from '@/lib/react-query/queries';
import { cn } from '@/lib/utils';
import { Link, useParams } from 'react-router-dom';

const PostDetailsPage = () => {
  const { id: postId } = useParams();

  const { data: post, isPending } = useGetPostByIdQuery(postId as string);

  const { user } = useAuthContext();

  const handleDeletePost = () => {};

  console.log('888', post);

  return (
    <div className='post_details-container'>
      {isPending ? (
        <Loader />
      ) : (
        <div className='post_details-card'>
          <img src={post?.imageUrl} alt='post' className='post_details-img' />

          <div className='post_details-info'>
            <div className='flex items-center justify-between w-full'>
              <Link
                to={`/profile/${post?.creator?.$id}`}
                className='flex items-center gap-3'
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    '/assets/icons/profile-placeholder.svg'
                  }
                  alt='creator'
                  className='rounded-full w-8 h-8 lg:w-12 lg:h-12'
                />

                <div className='flex flex-col'>
                  <p className='base-medium lg:body-bold text-light-1'>
                    {post?.creator?.name}
                  </p>
                  <div className='flex items-center justify-center gap-2 text-light-3'>
                    <p className='subtle-semibold lg:small-regular'>
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    -
                    <p className='subtle-semibold lg:small-regular'>
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Actions */}
              <div className='flex items-center justify-center'>
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={cn(user.id !== post?.creator?.$id && 'hidden')}
                >
                  <img
                    src='/assets/icons/edit.svg'
                    alt='edit'
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant='ghost'
                  className={cn(
                    'ghost_details-delete_btn',
                    user.id !== post?.creator?.$id && 'hidden'
                  )}
                >
                  <img
                    src='/assets/icons/delete.svg'
                    alt='delete'
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <hr className='border w-full border-dark-4/80' />

            <div className='flex flex-col flex-1 w-full small-medium lg:base-regular'>
              <p>{post?.caption}</p>
              <ul className='flex items-center gap-1 mt-2'>
                {post?.tags.map((tag: string) => (
                  <li key={tag} className='text-light-3'>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className='w-full'>
              <PostStats post={post!} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;
