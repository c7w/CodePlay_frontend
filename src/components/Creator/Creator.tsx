
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColorState, getCreatorSketchId, getCurrColorIndex, updateColorState, updatePickerState, updateSketchId } from "../../store";
import { RGB2HSV, String2ArrayRGB } from "../../utils/Color";
import ColorEditor from "./ColorEditor/ColorEditor";
import SketchList from "./SketchList/SketchList";

interface CreatorProps {
    sketch: any; //原始的“{scheme:...}”字符串
    onSubmit: (sketch_id: number, name: string, discription: string, color_List: number[][]) => void;
}


const Creator = (props: CreatorProps) => {

    const sketchId = useSelector(getCreatorSketchId);
    const colorState = useSelector(getColorState);
    const currColorIndex = useSelector(getCurrColorIndex);
    const dispatch = useDispatch();
    const [init, setInit] = useState(0);
    
    const getInitColorValue = (sketchId: number) => {
        return eval(JSON.parse(props.sketch).sketch_list.filter((sketch: any)=>{return sketch.id === sketchId})[0].defaultValue).map((list: any) => {
        // ["#aabbcc", 1] => [RGBAHSV]
        const RGB_ = String2ArrayRGB(list[0]);
        const RGBList = [0,0,0,list[1], RGB_[0], RGB_[1], RGB_[2]];
        const fullList = RGB2HSV(RGBList);
        return [
            fullList[4],
            fullList[5],
            fullList[6],
            fullList[3],
            fullList[0],
            fullList[1],
            fullList[2]
        ];
    })};

    useEffect(()=>{
        // console.debug('sketch id changed')
        setInit(init+1);
    }, [sketchId]);

    useEffect(()=>{
        dispatch(updateColorState(getInitColorValue(sketchId)));
        dispatch(updatePickerState(colorState[currColorIndex]));
    }, [props.sketch]);

    const getSketch = () => {return JSON.parse(props.sketch).sketch_list.filter((sketch: any)=>{return sketch.id === sketchId})[0].data;};

    return (
        <>
            <div className="ColorEditor">
                <ColorEditor 
                    sketch={getSketch()} 
                    sketch_id={sketchId} 
                    initColorValue={getInitColorValue(sketchId)} 
                    onSubmit={props.onSubmit} />
            </div>
            <div className="SketchList" style={{marginTop: '2rem'}}>
                <SketchList str={props.sketch} onClickSketch={(id: number) => {
                    dispatch(updateSketchId(id));
                    dispatch(updateColorState(getInitColorValue(id)));
                    // eslint-disable-next-line no-restricted-globals
                    scrollTo(0, 0);
                }}/>
            </div>
        </>
    );
};


export default Creator;