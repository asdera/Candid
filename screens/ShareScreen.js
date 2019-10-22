import React from "react";
import { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share
} from "react-native";
import Gallery from "./gallery.component";
import fbButton from "../assets/images/fb_button.png";

export default class ShareScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addedPictures: []
    };
    this.addPicture = this.addPicture.bind(this);
    this.removePicture = this.removePicture.bind(this);
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message: "Shared using Candid!",
        url: this.state.addedPictures[0]
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          this.props.navigation.navigate("Main");
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  addPicture(uri) {
    this.setState({ addedPictures: [...this.state.addedPictures, uri] });
  }

  removePicture(uri) {
    let index = this.state.addedPictures.indexOf(uri);
    let addedPictures = [...this.state.addedPictures].splice(index, 1);
    this.setState({ addedPictures });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.galleryContainer}>
          <Gallery
            addPicture={this.addPicture}
            removePicture={this.removePicture}
          />
        </View>

        <View styles={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.fbButtonContainer}
            onPress={this.onShare}
          >
            <Image style={styles.fbButton} source={fbButton} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ShareScreen.navigationOptions = {
  title: "Best Captured Moments"
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    paddingTop: 15,
    flexDirection: "column"
  },
  galleryContainer: {
    flex: 3
  },
  buttonContainer: {
    flex: 1,
    bottom: 20
  },
  fbButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  fbButton: {
    width: 100,
    height: 100
  }
});
