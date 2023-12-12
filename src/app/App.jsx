import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import '../fake-db';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserAuthenticator from './contexts/UserAuthenticator';

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <AuthProvider>
        <UserAuthenticator>
          <MatxTheme>
            <CssBaseline />
            {content}
            <ToastContainer />
          </MatxTheme></UserAuthenticator>

      </AuthProvider>
    </SettingsProvider>
  );
};

export default App;
