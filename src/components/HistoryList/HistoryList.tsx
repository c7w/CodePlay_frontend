import React from 'react';
import '../../styles/HistoryList.css';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle, faTimesCircle, faTrash} from "@fortawesome/free-solid-svg-icons";

interface history_props {
    readonly sort: (type:string)=>void;
    readonly getString: string;
    readonly show_select: boolean;
    readonly approve: (type:number)=>void;
    readonly delete: (type:number)=>void;
    readonly explore: (type:number)=>void;
    readonly disapprove: (type:number)=>void;
}

interface history_state {

}

interface piece_props {
    readonly ifhide: boolean;
    readonly ifapprove: boolean;
    readonly id: number;
    readonly pic_class: number;
    readonly select: boolean;
    readonly color_num: number;
    readonly color_str: any;
    readonly author: string;
    readonly pic_name: string;

    readonly approve: (type:number)=>void;
    readonly delete: (type:number)=>void;
    readonly explore: (type:number)=>void;
    readonly disapprove: (type:number)=>void;
}

interface piece_state {
    readonly ifapproved: boolean;
}

class Piece extends React.Component<piece_props, piece_state> {

    constructor(props: piece_props) {
        super(props);
        this.state={ifapproved:props.ifapprove};
    }

    handler (ifapprove: boolean, id: number) {
        if (ifapprove){
            this.props.disapprove(id);
            this.setState({ifapproved:false});
        }
        else {
            this.props.approve(id);
            this.setState({ifapproved:true});
        }
    }

    render () {
        let color_bind = [];
        for (let i = 0; i < this.props.color_num; i++) {
            let tmp_str = "rgba(" + this.props.color_str[i][0] + "," + this.props.color_str[i][1] + "," + this.props.color_str[i][2] + "," + this.props.color_str[i][3] + ")";
            color_bind.push(<div className="color" style={{backgroundColor: tmp_str, opacity: this.props.color_str[i][3]}}/>);
        }
        if (this.props.select) {
            if(this.props.ifapprove) {
                if (this.props.ifhide) {
                    return (
                        <div className={"piece"}>
                            <div className={"pic_class"}>{this.props.pic_class}</div>
                            <div className={"delete"} onClick={()=>{this.props.delete(this.props.id)}}>
                                <FontAwesomeIcon icon={faTrash} style={{color:"red"}}/>
                            </div>
                            <div className={"select"} onClick={()=>{this.handler(this.state.ifapproved, this.props.id)}}>
                                <FontAwesomeIcon icon={faCheckCircle} style={{color:"green"}}/>
                            </div>
                            <div className="color_bind" onClick={()=>{this.props.explore(this.props.id)}}>
                                {color_bind}
                            </div>
                            <div className="author">{this.props.author}</div>
                            <div className="pic_name">{this.props.pic_name}</div>
                        </div>
                    )
                }
                else {
                    return (
                        <div className={"piece"}>
                            <div className={"pic_class"}>{this.props.pic_class}</div>
                            <div className={"delete"} onClick={()=>{this.props.delete(this.props.id)}}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </div>
                            <div className={"select"} onClick={()=>{this.handler(this.state.ifapproved, this.props.id)}}>
                                <FontAwesomeIcon icon={faCheckCircle} style={{color:"green"}}/>
                            </div>
                            <div className="color_bind" onClick={()=>{this.props.explore(this.props.id)}}>
                                {color_bind}
                            </div>
                            <div className="author">{this.props.author}</div>
                            <div className="pic_name">{this.props.pic_name}</div>
                        </div>
                    )
                }
            }
            else {
                if (this.props.ifhide) {
                    return (
                        <div className={"piece"}>
                            <div className={"pic_class"}>{this.props.pic_class}</div>
                            <div className={"delete"} onClick={()=>{this.props.delete(this.props.id)}}>
                                <FontAwesomeIcon icon={faTrash} style={{color:"red"}}/>
                            </div>
                            <div className={"select"} onClick={()=>{this.handler(this.state.ifapproved, this.props.id)}}>
                                <FontAwesomeIcon icon={faTimesCircle} style={{color:"red"}}/>
                            </div>
                            <div className="color_bind" onClick={()=>{this.props.explore(this.props.id)}}>
                                {color_bind}
                            </div>
                            <div className="author">{this.props.author}</div>
                            <div className="pic_name">{this.props.pic_name}</div>
                        </div>
                    )
                }
                else {
                    return (
                        <div className={"piece"}>
                            <div className={"pic_class"}>{this.props.pic_class}</div>
                            <div className={"delete"} onClick={()=>{this.props.delete(this.props.id)}}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </div>
                            <div className={"select"} onClick={()=>{this.handler(this.state.ifapproved, this.props.id)}}>
                                <FontAwesomeIcon icon={faTimesCircle} style={{color:"red"}}/>
                            </div>
                            <div className="color_bind" onClick={()=>{this.props.explore(this.props.id)}}>
                                {color_bind}
                            </div>
                            <div className="author">{this.props.author}</div>
                            <div className="pic_name">{this.props.pic_name}</div>
                        </div>
                    )
                }
            }
        }
        else {
            if (this.props.ifhide) {
                return (
                    <div className={"piece"}>
                        <div className={"pic_class"}>{this.props.pic_class}</div>
                        <div className={"delete"} onClick={()=>{this.props.delete(this.props.id)}}>
                            <FontAwesomeIcon icon={faTrash} style={{color:"red"}}/>
                        </div>
                        <div className={"select"} onClick={()=>{this.props.approve(this.props.id)}}></div>
                        <div className="color_bind" onClick={()=>{this.props.explore(this.props.id)}}>
                            {color_bind}
                        </div>
                        <div className="author">{this.props.author}</div>
                        <div className="pic_name">{this.props.pic_name}</div>
                    </div>
                )
            }
            else {
                return (
                    <div className={"piece"}>
                        <div className={"pic_class"}>{this.props.pic_class}</div>
                        <div className={"delete"} onClick={()=>{this.props.delete(this.props.id)}}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </div>
                        <div className={"select"} onClick={()=>{this.props.approve(this.props.id)}}></div>
                        <div className="color_bind" onClick={()=>{this.props.explore(this.props.id)}}>
                            {color_bind}
                        </div>
                        <div className="author">{this.props.author}</div>
                        <div className="pic_name">{this.props.pic_name}</div>
                    </div>
                )
            }
        }
    }
}

