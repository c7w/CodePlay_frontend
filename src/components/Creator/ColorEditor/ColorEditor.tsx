import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColorState, getCreatorSketchId, getCurrColorIndex, updateColorState, updateCurrColorIndex, updatePickerState } from "../../../store";
import ColorButton from "./WorkSpace/ColorButton";
import ColorPicker from "./WorkSpace/ColorPicker";
import Preview from "./WorkSpace/Preview";


interface ColorEditorProps {
    sketch: string;
    sketch_id: number;
    initColorValue: Array<Array<number>>; // [[R, G, B, A, H, S, V] x n]
    onSubmit: (sketch_id:number,name:string,discription:string,color_List:number[][])=>void;
}


const ColorEditor = (props: ColorEditorProps) => {
    const dispatch = useDispatch();
    const colorState = useSelector(getColorState);
    const currColorIndex = useSelector(getCurrColorIndex);
    const currSketchId = useSelector(getCreatorSketchId);
    const [init, setInit] = useState(0);
    // const [colorState, setColorState] = useState<Array<Array<number>>>(props.initColorValue);
    // const [currColorIndex, setCurrColorIndex] = useState<number>(0);


    const onColorPickerColorChange = (newColorArray: Array<number>) => {
        const newColorState = colorState.slice();
        newColorState[currColorIndex] = newColorArray;
        dispatch(updateColorState(newColorState))
        // console.debug(colorState);
        // console.debug(newColorState);
    }

    const buttonList = [] ;
    const length = props.initColorValue.length;
    for (let i = 0; i < length; ++i) {
        buttonList.push(<ColorButton key={"button-"+i} id={i} onClick={()=>{dispatch(updateCurrColorIndex(i));} } color={colorState[i]} selected={currColorIndex === i}></ColorButton>)
    }

    useEffect(()=>{
        dispatch(updateColorState(props.initColorValue));
        dispatch(updateCurrColorIndex(0));
        setInit(init+1);
    }, [currSketchId]);

    useEffect(()=>{
        dispatch(updatePickerState(colorState[currColorIndex]));
        
    }, [currColorIndex, init, currSketchId]);

    return (
        <>
        <div className="sketchPreview">
            <Preview raw_str={props.sketch} color_arr={colorState}></Preview>
        </div>
        <div className="colorToChoose">{buttonList}</div>
        <div className="ColorPicker">
            <ColorPicker initColor={colorState[currColorIndex]} colorOnChange={onColorPickerColorChange} onSubmit={(name: string, description: string)=>{props.onSubmit(props.sketch_id, name, description, colorState)}}></ColorPicker>
        </div>
        </>
    );
};

export default ColorEditor;