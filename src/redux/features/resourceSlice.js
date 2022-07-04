import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  resourceStore: [],
};

export const resourceStoreSlice = createSlice({
  name: 'resourceStore',
  initialState,
  reducers: {
    addResource: (state, actions) => {
      state.resourceStore.push(actions.payload);
      // state.colorStore = [...current(state.colorStore), actions.payload];
    },
    updateResource: (state, actions) => {
      const newResource = [...current(state.resourceStore)];
      newResource[actions.payload.index] = actions.payload.itembox;
      state.resourceStore = newResource;
    },
    removeResource: (state, actions) => {
      state.resourceStore = state.resourceStore.filter(
        item => item.value !== actions.payload,
      );
      // const resources = [...current(state.resourceStore)];
      // const newResources = resources.splice(actions.payload, 1);
      // state.resourceStore = newResources;
    },
  },
});

export const {addResource, updateResource, removeResource} =
  resourceStoreSlice.actions;

export const resourceStore = state => state.resource.resourceStore;

export default resourceStoreSlice.reducer;
