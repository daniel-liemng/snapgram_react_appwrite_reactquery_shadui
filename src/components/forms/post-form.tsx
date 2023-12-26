import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import FileUploader from '../shared/file-uploader';
import { Models } from 'appwrite';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '@/lib/react-query/mutations';
import { useAuthContext } from '@/context/auth-context';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/loader';

const formSchema = z.object({
  caption: z
    .string()
    .min(5, {
      message: 'Caption must be at least 5 characters.',
    })
    .max(2200, {
      message: 'Caption cannot be more than 2200 characters.',
    }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(2, {
      message: 'Caption must be at least 2 characters.',
    })
    .max(100, {
      message: 'Caption cannot be more than 100 characters.',
    }),
  tags: z.string(),
});

interface PostFormProps {
  post?: Models.Document;
  action: 'Create' | 'Update';
}

const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePostMutation();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePostMutation();

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post?.tags.join(',') : '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (post && action === 'Update') {
      // UPDATE POST
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
      });

      if (!updatedPost) {
        return toast.error('Please try again');
      }

      toast.success('Post Updated');
      return navigate(`/posts/${post.$id}`);
    }

    // CREATE POST
    const newPost = await createPost({ ...values, userId: user.id });

    if (!newPost) {
      return toast.error('Please try again');
    }

    toast.success('Post Created');
    navigate('/');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-9 w-full max-w-5xl'
      >
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Caption</FormLabel>
              <FormControl>
                <Textarea
                  className='shad-textarea custom-scrollbar'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  mediaUrl={post?.imageUrl}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Location</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Add Tags (separated by " , ")
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  className='shad-input'
                  placeholder='Art, Expression, Learn'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <div className='flex items-center gap-4 justify-end'>
          <Button type='button' className='shad-button_dark_4'>
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={isLoadingCreate || isLoadingUpdate}
            className='shad-button_primary whitespace-nowrap'
          >
            {isLoadingCreate || isLoadingUpdate ? (
              <div className='flex items-center justify-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : (
              `${action} Post`
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