class HistoryList extends React.Component<history_props, history_state> {

    render() {
        let arr_left = [];
        let arr_right = [];
        let s = this.props.getString;
        // let s = '{"schemes":[' +
        //     '{"id":87,"submission_time":1633797634,"sketch_id":1,"name":"RuntimeErrrorrr","description":"CodeGOGOOGOGOGOGO","likes":14,"approved":true,"author":{"student_id":2020010951,"name":"cc7w","fullname":"昂","email":"gha@mails.tsinghua.edu.cn","role":"Designer"},"hidden":false,"colors":"[[224,0,29,0.5,90,200,100],[143,200,10,1,79,30,200]]"}' +
        //     ',{"id":87,"submission_time":1633797634,"sketch_id":1,"name":"RuntimeErrrorrr","description":"CodeGOGOOGOGOGOGO","likes":14,"approved":false,"author":{"student_id":2020010951,"name":"cc7w","fullname":"昂","email":"gha@mails.tsinghua.edu.cn","role":"Designer"},"hidden":true,"colors":"[[224,0,29,0.5,90,200,100],[143,200,10,1,79,30,200]]"}' +
        //     ',{"id":87,"submission_time":1633797634,"sketch_id":1,"name":"RuntimeErrrorrr","description":"CodeGOGOOGOGOGOGO","likes":14,"approved":false,"author":{"student_id":2020010951,"name":"cc7w","fullname":"昂","email":"gha@mails.tsinghua.edu.cn","role":"Designer"},"hidden":false,"colors":"[[224,0,29,0.5,90,200,100],[143,200,10,1,79,30,200]]"}' +
        //     ',{"id":87,"submission_time":1633797634,"sketch_id":1,"name":"RuntimeErrrorrr","description":"CodeGOGOOGOGOGOGO","likes":14,"approved":false,"author":{"student_id":2020010951,"name":"cc7w","fullname":"昂","email":"gha@mails.tsinghua.edu.cn","role":"Designer"},"hidden":true,"colors":"[[224,0,29,0.5,90,200,100],[143,200,10,1,79,30,200]]"}' +
        //     ',{"id":87,"submission_time":1633797634,"sketch_id":1,"name":"RuntimeErrrorrr","description":"CodeGOGOOGOGOGOGO","likes":14,"approved":true,"author":{"student_id":2020010951,"name":"cc7w","fullname":"昂","email":"gha@mails.tsinghua.edu.cn","role":"Designer"},"hidden":true,"colors":"[[224,0,29,0.5,90,200,100],[143,200,10,1,79,30,200]]"}]}'
        if (s !== "") {
            let parjson = JSON.parse(s);
            let num = parjson.schemes.length;
            let left_num = num - Math.trunc(num / 2);

            for(let i = 0; i < left_num; i++){
                let p = parjson.schemes[i];
                let id = p.id;
                let pic_class = p.sketch_id;
                let select = this.props.show_select;
                let mycolor = eval(p.colors);
                let color_num = mycolor.length;
                let author = p.author.fullname;
                let pic_name = p.name;
                let color_str = [];
                let ifapprove = p.approved;
                let ifhide = p.hidden;
                for(let j = 0; j < color_num; j++){
                    let r = mycolor[j][0]; //取rgb值的第一个,位置待定
                    let g = mycolor[j][1];
                    let b = mycolor[j][2];
                    let a = mycolor[j][3];
                    let tmp = [r, g, b, a];
                    color_str.push(tmp);
                }
                arr_left.push(<Piece ifhide={ifhide} ifapprove={ifapprove} id={id} select={select} author={author} pic_name={pic_name} pic_class={pic_class} color_num={color_num}
                                     color_str={color_str} explore={this.props.explore} delete={this.props.delete} approve={this.props.approve} disapprove={this.props.disapprove}/>)
            }

            for(let i = left_num; i < num; i++){
                let p = parjson.schemes[i];
                let id = p.id;
                let pic_class = p.sketch_id;
                let select = this.props.show_select;
                let mycolor = eval(p.colors);
                let color_num = mycolor.length;
                let author = p.author.fullname;
                let pic_name = p.name;
                let color_str = [];
                let ifapprove = p.approved;
                let ifhide = p.hidden;
                for(let j = 0; j < color_num; j++){
                    let r = mycolor[j][0]; //取rgb值的第一个,位置待定
                    let g = mycolor[j][1];
                    let b = mycolor[j][2];
                    let a = mycolor[j][3];
                    let tmp = [r, g, b, a];
                    color_str.push(tmp);
                }
                arr_right.push(<Piece ifhide={ifhide} ifapprove={ifapprove} id={id} select={select} author={author} pic_name={pic_name} pic_class={pic_class} color_num={color_num}
                                     color_str={color_str} explore={this.props.explore} delete={this.props.delete} approve={this.props.approve} disapprove={this.props.disapprove}/>)
            }
        }


        return(
            <div className={"history_list"}>
                <div className={"order_buttons"}>
                    <Button shape={"round"} className={"order_button"} onClick={() => this.props.sort("vote")}>点赞降序</Button>
                    <Button shape={"round"} className={"order_button"} onClick={() => this.props.sort("hue")}>色相顺序</Button>
                    <Button shape={"round"} className={"order_button"} onClick={() => this.props.sort("designer_name")}>作者顺序</Button>
                </div>
                <div className={"two_lists"}>
                    <div className={"left_list"}>
                        <div className={"piece"}>
                            <div className={"pic_class"}>图号</div>
                            <div className={"delete"}></div>
                            <div className={"select"}></div>
                            <div className="color_bind">取色样式</div>
                            <div className="author">作者姓名</div>
                            <div className="pic_name">图片名称</div>
                        </div>
                        <div>
                            {arr_left}
                        </div>
                    </div>
                    <div className={"left_list"}>
                        <div className={"piece"}>
                            <div className={"pic_class"}>图号</div>
                            <div className={"delete"}></div>
                            <div className={"select"}></div>
                            <div className="color_bind">取色样式</div>
                            <div className="author">作者姓名</div>
                            <div className="pic_name">图片名称</div>
                        </div>
                        <div>
                            {arr_right}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoryList;
