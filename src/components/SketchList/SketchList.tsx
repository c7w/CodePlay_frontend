import React from 'react';
import '../../styles/SketchList.css';
import Preview from '../ColorEditor/WorkSpace/Preview'

interface choose_props {
    readonly str: string; //原始的“{scheme:...}”字符串
    readonly colorValueList: Array<Array<Array<number>>>; // 颜色三维数组
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
        console.log("pre_id: " + this.state.pre_id + " i: " + i);
        let e = document.getElementById("sketch" + i);
        let pre_e = document.getElementById("sketch" + this.state.pre_id);
        // @ts-ignore
        pre_e.style.boxShadow = "0 0";
        // @ts-ignore
        e.style.boxShadow = "0 0 10px";
        this.props.onClickSketch(i);

        this.setState({
            pre_id: i,
        });
    }

    render() {
        let rawList = JSON.parse(this.props.str).sketch_list; // 解析列表，用于获取 svg 代码
        let list = this.props.colorValueList;
        let scratch_num = list.length;
        let row = Math.trunc(scratch_num / 4) + 1;
        let all_items = [];
        for (let i = 0; i < row; i++){
            let inside_arr = [];
            for (let j = 0; j <= Math.min(3, scratch_num - i * 4 - 1); j++){
                let index = i * 4 + j;
                let scratch_data = rawList[index].data;
                inside_arr.push(<div className={"scratch_item"} onClick={() => {this.handler(index)}}><Preview raw_str={scratch_data} isPreview={false} color_arr={this.props.colorValueList[index]} id={index}/></div>);
            }
            all_items.push(<div className={"one_row"}>{inside_arr}</div>);
        }

        return (
           <div className={"all_items"}>{all_items}</div>
        );
    }
}

export default ChooseSketch;


