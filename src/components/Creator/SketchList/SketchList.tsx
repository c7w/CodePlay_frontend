import React from 'react';
import { String2ArrayRGB } from '../../../utils/Color';
import '../../../styles/SketchList.css';
import Preview from '../ColorEditor/WorkSpace/Preview'
import { Tooltip } from 'antd';

interface choose_props {
    readonly str: string; //原始的“{scheme:...}”字符串
    // readonly colorValueList: Array<Array<Array<number>>>; // 颜色三维数组
    readonly onClickSketch: (id: number) => void; //回调
}

interface choose_state {
    readonly pre_id: number;
}

class ChooseSketch extends React.Component<choose_props, choose_state>{

    constructor(props: choose_props) {
        super(props);
        this.state = ({pre_id: 0,});
    }
    //处理鼠标点击
    handler(i: number){
        // console.log("pre_id: " + this.state.pre_id + " i: " + i);
        // let e = document.getElementById("sketch" + i);
        // let pre_e = document.getElementById("sketch" + this.state.pre_id);
        // // @ts-ignore
        // pre_e.style.boxShadow = "0 0";
        // // @ts-ignore
        // e.style.boxShadow = "0 0 10px";
        this.props.onClickSketch(i);

        // this.setState({
        //     pre_id: i,
        // });
    }

    render() {
        let rawList = JSON.parse(this.props.str).sketch_list; // 解析列表，用于获取 svg 代码
        let list = rawList.map((sketch: any) => {
            return eval(sketch.defaultValue).map((list: any) => {
                // ["#2F9B77", 1] => [RGBAHSV]
                const newColorArray = [255,255,255,list[1],0,0,0];
                // TODO: Color/Convert RGB String to RGB List
                const RGBList = String2ArrayRGB(list[0]); // TODO
                newColorArray[0] = RGBList[0];
                newColorArray[1] = RGBList[1];
                newColorArray[2] = RGBList[2];
                
                return newColorArray;
            })
        })
        let scratch_num = list.length;
        let row = Math.trunc(scratch_num / 4) + 1;
        let all_items = [];
        for (let i = 0; i < row; i++){
            let inside_arr = [];
            for (let j = 0; j <= Math.min(3, scratch_num - i * 4 - 1); j++){
                let index = i * 4 + j;
                let scratch_data = rawList[index].data;
                inside_arr.push(<div style={{margin: '10px'}} onClick={() => {this.handler(rawList[index].id)}}><Preview raw_str={scratch_data} color_arr={list[index]} /></div>);
            }
            all_items.push(<div className={"one_row"} key={"row"+i}>{inside_arr}</div>);
        }

        return (
           <div className={"all_items"}>{all_items}</div>
        );
    }
}

export default ChooseSketch;


