import { createBrowserRouter } from "react-router-dom";

import Homepage from "./pages/Home";
import Detail from './pages/Detail';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/detail/:building/:floor/:room",
    element: <Detail />,
  },
]);