import React, {useEffect, useRef, useState} from 'react';
import './ColorEditor.css';

import ColorSlider from "./WorkSpace/ColorSlider";
import ColorButton from "./WorkSpace/ColorButton";
import ChooseSketch from "../SketchList/SketchList";
import Preview from "./WorkSpace/Preview"

import 'rc-slider/assets/index.css';

import { Button, Input } from 'antd';
const { TextArea } = Input;

interface ColorEditorProps {
    readonly isHistory: boolean; // 是否从历史记录传过来
    readonly sketchId: number; // 如果是从历史记录传过来的就渲染此 sketch
    readonly colorValueArr: Array<Array<number>>; // 如果是从历史记录传过来的就用此 二维数组 渲染上面的线稿
    readonly sketchStr: string; // JSON 格式 包含以上两个参数
    readonly onSubmit: (id: number, name: string, description: string,
                        colors: Array<Array<number>>) => void; // 提交函数(提交所选线稿的编辑信息)
}

export default function ColorEditor(props: ColorEditorProps) {

    let sketchJson = JSON.parse(props.sketchStr); // 参数的预处理(转化为 JSON 风格)

    // 函数区
    // 监听颜色滑动条的改变
    const colorOnChange = (id: number, value: number) => {
        let colorValueListBak = colorValueList[currentChosenSketchIndex][currentChosenButtonIndex].slice();
        colorValueListBak[id] = value;
        if (id < 3){
            colorValueListBak = HSV2RGB(colorValueListBak);
        }
        else if (id > 3){
            colorValueListBak = RGB2HSV(colorValueListBak);
        }
        let tmpList = colorValueList.slice();
        // 更新目前选中按钮的颜色列表
        tmpList[currentChosenSketchIndex][currentChosenButtonIndex] = colorValueListBak;
        setColorValueList(tmpList);

        // 调试输出
        // for(let i = 0; i <= 6; i++){
        //     console.log("current button: " + currentChosenButtonIndex + "-----------------");
        //     console.log(colorValueListBak[i] + " ");
        //     console.log("----------------------------------------------------");
        // }

        // 按钮颜色改变
        let colorHexValue: string = "#" + colorValueListBak[4].toString(16) + colorValueListBak[5].toString(16) + colorValueListBak[6].toString(16);
        // console.log("----------hexValue: " + colorHexValue);
        let colorButton = document.getElementById("button"+currentChosenButtonIndex);
        // @ts-ignore
        colorButton.style.backgroundColor = colorHexValue;
        // @ts-ignore
        colorButton.style.opacity = colorValueListBak[3].toString();
        // @ts-ignore
        document.getElementById("wrapper" + currentChosenButtonIndex).style.boxShadow = "0 0 20px " + colorHexValue;
    }
    // HSV => RGB
    const HSV2RGB = (colorValueListBak: Array<number>):Array<number> => {
        // console.log("-------------------------in HSV 2 RGB----------------------------");
        let R: number = colorValueListBak[4]/255, G: number = colorValueListBak[5]/255, B: number = colorValueListBak[6]/255;
        let H: number = colorValueListBak[0], S: number = colorValueListBak[1], V: number = colorValueListBak[2];
        let h: number = Math.floor(H / 60);
        let f: number = H / 60 - h, p = V * (1 - S), q = V * (1 - f * S), t = V * (1 - (1 - f) * S);
        switch (h) {
            case 0:
                R = V; G = t; B = p;
                break;
            case 1:
                R = q; G = V; B = p;
                break;
            case 2:
                R = p; G = V; B = t;
                break;
            case 3:
                R = p; G = q; B = V;
                break;
            case 4:
                R = t; G = p; B = V;
                break;
            case 5:
                R = V; G = p; B = q;
                break;
        }
        // 从 [0, 1] 转换到 [0, 255]
        R *= 255; G *= 255; B *= 255;
        // 更新状态
        colorValueListBak[4] = parseFloat(R.toFixed(0));
        colorValueListBak[5] = parseFloat(G.toFixed(0));
        colorValueListBak[6] = parseFloat(B.toFixed(0));
        // 调试输出
        // for(let i = 0; i <= 6; i++){
        //     console.log(colorValueListBak[i] + " ");
        // }
        return colorValueListBak;
    }
    // RGB => HSV
    const RGB2HSV = (colorValueListBak: Array<number>):Array<number> => {
        // console.log("-------------------------in RGB 2 HSV----------------------------");
        let H: number = colorValueListBak[0], S: number, V: number;
        let R: number = colorValueListBak[4]/255, G: number = colorValueListBak[5]/255, B: number = colorValueListBak[6]/255;
        let colorMax = getMax(R, G, B), colorMin = getMin(R, G, B), delta = colorMax - colorMin;
        // 计算 H
        if (delta === 0){
            H = 0;
        }
        else if (colorMax === R && G >= B){
            H = 60 * ((G - B) / delta);
        }
        else if (colorMax === R && G < B){
            H = 60 * ((G - B) / delta) + 360;
        }
        else if (colorMax === G){
            H = 60 * ((B - R) / delta) + 120;
        }
        else if (colorMax === B){
            H = 60 * ((R - G) / delta) + 240;
        }
        // 计算 V
        V = colorMax;
        // 计算 S
        S = (colorMax === 0) ? 0 : (1 - colorMin / colorMax);
        // console.log("H: " + H + " S: " + S + " V: " + V + " R: " + R + " G: " + G + " B: " + B);
        // 更新状态
        colorValueListBak[0] = parseFloat(H.toFixed(0));
        colorValueListBak[1] = parseFloat(S.toFixed(2));
        colorValueListBak[2] = parseFloat(V.toFixed(2));
        // 调试输出
        // for(let i = 0; i <= 6; i++){
        //     console.log(colorValueListBak[i] + " ");
        // }
        return colorValueListBak;
    }
    // 获取三个数的最大值
    const getMax = (a: number, b: number, c: number) => {
        let max = a;
        if(max < b)
            max = b;
        if(max < c)
            max = c;
        return max;
    }
    // 获取三个数的最小值
    const getMin = (a: number, b: number, c: number) => {
        let min = a;
        if(min > b)
            min = b;
        if(min > c)
            min = c;
        return min;
    }
    // 监听获取输入的线稿名
    const nameOfTheSketchOnChange = (event: any) => {
        // console.log("------------changing sketch name----------------");
        inputNameOfTheSketch.current = event.target.value;
    }
    // 监听获取输入的线稿描述
    const descriptionOfTheSketchOnChange = (event: any) => {
        // console.log("------------changing description----------------");
        inputDescriptionOfTheSketch.current = event.target.value;
    }
    // 监听颜色按钮点击事件
    const colorButtonHandleClick = (id: number) => {
        // console.log("current button: " + id);
        setCurrentChosenButtonIndex(id);
        // 选中高亮
        for(let i = 0; i < sketchJson.sketch_list[currentChosenSketchIndex].colors; i++){
            let buttonWrapper = document.getElementById("wrapper" + i);
            // @ts-ignore
            buttonWrapper.style.boxShadow = "0 0";
        }
        let button = document.getElementById("button" + id);
        // @ts-ignore
        let colorHexString = button.style.backgroundColor;
        // @ts-ignore
        document.getElementById("wrapper" + id).style.boxShadow = "0 0 20px " + colorHexString;
    }
    // 监听提交按钮点击事件
    const submitButtonHandleClick = () => {
        // console.log("id: " + sketchJson.sketch_list[currentChosenSketchIndex].id);
        // console.log("线稿名: " + inputNameOfTheSketch.current);
        // console.log("线稿描述: " + inputDescriptionOfTheSketch.current);
        if(inputNameOfTheSketch.current === ""){
            alert("请输入线稿名")
        }
        else if(inputDescriptionOfTheSketch.current === ""){
            alert("请输入线稿描述")
        }
        else{
            // 调整颜色格式 [H, S, V, A, R, G, B] => [R, G, B, A, H, S, V]
            let tmpList = colorValueList[currentChosenSketchIndex].slice();
            let colorValueListOfSketch = [];
            for (let i = 0; i < tmpList.length; i++){ // 遍历每个色块
                let list = []; // 单个色块的七元数组
                list.push(tmpList[i][4]);
                list.push(tmpList[i][5]);
                list.push(tmpList[i][6]);
                list.push(tmpList[i][3]);
                list.push(tmpList[i][0]);
                list.push(tmpList[i][1]);
                list.push(tmpList[i][2]);
                colorValueListOfSketch.push(list);
            }
            // for (let i = 0; i < tmpList.length; i++){
            //     // console.log("色块: " + i);
            //     for(let j = 0; j < 7; j++){
            //         console.log(colorValueListOfSketch[i][j]);
            //     }
            // }
            props.onSubmit(sketchJson.sketch_list[currentChosenSketchIndex].id, inputNameOfTheSketch.current, inputDescriptionOfTheSketch.current, colorValueListOfSketch);
        }
    }
    // 监听线稿点击事件
    const sketchHandleClick = (id: number) => {
        // console.log('sketch: ' + id);
        setCurrentChosenSketchIndex(id);
    }

    // 解析区
    // 解析 Json 字符串并进行存储
    console.log("-+- ColorEditorMain -+-");
    // 初始化三维数组(default = 第 0 个线稿)
    let colorValueListInit = []; // 三维数组
    // console.debug(sketchJson);
    for(let i = 0; i < sketchJson.sketch_list.length; i++){ // 默认线稿数循环
        let colorSliderValueListInit = [];
        let colorStr = sketchJson.sketch_list[i].defaultValue; // 字符串
        let colorList2 = JSON.parse(colorStr); // 蕴含六个色块的颜色信息(二维数组) 形如[['#2F9B77', 1],...]
        for(let j = 0; j < sketchJson.sketch_list[i].colors; j++){ // 默认色块数循环 => 初始化默认值
            let colorHexString = colorList2[j][0];
            let R = parseInt(colorHexString.substring(1, 3), 16), G = parseInt(colorHexString.substring(3, 5), 16), B = parseInt(colorHexString.substring(5, 7), 16);
            let colorList = [0, 0, 0, colorList2[j][1], R, G, B]; // 存储赋值的色块七值
            colorList = RGB2HSV(colorList); // 计算 HSV 值
            colorSliderValueListInit.push(colorList);
        }
        colorValueListInit.push(colorSliderValueListInit);
        // console.debug(colorSliderValueListInit);
    }

    let colorButtonListInit = [];
// 如果是历史记录的，就更新对应 线稿 的二维数组
    if(props.isHistory){
        //
        console.log("Enter")
        // 颜色转换 [R, G, B, A, H, S, V] => [H, S, V, A, R, G, B]
        let id = 0;
        for(let i = 0; i < sketchJson.sketch_list.length; i++){
            if(props.sketchId === sketchJson.sketch_list[i].id) {
                id = i;
                console.log(i)
            }
        }
        for(let i = 0; i < colorValueListInit[id].length; i++){ // 遍历每个色块
            colorValueListInit[id][i][0] = props.colorValueArr[i][4];
            colorValueListInit[id][i][1] = props.colorValueArr[i][5];
            colorValueListInit[id][i][2] = props.colorValueArr[i][6];
            colorValueListInit[id][i][4] = props.colorValueArr[i][0];
            colorValueListInit[id][i][5] = props.colorValueArr[i][1];
            colorValueListInit[id][i][6] = props.colorValueArr[i][2];
        }
        // 初始化颜色按钮(default = 历史记录传来的)
        for(let i = 0; i < colorValueListInit[id].length; i++){
            colorButtonListInit.push(
                <ColorButton id={i} onClick={colorButtonHandleClick}/>
            )
        }
    }
    else {
        // 初始化颜色按钮(default = 第 0 个线稿的第 0 个按钮)
        for(let i = 0; i < sketchJson.sketch_list[0].colors; i++){
            colorButtonListInit.push(
                <ColorButton id={i} onClick={colorButtonHandleClick}/>
            )
        }
    }
    // 组件挂载后初始化按钮颜色(利用 sketchList 里的值)
    useEffect(() => {
        console.log("--------------------useEffect-----------------------");
        let colorStr = sketchJson.sketch_list[0].defaultValue; // 字符串
        let colorList2 = JSON.parse(colorStr);
        for(let j = 0; j < sketchJson.sketch_list[0].colors; j++){ // 色块数循环
            let colorButton = document.getElementById("button" + j);
            // @ts-ignore
            colorButton.style.backgroundColor = colorList2[j][0];
            // @ts-ignore
            colorButton.style.opacity = colorList2[j][1];
        }
    }, [])
    console.log("-ColorEditorBeforeReturn-");

    // 状态区
    // 设置颜色状态 [sketchId, buttonId, [H, S, V, A, R, G, B]]
    let [colorValueList, setColorValueList] = useState(colorValueListInit);
    // 设置颜色选择按钮
    let [colorButtonList, setColorButtonList] = useState(colorButtonListInit);
    // 设置当前选中 button 的 index
    let [currentChosenButtonIndex, setCurrentChosenButtonIndex] = useState(0);
    // 设置当前选中 sketch 的 index
    let [currentChosenSketchIndex, setCurrentChosenSketchIndex] = useState(0);
    // 设置输入框线稿名
    let inputNameOfTheSketch = useRef("");
    // 设置输入框详细描述
    let inputDescriptionOfTheSketch = useRef("");

    // 渲染区
    return (
        <div className="colorEditor">
            <div className="sketchPreview">
                <Preview id={currentChosenSketchIndex} isPreview={true} raw_str={sketchJson.sketch_list[currentChosenSketchIndex].data} color_arr={colorValueList[currentChosenSketchIndex]} />
            </div>
            <div className="colorToChoose">
                {colorButtonList}
            </div>
            <div className="colorPicker">
                <div className="HSVColor">
                    <ColorSlider description="色相(H):" id={0} onChange={colorOnChange} value={colorValueList[currentChosenSketchIndex][currentChosenButtonIndex][0]} step={1} min={0} max={360}/>
                    <ColorSlider description="饱和度(S):" id={1} onChange={colorOnChange} value={colorValueList[currentChosenSketchIndex][currentChosenButtonIndex][1]} step={0.01} min={0} max={1}/>
                    <ColorSlider description="明度(V):" id={2} onChange={colorOnChange} value={colorValueList[currentChosenSketchIndex][currentChosenButtonIndex][2]} step={0.01} min={0} max={1}/>
                    <ColorSlider description="透明度(A)" id={3} onChange={colorOnChange} value={colorValueList[currentChosenSketchIndex][currentChosenButtonIndex][3]} step={0.01} min={0} max={1}/>
                </div>
                <div className="RGBColor">
                    <ColorSlider description="红色(R):" id={4} onChange={colorOnChange} value={colorValueList[currentChosenSketchIndex][currentChosenButtonIndex][4]} step={1} min={0} max={255}/>
                    <ColorSlider description="绿色(G):" id={5} onChange={colorOnChange} value={colorValueList[currentChosenSketchIndex][currentChosenButtonIndex][5]} step={1} min={0} max={255}/>
                    <ColorSlider description="蓝色(B):" id={6} onChange={colorOnChange} value={colorValueList[currentChosenSketchIndex][currentChosenButtonIndex][6]} step={1} min={0} max={255}/>
                </div>
                <div className="inputFrame">
                    <p className="fontSize"><b>线稿的名称 :</b></p>
                    <Input placeholder="Please input the name of your sketch ~ " allowClear onChange={nameOfTheSketchOnChange} />
                    <br />
                    <br />
                    <p className="fontSize"><b>线稿的描述 :</b></p>
                    <TextArea placeholder="Please input the description of your sketch ~ " rows={4} allowClear onChange={descriptionOfTheSketchOnChange} />
                    <br />
                    <br />
                    <Button type="primary" htmlType="submit" onClick={submitButtonHandleClick}>
                        提交
                    </Button>
                </div>
            </div>
            <div className="sketchList">
                <ChooseSketch str={props.sketchStr} colorValueList={colorValueList} onClickSketch={sketchHandleClick} />
            </div>
        </div>
    )
}