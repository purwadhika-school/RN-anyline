// import React, { Component } from "react";
// import {
//   AppRegistry,
//   PermissionsAndroid,
//   StyleSheet,
//   Text,
//   View,
//   Platform
// } from "react-native";

// import AnylineOCR from "anyline-ocr-react-native-module";

// import Result from "./Result";

// import config from "./config";

// class Anyline extends Component {
//   state = {
//     hasScanned: false,
//     result: "",
//     imagePath: "",
//     fullImagePath: "",
//     barcode: "",
//     scanMode: "",
//     meterType: "",
//     cutoutBase64: "",
//     fullImageBase64: ""
//   };

//   openOCR = () => {
//     AnylineOCR.setup(
//       JSON.stringify(config),
//       "scan",
//       this.onResult,
//       this.onError
//     );
//   };

//   requestCameraPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log("Camera permission allowed");
//         this.openOCR();
//       } else {
//         console.log("Camera permission denied");
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   hasCameraPermission = async () => {
//     try {
//       const result = await PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.CAMERA
//       );
//       return result;
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   checkCameraPermissionAndOpen = () => {
//     this.hasCameraPermission().then(hasCameraPermission => {
//       console.log("hasCameraPermission result is " + hasCameraPermission);
//       if (hasCameraPermission) {
//         console.log("Opening OCR directly");
//         this.openOCR();
//       } else {
//         this.requestCameraPermission();
//       }
//     });
//   };

//   onResult = dataString => {
//     const data = JSON.parse(dataString);

//     this.setState({
//       hasScanned: true,
//       result: data.reading,
//       imagePath: data.imagePath,
//       fullImagePath: data.fullImagePath,
//       scanMode: data.scanMode,
//       meterType: data.meterType,
//       cutoutBase64: data.cutoutBase64,
//       fullImageBase64: data.fullImageBase64
//     });
//   };

//   onError = error => {
//     console.error(error);
//     alert(error);
//   };

//   render() {
//     const {
//       hasScanned,
//       result,
//       imagePath,
//       fullImagePath,
//       barcode,
//       scanMode,
//       meterType,
//       cutoutBase64,
//       fullImageBase64
//     } = this.state;

//     const platformText =
//       Platform.OS === "android" ? (
//         <Text onPress={this.checkCameraPermissionAndOpen}>
//           Open OCR reader!
//         </Text>
//       ) : (
//         <Text onPress={this.openOCR}>Open OCR reader!</Text>
//       );

//     return (
//       <View style={styles.container}>
//         {hasScanned ? (
//           <Result
//             result={result}
//             imagePath={imagePath}
//             fullImagePath={fullImagePath}
//             barcode={barcode}
//             scanMode={scanMode}
//             meterType={meterType}
//             cutoutBase64={cutoutBase64}
//             fullImageBase64={fullImageBase64}
//           />
//         ) : (
//           platformText
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   }
// });

// AppRegistry.registerComponent("Anyline", () => Anyline);

import React, { Component } from "react";
import {
  AppRegistry,
  BackHandler,
  LayoutAnimation,
  PermissionsAndroid,
  View,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text
} from "react-native";

import AnylineOCR from "anyline-ocr-react-native-module";

import Result from "./Result";
// import Overview from "./Overview";
import config from "./config";

// Disable Warnings
console.disableYellowBox = true;

export default class App extends Component {
  state = {
    hasScanned: false,
    result: "",
    imagePath: "",
    fullImagePath: "",
    currentScanMode: "",
    buttonsDisabled: false,
    SDKVersion: ""
  };
  componentDidMount = async () => {
    const SDKVersion = await AnylineOCR.getSDKVersion();
    this.setState({ SDKVersion: SDKVersion });
  };

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  onResult = res => {
    console.error(res);
  };

  onError = error => {
    console.log(error);
    alert(error);
  };

  openAnyline = async type => {
    // AnylineOCR.setup(
    //   JSON.stringify(config),
    //   "scan",
    //   this.onResult,
    //   this.onError
    // );

    this.setState({ buttonsDisabled: true });

    this.setState({
      currentScanMode: type
    });

    try {
      const result = await AnylineOCR.setupPromise(
        JSON.stringify(config),
        "scan"
      );

      console.log(result);
      this.setState({ buttonsDisabled: false });

      const data = JSON.parse(result);
      LayoutAnimation.easeInEaseOut();
      const fullImagePath = data.fullImagePath;
      const imagePath = data.imagePath;

      delete data.fullImagePath;
      delete data.imagePath;

      this.setState({
        hasScanned: true,
        result: data,
        imagePath: imagePath,
        fullImagePath: fullImagePath
      });
    } catch (error) {
      if (error !== "Canceled") {
        console.log(error);
      }
    }
    this.setState({ buttonsDisabled: false });
  };

  requestCameraPermission = async type => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Anyline Camera Permissions",
          message: "Allow Anyline to access you camera?"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission allowed");
        this.openAnyline(type);
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  hasCameraPermission = async () => {
    try {
      return await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
    } catch (err) {
      console.warn(err, "PERMISSION CHECK");
    }
  };

  checkCameraPermissionAndOpen = type => {
    this.hasCameraPermission().then(hasCameraPermission => {
      console.log("hasCameraPermission result is " + hasCameraPermission);
      if (hasCameraPermission) {
        console.log("Opening OCR directly");
        this.openAnyline(type);
      } else {
        this.requestCameraPermission(type);
      }
    });
  };

  emptyResult = () => {
    this.setState({
      hasScanned: false,
      result: "",
      imagePath: "",
      fullImagePath: ""
    });
  };

  render() {
    const {
      hasScanned,
      result,
      imagePath,
      fullImagePath,
      currentScanMode,
      buttonsDisabled,
      SDKVersion
    } = this.state;

    BackHandler.addEventListener("hardwareBackPress", () => {
      if (hasScanned) {
        this.emptyResult();
        return true;
      } else {
        BackHandler.exitApp();
      }
    });

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.ContainerContent}
      >
        <Text style={styles.headline}>Anyline React-Native Example</Text>
        {hasScanned ? (
          <Result
            key="ResultView"
            currentScanMode={currentScanMode}
            result={result}
            imagePath={imagePath}
            fullImagePath={fullImagePath}
            data={result}
            emptyResult={this.emptyResult}
          />
        ) : (
          <View style={styles.buttons}>
            <Button
              style={styles.buttons}
              title={"  Barcode Scanner"}
              color="#0099FF"
              disabled={this.state.buttonsDisabled}
              onPress={() => {
                this.checkCameraPermissionAndOpen("BARCODE");
              }}
            />
          </View>
        )}
        <Text style={styles.versions}>SDK Version: {SDKVersion}</Text>
        <Text style={styles.versions}>RN-Build Number: 1</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  versions: {
    color: "white",
    marginTop: 10
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#303030"
  },
  ContainerContent: {
    alignItems: "center",
    justifyContent: "space-around"
  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 50
  }
});

// +======================

// import React, { Component } from "react";
// import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
// import AnylineOCR from "anyline-ocr-react-native-module";
// import config from "./config";

// export default class App extends Component {
//   openOCR = () => {
//     AnylineOCR.setup(
//       JSON.stringify(config),
//       "scan",
//       this.onResult,
//       this.onError
//     );
//   };

//   onResult = res => {
//     console.error(res);
//   };

//   onError = error => {
//     console.error(error);
//     alert(error);
//   };

//   openAnyline = async () => {
//     try {
//       const result = await AnylineOCR.setupPromise(
//         JSON.stringify(config),
//         "scan"
//       );
//       console.log(result);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   render() {
//     return (
//       <View>
//         <TouchableOpacity
//           onPress={ () => this.openOCR() }
//           style={{ backgroundColor: "yellow" }}>
//           <Text style={{ margin: 10 }}>Open OCR</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }
