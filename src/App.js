import AllPost from "./components/AllPost";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PopUp from "./components/PopUp";
import { useState } from "react";
import Update from "./components/Update";

function App() {

  const [popUp,setPopUp] = useState(false);

  const router = createBrowserRouter([
    {
      path:"/",element:<Navbar />,
      children:[
        {
          index:true,element:<AllPost popUp={popUp} setPopUp={setPopUp}/>
        },
        {
          path:"/create",element:<CreatePost />
        },
        {
          path:'/user/:id',element:<PopUp popUp={popUp} setPopUp={setPopUp}/>
        },{
          path:'/user/edit/:id',element:<Update />
        }
      ]
    }
  ])
  return (
    <>
    <Provider  store={store}>

    <div class="container-fluid bg-secondary px-0" style={{minHeight:"100vh"}}>
    <RouterProvider router={router}>
    
    
    </RouterProvider>
    </div>
    </Provider>
    </>
  );
}

export default App;
