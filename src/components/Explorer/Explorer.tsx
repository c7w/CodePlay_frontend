import { Input, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { getMainPageState, updateColorState, updateCurrColorIndex, updateMainPageState, updatePickerState, updateSketchId } from "../../store";
import Preview from "../Creator/ColorEditor/WorkSpace/Preview";
import '../../styles/Explorer.css'
import {HeartOutlined, CheckCircleOutlined, DownloadOutlined, EditOutlined, DoubleRightOutlined} from '@ant-design/icons'
import { changeUserScheme, getExploreScheme } from "../../utils/Network";



const Explorer = ()=>{

    const mainPageState = useSelector(getMainPageState);
    const dispatch = useDispatch();

    const getExploreRawSvg = (): string => {
        const sketch_id = mainPageState.exploreScheme.sketch_id;
        const filtered = mainPageState.sketchList.sketch_list.filter((sketch: any) => {return sketch.id === sketch_id});
        if (filtered.length === 0) return '';
        return filtered[0].data;
    };


    //刷新随机浏览界面
    const refreshExplore = () : void => {
        getExploreScheme(0, 'submission_time', false).then(
            resp=>{
                // TODO: 校验正确性
                // TODO: 使用获得的 scheme 更新全局变量的 exploreScheme 的值
                const schemeList = resp.schemes;
                // Generate a random number between [0, schemeList.length)
                const randomIndex = Math.floor(Math.random() * schemeList.length);
                const newScheme = schemeList[randomIndex];

                dispatch(updateMainPageState({exploreScheme: newScheme}));

            }
        )
    }

    //切换界面
    const switchPage = (refresh: boolean) => {
        if(refresh) {refreshExplore();}
        dispatch(updateMainPageState({page: mainPageState.page === 'Creator' ? 'Explore' : 'Creator'}));
    };

    const vote = (): void => {
        changeUserScheme("vote",mainPageState.exploreScheme.id,[],'','',mainPageState.userInfo.student_id,0).then(
            (resp: any)=>{
                if (resp.err) {
                    message.error("点赞失败...");
                } else {
                    message.success("点赞成功~");
                }
            }
        )
    }

    const unvote = (): void => {
        changeUserScheme("unvote",mainPageState.exploreScheme.id,[],'','',mainPageState.userInfo.student_id,0).then(
            (resp: any)=>{
                if (resp.err) {
                    message.error("取消点赞失败...");
                } else {
                    message.success("取消点赞成功~");
                }
            }
        )
    }

    const approve = () => {
        if (mainPageState.userInfo.role === 'Designer') {
            if(mainPageState.exploreScheme.approved) {
                changeUserScheme("disapprove",mainPageState.exploreScheme.id,[],"","","",0).then(()=>{message.success("取消遴选成功~")});
                const newExploreScheme = JSON.parse(JSON.stringify(mainPageState.exploreScheme));
                newExploreScheme.approved = false;
                dispatch(updateMainPageState({exploreScheme: newExploreScheme}));
            } else {
                changeUserScheme("approve",mainPageState.exploreScheme.id,[],"","","",0).then(()=>{message.success("遴选成功~")});
                const newExploreScheme = JSON.parse(JSON.stringify(mainPageState.exploreScheme));
                newExploreScheme.approved = true;
                dispatch(updateMainPageState({exploreScheme: newExploreScheme}));
            }
            
        }
    };

    function like():void{
        if(mainPageState.exploreScheme.liked){
            const newExploreScheme = JSON.parse(JSON.stringify(mainPageState.exploreScheme));
            newExploreScheme.liked = false;
            newExploreScheme.likes -= 1;
            dispatch(updateMainPageState({exploreScheme: newExploreScheme}));
            unvote();
        } else {
            const newExploreScheme = JSON.parse(JSON.stringify(mainPageState.exploreScheme));
            newExploreScheme.liked = true;
            newExploreScheme.likes += 1;
            dispatch(updateMainPageState({exploreScheme: newExploreScheme}));
            vote();
        }

    }

    //下一张
    const next = (): void => {refreshExplore();}

    //编辑
    const edit = ():void => {
        switchPage(false);
        const exploreScheme = mainPageState.exploreScheme;

        const sketch_id = exploreScheme.sketch_id;
        const color = eval(exploreScheme.colors);
        console.debug(color);

        // set states
        dispatch(updateCurrColorIndex(0));
        dispatch(updatePickerState(color[0]));
        dispatch(updateSketchId(sketch_id));
        dispatch(updateColorState(color));

        // eslint-disable-next-line no-restricted-globals
        scrollTo(0,0);
    }

    const download = ()=>{
        // TODO
        function fakeClick(obj: any) {
            let ev = document.createEvent("MouseEvents");
            ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            obj.dispatchEvent(ev);
        }

        function exportRaw(name: any, data: any) {
            let urlObject = window.URL || window.webkitURL || window;
            let export_blob = new Blob([data]);
            let save_link : any = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
            save_link.href = urlObject.createObjectURL(export_blob);
            save_link.download = name;
            fakeClick(save_link);
        }

        let my_color =  mainPageState.exploreScheme.colors; // [RGBAHSV]
        let color_num;
        let color_saved = []

        color_num = my_color.length;
        for (let i = 0; i < color_num; i++){
            let tmp = "rgba(" + my_color[i][0] + "," + my_color[i][1] + "," + my_color[i][2] + "," + my_color[i][3] + ")";
            tmp = "fill=" + '"' + tmp + '" opacity="' + my_color[i][3] + '"';
            color_saved.push(tmp);
        }

        let svg = getExploreRawSvg();
        for (let i = 1; i <= color_num; i++) {
            let tmp = "%%" + i.toString() + "%%";
            svg = svg.replaceAll(tmp, color_saved[i-1]);
        }

        exportRaw(mainPageState.exploreScheme.name + '.svg', svg)
    };

    return (<div className={"Explorer"} >
        <div className="ExplorerViewer">
            <Preview raw_str={getExploreRawSvg()} color_arr={mainPageState.exploreScheme.colors}/>
        </div>
        <div className="ExplorerIntro">
            <Input
                disabled
                value={mainPageState.exploreScheme.name}
                addonBefore="配色方案名称"
                style={{textAlign: 'center', color: 'black'}}
            />
                
            <TextArea
                autoSize={{ minRows: 3 }}
                disabled
                value={mainPageState.exploreScheme.description}
            />
        </div>
        <div className="ExplorerOperations" style={{userSelect: 'none'}}>
            <div className="ExplorerSelect">
                <CheckCircleOutlined 
                    style={{
                        fontSize: '1.5rem',
                        color: mainPageState.exploreScheme.approved ? 'green' : 'grey'
                        
                    }} 
                    onClick={()=>{approve()}}
                />
            </div>
            <div className="ExplorerLike" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
                <HeartOutlined  
                    style={{
                        fontSize: '1.5rem',
                        color: mainPageState.exploreScheme.liked ? 'red' : undefined
                        
                    }} 
                    onClick={()=>{like()}}
                />
                <span style={{marginLeft: '0.5rem', fontSize: '0.9rem'}}>{mainPageState.exploreScheme.likes}</span>
            </div>
            <div className="ExplorerDownload">
                <DownloadOutlined  
                    style={{
                        fontSize: '1.5rem',
                        color: 'black'
                        
                    }} 
                    onClick={()=>{download()}}
                />
            </div>
            <div className="ExplorerEdit">
                <EditOutlined  
                    style={{
                        fontSize: '1.5rem',
                        color: 'black'
                        
                    }} 
                    onClick={()=>{edit()}}
                />
            </div>
            <div className="ExplorerNext">
                <DoubleRightOutlined 
                    style={{
                        fontSize: '1.5rem',
                        color: 'black'
                        
                    }} 
                    onClick={()=>{next()}}
                />
            </div>

        </div>
    </div>);
};

export default Explorer;