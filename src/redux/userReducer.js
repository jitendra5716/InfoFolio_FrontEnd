const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")


const initialState = {
    users:[],
    loading:false,
    error:null,
    searchData:[]
}

export const getAllUsers = createAsyncThunk('getAllUsers',async(data,{rejectWithValue})=>{
    const response = await fetch('http://localhost:8000/api/v1/users');

    try{
        const result = await response.json();
        return result;
    }catch(error){
        return rejectWithValue(error);
    }
});

export const createUser = createAsyncThunk('createUser',async(data,{rejectWithValue})=>{
    const response = await fetch('http://localhost:8000/api/v1/user/create',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
    })

    try{
        const result = await response.json();
        return result;
    }catch(error){
        return rejectWithValue(error);
    }
});

export const deleteUser = createAsyncThunk('deleteUser',async(id,{rejectWithValue})=>{
    console.log(id);
    const response = await fetch(`http://localhost:8000/api/v1/user/delete/${id}`,{
        method:"DELETE"
    });
    console.log(response);
    try{
        const result = await response.json();
        return result;
        console.log(result);
    }catch(error){
        return rejectWithValue(error);
    }
});

export const updateUser = createAsyncThunk('updateUser',async(data,{rejectWithValue})=>{
    // console.log("Updated data ",data);
    const response = await fetch(`http://localhost:8000/api/v1/user/update/${data._id}`,{
        method:'PUT',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })

    try{
        const result = await response.json();
        return result;
    }catch(error){
        return rejectWithValue(error);
    }
})

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        searchUser:(state,action)=>{
            state.searchData = action.payload;
        }
    },
    extraReducers:{
        [getAllUsers.pending]:(state,action)=>{
            state.loading = true;
        },
        [getAllUsers.fulfilled]:(state,action)=>{
            state.loading = false;
            state.users = action.payload
        },
        [getAllUsers.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        [createUser.pending] : (state,action)=>{
            state.loading = true;
        },
        [createUser.fulfilled] :(state,action)=>{
            state.loading = false;
            state.users.push(action.payload);
        },
        [createUser.rejected] :(state,action)=>{
            state.loading = false;
            state.users = action.payload;
        },
        [deleteUser.pending] :(state,action)=>{
            state.loading = true;
        },
        [deleteUser.fulfilled] :(state,action)=>{
            state.loading = false;
            console.log(action.payload);
            const {_id} = action.payload;
            if(_id){
                state.users = state.users.filter((user,index)=>user._id !== _id);
            }
            
        },
        [deleteUser.rejected]:(state,action)=>{
            state.loading = false;
            state.users = action.payload;
        },
        [updateUser.pending]:(state,action)=>{
            state.loading = true;
        },
        [updateUser.fulfilled]:(state,action)=>{
            state.loading = false;
            // console.log(action.payload);
            state.users = state.users.map((ele)=>
                (ele._id === action.payload.id ? action.payload : ele)
            )
        },
        [updateUser.rejected]:(state,action)=>{
            state.loading = false;
            state.users = action.payload;
        }
    }
});

export const userReducers = userSlice.reducer;

export const userAction = userSlice.actions;

export const userSelector = (state)=>(state.userReducers);
export const userSearchData = (state)=>(state.userReducers.searchData);

