import PostForm from '@/components/forms/post-form';

const CreatePostPage = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex items-center justify-start gap-3 w-full'>
          <img
            src='/assets/icons/add-post.svg'
            alt='create'
            height={36}
            width={36}
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>

        <PostForm action='Create' />
      </div>
    </div>
  );
};

export default CreatePostPage;
