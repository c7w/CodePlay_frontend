import React,{ReactElement} from "react";
import { Button } from 'antd';
import "./topbar.css"
import webPrefix from "./GlobalVariable";

function onClick():void{
    window.location.href = webPrefix()+"/login";
}

class LoginButton extends React.Component{



    render() {
        return <Button onClick={onClick} style={{margin:"0 auto"}} type="primary" size="large">登录</Button>;
    }
}

export default LoginButton;