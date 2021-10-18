import React, { useState } from "react";
import "../../../styles/ColorEditor.css";

import ColorSlider from "./ColorSlider";
import { HSV2RGB, RGB2HSV } from "../../../utils/Color";

import "rc-slider/assets/index.css";

import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";


interface ColorPickerProps {
    initColor: Array<number>;
    onSubmit: (name:string,description:string)=>void;
    colorOnChange: (newColorArray: Array<number>)=>void;
};

const ColorPicker = (props: ColorPickerProps) => {

    // Initialize States
    const [A, setA] = useState(props.initColor[3]);
    const [R, setR] = useState(props.initColor[0]);
    const [G, setG] = useState(props.initColor[1]);
    const [B, setB] = useState(props.initColor[2]);
    const initList = RGB2HSV([0,0,0,A,R,G,B]);
    const [H, setH] = useState(initList[0]);
    const [S, setS] = useState(initList[1]);
    const [V, setV] = useState(initList[2]);
    
    const setList = [setH, setS, setV, setA, setR, setG, setB];

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const colorOnChange = (id: number, value: number) => {
        const colorArrayBefore = [H,S,V,A,R,G,B];
        colorArrayBefore[id] = value;
        let colorArrayAfter = colorArrayBefore;
        if (id < 3){
            colorArrayAfter = HSV2RGB(colorArrayBefore);
        }
        else if (id > 3){
            colorArrayAfter = RGB2HSV(colorArrayBefore);
        }
        // Update elements
        for(let i = 0; i < 7; ++i) {
            setList[i](colorArrayAfter[i]);
        }
        props.colorOnChange([R,G,B,A,H,S,V]);
    };


  return (
    <div className="colorPicker">
      <div className="HSVColor">
        <ColorSlider
          description="色相(H):"
          id={0}
          onChange={colorOnChange}
          value={H}
          step={1}
          min={0}
          max={360}
        />
        <ColorSlider
          description="饱和度(S):"
          id={1}
          onChange={colorOnChange}
          value={S}
          step={0.01}
          min={0}
          max={1}
        />
        <ColorSlider
          description="明度(V):"
          id={2}
          onChange={colorOnChange}
          value={V}
          step={0.01}
          min={0}
          max={1}
        />
        <ColorSlider
          description="透明度(A)"
          id={3}
          onChange={colorOnChange}
          value={A}
          step={0.01}
          min={0}
          max={1}
        />
      </div>
      <div className="RGBColor">
        <ColorSlider
          description="红色(R):"
          id={4}
          onChange={colorOnChange}
          value={R}
          step={1}
          min={0}
          max={255}
        />
        <ColorSlider
          description="绿色(G):"
          id={5}
          onChange={colorOnChange}
          value={G}
          step={1}
          min={0}
          max={255}
        />
        <ColorSlider
          description="蓝色(B):"
          id={6}
          onChange={colorOnChange}
          value={B}
          step={1}
          min={0}
          max={255}
        />
      </div>
      <div className="inputFrame">
        <p className="fontSize">
          <b>线稿的名称 :</b>
        </p>
        <Input
          placeholder="Please input the name of your sketch ~ "
          allowClear
          value={name}
          onChange={(event: any)=>{setName(event.target.value)}}
        />
        <br />
        <br />
        <p className="fontSize">
          <b>线稿的描述 :</b>
        </p>
        <TextArea
          placeholder="Please input the description of your sketch ~ "
          rows={4}
          allowClear
          value={description}
          onChange={(event: any)=>{setDescription(event.target.value)}}
        />
        <br />
        <br />
        <Button
          type="primary"
          htmlType="submit"
          onClick={()=>{props.onSubmit(name, description);}}
        >
          提交
        </Button>
      </div>
    </div>
  );
};

export default ColorPicker;
