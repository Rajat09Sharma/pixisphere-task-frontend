import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./Pages/RootLayout"
import { CategoryListingPage } from "./Pages/CategoryListingPag"
import { ProfilePage } from "./Pages/ProfilePage"


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true, element: <CategoryListingPage />
      },
      {
        path: "photographer/:id", element: <ProfilePage />
      }
    ]
  }
])


function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App

//npx json-server --watch data/db.json --port 3001