import { useDispatch, useSelector } from "react-redux";
import { getColorState, getCurrColorIndex, updateColorState, updateCurrColorIndex } from "../../store";
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
    // const [colorState, setColorState] = useState<Array<Array<number>>>(props.initColorValue);
    // const [currColorIndex, setCurrColorIndex] = useState<number>(0);


    const onColorPickerColorChange = (newColorArray: Array<number>) => {
        console.debug(newColorArray);
        const newColorState = colorState.slice();
        newColorState[currColorIndex] = newColorArray;
        console.debug(newColorState);
        dispatch(updateColorState(newColorState))
        // console.debug(colorState);
        // console.debug(newColorState);
    }

    const buttonList = [] ;
    const length = props.initColorValue.length;
    for (let i = 0; i < length; ++i) {
        buttonList.push(<ColorButton key={"button-"+i} id={i} onClick={()=>{dispatch(updateCurrColorIndex(i));} } color={colorState[i]} selected={currColorIndex === i}></ColorButton>)
    }

    return (
        <>
        <div className="Preview">
            <Preview raw_str={props.sketch} color_arr={colorState}></Preview>
        </div>
        <div className="ButtonList">{buttonList}</div>
        <div className="ColorPicker">
            <ColorPicker initColor={colorState[currColorIndex]} colorOnChange={onColorPickerColorChange} onSubmit={(name: string, description: string)=>{props.onSubmit(props.sketch_id, name, description, colorState)}}></ColorPicker>
        </div>
        </>
    );
};

export default ColorEditor;