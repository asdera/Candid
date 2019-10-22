import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from "react-native";

import * as Facebook from "expo-facebook";
import { config } from "../config";
import { Firebase } from "../config/firebaseIntegration";

import background from "../assets/images/background.png";
import fbButton from "../assets/images/fb_button.png";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
    this.skipLogin = this.skipLogin.bind(this);
  }
  componentDidMount() {
    this.subscribeAuthChange(user => {
      if (user) {
        this.props.navigation.navigate("Main");
      }
    });
  }

  async loginWithFacebook() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      config.facebook.appId,
      { permissions: ["public_profile"] }
    );

    if (type === "success" && token) {
      // Build Firebase credential with the Facebook access token.
      const credential = Firebase.auth.FacebookAuthProvider.credential(token);

      Firebase.auth()
        .setPersistence(Firebase.auth.Auth.Persistence.NONE)
        .then(async () => {
          // Sign in with credential from the Facebook user.
          await Firebase.auth().signInWithCredential(credential);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  /**
   * Register a subscription callback for changes of the currently authenticated user
   *
   * @param callback Called with the current authenticated user as first argument
   */
  subscribeAuthChange(callback = false) {
    Firebase.auth().onAuthStateChanged(callback); // callback is (user) => if(user){} else {}
  }

  skipLogin() {
    this.props.navigation.navigate("Main");
  }
  render() {
    return (
      <ImageBackground
        source={background}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.fbButtonContainer}
            onPress={this.loginWithFacebook}
          >
            <Text style={{ fontSize: 20, margin: 20 }}>Log in with</Text>

            <Image style={styles.fbButton} source={fbButton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={this.skipLogin}
          >
            <Text style={{ fontSize: 16, margin: 20, textAlign: "center", opacity: 0 }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  fbButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  fbButton: {
    width: 100,
    height: 100
  },
  textContainer: {
    marginTop: 30,
    width: 100,
    height: 50
  }
});
