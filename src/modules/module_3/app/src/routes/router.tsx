import { createBrowserRouter } from "react-router-dom";
import { Loan } from "./loan";
import Root from "./root";
import { Homepage } from "./homepage";

export const router = createBrowserRouter([{
    path: '/',
    element: <Root />,
  },
  {
    path: 'loan',
    element: <Loan />
  }
])