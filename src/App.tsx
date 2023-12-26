import { Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import SignInForm from './_auth/forms/signin-form';
import SignUpForm from './_auth/forms/signup-form';
import {
  AllUsersPage,
  CreatePostPage,
  EditPostPage,
  ExplorePage,
  HomePage,
  PostDetailsPage,
  ProfilePage,
  SavedPage,
  UpdateProfilePage,
} from './_root/pages';
import AuthLayout from './_auth/auth-layout';
import RootLayout from './_root/root-layout';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Toaster position='top-right' richColors />
      <Routes>
        {/* public */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
        </Route>

        {/* private */}
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='/saved' element={<SavedPage />} />
          <Route path='/all-users' element={<AllUsersPage />} />
          <Route path='/create-post' element={<CreatePostPage />} />
          <Route path='/update-post/:id' element={<EditPostPage />} />
          <Route path='/posts/:id' element={<PostDetailsPage />} />
          <Route path='/profile/:id/*' element={<ProfilePage />} />
          <Route path='/update-profile/:id' element={<UpdateProfilePage />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
