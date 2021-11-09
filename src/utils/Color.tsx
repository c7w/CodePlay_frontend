// HSV => RGB
const HSV2RGB = (colorValueListBak: Array<number>):Array<number> => {
    // console.log("-------------------------in HSV 2 RGB----------------------------");
    let R: number = colorValueListBak[4]/255, G: number = colorValueListBak[5]/255, B: number = colorValueListBak[6]/255;
    let H: number = colorValueListBak[0], S: number = colorValueListBak[1], V: number = colorValueListBak[2];
    let h: number = Math.floor(H / 60);
    let f: number = H / 60 - h, p = V * (1 - S), q = V * (1 - f * S), t = V * (1 - (1 - f) * S);
    switch (h) {
        case 0:
            R = V; G = t; B = p;
            break;
        case 1:
            R = q; G = V; B = p;
            break;
        case 2:
            R = p; G = V; B = t;
            break;
        case 3:
            R = p; G = q; B = V;
            break;
        case 4:
            R = t; G = p; B = V;
            break;
        case 5:
            R = V; G = p; B = q;
            break;
    }
    // 从 [0, 1] 转换到 [0, 255]
    R *= 255; G *= 255; B *= 255;
    // 更新状态
    colorValueListBak[4] = parseFloat(R.toFixed(0));
    colorValueListBak[5] = parseFloat(G.toFixed(0));
    colorValueListBak[6] = parseFloat(B.toFixed(0));
    // 调试输出
    // for(let i = 0; i <= 6; i++){
    //     console.log(colorValueListBak[i] + " ");
    // }
    return colorValueListBak;
}
// RGB => HSV
const RGB2HSV = (colorValueListBak: Array<number>):Array<number> => {
    // console.log("-------------------------in RGB 2 HSV----------------------------");
    let H: number = colorValueListBak[0], S: number, V: number;
    let R: number = colorValueListBak[4]/255, G: number = colorValueListBak[5]/255, B: number = colorValueListBak[6]/255;
    let colorMax = getMax(R, G, B), colorMin = getMin(R, G, B), delta = colorMax - colorMin;
    // 计算 H
    if (delta === 0){
        H = 0;
    }
    else if (colorMax === R && G >= B){
        H = 60 * ((G - B) / delta);
    }
    else if (colorMax === R && G < B){
        H = 60 * ((G - B) / delta) + 360;
    }
    else if (colorMax === G){
        H = 60 * ((B - R) / delta) + 120;
    }
    else if (colorMax === B){
        H = 60 * ((R - G) / delta) + 240;
    }
    // 计算 V
    V = colorMax;
    // 计算 S
    S = (colorMax === 0) ? 0 : (1 - colorMin / colorMax);
    // console.log("H: " + H + " S: " + S + " V: " + V + " R: " + R + " G: " + G + " B: " + B);
    // 更新状态
    colorValueListBak[0] = parseFloat(H.toFixed(0));
    colorValueListBak[1] = parseFloat(S.toFixed(2));
    colorValueListBak[2] = parseFloat(V.toFixed(2));
    // 调试输出
    // for(let i = 0; i <= 6; i++){
    //     console.log(colorValueListBak[i] + " ");
    // }
    return colorValueListBak;
}
// 获取三个数的最大值
const getMax = (a: number, b: number, c: number) => {
    let max = a;
    if(max < b)
        max = b;
    if(max < c)
        max = c;
    return max;
}
// 获取三个数的最小值
const getMin = (a: number, b: number, c: number) => {
    let min = a;
    if(min > b)
        min = b;
    if(min > c)
        min = c;
    return min;
}

const String2ArrayRGB = (colorHexString: string):Array<number> => {
    let R = parseInt(colorHexString.substring(1, 3), 16), G = parseInt(colorHexString.substring(3, 5), 16), B = parseInt(colorHexString.substring(5, 7), 16);
    return [R, G, B];
}

export {RGB2HSV, HSV2RGB, String2ArrayRGB};