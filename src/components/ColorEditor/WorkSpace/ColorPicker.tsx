import React, { useEffect, useRef, useState } from "react";
import "./ColorEditor.css";

import ColorSlider from "./ColorSlider";
import ColorButton from "./ColorButton";
import ChooseSketch from "./Sketch";
import Preview from "./Preview";

import "rc-slider/assets/index.css";

import { Button, Input } from "antd";


interface ColorPickerProps {
    initColor: Array<number>[7];
    
}

const ColorPicker = (props: ColorPickerProps) => {
  return (
    <div className="colorPicker">
      <div className="HSVColor">
        <ColorSlider
          description="色相(H):"
          id={0}
          onChange={colorOnChange}
          value={
            colorValueList[currentChosenSketchIndex][
              currentChosenButtonIndex
            ][0]
          }
          step={1}
          min={0}
          max={360}
        />
        <ColorSlider
          description="饱和度(S):"
          id={1}
          onChange={colorOnChange}
          value={
            colorValueList[currentChosenSketchIndex][
              currentChosenButtonIndex
            ][1]
          }
          step={0.01}
          min={0}
          max={1}
        />
        <ColorSlider
          description="明度(V):"
          id={2}
          onChange={colorOnChange}
          value={
            colorValueList[currentChosenSketchIndex][
              currentChosenButtonIndex
            ][2]
          }
          step={0.01}
          min={0}
          max={1}
        />
        <ColorSlider
          description="透明度(A)"
          id={3}
          onChange={colorOnChange}
          value={
            colorValueList[currentChosenSketchIndex][
              currentChosenButtonIndex
            ][3]
          }
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
          value={
            colorValueList[currentChosenSketchIndex][
              currentChosenButtonIndex
            ][4]
          }
          step={1}
          min={0}
          max={255}
        />
        <ColorSlider
          description="绿色(G):"
          id={5}
          onChange={colorOnChange}
          value={
            colorValueList[currentChosenSketchIndex][
              currentChosenButtonIndex
            ][5]
          }
          step={1}
          min={0}
          max={255}
        />
        <ColorSlider
          description="蓝色(B):"
          id={6}
          onChange={colorOnChange}
          value={
            colorValueList[currentChosenSketchIndex][
              currentChosenButtonIndex
            ][6]
          }
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
          onChange={nameOfTheSketchOnChange}
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
          onChange={descriptionOfTheSketchOnChange}
        />
        <br />
        <br />
        <Button
          type="primary"
          htmlType="submit"
          onClick={submitButtonHandleClick}
        >
          提交
        </Button>
      </div>
    </div>
  );
};
