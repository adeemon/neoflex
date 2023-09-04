import { createBrowserRouter } from 'react-router-dom';
import { Loan } from './loan';
import { PageNotFound } from './pageNotFound';
import Root from './root';


export const router = createBrowserRouter([{
  path: '/',
  element: <Root />,
  errorElement: <PageNotFound />,
},
{
  path: 'loan',
  element: <Loan />,
},
]);
