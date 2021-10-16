import React, {ReactElement, useEffect, useRef, useState} from "react";
import TopBar from "./topbar";
import webPrefix from "./GlobalVariable";
import LoginButton from "./LoginButton";
import MD5 from "./MD5";
import {stringify} from "querystring";
import {ReactComponent} from "*.svg";
import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import BottomBar from "./BottomBar";
import HistoryList from "./App";
import {Simulate} from "react-dom/test-utils";
import ColorEditor from "./ColorEditor";
import { message, Button } from 'antd';

const info = (text:string) => {
    message.info(text);
};

function getSessionId():string{
    return "GRLZouIMe3lTi08XdqnjfQJSzc1Wb6wx";//delete later
    let sessionId="sessionId=";
    let cookie:string[]=document.cookie.split(';');
    for(let i=0;i<cookie.length;i++){
        let c=cookie[i].trim();
        if(c.indexOf("sessionId")==0) return c.substring(sessionId.length,c.length);
    }
    return "";
}

function fetchPost(url:string,body:string):string{
    fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body:body
    }).then(resp=>{
        return JSON.stringify(resp.json());
    })
    return "";
}

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

//升级至设计师
function promptToDesigner(key:string):Promise<boolean>{
    let md5:string=MD5(key);
    let sessionId=getSessionId();
    console.log(md5);

    let parameter:string=JSON.stringify({sessionId:sessionId,key:md5});

    console.log(parameter);
    let urlbasic=webPrefix();
    let url:string=urlbasic+"/api/userinfo";

    let result=fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: parameter
        }
    ).then(data=>{
        return data.json();
    }).then(json=>{
        if(json.status=="key verification failed"){
            return false;
        }else{
            return true;
        }
    })
    return result;
}

//子组件的提交按钮，已废弃
function submit(sketch_id:number,name:string,description:string,colors:number[][]):void{
    let body:string=JSON.stringify(
        {
            sessionId: getSessionId(),
            operation: "create",
            sketch_id: sketch_id,
            author_id: student_id,
            name: name,
            description: description,
            colors:colors,
        }
    )

    let url:string=webPrefix()+"/api/userScheme";
    let resp:string=fetchPost(url,body);

}

//得到该用户提交的信息，返回一个字符串化的json
function getUserScheme(studentid:string,sort_strategy:string):Promise<string>{
    let sessionId:string=getSessionId();
    let url:string=webPrefix()+"/api/userScheme"+"?"+"sessionId="+sessionId+"&student_id="+studentid+"&sort_strategy="+sort_strategy;
    let result=fetch(url).then(
        resp=>{
            return resp.json();
        }
    );
    return result;
}

//用户作出操作，返回一个字符串化的json
function changeUserScheme(operation:string,recordId:number,color:number[][],recordName:string,descrption:string,author_Id:string,sketch_id:number):Promise<string>{
    let sessionid=getSessionId();

    let body=JSON.stringify(
        {
            operation:operation,
            sessionId:sessionid,
            id:recordId,
            colors:color,
            name:recordName,
            description:descrption,
            author_id:author_Id,
            sketch_id:sketch_id
        }
    )
    console.log(body);

    let url=webPrefix()+"/api/userScheme"
    let result=fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: body
    }).then(
        resp=>{
            return resp.json()
        }
    )
    return result;
}

//浏览信息的获取，返回一个字符串化的json，改成GET
function getExploreScheme(sketch_id:number,sort_strategy:string,approved:boolean):Promise<string>{
    let sessionid=getSessionId();
    let body=JSON.stringify({
        sessionId:sessionid,
        sketch_id:sketch_id,
        sort_strategy:sort_strategy,
        approved:approved
    })

    let url=webPrefix()+"/api/exploreScheme"
    url=url+"?sessionId="+sessionid+"&sketch_id="+sketch_id+"&sort_strategy="+sort_strategy
    if(approved){
        url=url+"&approved=1"
    }
    let result=fetch(url).then(
        resp=>{
            return resp.json()
        }
    )
    return result
}

//线稿的列表
function getsketch():Promise<string>{
    let url=webPrefix()+"/api/sketch"
    let result=fetch(url).then(
        resp=>{
            return resp.json()
        }
    )
    return result
}

