import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import './App.css'
const Page_home = lazy(() => import("./views/Home"))
const Page_product = lazy(() => import("./views/Product"))
const Page_info = lazy(() => import("./views/Info"))
const Page_sections = lazy(() => import("./views/Sections"))
const Page_error = lazy(() => import("./components/ErrorPage.tsx"))
const App = lazy(() => import("./App.tsx"))
const router = createBrowserRouter([
  {
    path: "/",
    element: <Page_home/>,
    errorElement: <Page_error />,
  },
  {
    path: "/app",
    element: <App/>,
    errorElement: <Page_error />,
  },
  {
    path: "/product",
    element: <Page_product/>,
    errorElement: <Page_error />,
  },
  {
    path: "/info",
    element: <Page_info/>,
    errorElement: <Page_error />,
  },
  {
    path: "/sections",
    element: <Page_sections/>,
    errorElement: <Page_error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)