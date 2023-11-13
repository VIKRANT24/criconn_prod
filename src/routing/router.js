//node imports
import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

//local imports
import Spinner from '../components/loader/loader';
import ProtectedRoute from './protected';





const LoginPage = React.lazy(() => import('../pages/auth/login/login.component'));
const RegisterPage = React.lazy(() => import('../pages/auth/register/register.component'));
const HomePage = React.lazy(() => import('../pages/home/home.component'));
const DashboardPage = React.lazy(() => import('../pages/dashboard/dashboard.component'));
const UserListPage = React.lazy(() => import('../pages/user/list/list.component'));
const UserAddPage = React.lazy(() => import('../pages/user/add/add.component'));
const AdminListPage = React.lazy(() => import('../pages/admin/list/list.component'));
const AdminAddPage = React.lazy(() => import('../pages/admin/add/add.component'));
const AdminPermissionPage = React.lazy(() => import('../pages/admin/permission/permission.component'));
const ResetPasswordPage = React.lazy(() => import('../pages/password/password.component'));
const PlayerListPage = React.lazy(() => import('../pages/player/list/list.component'));
const PlayerAddPage = React.lazy(() => import('../pages/player/add/add.component'));
const TournamentAddPage = React.lazy(() => import('../pages/tournament/add/add.component'));
const TournamentListPage = React.lazy(() => import('../pages/tournament/list/list.component'));
const MyTournamentListPage = React.lazy(() => import('../pages/tournament/my/list.component'));
const EditTeamsPage = React.lazy(() => import('../pages/matches/editTeams/edit.component'));
const EditMatchesPage = React.lazy(() => import('../pages/matches/editMatches/edit.component'));
const EditPreMatchPage = React.lazy(() => import('../pages/matches/editPreMatch/edit.component'));
const EditScorePage = React.lazy(() => import('../pages/matches/editScore/edit.component'));



const routes = [
    { path: '/', element: <Navigate to="/auth/login" /> },
    { path: '/auth/login', element: <LoginPage /> },
    { path: '/auth/register', element: <RegisterPage /> },
    {
        path: '/home', element: <HomePage />, children: [
            {path: '/home/dashboard', element: <ProtectedRoute><DashboardPage /></ProtectedRoute>},
            {path: '/home/user', element: <ProtectedRoute><UserListPage /></ProtectedRoute>},
            {path: '/home/add-user', element: <ProtectedRoute><UserAddPage /></ProtectedRoute>},
            {path: '/home/admin', element: <ProtectedRoute><AdminListPage /></ProtectedRoute>},
            {path: '/home/add-admin', element: <ProtectedRoute><AdminAddPage /></ProtectedRoute>},
            {path: '/home/admin-permission', element: <ProtectedRoute><AdminPermissionPage /></ProtectedRoute>},
            {path: '/home/reset-password', element: <ProtectedRoute><ResetPasswordPage /></ProtectedRoute>},
            {path: '/home/players', element: <ProtectedRoute><PlayerListPage /></ProtectedRoute>},
            {path: '/home/add-player', element: <ProtectedRoute><PlayerAddPage /></ProtectedRoute>},
            {path: '/home/add-tournament', element: <ProtectedRoute><TournamentAddPage /></ProtectedRoute>},
            {path: '/home/all-tournaments', element: <ProtectedRoute><TournamentListPage /></ProtectedRoute>},
            {path: '/home/my-tournaments', element: <ProtectedRoute><MyTournamentListPage /></ProtectedRoute>},
            {path: '/home/tournament-matches', element: <ProtectedRoute><EditTeamsPage /></ProtectedRoute>},
            {path: '/home/create-matches', element: <ProtectedRoute><EditMatchesPage /></ProtectedRoute>},
            {path: '/home/edit-pre-match', element: <ProtectedRoute><EditPreMatchPage /></ProtectedRoute>},
            {path: '/home/edit-score', element: <ProtectedRoute><EditScorePage /></ProtectedRoute>},
    ]
    },
]



const Router = () => {
    const element = useRoutes(routes);
    return (
        <React.Suspense fallback={<Spinner />}>
            {element}
        </React.Suspense>
    )
}

export default Router;


