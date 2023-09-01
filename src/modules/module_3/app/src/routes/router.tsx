import { createBrowserRouter } from 'react-router-dom';
import { Loan } from './loan';
import Root from './root';


export const router = createBrowserRouter([{
    path: '/',
    element: <Root />,
  },
  {
    path: 'loan',
    element: <Loan />,
  },
]);