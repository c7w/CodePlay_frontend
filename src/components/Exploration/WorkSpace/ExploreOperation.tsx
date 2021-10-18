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
    let voted:boolean=false;

    function like():void{
        if(voted){
            return;
        }
        voted=!voted;
        let icon=document.getElementById("heart");
        props.vote();
        if(icon){
            icon.style.color='red';
        }
    }

    function toNext():void{
        props.next();
    }

    function toEdit():void{
        props.edit();
    }

    let icon=document.getElementById("heart");
    if(icon){
        icon.style.color='black'
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
                    <FontAwesomeIcon icon={ faPaintBrush} onClick={toEdit} size={"2x"} />
                </Col>
                <Col span={4}/>
                <Col span={2}>
                    <FontAwesomeIcon icon={ faStepForward } onClick={toNext} size={"2x"} />
                </Col>
                <Col span={5}/>
            </Row>
        </div>
    );
}

export default InterActiveInExploration;