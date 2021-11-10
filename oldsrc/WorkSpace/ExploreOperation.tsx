import React, { useState } from "react";
import {Col, Row} from "antd";
import {faHeart, faPaintBrush, faRunning, faStepForward} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getMainPageState, updateMainPageState } from "../../src/store";

interface InterActiveInExplorationProps{
    readonly vote:()=>void;
    readonly unvote:()=>void;
    readonly next:()=>void;
    readonly edit:()=>void;
    liked: boolean;
}

const InterActiveInExploration=(props:InterActiveInExplorationProps)=>{
    
    const mainPageState = useSelector(getMainPageState);
    const dispatch = useDispatch();
    
    
    function like():void{
        if(mainPageState.exploreScheme.liked){
            const newExploreScheme = JSON.parse(JSON.stringify(mainPageState.exploreScheme));
            newExploreScheme.liked = false;
            newExploreScheme.likes -= 1;
            dispatch(updateMainPageState({exploreScheme: newExploreScheme}));
            props.unvote();
        } else {
            const newExploreScheme = JSON.parse(JSON.stringify(mainPageState.exploreScheme));
            newExploreScheme.liked = true;
            newExploreScheme.likes += 1;
            dispatch(updateMainPageState({exploreScheme: newExploreScheme}));
            props.vote();
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
                    <FontAwesomeIcon id={"heart"} style={{color: mainPageState.exploreScheme.liked ? "red" : "black"}} icon={ faHeart } onClick={like} size={"2x"} />
                </Col>
                <p>{mainPageState.exploreScheme.likes}</p>
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