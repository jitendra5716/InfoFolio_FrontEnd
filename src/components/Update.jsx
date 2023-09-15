import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateUser, userSelector } from "../redux/userReducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Update = ()=>{
    const navigation = useNavigate();
    const [updateData, setUpdateData] = useState();
    const {id} = useParams();
    const dispatch = useDispatch();
    const {users,loading} = useSelector(userSelector);
    const newData =  (e)=>{
        setUpdateData({...updateData,[e.target.name]:e.target.value});
    }

    
    useEffect(()=>{
        const singleUser = users.filter((ele)=>ele._id === id);
    
    setUpdateData(singleUser[0]);
    },[])
    

    const handleSubmit = (e)=>{
      e.preventDefault();
      dispatch(updateUser(updateData));
      navigation("/");
    }

    return(
        <>
        <div class="container-fluid p-3 px-0">
        <h2 class="text-center text-white">Update data</h2>
        <hr class="border border-light border-1 opacity-50 my-2" />
        <div class="input-group mb-3 w-100  d-flex align-items-center justify-content-center">
          <form  className="d-flex w-75  flex-column align-items-center ">
            <div class="container-fluid d-flex flex-column align-items-center my-2">
              <label htmlFor="name" class="fs-5 mb-2 text-light">Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="name"
                name="name"
                value={updateData && updateData.name}
                onChange={newData}
              />
            </div>
            <div class="container-fluid d-flex flex-column align-items-center my-2">
              <label htmlFor="email" class="mb-2 fs-5 text-light">Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="email"
                name="email"
                value={updateData && updateData.email}
                onChange={newData}
              />
            </div>
            <div class="container-fluid d-flex flex-column align-items-center my-2">
              <label htmlFor="age" class="mb-2 fs-5 text-light" >Age</label>
              <input
                type="number"
                class="form-control"
                placeholder="Age"
                aria-label="Username"
                aria-describedby="basic-addon1"
                id="age"
                name="age"
                value={updateData && updateData.age}
                onChange={newData}
              />
            </div>
           
            {/* <button type="submit" class="w-25 my-2 h-25">Create User</button> */}
            
            <div class="my-3">
                <input type="radio" checked={updateData && updateData.gender==='Male'} class="me-1" name="gender" id="male" value="Male"  onChange={newData} />
                <label htmlFor="male" class="me-3 text-light">Male</label>
                <input type="radio" checked={updateData && updateData.gender==='Female'} class="me-1" name="gender" id="female" value="Female"  onChange={newData}/>
                <label htmlFor="female" class="text-light">Female</label>
            </div>
            
            <button type="button"  onClick={handleSubmit} class="btn btn-primary w-25 my-2">Update User Details</button>
            {/* <hr class="border border-light border-1 opacity-50 my-2"/> */}
          </form>
          
        </div>
      </div>
        </>
    )
};

export default Update;