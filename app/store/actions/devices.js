import DeviceService from "./../../services/DeviceService";

const deviceService = new DeviceService();
export const DeviceActions = {
  ADD_DEVICE: "ADD_DEVICE",
};

export const DeviceActionCreators = {
  addDevice: (device) => {
    return {
      device,
      type: DeviceActions.ADD_DEVICE,
    };
  },
};

export const DeviceRequests = {
  createDevice: (callback) => {
    return (dispatch) => {
      deviceService.createDevice().then((device) => {
        dispatch(DeviceActionCreators.addDevice(device));
        callback();
      });
    };
  },
};
