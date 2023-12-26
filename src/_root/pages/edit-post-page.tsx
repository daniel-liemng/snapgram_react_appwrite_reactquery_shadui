import PostForm from '@/components/forms/post-form';
import Loader from '@/components/shared/loader';
import { useGetPostByIdQuery } from '@/lib/react-query/queries';
import { useParams } from 'react-router-dom';

const EditPostPage = () => {
  const { id: postId } = useParams();

  const { data: post, isPending } = useGetPostByIdQuery(postId as string);

  console.log('444', post);

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex items-center justify-start gap-3 w-full'>
          <img
            src='/assets/icons/add-post.svg'
            alt='edit'
            height={36}
            width={36}
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
        </div>

        <PostForm post={post} action='Update' />
      </div>
    </div>
  );
};

export default EditPostPage;
