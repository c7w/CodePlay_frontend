import { configureStore, createSlice } from '@reduxjs/toolkit';


const colorEditorSlice = createSlice({
    name: 'ColorEditor',
    initialState: {
        colorState: [
            [255,255,255,1,0,0,0], 
            [255,255,255,1,0,0,0],
            [255,255,255,1,0,0,0],
            [255,255,255,1,0,0,0],
            [255,255,255,1,0,0,0],
            [255,255,255,1,0,0,0],
            [255,255,255,1,0,0,0],
            [255,255,255,1,0,0,0],
            [255,255,255,1,0,0,0],
            [255,255,255,1,0,0,0],
        ],
        currColorIndex: 0
    },
    reducers: {
        updateColorState: (state, action) =>{
            state.colorState = action.payload;
        },
        updateCurrColorIndex: (state, action) => {
            state.currColorIndex = action.payload;
        }
    }
});

const colorPickerSlice = createSlice({
    name: 'ColorPicker',
    initialState: {
        colorState: [255,255,255,1,0,0,0],
    },
    reducers: {
        updatePickerState: (state, action) => {state.colorState = action.payload; }
    }
});

const creatorSlice = createSlice({
    name: 'Creator',
    initialState: {
        sketchId: 1,
    },
    reducers: {
        updateSketchId: (state, action) => {state.sketchId = action.payload},
    }
});

