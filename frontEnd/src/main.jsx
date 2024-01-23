import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./components/App/App"
import Level from './components/Level/Level'
import './index.module.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "level/:levelId",
    element: <Level />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
