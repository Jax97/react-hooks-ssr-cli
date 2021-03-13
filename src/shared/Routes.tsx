import Home from './Home';
import About from './About';

export const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    component: About,
    loadData: About.loadData,
  },
];
