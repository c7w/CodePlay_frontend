
import { Button, Layout, message, Row } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";
import Modal from "antd/lib/modal/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WEB_URL } from "../../Settings";
import { getMainPageState, updateColorState, updateCurrColorIndex, updateMainPageState, updatePickerState, updateSketchId } from "../../store";
import { changeUserScheme, getExploreScheme, getSessionId, getSketch, getUserScheme, promptToDesigner } from "../../utils/Network";
import Preview from "../Creator/ColorEditor/WorkSpace/Preview";
import Creator from "../Creator/Creator";
import Explorer from "../Explorer/Explorer";
import HistoryList from "../HistoryList/HistoryList";
import Navbar from "../Navbar/Navbar";
import "../../styles/MainPage.css"
import { ApprovedList, MostLikedList } from "../Sidebar/Sidebar";
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;


var submittedIn30s = false;

const MainPage = () => {

    message.config({
        maxCount: 2,
    });

    const mainPageState = useSelector(getMainPageState);
    const dispatch = useDispatch();
    const [updatePage, setUpdatePage] = useState(0);

    // Operations

    // Click sorting
    const changeSort = (type: string, approvedOnly=false) : void => {
        // if(mainPageState.userInfo.role === 'Designer') {
        const currApprovedOnly = mainPageState.misc.approved;
        if (approvedOnly) {
            // Switch
            getExploreScheme(0,mainPageState.misc.sortStrategy,!currApprovedOnly).then(
                resp=>{
                    const newMisc = JSON.parse(JSON.stringify(mainPageState.misc));
                    newMisc.approved = !currApprovedOnly;
                    dispatch(updateMainPageState({misc: newMisc, schemeList: resp}));
                }
            );
        } else {
            getExploreScheme(0,type,currApprovedOnly).then(
                resp=>{
                    const newMisc = JSON.parse(JSON.stringify(mainPageState.misc));
                    newMisc.sortStrategy = type;
                    dispatch(updateMainPageState({misc: newMisc, schemeList: resp}));
                }
            )
        }

        // } else if (mainPageState.userInfo.role === 'User') {
        //     getUserScheme(mainPageState.userInfo.student_id, type).then(
        //         resp=>{
        //             const newMisc = JSON.parse(JSON.stringify(mainPageState.misc));
        //             newMisc.sortStrategy = type;
        //             dispatch(updateMainPageState({misc: newMisc, schemeList: resp}));
        //         }
        //     )
        // }
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
        if(name === '') { message.error("???????????????????????????!"); return;}
        if(submittedIn30s){
            message.info("???????????????????????????????????????");
        }else{
            changeUserScheme("create",0,color_List,name,description,mainPageState.userInfo.student_id,sketch_id).then(
                (resp: any)=>{
                    if(resp.err === 'similar') {
                        message.error("?????????????????????????????????????????????!")
                    } else if (resp.err === 'name duplicated') {
                        message.error("???????????????????????????!")
                    } else {
                        message.info("????????????");
                        changeSort(mainPageState.misc.sortStrategy);
                        submittedIn30s = true;
                        setTimeout(()=>{
                            submittedIn30s = false;
                        },30000);
                    }

                }
            )
        }
    }

    //?????????????????????????????????????????????
    const exploreOperation = (id:number):void => {
        const schemeList = mainPageState.schemeList.schemes;
        const filtered = schemeList.filter((scheme: any) => {return scheme.id===id});
        if (filtered.length === 0) return;

        // ?????? exploreScheme ????????? ??????????????????
        dispatch(updateMainPageState({exploreScheme: filtered[0]}));
        switchPage(false);
    }

    

    //????????????????????????
    const refreshExplore = () : void => {
        getExploreScheme(0, 'submission_time', false).then(
            resp=>{
                // TODO: ???????????????
                // TODO: ??????????????? scheme ????????????????????? exploreScheme ??????
                const schemeList = resp.schemes;
                // Generate a random number between [0, schemeList.length)
                const randomIndex = Math.floor(Math.random() * schemeList.length);
                const newScheme = schemeList[randomIndex];

                dispatch(updateMainPageState({exploreScheme: newScheme}));

            }
        )
    }



    //????????????
    const switchPage = (refresh: boolean) => {
        if(refresh) {refreshExplore();}
        dispatch(updateMainPageState({page: mainPageState.page === 'Creator' ? 'Explore' : 'Creator'}));
    }

    // The first time the page is rendered...
    useEffect(()=>{
        console.debug("CodePlay Developed & Maintained by c7w & his fellow. https://www.github.com/c7w/");
        fetch(WEB_URL + "/api/userinfo?sessionId=" + getSessionId(),).then(resp =>resp.json()).then(
            json=>{
                
                if(json.err){ 
                    // TODO: ??????????????????    
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
                // if( json.role === 'Designer' ) {
                getExploreScheme(0,"submission_time",false).then(
                    resp=>{
                        dispatch(updateMainPageState({schemeList: resp, exploreScheme: resp.schemes.length > 0 ? resp.schemes[0] : undefined}));
                });
                // }
                // else if (json.role === 'User') {
                //     getUserScheme(mainPageState.userInfo.student_id,"submission_time").then(
                //         resp=>{
                //             dispatch(updateMainPageState({schemeList: resp}));
                //         }
                //     )
                // }

                // Get sketch list
                getSketch().then(resp=>{
                    dispatch(updateMainPageState({sketchList: resp})); 
                })
            }
        ).catch(()=>{message.error("??????????????????~"); return {};})
    }, []);

    useEffect(()=>{
        setUpdatePage(updatePage+1);
    }, [mainPageState])

    return (
        <main>
            <div className="scheme">
                <div className="selected">
                    <span><b>????????????</b></span>
                    <ApprovedList explore={exploreOperation}/>
                 </div>
            </div>

            <div className="scheme2">
                <div className="popularity">
                    <span><b>????????????</b></span>
                    <MostLikedList explore={exploreOperation}/>
                </div>
            </div>

            <Navbar
              name={mainPageState.userInfo.name}
              role={mainPageState.userInfo.role}
              stateChangeFunction={switchPage}
              promptToDesigner={promptToDesigner}
              />
            <Layout>
                <Content style={{ margin: "50px auto" }}>
                    <div className="Creator">
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

                    <div className="Explore">
                        <Modal
                            title={mainPageState.exploreScheme.name}
                            centered
                            visible={mainPageState.page === 'Explore'}
                            onCancel={() => {
                                switchPage(false);
                            }}
                            footer={null}
                        >
                            <Explorer></Explorer>
                        </Modal>
                    </div>

                    {/* <div className="Explore" style={{display: mainPageState.page === 'Explore' ? '' : 'none'}}>
                        <Row justify={"space-around"} align={"middle"}>
                            <Preview raw_str={getExploreRawSvg()} color_arr={mainPageState.exploreScheme.colors}/>
                        </Row>
                        <InterActiveInExploration vote={vote} unvote={unvote} liked={mainPageState.exploreScheme.liked} next={next} edit={edit} />
                    </div> */}
                </Content>
            </Layout>
            <Footer style={{textAlign: 'center' }}>
                <Text><span style={{fontWeight: 'bold'}}>CodePlay9</span> Developed & Maintained By <Link href="https://www.github.com/c7w/" target="_blank">c7w</Link> & his fellow.</Text> <br/>
                <Text><span style={{fontWeight: 'bold'}}>?? SAST 2021</span> | ???ICP???abcdefgh???-j</Text>
            </Footer>
        </main>
    );
};


export default MainPage;