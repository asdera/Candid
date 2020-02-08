import React from "react";
import { View, Image, Modal, ScrollView, Text, Button } from "react-native";
import ImageView from "react-native-image-view";

import axios from "axios";

import { SliderBox } from "react-native-image-slider-box";

import styles from "./styles";
import { AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import console = require('console');

export default class Gallery extends React.Component {
  state = {
    captures: [],
    isLoading: true,
    added: {},
    modalVisible: false,
    uri_dir: ""
  };

  componentDidMount() {
    // axios({
    //   method: "get",
    //   url: "http://333a162e.ngrok.io/best-files",
    //   responseType: "json"
    // })
    // .then(response => {
    //   this.setState({
    //     captures: response.data.slice(0, 6),
    //     isLoading: false
    //   });
    // })
    // .catch(function(error) {
    //   // handle error
    //   console.log(error);
    // });

    // const dir = AsyncStorage.getItem("Photos");
    // dir.then(
    //   res => {
    //     console.log(res)
      
    //     this.setState({ captures: res})
    //   },
    //   error => console.log(error)
    // );
    
    this.retrieveData();
  }

  viewPicture() {
    //let selectedPicture = [{ src: uri }];
    this.setState({ modalVisible: true });
  }
  addPicture(dir_uri) {
    if (this.state.added[dir_uri]) {
      this.setState({
        added: { ...this.state.added, [dir_uri]: false }
      });
      this.props.removePicture(dir_uri);
    } else {
      this.setState({
        added: { ...this.state.added, [dir_uri]: true }
      });
      this.props.addPicture(dir_uri);
    }
  }
  render() {
    const { captures, isLoading } = this.state;
    if (isLoading) {
      return <Text>Loading..</Text>;
    }
    console.log(captures);
    return (
      <View onPress={this.retrieveData}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <SliderBox sliderBoxHeight={600} images={this.state.captures} />
        </Modal>
        <TouchableOpacity
          onPress={() => {
            this.retrieveData()
          }}
          style={styles.galleryImageContainer}
        >
          <Button title="Refresh"></Button>
        </TouchableOpacity>

        <View style={styles.galleryContainer}>
          {captures.map(uri => (
            <TouchableOpacity
              onPress={() => {
                this.addPicture(this.state.uri_dir + uri)
                this.retrieveData()
              }}
              style={styles.galleryImageContainer}
              key={uri}
            >
              <Image
                key={uri}
                source={{ uri: this.state.uri_dir + uri }}
                style={
                  this.state.added[this.state.uri_dir + uri]
                    ? styles.addedGalleryImageContainer
                    : styles.galleryImage
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  retrieveData = async () => {
    try {
      console.log("ok")
      const value = await AsyncStorage.getItem("Photos");
      const mem = JSON.parse(value);
      // console.log(mem.captures)
      this.setState({ captures: mem.captures, isLoading: false }, () => {});
    } catch (error) {}
  };
}
