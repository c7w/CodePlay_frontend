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


function getSessionId():string{
    return "YT6g8Gby0vuVzKUkJXHcor4aO23FCZqN";//delete later
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
            // console.log(resp.text())
            // console.log(resp.json());
            // // console.log(resp.body);
            //  let s=JSON.stringify(resp.body)
            // console.log(s);
            return resp.json();
        }
    );
    return result;
}

//用户作出操作，返回一个字符串化的json
function changeUserScheme(operation:string,recordId:number,color:string[][],recordName:string,descrption:string,author_Id:string,sketch_id:number):Promise<string>{
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
    const [sketchList,setSketchList]=useState<string>();//线稿 的 list json
    //const [userScheme,setUserScheme]=useState<string>("");
    const userScheme = useRef<string>("");
    let sortType:string;

    //初始化线稿列表
    useEffect(()=>{
        getsketch().then(
            resp=>{
                setSketchList(resp);
            }
        )
    },[]);

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
                setLogin(
                    <Layout>
                        <Header style={{backgroundColor:"lightblue"}}>
                            <TopBar name={name} stateChangeFunction={switchChange} promptToDesigner={promptToDesigner} role={role}/>
                        </Header>
                        <Content style={{ padding: '0 50px' }}>
                            <p>
                                ????
                            </p>
                            <HistoryList sort={changeSort} getString={userScheme.current} show_select={true} approve={approveOpeation} delete={deleteRecord} explore={exploreOpeation}/>
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

    //线稿更新提交 TO DO
    function submitRecord():void{

    }

    //跳转到浏览界面 TO DO
    function exploreOpeation(id:number):void{
        alert("跳转");
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
    // parameter1 = 'mPla2DLfXRisCSZrUMp5uVTQY1czdxkh';
    parameter1="YT6g8Gby0vuVzKUkJXHcor4aO23FCZqN";
    let completeUrl=getInfo+"?sessionId="+parameter1;

    let s = '{"schemes":[{"id":87,"submission_time":1633797634,"sketch_id":1,"name":"RuntimeErrrrrrrrorrrrrrr","description":"CodeGOGOOGOGOGOGO","likes":14,"approved":false,"author":{"student_id":2020010951,"name":"cc7w","fullname":"昂","email":"gha@mails.tsinghua.edu.cn","role":"Designer"},"hidden":true,"colors":[[224,0,29,0.5,90,200,100],[143,200,10,0.5,79,30,200]]}]}'
    useEffect(()=>{
        //setUserScheme(s);//TODO
    },[]);


    useEffect(()=>{
        fetch(completeUrl,).then(resp =>{
            console.debug(completeUrl);
            // alert(resp);
            return resp.json();
            // return {
            //     err:"2333",
            //     student_id:"1233",
            //     name:"2333",
            //     fullname:"2333",
            //     email:"233",
            //     role:"2333"
            // }
        }).then(
            json=>{
                console.debug(json);
                // alert("??");
                // alert(JSON.stringify(json));
                if(json.err=="not_logged_in"){
                    //跳转到登录页面, TO DO
                    //出现登录按钮
                    setLogin(<LoginButton />);
                }else if(json.err=="not_found"){
                    //没有该用户
                    // alert("未找到该用户");
                    setLogin(<LoginButton />);
                }

                student_id=json.student_id;
                name=json.name;
                fullname=json.fullname;
                email=json.email;
                role=json.role;



                if(false){
                    //返回设计师界面
                    setLogin(
                        <div>
                            <TopBar name={name} stateChangeFunction={switchChange} promptToDesigner={promptToDesigner} role={role}/>
                        </div>
                    )
                }else{
                    //返回用户界面
                    setLogin(
                        <Layout>
                            <Header style={{backgroundColor:"lightblue"}}>
                                <TopBar name={name} stateChangeFunction={switchChange} promptToDesigner={promptToDesigner} role={role}/>
                            </Header>
                            <Content style={{ padding: '0 50px' }}>
                                <p>
                                    ????
                                </p>
                                <HistoryList sort={changeSort} getString={userScheme.current} show_select={true} approve={approveOpeation} delete={deleteRecord} explore={exploreOpeation}/>
                            </Content>
                            <BottomBar/>
                        </Layout>
                    )
                }
            }
        )
    },[]);

    return <>{login}</>;
}

export default Mainpage;