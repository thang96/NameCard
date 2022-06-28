import {UPDATE_COLOR} from '../actions/ColorAction';
const initialState = {
  color: [
    {
      name: 'White',
      value: 'rgb(255,255,255)',
    },
    {
      name: 'Black',
      value: 'rgb(0,0,0)',
    },
    {
      name: 'Red',
      value: 'rgb(255,0,0)',
    },
    {
      name: 'Lime',
      value: 'rgb(0,255,0)',
    },
    {
      name: 'Blue',
      value: 'rgb(0,0,255)',
    },
    {
      name: 'Yellow',
      value: 'rgb(255,255,0)',
    },
    {
      name: 'Aqua',
      value: 'rgb(0,255,255)',
    },
    {
      name: 'Mageta',
      value: 'rgb(255,0,255)',
    },
    {
      name: 'Silver',
      value: 'rgb(192,192,192)',
    },
    {
      name: 'Gray',
      value: 'rgb(128,128,128)',
    },
    {
      name: 'Maroon',
      value: 'rgb(128,0,0)',
    },
    {
      name: 'Olive',
      value: 'rgb(128,128,0)',
    },
    {
      name: 'Green',
      value: 'rgb(0,128,0)',
    },
    {
      name: 'Purple',
      value: 'rgb(128,0,128)',
    },
    {
      name: 'Teal',
      value: 'rgb(0,128,128)',
    },
    {
      name: 'Navy',
      value: 'rgb(0,0,128)',
    },
  ],
};

const actionForReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case UPDATE_COLOR: {
      return {
        ...state,
        color: [...state.color, action.payload],
      };
    }
    default:
      return state;
  }
};
export default actionForReducer;
