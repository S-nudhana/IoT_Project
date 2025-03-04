import { createBrowserRouter } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Detail from './Pages/Detail';

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