const mainPageSlice = createSlice({
    name: 'MainPage',
    initialState: {
        state:{
            userInfo: {
                loggedIn: false,
                student_id: 0,
                name: '',
                fullname: '',
                email: '',
                role: '',
            },
            schemeList: {
                "schemes": [
                    {
                        "id": 11,
                        "submission_time": 1635945034,
                        "sketch_id": 1,
                        "name": "波西米亚",
                        "description": "。",
                        "likes": 2,
                        "approved": true,
                        "author":{
                            "student_id": 2020010946,
                            "name": "xxx",
                            "fullname": "xxx",
                            "email": "xiangyan20@mails.tsinghua.edu.cn",
                            "role": "Designer"
                        },
                        "hidden": false,
                        "colors":[[181, 122, 66, 1, 29, 0.64, 0.71],
                                [185, 67, 64, 1, 1, 0.65, 0.73],
                                [60, 148, 170, 1, 192, 0.65, 0.67],
                                [128, 100, 32, 1, 43, 0.75, 0.5]],
                        "liked": false
                    }
                ]
            },
            sketchList: {
                "sketch_list":[
                    {
                        "id": 1,
                        "name": "4colorLogo1",
                        "colors": 4,
                        "data": "<svg id=\"图层_1\" data-name=\"图层 1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 521.68 133.53\" width=\"250\" height=\"200\">\r\n  <g>\r\n    <polygon points=\"87.1 35.84 114.43 76 114.43 61.92 87.1 24.34 87.1 35.84\" %%1%% ></polygon>\r\n    <polygon points=\"83.18 23.92 77.43 19 70.83 40.37 70.83 94.29 84.27 72.92 83.18 23.92\" %%2%% ></polygon>\r\n    <polygon points=\"126.81 17.92 124.68 17.92 119.18 24.92 119.68 72.92 130.93 72.92 130.06 22.05 126.81 17.92\" %%3%% ></polygon>\r\n    <circle cx=\"373.33\" cy=\"34.72\" r=\"10.44\" %%1%% ></circle>\r\n    <path d=\"M437.89,428.17c-.81-3.15-3.29-8.63-8.5-10.42V370.42H420v47.75a10.62,10.62,0,0,0-7.13,10.25c-4.62.5-9.87,2.75-9.75,8.13h43.13S447.39,429.17,437.89,428.17Z\" transform=\"translate(-52.06 -322.14)\" %%4%% ></path>\r\n    <rect x=\"42.08\" y=\"22.29\" width=\"14\" height=\"14\" %%4%% ></rect>\r\n    <rect x=\"79.35\" y=\"4.5\" width=\"9.83\" height=\"9.83\" %%3%% ></rect>\r\n    <rect x=\"97.45\" y=\"0.09\" width=\"9.83\" height=\"9.83\" %%2%% ></rect>\r\n    <rect x=\"114.27\" y=\"4.5\" width=\"9.83\" height=\"9.83\" %%1%% ></rect>\r\n    <polygon points=\"35.5 30.79 13.92 30.79 13.92 45.29 0 45.29 0.08 88.45 13.92 101.54 14.24 46.29 35.5 46.29 35.5 30.79\" %%3%% ></polygon>\r\n    <polygon points=\"25.5 115.62 53.25 115.62 53.25 102.12 14.75 102.12 25.5 115.62\" %%2%% ></polygon>\r\n    <polygon points=\"185.33 41.16 185.33 29.29 150.34 29.29 162.25 41.16 185.33 41.16\" %%3%% ></polygon>\r\n    <rect x=\"191.08\" y=\"36.29\" width=\"11.06\" height=\"11.06\" %%2%% ></rect>\r\n    <rect x=\"168.71\" y=\"107.04\" width=\"24.62\" height=\"6.25\" %%1%% ></rect>\r\n    <polygon points=\"158.08 96.29 158.05 96.29 157.33 50.79 145.21 38.54 145.21 96.29 145.21 102.12 145.21 107.04 145.21 112.16 166.21 112.16 166.21 103.04 193.96 103.04 193.96 98.66 158.08 98.66 158.08 96.29\" %%2%% ></polygon>\r\n    <polygon points=\"196.62 55.04 196.62 84.04 185.96 84.04 185.96 96.29 196.62 96.29 196.62 85.41 207.08 85.41 207.08 52.04 199.58 52.04 196.62 55.04\" %%4%% ></polygon>\r\n    <polygon points=\"218.08 104.67 229.96 116.53 229.96 67.07 217.33 54.55 218.08 104.67\" %%3%% ></polygon>\r\n    <path d=\"M285.14,384.67c6.63.12,11.38,0,11.38,0V371.79H272.25S278.77,377.79,285.14,384.67Z\" transform=\"translate(-52.06 -322.14)\" %%4%% ></path>\r\n    <rect x=\"246.83\" y=\"39.53\" width=\"13.25\" height=\"13.25\" %%3%% ></rect>\r\n    <rect x=\"262.46\" y=\"49.66\" width=\"11.12\" height=\"12.87\" %%1%% ></rect>\r\n    <rect x=\"233.71\" y=\"84.28\" width=\"26.37\" height=\"12.12\" %%1%% ></rect>\r\n    <polygon points=\"233.71 119.28 230.96 123.03 230.96 133.53 275.58 133.53 261.19 119.28 233.71 119.28\" %%2%% ></polygon>\r\n    <path d=\"M385.14,359.17H358.77v-7.81H340.14V423l9.32,9.33.4-35.75h34.53v-11.5h11V363.3H385.14Zm-1.25,25.88H350l.24-21.7h33.65Z\" transform=\"translate(-52.06 -322.14)\" %%3%% ></path>\r\n    <rect x=\"310.46\" y=\"27.04\" width=\"23.87\" height=\"4.37\" %%1%% ></rect>\r\n    <polygon points=\"398.52 91.28 412.17 91.28 412.17 67.03 398.52 53.48 398.52 91.28\" %%3%% ></polygon>\r\n    <rect x=\"412.75\" width=\"17.97\" height=\"12.94\" %%1%% ></rect>\r\n    <rect x=\"431.58\" y=\"13.8\" width=\"15.09\" height=\"23.43\" %%4%% ></rect>\r\n    <rect x=\"464.58\" y=\"45.91\" width=\"5.75\" height=\"22\" %%1%% ></rect>\r\n    <polygon points=\"467.9 42.29 474.08 42.29 474.08 65.41 478.33 65.41 478.33 42.29 478.33 41.1 478.33 33.16 467.9 33.16 467.9 42.29\" %%2%% ></polygon>\r\n    <polygon points=\"412.17 40.61 412.17 14.23 398.52 14.23 398.52 37.35 412.17 50.96 431.58 50.96 431.72 92.58 446.75 92.58 446.67 40.68 412.17 40.61\" %%2%% ></polygon>\r\n    <polygon points=\"479.4 66.29 479.77 76.22 491.02 76.22 492.21 115.29 501.02 115.29 501.02 76.29 507.27 76.29 497.25 66.29 479.4 66.29\" %%3%% ></polygon>\r\n    <polygon points=\"507.61 63.2 519.55 75.1 519.55 46.29 507.61 46.29 507.61 63.2\" %%3%% ></polygon>\r\n    <rect x=\"511.18\" y=\"32.22\" width=\"10.5\" height=\"9.25\" %%1%% ></rect>\r\n  </g>\r\n  <polygon points=\"120.83 92.49 130.37 78.85 120.14 78.85 117.41 82.76 86.89 82.76 84.16 78.85 70.83 100.22 83.48 92.49 120.83 92.49\" %%4%% ></polygon>\r\n</svg>\r\n",
                        "hidden": "False",
                        "defaultValue": "[[\"#f1ec57\", 1],[\"#6dbb51\", 1],[\"#ef7f3d\", 1],[\"#69a2d8\", 1]]"
                    }
                ]
            },
            exploreScheme: {"id":87,"submission_time":1633797634,"sketch_id":1,"name":"RuntimeErrrorrr","description":"CodeGOGOOGOGOGOGO","likes":14,"approved":true,"author":{"student_id":2020010951,"name":"cc7w","fullname":"网络出问题啦~","email":"gha@mails.tsinghua.edu.cn","role":"Designer"},"hidden":true,"colors":"[[224,0,29,0.5,90,200,100],[143,200,10,1,79,30,200]]"},
            misc: {
                sortStrategy: 'submission_time',
                approved: false,
            },
            page: 'Creator', // 'Creator' or 'Explore' 
        }
    },
    reducers: {
        updateMainPageState: (state, action) => {state.state = {...state.state, ...action.payload};}
    }
});

export const {updateColorState, updateCurrColorIndex} = colorEditorSlice.actions
export const {updatePickerState} = colorPickerSlice.actions
export const {updateSketchId} = creatorSlice.actions
export const {updateMainPageState} = mainPageSlice.actions
export const getColorState = (state: any) => {return state.colorEditor.colorState};
export const getCurrColorIndex = (state: any) => {return state.colorEditor.currColorIndex};
export const getPickerState = (state: any) => { return state.colorPicker.colorState;};
export const getCreatorSketchId = (state: any) => { return state.creator.sketchId;};
export const getMainPageState = (state: any) => {return state.mainPage.state}


export default configureStore({
  reducer: {
    colorEditor: colorEditorSlice.reducer,
    colorPicker: colorPickerSlice.reducer,
    creator: creatorSlice.reducer,
    mainPage: mainPageSlice.reducer,
  },
})