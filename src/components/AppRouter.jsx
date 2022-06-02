import React, { useContext } from "react";
import { Route, Routes,} from "react-router-dom";
import About from "../pages/About.jsx";
import Posts from '../pages/Posts.jsx';
import Error from '../pages/Error.jsx';
import PostIdPage from "../pages/PostIdPage.jsx";
import { publicRoutes, privateRoutes } from "../router/index.js";
import { AuthContext } from "../context/index.js";
import Loader from "./UI/loader/Loader.jsx";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    console.log(isAuth);

    if(isLoading){
        return <Loader/>
    }

    return(
        isAuth
            ? <Routes>
                {privateRoutes.map(route => {
                    return <Route key={route.path} element={<route.component />} path={route.path} exact={route.exact}></Route>
                })}
                </Routes>
            :
            <Routes>
                {publicRoutes.map(route => {
                    return <Route key={route.path} element={<route.component />} path={route.path} exact={route.exact}></Route>
                })}
            </Routes>       
    );
};
export default AppRouter;