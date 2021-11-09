import React from "react";
import { Tooltip } from "antd";

interface ColorButtonProps {
    id: number;
    onClick: (id: number) => void; // 回调函数，声明自己被选中
    color: Array<number>;
    selected: boolean;
}

export default function ColorButton (props: ColorButtonProps){

    const handleClick = () => {
        props.onClick(props.id);
    };

    if(! props.color) return <></>;
    
    return (
        <div className="wrapper" id={"wrapper" + props.id.toString()}>
            <Tooltip placement="topLeft" title="请选中以编辑此色块" color="#2db7f5" arrowPointAtCenter>
                <button className="colorButton"
                        id={"button" + props.id.toString()}
                        onClick={handleClick}
                        style={{
                            backgroundColor: "rgb(" + props.color[0] +',' + props.color[1] + ',' + props.color[2] +  ")",
                            boxShadow: (()=>{ if (props.selected) {
                                return "0 0 20px rgb(" + props.color[0] +',' + props.color[1] + ',' + props.color[2] +  ")"
                            } else {return ""}})()
                        }}
                />
            </Tooltip>
        </div>

    )
}