import { Layout, message, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WEB_URL } from "../../Settings";
import { getMainPageState, updateColorState, updateCurrColorIndex, updateMainPageState, updatePickerState, updateSketchId } from "../../store";
import { changeUserScheme, getExploreScheme, getSessionId, getSketch, getUserScheme, promptToDesigner } from "../../utils/Network";
import Preview from "../Creator/ColorEditor/WorkSpace/Preview";
import Creator from "../Creator/Creator";
import InterActiveInExploration from "../Exploration/WorkSpace/ExploreOperation";
import HistoryList from "../HistoryList/HistoryList";
import Navbar from "../Navbar/Navbar";


var submittedIn30s = false;

const MainPage = () => {

    message.config({
        maxCount: 3,
    });

    const mainPageState = useSelector(getMainPageState);
    const dispatch = useDispatch();
    const [updatePage, setUpdatePage] = useState(0);

    // Operations

    // Click sorting
    const changeSort = (type: string) : void => {
        if(mainPageState.userInfo.role === 'Designer') {
            getExploreScheme(0,type,false).then(
                resp=>{
                    const newMisc = JSON.parse(JSON.stringify(mainPageState.misc));
                    newMisc.sortStrategy = type;
                    dispatch(updateMainPageState({misc: newMisc, schemeList: resp}));
                }
            )
        } else if (mainPageState.userInfo.role === 'User') {
            getUserScheme(mainPageState.userInfo.student_id, type).then(
                resp=>{
                    const newMisc = JSON.parse(JSON.stringify(mainPageState.misc));
                    newMisc.sortStrategy = type;
                    dispatch(updateMainPageState({misc: newMisc, schemeList: resp}));
                }
            )
        }
    };


    // Deletion
    const deleteRecord = (id: number) => {
        changeUserScheme("delete",id,[],"","","",0).then(
            resp=>{changeSort(mainPageState.misc.sortStrategy);}
        )
    };

    // Approve
    const approveOperation = (id:number): void => {
        if( mainPageState.userInfo.role === "User" ) return;
        changeUserScheme("approve",id,[],"","","",0).then(
            resp=>{changeSort(mainPageState.misc.sortStrategy);}
        )
    }

    // Disapprove
    const disapproveOperation = (id:number): void => {
        if( mainPageState.userInfo.role === "User" ) return;
        changeUserScheme("disapprove",id,[],"","","",0).then(
            resp=>{changeSort(mainPageState.misc.sortStrategy);}
        )
    }

    // Submission
    const submitRecord = (sketch_id:number,name:string,description:string,color_List:number[][]):void => {
        if(description === '' || name === '') { message.info("请输入线稿信息"); return;}
        console.debug(mainPageState.misc.submittedIn30s);
        if(submittedIn30s){
            message.info("您的提交过于频繁，请稍后！");
        }else{
            changeUserScheme("create",0,color_List,name,description,mainPageState.userInfo.student_id,sketch_id).then(
                resp=>{
                    message.info("提交成功");
                    changeSort(mainPageState.misc.sortStrategy);
                    submittedIn30s = true;
                    setTimeout(()=>{
                        submittedIn30s = false;
                    },30000);
                }
            )
        }
    }

    //点击历史记录色条跳转到浏览界面
    const exploreOperation = (id:number):void => {
        const schemeList = mainPageState.schemeList.schemes;
        const filtered = schemeList.filter((scheme: any) => {return scheme.id===id});
        if (filtered.length === 0) return;

        // 更改 exploreScheme 的信息 然后跳转过去
        dispatch(updateMainPageState({exploreScheme: filtered[0]}));
        switchPage(false);
    }

    const vote = (): void => {
        changeUserScheme("vote",mainPageState.exploreScheme.id,[],'','','',0).then(
            resp=>{message.info("点赞成功");}
        )
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
    }

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
                console.debug(newScheme);

                dispatch(updateMainPageState({exploreScheme: newScheme}));

            }
        )
    }

    const getExploreRawSvg = (): string => {
        const sketch_id = mainPageState.exploreScheme.sketch_id;
        const filtered = mainPageState.sketchList.sketch_list.filter((sketch: any) => {return sketch.id === sketch_id});
        if (filtered.length === 0) return '';
        return filtered[0].data;
    };

    //切换界面
    const switchPage = (refresh: boolean) => {
        if(refresh) {refreshExplore();}
        dispatch(updateMainPageState({page: mainPageState.page === 'Creator' ? 'Explore' : 'Creator'}));
    }

    // The first time the page is rendered...
    useEffect(()=>{
        fetch(WEB_URL + "/api/userinfo?sessionId=" + getSessionId(),).then(resp =>resp.json()).then(
            json=>{
                
                if(json.err){ 
                    // TODO: 返回登录界面    
                    return; 
                }
                const userInfo = {
                    loggedIn: true,
                    student_id: json.student_id,
                    name: json.name,
                    fullname: json.fullname,
                    email: json.email,
                    role: json.role,
                };
                dispatch(updateMainPageState({userInfo}));
                
                
                // Get user schemes
                if( json.role === 'Designer' ) {
                    getExploreScheme(0,"submission_time",false).then(
                        resp=>{
                            dispatch(updateMainPageState({schemeList: resp}));
                        })
                }
                else if (json.role === 'User') {
                    getUserScheme(mainPageState.userInfo.student_id,"submission_time").then(
                        resp=>{
                            dispatch(updateMainPageState({schemeList: resp}));
                        }
                    )
                }

                // Get sketch list
                getSketch().then(resp=>{
                    dispatch(updateMainPageState({sketchList: resp})); 
                })
            }
        )
    }, []);

    useEffect(()=>{
        setUpdatePage(updatePage+1);
    }, [mainPageState])

    return (
        <main>
            <Navbar 
              name={mainPageState.userInfo.name} 
              role={mainPageState.userInfo.role}
              stateChangeFunction={switchPage}
              promptToDesigner={promptToDesigner}
              />
            <Layout>
                <Content style={{ margin: "50px auto" }}>
                    <div className="Creator" style={{display: mainPageState.page === 'Creator' ? '' : 'none'}}>
                        <Creator
                            sketch={JSON.stringify(mainPageState.sketchList)}
                            onSubmit={submitRecord} 
                        />
                        <HistoryList
                            disapprove={disapproveOperation}
                            sort={changeSort}
                            getString={JSON.stringify(mainPageState.schemeList)}
                            show_select={mainPageState.userInfo.role === 'Designer'}
                            approve={approveOperation}
                            delete={deleteRecord}
                            explore={exploreOperation} 
                        />
                    </div>

                    <div className="Explore" style={{display: mainPageState.page === 'Explore' ? '' : 'none'}}>
                        <Row justify={"space-around"} align={"middle"}>
                            <Preview raw_str={getExploreRawSvg()} color_arr={mainPageState.exploreScheme.colors}/>
                        </Row>
                        <InterActiveInExploration vote={vote} next={next} edit={edit} />
                    </div>
                </Content>
            </Layout>
        </main>
    );
};

export default MainPage;