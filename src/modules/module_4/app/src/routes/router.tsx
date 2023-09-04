import { createBrowserRouter } from 'react-router-dom';
import { Loan } from './loan';
import { PageNotFound } from './pageNotFound';
import Root from './root';
import { TestPage } from './testpage';


export const router = createBrowserRouter([{
  path: '/',
  element: <Root />,
  errorElement: <PageNotFound />,
},
{
  path: 'loan',
  element: <Loan />,
},
{
  path: 'testpage',
  element: <TestPage />,
},
]);
