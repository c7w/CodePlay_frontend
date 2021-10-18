import React from "react";
import { Tooltip } from "antd";

interface ColorButtonProps {
    readonly id: number;
    readonly onClick: (id: number) => void; // 回调函数，声明自己被选中
}

export default function ColorButton (props: ColorButtonProps){

    const handleClick = () => {
        props.onClick(props.id);
    }

    return (
        <div className="wrapper" id={"wrapper" + props.id.toString()}>
            <Tooltip placement="topLeft" title="请选中以编辑此色块" color="#2db7f5" arrowPointAtCenter>
                <button className="colorButton"
                        id={"button" + props.id.toString()}
                        onClick={handleClick}
                />
            </Tooltip>
        </div>

    )
}