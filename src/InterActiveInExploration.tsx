import React from "react";
import {Col, Row} from "antd";
import {faHeart, faPaintBrush, faRunning, faStepForward} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface InterActiveInExplorationProps{
    readonly vote:()=>void;
    readonly next:()=>void;
    readonly edit:()=>void;
}

const InterActiveInExploration=(props:InterActiveInExplorationProps)=>{

    function like():void{
        let icon=document.getElementById("heart");
        props.vote();
        if(icon){
            icon.style.backgroundColor='red';
        }
    }

    function toNext():void{
        props.next();
    }

    function toEdit():void{
        props.edit();
    }

    return (
        <div>
            <Row justify="space-around" align={"middle"} style={{backgroundColor:"lightblue"}}>
                <Col span={5}/>
                <Col span={2}>
                    <FontAwesomeIcon id={"heart"} icon={ faHeart } onClick={like} size={"2x"} />
                </Col>
                <Col span={4}/>
                <Col span={2}>
                    <FontAwesomeIcon icon={ faPaintBrush} onClick={toNext} size={"2x"} />
                </Col>
                <Col span={4}/>
                <Col span={2}>
                    <FontAwesomeIcon icon={ faStepForward} onClick={toEdit} size={"2x"} />
                </Col>
                <Col span={5}/>
            </Row>
        </div>
    );
}

export default InterActiveInExploration;