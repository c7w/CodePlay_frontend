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
        sketchId: 0,
    },
    reducers: {
        updateSketchId: (state, action) => {state.sketchId = action.payload},
    }
});

export const {updateColorState, updateCurrColorIndex} = colorEditorSlice.actions
export const {updatePickerState} = colorPickerSlice.actions
export const {updateSketchId} = creatorSlice.actions
export const getColorState = (state: any) => {return state.colorEditor.colorState};
export const getCurrColorIndex = (state: any) => {return state.colorEditor.currColorIndex};
export const getPickerState = (state: any) => { return state.colorPicker.colorState;};
export const getCreatorSketchId = (state: any) => { return state.creator.sketchId;};

export default configureStore({
  reducer: {
    colorEditor: colorEditorSlice.reducer,
    colorPicker: colorPickerSlice.reducer,
    creator: creatorSlice.reducer,
  },
})