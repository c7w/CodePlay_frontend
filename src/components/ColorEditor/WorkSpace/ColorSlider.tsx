import {Col, InputNumber, Row, Tooltip} from "antd";
import Slider from "rc-slider";
import React from "react";

interface ColorSliderProps {
    readonly description: string; // 文字描述
    readonly onChange: (id: number, value: number) => void ; // 回调函数
    readonly step: number; // 滑动间距
    readonly id: number; // 第几个滑动条
    readonly min: number; // 滑动条最小值
    readonly max: number; // 滑动条最大值
    readonly value: number; // 设置滑动条值
}

export default function ColorSlider(props: ColorSliderProps) {
    // 监听滑块滑动并设置当前状态
    const onChange = (value: number) => {
        if(!value){
            value = 0;
        }
        props.onChange(props.id, value);
    }

    let colorGradient: string = "";
    let propsString: string = "";
    let opacity: number = 0;
    switch (props.id){
        case 0:
            colorGradient = "linear-gradient(to right, #f00 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, #f00 100%)";
            propsString = "请输入 0-360 的整数";
            break;
        case 1:
            colorGradient = "linear-gradient(to right, white, transparent)";
            propsString = "请输入 0-1 的小数";
            break;
        case 2:
            colorGradient = "linear-gradient(to right, black, transparent)";
            propsString = "请输入 0-1 的小数";
            break;
        case 3:
            opacity = 1;
            propsString = "请输入 0-1 的小数";
            break;
        case 4:
            colorGradient = "linear-gradient(to right, transparent, red)";
            propsString = "请输入 0-255 的整数";
            break;
        case 5:
            colorGradient = "linear-gradient(to right, transparent, green)";
            propsString = "请输入 0-255 的整数";
            break;
        case 6:
            colorGradient = "linear-gradient(to right, transparent, blue)";
            propsString = "请输入 0-255 的整数";
            break;
    }
    return (
        <div className="colorBlock">
            <div className="colorDescription">
                <p><b>{props.description}</b></p>
            </div>
            <div className="colorSlider">
                <Row>
                    <Col span={12}>
                        <Tooltip placement="topLeft" title="请拖动我以进行编辑哦" color="#2db7f5" arrowPointAtCenter>
                            <Slider
                                min={props.min}
                                max={props.max}
                                onChange={onChange}
                                step={props.step}
                                trackStyle={{
                                    opacity: opacity
                                }}
                                railStyle={{
                                    backgroundImage: colorGradient
                                }}
                                value={props.value}
                            />
                        </Tooltip>

                    </Col>
                    <Col span={4}>
                        <Tooltip placement="topLeft" title={propsString} color="#2db7f5" arrowPointAtCenter>
                            <InputNumber
                                min={props.min}
                                max={props.max}
                                style={{ margin: '0 16px' }}
                                value={props.value}
                                onChange={onChange}
                            />
                        </Tooltip>
                    </Col>
                </Row>
            </div>
        </div>
    )
}