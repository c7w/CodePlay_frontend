import {ReactElement, useEffect, useRef, useState} from "react";
import TopBar from "./Navbar/Navbar";
import {WEB_URL} from "../Settings";
import { promptToDesigner, getUserScheme, changeUserScheme, getExploreScheme, getSketch, getSessionId } from '../utils/Network';
import {Button, Layout, Row} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import HistoryList from "./HistoryList/HistoryList";
import Creator from "./Creator/Creator";
import { message } from 'antd';
import InterActiveInExploration from "./Exploration/WorkSpace/ExploreOperation";
import Preview from "./Creator/ColorEditor/WorkSpace/Preview";


interface MainpageProps{
    readonly json:string;
}

var student_id:string;
var name:string;
var fullname:string;
var email:string;
var role:string;
var isDesigner:boolean=false;
var isLogin:boolean=false;


const LoginButton = ()=>{
    return (
        <Button onClick={()=>{window.location.href = WEB_URL+"/login";}} style={{margin:"0 auto"}} type="primary" size="large">登录</Button>
    );
};

const MainPage = (Props:MainpageProps):ReactElement=>{
    const [login,setLogin]=useState<ReactElement>(<div/>);
    const [recordList,setRecordList]=useState<ReactElement>(<div/>);
    const [explorePage,setExplorePage]=useState<ReactElement>(<div/>)a;
    const [sketchList,setSketchList]=useState<string>();//线稿 的 list json
    const userScheme = useRef<string>("");
    const exploreScheme=useRef<any>("");
    let sort:string="submission_time";
    let approved:boolean=false;
    let submitedIn30s:boolean=false;
    let currentExploreSketchId:number=0;
    let currentRecordId:number=0;

    let sortType:string="submission_time";
    let tempList:string='{\n' +
        '    "sketch_list":[\n' +
        '        {\n' +
        '            "id": 1,\n' +
        '            "name": "balloon",\n' +
        '            "colors": 6,\n' +
        '            "data": "<svg t=\\"1633693832542\\" class=\\"icon\\" viewBox=\\"0 0 1024 1024\\" version=\\"1.1\\" xmlns=\\"http://www.w3.org/2000/svg\\" p-id=\\"1470\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" width=\\"200\\" height=\\"200\\">\\r\\n    <defs>\\r\\n        <style type=\\"text/css\\"></style>\\r\\n    </defs>\\r\\n    <path d=\\"M413.5 629.7c-1.1-6.2-7.1-10.3-13.1-9.1-6.2 1.1-10.3 7-9.1 13.1l47.6 262.8c0.9 4.7 4.5 8.2 9 9.1 1.4 0.2 2.8 0.3 4.2 0 6.2-1.1 10.3-7 9.1-13.1l-47.7-262.8zM563.1 892.5c-1.1 6.2 3 12.1 9.1 13.1 1.4 0.2 2.8 0.2 4.2 0 4.5-0.9 8.1-4.4 9-9.1L633 633.8c1.1-6.2-3-12.1-9.1-13.1-6.2-1.1-12.1 3-13.1 9.1l-47.7 262.7z\\" %%1%% p-id=\\"1471\\"></path>\\r\\n    <path d=\\"M598.4 982H425.7c-23.3 0-42.3-18.9-42.3-42.3v-79.9c0-16.7 13.5-30.1 30.1-30.1h196.9c16.7 0 30.1 13.5 30.1 30.1v79.9c0.2 23.4-18.7 42.3-42.1 42.3z\\" %%2%% p-id=\\"1472\\"></path>\\r\\n    <path d=\\"M523.4 919.1v-27h40.5c6.3 0 11.3-5 11.3-11.3 0-5.1-3.3-9.4-8-10.8-1.1-0.3-2.2-0.5-3.3-0.5h-40.5v-39.7h-22.6v39.7H459v-39.7h-22.6v39.7h-52.6v22.6h52.6V982H459v-40.3h181.7v-22.6H523.4z m-22.7 0H459v-27h41.8l-0.1 27z\\" %%3%% p-id=\\"1473\\"></path>\\r\\n    <path d=\\"M797.3 417.9c-15.1 54-45.1 101.8-85.3 138.6-40.2 36.7-63.1 88.7-63.1 143 0 5.3-2.1 10.1-5.6 13.5-3.5 3.5-8.2 5.6-13.5 5.6H394.2c-5.2 0-10-2.1-13.6-5.6-3.4-3.4-5.7-8.2-5.7-13.6 0-54.4-22.8-106.2-62.8-142.8-40.3-36.9-70.4-84.7-85.5-138.8h187.6c-3.2-27.8-4.9-57.4-4.9-88.1 0-37.1 2.5-72.6 7.1-105.1H238.5C283.3 117.5 389.4 42 512.1 42h4.5c121.5 1.8 225.1 76.7 269.1 182.6h-178c4.6 32.6 7.1 68 7.1 105.1 0 30.7-1.7 60.3-4.9 88.1l187.4 0.1z\\" %%4%% p-id=\\"1474\\"></path>\\r\\n    <path d=\\"M614.7 329.8c0 30.7-1.7 60.3-4.9 88.1-6 52.5-17.3 98.4-32.1 133-16.2 38-25.1 78.7-25.1 120.1v47.7h-81.2V671c0-41.3-8.9-82.1-25.1-120.1-14.7-34.5-26-80.5-32-133-3.2-27.8-4.9-57.4-4.9-88.1 0-37.1 2.5-72.6 7.1-105.1C431.4 117.7 468.6 42 512.1 42c28.4 0 54 32.2 72.6 84.3 9.9 27.8 17.8 61.2 23 98.4 4.5 32.5 7 68 7 105.1z\\" %%1%% p-id=\\"1475\\"></path>\\r\\n    <path d=\\"M808.2 338.1c0 27.6-3.8 54.4-10.9 79.8H226.7c-7.2-25.9-11-53.2-10.9-81.4 0.2-39.6 8.3-77.4 22.7-111.8h547.1c14.6 34.9 22.6 73.2 22.6 113.4z\\" %%5%% p-id=\\"1476\\"></path>\\r\\n    <path d=\\"M614.7 329.8c0 30.7-1.7 60.3-4.9 88.1H414.3c-3.2-27.8-4.9-57.4-4.9-88.1 0-37.1 2.5-72.6 7.1-105.1h191.2c4.5 32.5 7 68 7 105.1z\\" %%6%% p-id=\\"1477\\"></path>\\r\\n</svg>",\n' +
        '            "hidden": null,\n' +
        '            "defaultValue": "[[\\"#2F9B77\\", 1],[\\"#F2B843\\", 1],[\\"#EA800C\\", 1],[\\"#3DC38A\\", 1],[\\"#F2B843\\", 1],[\\"#EA800C\\", 1]]"\n' +
        '        }\n' +
        '    ]\n' +
        '}\n';
    const sketchJson=useRef<string>(tempList);

    //点击排序函数
    function changeSort(type:string):void{
        console.log("enter");

        if(isDesigner){
            getExploreScheme(0,type,false).then(
                resp=>{
                    sortType=type;
                    userScheme.current(resp);
                    setRecordList(
                        <Layout>
                            <Content style={{margin:"50px auto"}}>
                                <HistoryList sort={changeSort} getString={JSON.stringify(userScheme.current)} show_select={isDesigner} approve={approveOpeation} delete={deleteRecord} explore={exploreOpeation} disapprove={disapproveOpeation}/>
                            </Content>
                            
                        </Layout>
                    )
                }
            )
        }else {
            getUserScheme(student_id,type).then(
                resp=>{
                    console.log("???");
                    sortType=type;
                    console.log(resp);
                    console.log(isDesigner);
                    //setUserScheme(resp);
                    userScheme.current = (resp);
                    console.debug(userScheme.current);
                    setRecordList(
                        <Layout>
                            <Content style={{margin:"50px auto"}}>
                                <HistoryList sort={changeSort} getString={JSON.stringify(userScheme.current)} show_select={isDesigner} approve={approveOpeation} delete={deleteRecord} explore={exploreOpeation} disapprove={disapproveOpeation}/>
                            </Content>
                            
                        </Layout>
                    )
                    // )
                }
            )
        }
    }

    //删除按钮点击处理
    function deleteRecord(id:number):void{
        changeUserScheme("delete",id,[],"","","",0).then(
            resp=>{
                console.log("???");
                changeSort(sortType);
            }
        )
    }

    //设计师的赞同操作
    function approveOpeation(id:number):void{
        if(role==="User") return;
        changeUserScheme("approve",id,[],"","","",0).then(
            resp=>{
                changeSort(sortType);
            }
        )
    }

    //设计师的取消赞同操作
    function disapproveOpeation(id:number):void{
        if(role==="User") return;
        changeUserScheme("disapprove",id,[],"","","",0).then(
            resp=>{
                changeSort(sortType);
            }
        )
    }

    //提交操作
    function submitRecord(sketch_id:number,name:string,discription:string,color_List:number[][]):void{
        if(submitedIn30s){
            message.info("您的提交过于频繁，请稍后！");
        }else{
            changeUserScheme("create",0,color_List,name,discription,student_id,sketch_id).then(
                resp=>{
                    message.info("提交成功")
                    changeSort(sortType);
                    submitedIn30s=true;
                    setTimeout(()=>{
                        submitedIn30s=false;
                    },30000);
                }
            )
        }
    }

    //点击历史记录色条跳转到浏览界面
    function exploreOpeation(id:number):void{
        let message:any=userScheme.current;
        if(message){
            let p=message.schemes;
            let num:number=p.length;
            for(let i=0;i<num;i++){
                if(p[i].id===id){
                    let sketch_id=p[i].sketch_id;
                    let color=p[i].colors;
                    color=eval(color);
                    console.log(color);
                    console.log(sketch_id);
                    setLogin(
                        <Layout>
                            <Header style={{backgroundColor:"lightblue"}}>
                                <TopBar name={name} stateChangeFunction={switchChange} promptToDesigner={promptToDesigner} role={role} cheaked={true}/>
                            </Header>
                            <Content style={{ padding: '0 50px' }}>
                                <></>
                            </Content>
                        </Layout>
                    )
                    break;
                }

            }
        }
    }

    //点赞
    function vote():void{
        changeUserScheme("vote",exploreScheme.current.schemes[0].id,[],'','','',0).then(
            resp=>{
                message.info("点赞成功");
            }
        )
    }

    //下一张
    function next():void{
        refreshExplore(sort,approved);
    }

    //编辑
    function edit():void{
        switchChange();
        let sketch_id=exploreScheme.current.schemes[currentRecordId].sketch_id;
        // console.log(exploreScheme.current);
        let color=exploreScheme.current.schemes[currentRecordId].colors;
        color=eval(color);
        console.log(color);
        console.log(sketch_id);
        setLogin(
            <Layout>
                <Header style={{backgroundColor:"lightblue"}}>
                    <TopBar name={name} stateChangeFunction={switchChange} promptToDesigner={promptToDesigner} role={role} cheaked={true}/>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <ColorEditor sketchStr={JSON.stringify(sketchJson.current)} onSubmit={submitRecord} isHistory={true} colorValueArr={color} sketchId={sketch_id}/>
                </Content>
            </Layout>
        )
    }

    //浏览界面查看历史记录
    function historyInExploration(id:number):void{
        return;
    }

    //刷新随机浏览界面
    function refreshExplore(sort:string,approved:boolean):void{
        getExploreScheme(0,sort,approved).then(
            resp=>{
                exploreScheme.current=resp;
                let sketch_id=exploreScheme.current.schemes[0].sketch_id;
                let tem=0;
                if(exploreScheme.current.schemes.length>1){
                    tem=Math.floor(Math.random()*(exploreScheme.current.schemes.length-1));
                    if(tem<exploreScheme.current.schemes.length){
                        sketch_id=exploreScheme.current.schemes[tem].sketch_id;
                    }
                }
                let temjson:any=sketchJson;
                let svglist=temjson.current.sketch_list;
                let svg='';
                for(let i=0;i<svglist.length;i++){
                    if(svglist[i].id==sketch_id){
                        svg=svglist[i].data;
                    }
                }
                currentExploreSketchId=sketch_id;
                currentRecordId=tem;
                setExplorePage(
                    <Layout>
                        <Header style={{backgroundColor:"lightblue"}}>
                            <TopBar name={name} stateChangeFunction={switchChange} promptToDesigner={promptToDesigner} role={role} cheaked={false}/>
                        </Header>
                        <Content style={{ padding: '0 50px' }}>
                            <Row justify={"space-around"} align={"middle"}>
                                <Preview raw_str={svg} color_arr={exploreScheme.current.schemes[tem].colors} isPreview={true} id={-1}/>
                            </Row>
                            <InterActiveInExploration vote={vote} next={next} edit={edit} />
                            <div style={{height:"800px"}}/>
                        </Content>
                        
                    </Layout>
                )
                message.info("新一张了QwQ");
            }
        )
    }

    //切换界面 TO DO
    var isCreate:boolean=true;
    function switchChange(){
        isCreate=!isCreate;
        if(isCreate){
            setLogin(
                <Layout>
                    <Header style={{backgroundColor:"lightblue"}}>
                        <TopBar name={name} stateChangeFunction={switchChange} promptToDesigner={promptToDesigner} role={role} cheaked={true}/>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <ColorEditor sketchStr={JSON.stringify(sketchJson.current)} onSubmit={submitRecord} isHistory={false} colorValueArr={[]} sketchId={0}/>
                    </Content>
                </Layout>
            )
            setRecordList(
                <Layout>
                    <Content style={{margin:"50px auto"}}>
                        <HistoryList  sort={changeSort} getString={JSON.stringify(userScheme.current)} show_select={isDesigner} approve={approveOpeation} delete={deleteRecord} explore={exploreOpeation } disapprove={disapproveOpeation}/>
                    </Content>
                    
                </Layout>
            )
            setExplorePage(<div/>)
        }else{
            //此处应该调用一次请求函数
            setLogin(<div/>);
            setRecordList(<div/>);
            // console.log(isDesigner);
            refreshExplore(sort,approved);
        }
    }


    //发送get请求
    let getInfo:string=WEB_URL+"/api/userinfo";
    let parameter1=getSessionId();
    let completeUrl=getInfo+"?sessionId="+parameter1;

    //入口逻辑
    useEffect(()=>{
        fetch(WEB_URL + "/api/userinfo" + "?sessionId=" + getSessionId(),).then(resp =>{
            console.debug(completeUrl);
            return resp.json();
        }).then(
            json=>{
                console.debug(json);
                // alert("??");
                // alert(JSON.stringify(json));
                if(json.err=="not_logged_in"){
                    //跳转到登录页面, TO DO
                    //出现登录按钮
                    setLogin(<LoginButton />);
                    return;
                }else if(json.err=="not_found"){
                    //没有该用户
                    // alert("未找到该用户");
                    setLogin(<LoginButton />);
                    return ;
                }

                student_id=json.student_id;
                name=json.name;
                fullname=json.fullname;
                email=json.email;
                role=json.role;
                isLogin=true;
                if(role=="Designer"){
                    isDesigner=true;
                }


                if(isDesigner){
                    getExploreScheme(0,"submission_time",false).then(
                        resp=>{
                            userScheme.current = (resp);
                            console.log(userScheme.current);
                            if(isLogin){
                                setRecordList(
                                    <Layout>
                                        <Content style={{margin:"50px auto"}}>
                                            <HistoryList  disapprove={disapproveOpeation} sort={changeSort} getString={JSON.stringify(userScheme.current)} show_select={isDesigner} approve={approveOpeation} delete={deleteRecord} explore={exploreOpeation}/>
                                        </Content>
                                        
                                    </Layout>
                                )
                            }
                        }
                    )
                }else {
                    getUserScheme(student_id,"submission_time").then(
                        resp=>{
                            userScheme.current = (resp);
                            console.log("userScheam");
                            console.log(userScheme.current);
                            if(isLogin){
                                setRecordList(
                                    <Layout>
                                        <Content style={{margin:"50px auto"}}>
                                            <HistoryList  disapprove={disapproveOpeation} sort={changeSort} getString={JSON.stringify(userScheme.current)} show_select={isDesigner} approve={approveOpeation} delete={deleteRecord} explore={exploreOpeation}/>
                                        </Content>
                                        
                                    </Layout>
                                )
                            }
                        }
                    )
                }


                getSketch().then(
                    resp=>{
                        sketchJson.current=resp;
                        if(isLogin){
                            setLogin(
                                <Layout>
                                    <Header style={{backgroundColor:"lightblue"}}>
                                        <TopBar name={name} stateChangeFunction={switchChange} promptToDesigner={promptToDesigner} role={role} cheaked={true}/>
                                    </Header>
                                    <Content style={{ padding: '0 50px' }}>
                                        <ColorEditor sketchStr={JSON.stringify(sketchJson.current)} onSubmit={submitRecord} isHistory={false} colorValueArr={[]} sketchId={0}/>
                                    </Content>
                                </Layout>
                            )
                        }
                    }
                )

            }
        )
    },[]);

    return (
        <div>
            <>{login}</>
            <>{recordList}</>
            <>{explorePage}</>
        </div>
    );
}

export default MainPage;