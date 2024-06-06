import {configureStore} from  "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";// movieReducer is a variable . can give any name
import searchSlice from "./searchSlice";

const store = configureStore({
    reducer:{
        app: userReducer,
        movie: movieReducer,
        searchMovie:searchSlice
    }
});

export default store;