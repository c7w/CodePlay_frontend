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

export const {updateColorState, updateCurrColorIndex} = colorEditorSlice.actions
export const getColorState = (state: any) => {return state.colorEditor.colorState};
export const getCurrColorIndex = (state: any) => state.colorEditor.currColorIndex;
export const getPickerState = (state: any) => state.colorPicker.updatePickerState;

export default configureStore({
  reducer: {
    colorEditor: colorEditorSlice.reducer,
    colorPicker: colorPickerSlice.reducer,
  },
})