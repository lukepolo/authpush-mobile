let DeviceInfo = require("react-native-device-info");

export default class DeviceService {
  createDevice() {
    return axios
      .post("devices", {
        type: "ios",
        name: DeviceInfo.getDeviceName(),
      })
      .then((response) => {
        return response.data;
      });
  }
}
