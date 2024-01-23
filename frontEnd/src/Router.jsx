import ErrorPage from "./components/ErrorPage/ErrorPage"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App/App";
import Level from "./components/Level/Level";

const Router = () =>{
    const router = createBrowserRouter([
        {
          path: "/",
          element: <App />,
          errorElement: <ErrorPage />,
        },
        {
          path: "level/:levelId",
          element: <Level />,
        },
      ]);

  return <RouterProvider router={router} />;
}


export default Router;