import Dashboard from './pages/Dashboard';
import Schools from './pages/Schools';
import Resources from './pages/Resources';
import Suppliers from './pages/Suppliers';
import DistributionPage from './pages/DistributionPage';

const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
    name: 'Dashboard'
  },
  {
    path: '/schools',
    component: Schools,
    name: 'Schools'
  },
  {
    path: '/resources',
    component: Resources,
    name: 'Resources'
  },
  {
    path: '/suppliers',
    component: Suppliers,
    name: 'Suppliers'
  },
  {
    path: '/distributions',
    component: DistributionPage,
    name: 'Distributions'
  }
];

export default routes;
