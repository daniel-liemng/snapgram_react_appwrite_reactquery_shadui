import { Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import SignInForm from './_auth/forms/signin-form';
import SignUpForm from './_auth/forms/signup-form';
import { HomePage } from './_root/pages';
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
        </Route>
      </Routes>
    </main>
  );
};

export default App;
