import React, {useEffect, useRef, useState} from "react";
import "../../../../styles/ColorEditor.css";

import ColorSlider from "./ColorSlider";
import {HSV2RGB, RGB2HSV} from "../../../../utils/Color";

import "rc-slider/assets/index.css";

import {Button, Input, Mentions} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {getPickerState, updatePickerState} from "../../../../store";


interface ColorPickerProps {
    initColor: Array<number>;
    onSubmit: (name:string,description:string)=>void;
    colorOnChange: (newColorArray: Array<number>)=>void;
};

const ColorPicker = (props: ColorPickerProps) => {

    const colorPickerState = useSelector(getPickerState);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const colorOnChange = (id: number, value: number) => {
        const colorArrayBefore = [
          colorPickerState[4],
          colorPickerState[5],
          colorPickerState[6],
          colorPickerState[3],
          colorPickerState[0],
          colorPickerState[1],
          colorPickerState[2],
        ];
        colorArrayBefore[id] = value;
        let colorArrayAfter = colorArrayBefore;
        if (id < 3){
            colorArrayAfter = HSV2RGB(colorArrayBefore);
        }
        else if (id > 3){
            colorArrayAfter = RGB2HSV(colorArrayBefore);
        }
        const newColorArray = [
          colorArrayAfter[4],
          colorArrayAfter[5],
          colorArrayAfter[6],
          colorArrayAfter[3],
          colorArrayAfter[0],
          colorArrayAfter[1],
          colorArrayAfter[2],
        ];

        dispatch(updatePickerState(newColorArray));
        props.colorOnChange(newColorArray);


    };

    useEffect(()=>{
        dispatch(updatePickerState(props.initColor));
    }, [])


  return (
    <div className="colorPicker">
      <div className="colorArea">
          <div className="up">
              <div className="LeftColor">
                  <ColorSlider
                      description="饱和度(S):"
                      id={1}
                      onChange={colorOnChange}
                      value={colorPickerState[5]}
                      step={0.01}
                      min={0}
                      max={1}
                  />
                  <ColorSlider
                      description="明度(V):"
                      id={2}
                      onChange={colorOnChange}
                      value={colorPickerState[6]}
                      step={0.01}
                      min={0}
                      max={1}
                  />
                  <ColorSlider
                      description="不透明度(A)"
                      id={3}
                      onChange={colorOnChange}
                      value={colorPickerState[3]}
                      step={0.01}
                      min={0}
                      max={1}
                  />
              </div>
              <div className="RightColor">
                  <ColorSlider
                      description="红色(R):"
                      id={4}
                      onChange={colorOnChange}
                      value={colorPickerState[0]}
                      step={1}
                      min={0}
                      max={255}
                  />
                  <ColorSlider
                      description="绿色(G):"
                      id={5}
                      onChange={colorOnChange}
                      value={colorPickerState[1]}
                      step={1}
                      min={0}
                      max={255}
                  />
                  <ColorSlider
                      description="蓝色(B):"
                      id={6}
                      onChange={colorOnChange}
                      value={colorPickerState[2]}
                      step={1}
                      min={0}
                      max={255}
                  />
              </div>
          </div>
          <div className="down">
              <div className="bottomColor">
                  <ColorSlider
                      description="色相(H):"
                      id={0}
                      onChange={colorOnChange}
                      value={colorPickerState[4]}
                      step={1}
                      min={0}
                      max={360}
                  />
                  <div className="colorHex">
                      <b>16 进制 R G B：</b>
                  </div>
                  <div className="input">
                      <Mentions style={{width: '60%'}} value={"#" + colorPickerState[0].toString(16) + colorPickerState[1].toString(16) + colorPickerState[2].toString(16)} readOnly/>
                  </div>
              </div>
          </div>
      </div>
      <div className="inputFrame">
        <p className="fontSize">
          <b>配色方案名称 :</b>
        </p>
        <Input
          placeholder="Please input the name of your scheme ~ "
          allowClear
          value={name}
          onChange={(event: any)=>{setName(event.target.value)}}
        />
        <br />
        <br />
        <p className="fontSize">
          <b>配色方案描述 :</b>
        </p>
        <TextArea
          placeholder="Please input the description of your scheme ~ "
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
