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
}
