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
                    {"id":87,"liked": false, "submission_time":1633797634,"sketch_id":1,"name":"RuntimeErrrorrr","description":"CodeGOGOOGOGOGOGO","likes":14,"approved":true,"author":{"student_id":2020010951,"name":"cc7w","fullname":"网络出问题啦~","email":"gha@mails.tsinghua.edu.cn","role":"Designer"},"hidden":true,"colors":"[[224,0,29,0.5,90,200,100],[143,200,10,1,79,30,200]]"},
                ]
            },
            sketchList: {
                "sketch_list":[
                    {
                        "id": 1,
                        "name": "balloon",
                        "colors": 6,
                        "data": "<svg t=\"1633693832542\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1470\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"200\" height=\"200\">\r\n    <defs>\r\n        <style type=\"text/css\"></style>\r\n    </defs>\r\n    <path d=\"M413.5 629.7c-1.1-6.2-7.1-10.3-13.1-9.1-6.2 1.1-10.3 7-9.1 13.1l47.6 262.8c0.9 4.7 4.5 8.2 9 9.1 1.4 0.2 2.8 0.3 4.2 0 6.2-1.1 10.3-7 9.1-13.1l-47.7-262.8zM563.1 892.5c-1.1 6.2 3 12.1 9.1 13.1 1.4 0.2 2.8 0.2 4.2 0 4.5-0.9 8.1-4.4 9-9.1L633 633.8c1.1-6.2-3-12.1-9.1-13.1-6.2-1.1-12.1 3-13.1 9.1l-47.7 262.7z\" %%1%% p-id=\"1471\"></path>\r\n    <path d=\"M598.4 982H425.7c-23.3 0-42.3-18.9-42.3-42.3v-79.9c0-16.7 13.5-30.1 30.1-30.1h196.9c16.7 0 30.1 13.5 30.1 30.1v79.9c0.2 23.4-18.7 42.3-42.1 42.3z\" %%2%% p-id=\"1472\"></path>\r\n    <path d=\"M523.4 919.1v-27h40.5c6.3 0 11.3-5 11.3-11.3 0-5.1-3.3-9.4-8-10.8-1.1-0.3-2.2-0.5-3.3-0.5h-40.5v-39.7h-22.6v39.7H459v-39.7h-22.6v39.7h-52.6v22.6h52.6V982H459v-40.3h181.7v-22.6H523.4z m-22.7 0H459v-27h41.8l-0.1 27z\" %%3%% p-id=\"1473\"></path>\r\n    <path d=\"M797.3 417.9c-15.1 54-45.1 101.8-85.3 138.6-40.2 36.7-63.1 88.7-63.1 143 0 5.3-2.1 10.1-5.6 13.5-3.5 3.5-8.2 5.6-13.5 5.6H394.2c-5.2 0-10-2.1-13.6-5.6-3.4-3.4-5.7-8.2-5.7-13.6 0-54.4-22.8-106.2-62.8-142.8-40.3-36.9-70.4-84.7-85.5-138.8h187.6c-3.2-27.8-4.9-57.4-4.9-88.1 0-37.1 2.5-72.6 7.1-105.1H238.5C283.3 117.5 389.4 42 512.1 42h4.5c121.5 1.8 225.1 76.7 269.1 182.6h-178c4.6 32.6 7.1 68 7.1 105.1 0 30.7-1.7 60.3-4.9 88.1l187.4 0.1z\" %%4%% p-id=\"1474\"></path>\r\n    <path d=\"M614.7 329.8c0 30.7-1.7 60.3-4.9 88.1-6 52.5-17.3 98.4-32.1 133-16.2 38-25.1 78.7-25.1 120.1v47.7h-81.2V671c0-41.3-8.9-82.1-25.1-120.1-14.7-34.5-26-80.5-32-133-3.2-27.8-4.9-57.4-4.9-88.1 0-37.1 2.5-72.6 7.1-105.1C431.4 117.7 468.6 42 512.1 42c28.4 0 54 32.2 72.6 84.3 9.9 27.8 17.8 61.2 23 98.4 4.5 32.5 7 68 7 105.1z\" %%1%% p-id=\"1475\"></path>\r\n    <path d=\"M808.2 338.1c0 27.6-3.8 54.4-10.9 79.8H226.7c-7.2-25.9-11-53.2-10.9-81.4 0.2-39.6 8.3-77.4 22.7-111.8h547.1c14.6 34.9 22.6 73.2 22.6 113.4z\" %%5%% p-id=\"1476\"></path>\r\n    <path d=\"M614.7 329.8c0 30.7-1.7 60.3-4.9 88.1H414.3c-3.2-27.8-4.9-57.4-4.9-88.1 0-37.1 2.5-72.6 7.1-105.1h191.2c4.5 32.5 7 68 7 105.1z\" %%6%% p-id=\"1477\"></path>\r\n</svg>",
                        "hidden": null,
                        "defaultValue": "[[\"#2F9B77\", 1],[\"#F2B843\", 1],[\"#EA800C\", 1],[\"#3DC38A\", 1],[\"#F2B843\", 1],[\"#EA800C\", 1]]"
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