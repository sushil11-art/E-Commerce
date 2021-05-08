import React, { useEffect } from "react";
import {connect,useSelector} from "react-redux"
import { useHistory } from "react-router-dom";
const Cart=()=>{
    const token=useSelector(state=>state.auth.token)
    const browserHistory=useHistory();
    useEffect(()=>{
        if(!token){
            browserHistory.push("/login")
        }
    },[token,browserHistory])
    return (
        <div>
            Cart component
        </div>
    )
}

export default connect(null)(Cart);