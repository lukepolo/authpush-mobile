let DeviceInfo = require("react-native-device-info");

export default class DeviceService {
  createDevice() {
    return axios
      .post("devices", {
        type: "ios",
        name: DeviceInfo.getDeviceName(),
        device_unique_id: DeviceInfo.getUniqueID(),
      })
      .then((response) => {
        return response.data;
      });
  }

  updateDeviceToken(device, token) {
    return axios
      .patch(`devices/${device.id}`, {
        notification_token: token,
        name: DeviceInfo.getDeviceName(),
      })
      .then((response) => {
        let device = response.data;
        device.registered = true;
        return device;
      });
  }
}
