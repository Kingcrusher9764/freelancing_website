import React from "react"
import "./app.scss"
import Navbar from "./components/navbar/navbar"
import Home from "./pages/home/home"
import Footer from "./components/footer/footer"
import Message from "./pages/message/message"
import Messages from "./pages/messages/messages"
import Add from "./pages/add/add"
import Gig from "./pages/gig/gig"
import Gigs from "./pages/gigs/gigs"
import MyGigs from "./pages/myGigs/myGigs"
import Orders from "./pages/order/order"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query"

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom"

function App() {

  const queryClient = new QueryClient()

  const Layout = ()=>{
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout />,
      children:[
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/gigs",
          element: <Gigs />
        },
        {
          path: "/gig/:id",
          element: <Gig />
        },
        {
          path: "/orders",
          element: <Orders />
        },
        {
          path: "/mygigs",
          element: <MyGigs />
        },
        {
          path: "/add",
          element: <Add />
        },
        {
          path: "/messages",
          element: <Messages />
        },
        {
          path: "/message/:id",
          element: <Message />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App