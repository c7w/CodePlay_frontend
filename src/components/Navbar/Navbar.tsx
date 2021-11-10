import React from "react";
import {Col, message, Row, Switch} from 'antd';
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
            <FontAwesomeIcon icon={ faPencilRuler } size={"2x"} onClick={showModal} />
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
        <div className="Navbar"> 123 </div>
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
        //     <Col span={1.25} onClick={LoginOut}>
        //         <Row style={{height:"3px", paddingLeft:"16px"}} align={"middle"}>
        //             <FontAwesomeIcon icon={ faRunning} size={"2x"} />
        //         </Row>
        //         <Row style={{height:"38px"}} align={"middle"}>
        //             退出登录
        //         </Row>
        //     </Col>
        // </Row>
    );
}

export default TopBar;