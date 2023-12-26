import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import AuthProvider from './context/auth-context.tsx';
import { BrowserRouter } from 'react-router-dom';
import QueryProvider from './lib/react-query/query-provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
