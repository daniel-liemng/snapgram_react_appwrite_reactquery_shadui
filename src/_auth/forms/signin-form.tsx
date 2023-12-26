import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import Loader from '@/components/shared/loader';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSignInAccountMutation } from '@/lib/react-query/mutations';
import { useAuthContext } from '@/context/auth-context';

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

const SignInForm = () => {
  const { checkAuthUser } = useAuthContext();

  const navigate = useNavigate();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccountMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast.error('Sign in failed. Please try again.');
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      toast.success('Logged in');

      navigate('/');
    } else {
      return toast.error('Sign in failed. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <div className='sm:w-420 flex items-center justify-center flex-col'>
        <img src='/assets/images/logo.svg' alt='logo' />

        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>
          Log in to your account
        </h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>
          Welcome back! Please enter your details.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 mt-4 w-full'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} className='shad-input' />
                </FormControl>
                <FormMessage className='text-rose-500' />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} className='shad-input' />
                </FormControl>
                <FormMessage className='text-rose-500' />
              </FormItem>
            )}
          />

          <Button type='submit' className='shad-button_primary'>
            {isSigningIn ? (
              <div className='flex items-center justify-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : (
              'Sign in'
            )}
          </Button>

          <p className='text-small-regular text-light-2 text-center mt-2'>
            Create a new account?{' '}
            <Link
              to='/sign-up'
              className='text-primary-500 text-small-semibold ml-1'
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
