import React from "react";
import {Col, message, Row, Switch, Space, Tooltip} from 'antd';
import  { useState } from 'react';
import { Modal } from 'antd';
import '../../styles/Navbar.css';
import { Input } from 'antd';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilRuler, faRunning} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getMainPageState } from "../../store";

// TODO: Beautify the navbar

interface TopBarProps{
    readonly name:string;
    readonly stateChangeFunction:(refresh: boolean)=>void;
    readonly promptToDesigner:(value:string)=>Promise<boolean>;
    readonly role:string;
}

function LoginOut(){
    window.location.href = "./logout";
}

interface AppProps{
    readonly role:string;
    readonly submit:(value:string)=>Promise<boolean>
}

const App = (props:AppProps) => {
    let role:string=props.role;
    let submit:(value:string)=>Promise<boolean>=props.submit;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [key,setkey]=useState<string>();

    const showModal = () => {
        if(role==="Designer"){
            message.info("您已经是设计师了！");
            return;
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if(key){
            submit(key).then(result=>{
                if(!result){
                    alert("邀请码错误");
                    return;
                }else{
                    setIsModalVisible(false);
                }
            });
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const valueChange=(value:string)=>{
        setkey(value);
    }

    return (
        <>
            <Tooltip placement="topLeft" title="来成为设计师吧！" color="#2db7f5" arrowPointAtCenter>
                <FontAwesomeIcon className="designer" icon={ faPencilRuler } size={"1x"} onClick={showModal} />
            </Tooltip>

            <Modal title="注册成为设计师" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>请输入注册邀请码</p>
                <Input placeholder="Basic usage" id="keyText" value={key} onChange={event=>{valueChange(event.target.value)}}/>
            </Modal>
        </>
    );
};


//顶栏
const TopBar = (props: TopBarProps) => {

    const mainPageState = useSelector(getMainPageState);



    return(
        <div className="navBar">
            <div className="left">
                <div className="welcome">
                    <span>Welcome to {'\u00A0'}</span>
                    <div className="CodePlay"> CodePlay {'\u00A0'}</div>
                    <span> world , {'\u00A0'}</span>
                    <span>{props.name}</span>
                </div>
            </div>
            <div className="right">
                <Space align="center" size={100}>
                <App role={props.role} submit={props.promptToDesigner} />
                <div className="logOut">
                    <span onClick={LoginOut}>退出登录</span>
                </div>
                </Space>


            </div>
        </div>
        // <Row justify="space-around" align={"middle"}>
        //     <Col span={10} style={{height:"73px"}} >
        //         <div className="font">
        //             <p >Welcome to CodePlay world, {props.name}</p>
        //         </div>
        // <Row justify="space-around" align={"middle"}>
        //     <Col span={4} style={{height:"73px"}} >
        //         <p >欢迎，{props.name}</p>
        //     </Col>
        //     <Col span={13}>
        //     </Col>
        //     <Col span={2} style={{height:"73px"}}>
        //         <Switch  checkedChildren="创作" unCheckedChildren="浏览" checked={mainPageState.page === 'Creator'} onChange={()=>{props.stateChangeFunction(false);}}/>
        //     </Col>
        //     <Col span={1.25}>
        //         <App role={props.role} submit={props.promptToDesigner} />
        //     </Col>
        // </Row>
    );
}

export default TopBar;