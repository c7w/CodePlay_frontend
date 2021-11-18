import React, { useState } from 'react';
import { String2ArrayRGB } from '../../../utils/Color';
import '../../../styles/SketchList.css';
import Preview from '../ColorEditor/WorkSpace/Preview'
import { Pagination, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { getMainPageState } from '../../../store';

interface choose_props {
    readonly str: string; //原始的“{scheme:...}”字符串
    // readonly colorValueList: Array<Array<Array<number>>>; // 颜色三维数组
    readonly onClickSketch: (id: number) => void; //回调
}

interface choose_state {
    readonly pre_id: number;
}

const ChooseSketch = (props: choose_props) => {
    const [page, setPage] = useState(1);
    const sketchList = useSelector(getMainPageState).sketchList.sketch_list;

    let rawList = sketchList; // 解析列表，用于获取 svg 代码
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
        let row = Math.trunc(scratch_num / 3) + 1;
        let all_items = [];
        for (let i = 0; i < row; i++){
            let inside_arr = [];
            for (let j = 0; j <= Math.min(2, scratch_num - i * 3 - 1); j++){
                let index = i * 3 + j;
                let scratch_data = rawList[index].data;
                console.debug(index)
                if( (page-1)* 6 <= index && index < page * 6){
                    console.debug(123);
                    inside_arr.push(
                        <Tooltip placement="right" title="请点击我以进行着色哦" color="#2db7f5" arrowPointAtCenter>
                            <div style={{margin: '10px', cursor: 'pointer', backgroundColor: 'rgba(240,242,245,1)', borderRadius: '1rem', padding: '1rem'}} onClick={() => {props.onClickSketch(rawList[index].id)}}>
                                <Preview raw_str={scratch_data} color_arr={list[index]} />
                            </div>
                        </Tooltip>
                    );
                }
            }
            all_items.push(<div className={"one_row"} key={"row"+i}>{inside_arr}</div>);
        }

        return (
            <>
               <div className={"all_items"}>{all_items}</div>
                <Pagination onChange={(page, pageSize)=>{console.debug(parseInt(((sketchList.length+5) / 6).toString())); setPage( page );}} defaultPageSize={ 6  } total = {sketchList.length}></Pagination>
            </>
        );

};


export default ChooseSketch;


