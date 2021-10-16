import React from "react";
import { Tooltip } from "antd";

interface preview_props {
    readonly id: number; // preview图片的 id
    readonly raw_str: string; // svg字符串
    readonly color_arr: any; // 二维数组
    readonly isPreview: boolean; // 判断是否是预览图
}

class Preview extends React.Component<preview_props, any>{
    render() {
        let color_saved = [];
        color_saved.push("");
        let my_color = this.props.color_arr; // [H S V A R G B]
        let color_num;

        color_num = my_color.length;
        for (let i = 0; i < color_num; i++){
            let tmp = "rgba(" + my_color[i][4] + "," + my_color[i][5] + "," + my_color[i][6] + "," + my_color[i][3] + ")";
            tmp = "fill=" + '"' + tmp + '" opacity=' + my_color[i][3];
            color_saved.push(tmp);
        }

        let s = this.props.raw_str;
        for (let i = 1; i <= color_num; i++) {
            let tmp = "%%" + i.toString() + "%%";
            s = s.replaceAll(tmp, color_saved[i]);
        }

        return (
            <Tooltip placement="topLeft" title="请选中以编辑此线稿" color="#2db7f5" arrowPointAtCenter>
                <div id = {"sketch" + (this.props.isPreview ? "" : this.props.id)} className={"preview_svg"}>
                    <div dangerouslySetInnerHTML={{__html: s}}/>
                </div>
            </Tooltip>
        )
    }

}

export default Preview