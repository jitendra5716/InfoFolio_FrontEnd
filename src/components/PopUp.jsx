import { Link } from "react-router-dom";
import { userSelector } from "../redux/userReducer";
import style from "../styles/popup.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PopUp = ({popUp,setPopUp})=>{
    
    
    const {users} = useSelector(userSelector);
    const {id} = useParams();
    
    const user = users.find((user,index)=>user._id === id);
    console.log(user);

    return(
        <>
        <div id={style.outerDiv}>
            <div id={style.innerDiv}>
                <Link className={style.cross} to="/" onClick={()=>setPopUp(false)}>X</Link>
                <h5 class="card-title mb-3 mt-4 text-danger">{user.name}</h5>
                <hr class="mt-0 border border-secondary border-1 opacity-75 w-100"/>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {user.email}
            </h6>
            <p class="card-text">
              {user.gender}
            </p>
            <p class="card-text">
              {user.age}
            </p>
            </div>
        </div>
        </>
    )
};

export default PopUp;