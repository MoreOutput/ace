import LoginPage from './login.page';
import DashboardPage from './dashboard.page';

export default {
    dashboardPage: {
        page: DashboardPage,
        route: '/'
    },
    loginPage: {
        page: LoginPage,
        route: '/login'
    }
};
