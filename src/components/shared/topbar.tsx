import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccountMutation } from '@/lib/react-query/mutations';
import { useEffect } from 'react';
import { useAuthContext } from '@/context/auth-context';

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccountMutation();

  const { user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess, navigate]);

  return (
    <section className='topbar'>
      <div className='flex items-center justify-between py-4 px-5'>
        <Link to='/' className='flex gap-3 items-center'>
          <img
            src='/assets/images/logo.svg'
            alt='logo'
            width={130}
            height={325}
          />
        </Link>

        <div className='flex items-center gap-4'>
          <Button
            onClick={() => signOut()}
            variant='ghost'
            className='shad-button_ghost'
          >
            <img src='/assets/icons/logout.svg' alt='logout' />
          </Button>

          <Link
            to={`/profile/${user.id}`}
            className='flex items-center justify-center gap-3'
          >
            <img
              src={user.imageUrl || '/assets/images/profile.png'}
              alt='profile'
              className='h-8 w-8 rounded-full'
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
