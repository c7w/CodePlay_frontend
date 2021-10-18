import React from 'react';


interface preview_props {
    readonly raw_str: string; //svg字符串
    readonly color_arr: any; //二维数组
    readonly extra_arr: any; //随便给个值
}

interface choose_props {
    readonly str: string; //原始的“{scheme:...}”字符串
}

class Choose_scratch extends React.Component<choose_props>{

    constructor(props: choose_props) {
        super(props);
        this.setState({pre_id: 1,})
    }

    //处理鼠标点击
    // handler(pre_i:number, i: number){
    //     let e = document.getElementById("sketch" + i);
    //     let pre_e = document.getElementById("sketch" + pre_i);
    //     // @ts-ignore
    //     pre_e.style.boxShadow = "0 0 0px";
    //     // @ts-ignore
    //     e.style.boxShadow = "0 0 10px";
    //     this.props.onClickSketch(i);
    //     return i;
    // }

    render() {
        let list = JSON.parse(this.props.str);
        list = list.sketch_list;
        let scratch_num = list.length;
        let row = Math.trunc(scratch_num / 4) + 1;
        let all_items = [];
        for (let i = 0; i < row; i++){
            let inside_arr = [];
            for (let j = 0; j <= Math.min(3, scratch_num - i * 4 - 1); j++){
                let color_arr = [];
                let index = i * 4 + j;
                let scratch_data = list[index].data;
                let color_list = JSON.parse(list[index].defaultValue);
                let color_num = list[index].colors;
                for (let k = 0; k < color_num; k++){
                    let tmp = "fill=" + '"' + color_list[k][0] + '" opacity=' + color_list[k][1];
                    color_arr.push(tmp);
                }
                inside_arr.push(<div className={"scratch_item"} ><Preview raw_str={scratch_data} color_arr={"no"} extra_arr={color_arr} /></div>);
            }
            all_items.push(<div className={"one_row"}>{inside_arr}</div>);
        }

        return (
           <div className={"all_items"}>{all_items}</div>
        );
    }
}

class Preview extends React.Component<preview_props, any>{
   render() {
       let color_saved = [];
       color_saved.push("");
       let my_color = this.props.color_arr;
       let color_num;
       if (this.props.color_arr == "no") {
           color_num = this.props.extra_arr.length;
           for (let i = 0; i < color_num; i++){
               let tmp = this.props.extra_arr[i];
               color_saved.push(tmp);
           }
       }
       else{
           color_num = my_color.length;
           for (let i = 0; i < color_num; i++){
               let tmp = "rgba(" + my_color[i][0] + "," + my_color[i][1] + "," + my_color[i][2] + "," + my_color[i][3] + ")";
               tmp = "fill=" + '"' + tmp + '" opacity=' + my_color[i][3];
               color_saved.push(tmp);
           }
       }

       let s = this.props.raw_str;
       for (let i = 1; i <= color_num; i++) {
           let tmp = "%%" + i.toString() + "%%";
           s = s.replaceAll(tmp, color_saved[i]);
       }

       return (
           <div className={"preview_svg"}>
               <div dangerouslySetInnerHTML={{__html: s}}/>
           </div>

       )
   }

}

export default Preview;


