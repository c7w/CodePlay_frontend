import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConstantValue } from "typescript";
import { getColorState, getCreatorSketchId, getCurrColorIndex, getMainPageState, updateColorState, updateCurrColorIndex, updatePickerState } from "../../../store";
import ColorButton from "./WorkSpace/ColorButton";
import ColorPicker from "./WorkSpace/ColorPicker";
import Preview from "./WorkSpace/Preview";


interface ColorEditorProps {
    sketch: string;
    sketch_id: number;
    initColorValue: Array<Array<number>>; // [[R, G, B, A, H, S, V] x n]
    onSubmit: (sketch_id: number, name: string, description: string, color_List: number[][])=>void;
}


const ColorEditor = (props: ColorEditorProps) => {
    const dispatch = useDispatch();
    const [sketch, setSketch] = useState(props.sketch);
    const colorState = useSelector(getColorState);
    const currColorIndex = useSelector(getCurrColorIndex);
    const currSketchId = useSelector(getCreatorSketchId);
    const [init, setInit] = useState(0);
    const mainPageState = useSelector(getMainPageState);
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
        buttonList.push(<ColorButton key={"button-" + i} id={i} onClick={() => {
            dispatch(updateCurrColorIndex(i));
        }} color={colorState[i]} selected={currColorIndex === i}/>)
    }

    useEffect(()=>{
        dispatch(updateCurrColorIndex(0));
        setSketch(mainPageState.sketchList.sketch_list.filter((sketch: any) => {return sketch.id === currSketchId})[0].data);
        setInit(init+1);
    }, [currSketchId]);

    useEffect(()=>{
        dispatch(updatePickerState(colorState[currColorIndex]));
    }, [currColorIndex, init, currSketchId]);

    useEffect(()=>{}, [props.sketch])

    return (
        <>
        <div className="sketchPreview">
            <Preview raw_str={sketch} color_arr={colorState}/>
        </div>
        <div className="colorToChoose">{buttonList}</div>
        <div className="ColorPicker">
            <ColorPicker initColor={colorState[currColorIndex]} colorOnChange={onColorPickerColorChange} onSubmit={(name: string, description: string) => {
    props.onSubmit(props.sketch_id, name, description, colorState)
}}/>
        </div>
        </>
    );
};

export default ColorEditor;