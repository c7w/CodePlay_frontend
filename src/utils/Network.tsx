import { message } from "antd";
import { WEB_URL } from "../Settings";
import MD5 from "./MD5";


function getSessionId(): string{
    return "9NCcToWtip7blkwuI1VmgPGXFBQnD2v8"; // TODO: delete later
    let sessionId="sessionId=";
    let cookie:string[]=document.cookie.split(';');
    for(let i=0;i<cookie.length;i++){
        let c=cookie[i].trim();
        if(c.indexOf("sessionId")==0) return c.substring(sessionId.length,c.length);
    }
    return "";
}

//升级至设计师
function promptToDesigner(key: string): Promise<boolean> {
    let md5: string = MD5(key);
    let sessionId = getSessionId();
    console.log(md5);

    let parameter: string = JSON.stringify({ sessionId: sessionId, key: md5 });

    console.log(parameter);
    let urlbasic = WEB_URL;
    let url: string = urlbasic + "/api/userinfo";

    let result = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: parameter,
    }).then((data) => {
        return data.json();
    }).then((json) => {
        if (json.status === "key verification failed") {
          return false;
        } else {
          return true;
        }
      });
    return result;
}

//得到该用户提交的信息，返回一个字符串化的json
function getUserScheme(studentid:string,sort_strategy:string):Promise<string>{
    let sessionId:string=getSessionId();
    let url:string=WEB_URL+"/api/userScheme"+"?"+"sessionId="+sessionId+"&student_id="+studentid+"&sort_strategy="+sort_strategy;
    let result=fetch(url).then(
        resp=>{
            return resp.json();
        }
    ).catch(()=>{message.error("网络开小差啦~"); return {};});
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

    let url=WEB_URL+"/api/userScheme"
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
    ).catch(()=>{message.error("网络开小差啦~"); return {};})
    return result;
}

//浏览信息的获取，返回一个字符串化的json，改成GET
function getExploreScheme(sketch_id:number,sort_strategy:string,approved:boolean):Promise<any>{
    let sessionid=getSessionId();
    // let body=JSON.stringify({
    //     sessionId:sessionid,
    //     sketch_id:sketch_id,
    //     sort_strategy:sort_strategy,
    //     approved:approved
    // })

    let url=WEB_URL+"/api/exploreScheme"
    url=url+"?sessionId="+sessionid+"&sketch_id="+sketch_id+"&sort_strategy="+sort_strategy
    if(approved){
        url=url+"&approved=1"
    }
    let result=fetch(url).then(
        resp=>{
            return resp.json()
        }
    ).catch(()=>{message.error("网络开小差啦~"); return {};})
    return result
}

//线稿的列表
function getSketch():Promise<string>{
    let url=WEB_URL+"/api/sketch"
    let result=fetch(url).then(
        resp=>{
            return resp.json()
        }
    ).catch(()=>{message.error("网络开小差啦~"); return {};})
    return result
}

export { promptToDesigner, getUserScheme, changeUserScheme, getExploreScheme, getSketch, getSessionId };
