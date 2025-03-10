import { createBrowserRouter } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Detail from './pages/Detail';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/detail/:Building",
    element: <Detail />,
  },
]);