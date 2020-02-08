import React from "react";
import { Text, View, TouchableOpacity, AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";
import * as FaceDetector from 'expo-face-detector';
import { Camera } from "expo-camera";
import axios from "axios";

import styles from "./styles";
import Toolbar from "./toolbar.component";
import Gallery from "./gallery.component";
// import console = require("console");

export default class CameraPage extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    captures: [],
    capturing: null,
    cameraType: Camera.Constants.Type.back,
    flashMode: false
  };

  async componentDidMount() {
    // AsyncStorage.clear();
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  setFlashMode = flashMode => this.setState({ flashMode });
  setCameraType = cameraType => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    console.log(this)
    const options = { quality: 0.1, base64: true };
    const photoData = await this.camera.takePictureAsync(options);
    this.setState(
      { capturing: false, captures: [photoData.uri, ...this.state.captures] },
      () => {
        // console.log("picture")
        AsyncStorage.setItem(
          "Photos",	          
          JSON.stringify({ captures: this.state.captures }),
          // () => {
          //   this.sendtoAzure(photoData);
          // }
        );
      }
    );
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    this.setState({
      capturing: false,
      captures: [videoData, ...this.state.captures]
    });
  };

  sendtoAzure = async photo => {
    // const data = new FormData();
    // // data.append('name', 'testName'); // you can append anyone
    // data.append('file', {
    //     uri: photo.uri,
    //     type: 'image/jpeg', // or photo.type
    //     name: 'testPhotoName'
    // });
    // console.log(data)
    // const url = 'http://94b5ae18.ngrok.io/';
    // fetch(url, {
    //     method: 'POST',
    //     body: data
    // }).then(res => {
    //     console.log(res)
    // });

    let uri = photo.uri;
    let fileType = uri.substring(uri.lastIndexOf(".") + 1);
    let filename = uri.substring(uri.lastIndexOf("/") + 1);
    let formData = new FormData();
    formData.append("file", {
      uri,
      name: filename,
      type: `image/${fileType}`
    });

    //console.log(formData);
    /* 
        let options = {
            method: "POST",
            body: formData,
            headers: {
                //Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        }; */

    // const url = "http://333a162e.ngrok.io/";
    // fetch(url, options
    // ).then(res => {
    //     console.log(res)
    // });

    // axios({
    //   method: "post",
    //   url: url,
    //   mode: "cors",
    //   headers: {
    //     "Access-Control-Allow-Origin": true,
    //     "Content-Type": "multipart/form-data"
    //   },
    //   data: formData
    // })
    // .then(response => {
    //   console.log(response.data);
    //   // console.log(this.state.capturing, this.state.flashMode)
    //   if (this.state.flashMode != Camera.Constants.FlashMode.off) {
    //     setTimeout(this.handleShortCapture, 1200);
    //   }
    // })
    // .catch(error => {
    //   console.log(error);
    // });
    /* axios.post(url, formData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          }); */
  };

  handleFacesDetected = ({ faces }) => {
    if(faces.length > 0) {
      console.log(faces[0].smilingProbability)
      this.setState({ faces });
      if (faces[0].smilingProbability < 0.05) {
        this.handleShortCapture();
      }
    }
  };

  render() {
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <React.Fragment>
        <View>
          <Camera
            type={cameraType}
            flashMode={Camera.Constants.FlashMode.off}
            style={styles.preview}
            onFacesDetected={this.handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.none,
              runClassifications: FaceDetector.Constants.Classifications.all,
              minDetectionInterval: 100,
              tracking: true,
            }}
            ref={camera => (this.camera = camera)}
          />
        </View>
        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </React.Fragment>
    );
  }
}
