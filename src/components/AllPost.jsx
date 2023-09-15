import PopUp from "./PopUp";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteUser, getAllUsers, userSelector } from "../redux/userReducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userSearchData } from "../redux/userReducer";

import style from "../styles/allPost.module.css";

const AllPost = ({popUp,setPopUp}) => {

  const [radioData,setRadioData] = useState("");

  const dispatch = useDispatch();
  const {users,loading} = useSelector(userSelector);
  const searchData = useSelector(userSearchData);
 
  useEffect(()=>{
    dispatch(getAllUsers())
  },[]);

  if(loading){
    return(
      <>
      <h2 class="text-center text-white mt-3" >Loading</h2>
      </>
    )
  }
  
  return (
    <>
    {/* <PopUp /> */}
    <div class="container w-75 d-flex flex-column align-items-center flex-wrap gap-3 mt-1 border border-secondary p-3">
    <h3 class="my-1 text-white">All Users</h3>
        <div>
        <input type="radio" checked={radioData===""} onChange={(e)=>setRadioData(e.target.value)} name="gender" class="me-1 " value="" id="all"/>
        <label htmlFor="all" class="me-3 text-light pe-auto">All</label>
        <input type="radio" name="gender" checked={radioData==="Female"} onChange={(e)=>setRadioData(e.target.value)} class="me-1" value="Female" id="female"/>
        <label htmlFor="female" class="me-3 text-light pe-auto">Female</label>
        <input type="radio" checked={radioData==="Male"} onChange={(e)=>setRadioData(e.target.value)} name="gender" class="me-1 pe-auto" value="Male" id="male"/>
        <label htmlFor="male" class="text-light pe-auto">Male</label>
        </div>
        </div>
        <div class="container w-75 d-flex column-gap-3 row-gap-5 justify-content-around align-items-center flex-wrap  mt-1  p-3 pb-5">
    {
      
     
    
      users && users.filter((ele)=>{
        if(searchData.length===0){
          return ele;
        }else{
          return ele.name.toLowerCase().includes(searchData.toLowerCase());
        }
      }).filter((ele)=>{
        if(radioData==="Male"){
          return ele.gender ===radioData
        }else if(radioData === "Female"){
          return ele.gender === radioData
        }else{
          return ele
        }
      }).map((user,index)=>(
        // <div class="container w-75 d-flex flex-column align-items-center flex-wrap gap-3 mt-1 border border-secondary p-3">
        
        
        <div class="card bg-body" id={style.outerDiv} style={{width: "22rem",height:"10.5rem"}}>
          <div id={style.cardBody} class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title mb-3">{user.name}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {user.email}
            </h6>
            <p class="card-text">
              {user.gender}
            </p>
            <div>
              <Link to={`/user/${user._id}`}>
              {/* <button href="#" class="card-link" > */}
              <button type="button" onClick={()=>setPopUp(true)} id={style.viewBtn} className={style.btn}>View</button>
              
            
              </Link>
            <Link to={`/user/edit/${user._id}`} class="mx-3">
            
              <button type="button" className={style.btn} id={style.editBtn}>
                  edit
              </button>
            
            </Link>
           <Link id={style.deleteBtn} onClick={()=>dispatch(deleteUser(user._id))}>
                {/* <a   class="card-link"> */}
                  <div className={style.deleteIconDiv}>
                    <img src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="deleteIcon" />
                  </div>
              {/* delete */}
            {/* </a> */}
           </Link>
            
            </div>
            
          </div>
        </div>
        
        // </div>
      ))
      
    }
    </div>
      
    </>
  );
};

export default AllPost;
