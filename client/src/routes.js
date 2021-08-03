import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import SettingPage from "./pages/SettingPage/SettingPage";

const routes = [
    {   
        exact: true,
        path: '/',
        main: ({history}) => <HomePage history={history} />
    },
    {   
        exact: true,
        path: '/login',
        main: ({history}) => <LoginPage history={history} />
    },
    {   
        exact: true,
        path: '/register',
        main: ({history}) => <RegisterPage history={history} />
    },
    {   
        exact: true,
        path: '/post/:id',
        main: ({history}) => <DetailsPage history={history} />
    },
    {   
        exact: true,
        path: '/create',
        main: ({history}) => <CreatePostPage history={history} />
    },
    {   
        exact: true,
        path: '/setting',
        main: ({history}) => <SettingPage history={history} />
    },
];

export default routes;