const Mainpage = (Props:MainpageProps):ReactElement=>{
    const [login,setLogin]=useState<ReactElement>(<div/>);
    const [recodrList,setRecordList]=useState<ReactElement>(<div/>);
    const [sketchList,setSketchList]=useState<string>();//线稿 的 list json
    const userScheme = useRef<string>("");
    let counter:number=0;

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

    //调试
    function tryFunc(type:string):void {
        console.log("enter");
        getExploreScheme(1,type,false).then(
            resp=>{
                console.log(resp);
            }
        )
    }

    //点击排序函数
    function changeSort(type:string):void{
        console.log("enter");
        // // setLogin(<div/>);
        // // return
        // let s = '{"schemes":[{"id":87,"submission_time":1633797634,"sketch_id":1,"name":"RuntimeErrrrrrrrorrrrrrr","description":"CodeGOGOOGOGOGOGO","likes":14,"approved":false,"author":{"student_id":2020010951,"name":"cc7w","fullname":"昂","email":"gha@mails.tsinghua.edu.cn","role":"Designer"},"hidden":true,"colors":[[224,0,29,0.5,90,200,100],[143,200,10,0.5,79,30,200]]}]}';
        // console.log(userScheme)
        // // setUserScheme('{"schemes":[{"id":87,"submission_time":1633797634,"sketch_id":1,"name":"RuntimeErrrrrrrrorrrrrrr","description":"CodeGOGOOGOGOGOGO","likes":14,"approved":false,"author":{"student_id":2020010951,"name":"cc7w","fullname":"昂","email":"gha@mails.tsinghua.edu.cn","role":"Designer"},"hidden":true,"colors":[[224,0,29,0.5,90,200,100],[143,200,10,0.5,79,30,200]]}]}');
        // setUserScheme(s);
        // console.log(userScheme)
        // return
        getUserScheme(student_id,type).then(
            resp=>{
                console.log("???");
                sortType=type;
                console.log(resp);
                //setUserScheme(resp);
                userScheme.current = (resp);
                console.debug(userScheme.current);
                setRecordList(
                    <Layout>
                        <Content style={{margin:"50px auto"}}>
                            <HistoryList sort={changeSort} getString={JSON.stringify(userScheme.current)} show_select={true} approve={approveOpeation} delete={deleteRecord} explore={exploreOpeation}/>
                        </Content>
                        <BottomBar/>
                    </Layout>
                )
                //setUserScheme('{"schemes":[{"id":87,"submission_time":1633797634,"sketch_id":1,"name":"RuntimeErrrrrrrrorrrrrrr","description":"CodeGOGOOGOGOGOGO","likes":14,"approved":false,"author":{"student_id":2020010951,"name":"cc7w","fullname":"昂","email":"gha@mails.tsinghua.edu.cn","role":"Designer"},"hidden":true,"colors":[[224,0,29,0.5,90,200,100],[143,200,10,0.5,79,30,200]]}]}'
            // )
            }
        )
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
        if(role=="User") return;
        changeUserScheme("approve",id,[],"","","",0).then(
            resp=>{
                changeSort(sortType);
            }
        )
    }

    //设计师的取消赞同操作
    function disapproveOpeation(id:number):void{
        if(role=="User") return;
        changeUserScheme("disapprove",id,[],"","","",0).then(
            resp=>{
                changeSort(sortType);
            }
        )
    }

    //提交操作
    function submitRecord(sketch_id:number,name:string,discription:string,color_List:number[][]):void{
        changeUserScheme("create",0,color_List,name,discription,student_id,sketch_id).then(
            resp=>{
                message.info("提交成功")
                changeSort(sortType);
            }
        )
    }

    //跳转到浏览界面
    function exploreOpeation(id:number):void{
        let message:any=userScheme.current;
        if(message){
            let p=message.schemes;
            let num:number=p.length;
            for(let i:number=0;i<num;i++){
                if(p[i].id==id){
                    let sketch_id=p[i].sketch_id;
                    let color=p[i].colors;
                    color=eval(color);
                    console.log(color[1][1]);
                    console.log(color);
                    console.log(sketch_id);
                    counter++;
                    console.log(counter);
                    setLogin(
                        <Layout>
                            <Header style={{backgroundColor:"lightblue"}}>
                                <TopBar name={name} stateChangeFunction={switchChange} promptToDesigner={promptToDesigner} role={role}/>
                            </Header>
                            <Content style={{ padding: '0 50px' }}>
                                <p>{counter}</p>
                                <ColorEditor sketchStr={JSON.stringify(sketchJson.current)} onSubmit={submitRecord} isHistory={true} colorValueArr={color} sketchId={sketch_id}/>
                            </Content>
                        </Layout>
                    )
                }
            }
        }
    }

    //切换界面 TO DO
    var isCreate:boolean=true;
    function switchChange(){
        isCreate=!isCreate;
        if(isCreate){
            let temButton=document.getElementById("loginButton");
            if(temButton!==null)
                temButton.style.visibility="visible";
        }else{
            let temButton=document.getElementById("loginButton");
            if(temButton!==null)
                temButton.style.visibility="hidden";
        }
    }


    //发送get请求
    let getInfo:string=webPrefix()+"/api/userinfo";
    let parameter1=getSessionId();
    let completeUrl=getInfo+"?sessionId="+parameter1;

    //入口逻辑
    useEffect(()=>{
        fetch(completeUrl,).then(resp =>{
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

                getUserScheme(student_id,"submission_time").then(
                    resp=>{
                        userScheme.current = (resp);
                        console.log("userScheam");
                        console.log(userScheme.current);
                        if(isLogin){
                            setRecordList(
                                <Layout>
                                    <Content style={{margin:"50px auto"}}>
                                        <HistoryList  sort={changeSort} getString={JSON.stringify(userScheme.current)} show_select={true} approve={approveOpeation} delete={deleteRecord} explore={exploreOpeation}/>

                                    </Content>
                                    <BottomBar/>
                                </Layout>
                            )
                        }
                    }
                )

                getsketch().then(
                    resp=>{
                        sketchJson.current=resp;
                        if(isLogin){
                            setLogin(
                                <Layout>
                                    <Header style={{backgroundColor:"lightblue"}}>
                                        <TopBar name={name} stateChangeFunction={switchChange} promptToDesigner={promptToDesigner} role={role}/>
                                    </Header>
                                    <Content style={{ padding: '0 50px' }}>
                                        <p>???</p>
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
            <>{recodrList}</>
        </div>
    );
}

export default Mainpage;