import { DeviceActions } from "../actions/devices";

const INITIAL_STATE = {
  device: null,
};

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DeviceActions.ADD_DEVICE:
      return {
        ...state,
        device: action.device,
      };
    case DeviceActions.UPDATE_DEVICE:
      return {
        ...state,
        device: action.device,
      };
    default:
      return state;
  }
}

export default { deviceStore: reducer };
