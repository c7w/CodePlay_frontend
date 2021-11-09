import React from "react";
import { Tooltip } from "antd";

interface preview_props {
    readonly raw_str: string; // svg字符串
    readonly color_arr: any; // 二维数组
}

class Preview extends React.Component<preview_props, any>{
    render() {
        let color_saved = [];
        color_saved.push("");
        let my_color = this.props.color_arr; // [RGBAHSV]
        let color_num;

        color_num = my_color.length;
        for (let i = 0; i < color_num; i++){
            let tmp = "rgba(" + my_color[i][0] + "," + my_color[i][1] + "," + my_color[i][2] + "," + my_color[i][3] + ")";
            tmp = "fill=" + '"' + tmp + '" opacity=' + my_color[i][3];
            color_saved.push(tmp);
        }

        let s = this.props.raw_str;
        for (let i = 1; i <= color_num; i++) {
            let tmp = "%%" + i.toString() + "%%";
            s = s.replaceAll(tmp, color_saved[i]);
        }

        return (
            
            <div className={"preview_svg"}>
                <div style={{display: 'flex', justifyContent:'center'}} dangerouslySetInnerHTML={{__html: s}}/>
            </div>
        )
    }

}

export default Preview;