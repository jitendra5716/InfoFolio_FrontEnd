import { NavLink, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "../styles/navbar.module.css";
import { useSelector } from "react-redux";
import { userAction, userSelector } from "../redux/userReducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


const Navbar = () => {
  const {users} = useSelector(userSelector);
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(userAction.searchUser(searchData))
  },[searchData])
  return (
    <>
      <nav class="navbar navbar-expand-lg w-100 bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand text-light" to="/">
            RTK
          </Link>
          <button
            class="navbar-toggler shadow-none bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                
                <a class="nav-link text-light" href="#">
                <NavLink to="/create" id={style.createPostLink} style={({isActive})=>isActive?{color:"cyan"}:undefined}>
                  Create Post
                  </NavLink>
                </a> 
                
                
              </li>
              <li class="nav-item">
              
                <a class="nav-link text-light" href="#">
                <NavLink to="/" id={style.allPostLink} style={({isActive})=>isActive?{color:"cyan"}:undefined}>
                  All Post ({users.length})
                  </NavLink>
                </a>
                
              </li>
            </ul>
            <form class="d-flex w-50 p-2" role="search">
              <input
                class="form-control w-100 me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e)=>setSearchData(e.target.value)}
              />
            </form>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
