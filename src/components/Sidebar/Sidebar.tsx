import React from "react";
import { useSelector } from "react-redux";
import { getCreatorSketchId, getMainPageState } from "../../store";

interface ColorSchemePieceProps {
    id: number;
    color_array: Array<Array<number>>;
    explore: (id: number) => void;

}

const ColorSchemePiece = (props: ColorSchemePieceProps) => {
    let color_bind = [];
        for (let i = 0; i < props.color_array.length; i++) {
            let tmp_str = "rgba(" + props.color_array[i][0] + "," + props.color_array[i][1] + "," + props.color_array[i][2] + "," + props.color_array[i][3] + ")";
            color_bind.push(<div className="color" style={{backgroundColor: tmp_str, opacity: props.color_array[i][3], marginBottom: '0.3rem'}}/>);
        }
    return (
        <div className="color_bind" onClick={()=>{props.explore(props.id)}}>
            {color_bind}
        </div>
    );
};

interface SidebarProps {
    explore: (id: number) => void;
}

const MostLikedList = (props: SidebarProps)=>{
    const mainPageState = useSelector(getMainPageState);
    const currSketchId = useSelector(getCreatorSketchId);
    const currLikedList = mainPageState.schemeList.schemes
                                    .filter((scheme: any) => scheme.sketch_id === currSketchId)
                                    .sort((a: any, b: any) => a.likes > b.likes)
                                    .slice(0, 10)
                                    .map((scheme: any) => {return <ColorSchemePiece id={scheme.id} color_array={scheme.colors} explore={props.explore}></ColorSchemePiece>});
    
    
    return (<div>{currLikedList}</div>);
};

const ApprovedList = (props: SidebarProps)=>{
    const mainPageState = useSelector(getMainPageState);
    const currSketchId = useSelector(getCreatorSketchId);
    const approvedList = mainPageState.schemeList.schemes
                                    .filter((scheme: any) => scheme.sketch_id === currSketchId)
                                    .filter((scheme: any) => scheme.approved)
                                    .sort((a: any, b: any) => a.likes > b.likes)
                                    .slice(0, 10)
                                    .map((scheme: any) => {return <ColorSchemePiece id={scheme.id} color_array={scheme.colors} explore={props.explore}></ColorSchemePiece>});
    return (<div>{approvedList}</div>);
};

export {MostLikedList, ApprovedList};