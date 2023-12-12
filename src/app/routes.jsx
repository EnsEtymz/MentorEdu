import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';

import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import ResetPassword from './views/sessions/ResetPassword';
import Choice from './views/sessions/Choice';
import RegisterMentor from './views/sessions/RegisterMentor';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));
const CreateEdu = Loadable(lazy(() => import('app/views/mentor/CreateEdu')));
const VideoListId = Loadable(lazy(() => import('app/views/mentor/VideoListId')))
const VideoListAll = Loadable(lazy(() => import('app/views/student/AllVideoList')))

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,

      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,

      },


      {
        path: '/mentor/create-edu',
        element: <CreateEdu />,
      },
      {
        path: '/mentor/videolist-id',
        element: <VideoListId />,
      },
      {
        path: '/student/videolistall',
        element: <VideoListAll />,
      },
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/signup-mentor', element: <RegisterMentor /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/session/reset-password', element: <ResetPassword /> },
  { path: '/session/choice', element: <Choice /> },

  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },

  //MentorPages



];

export default routes;
