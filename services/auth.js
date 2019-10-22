import { Facebook } from "expo";

import { config } from "../config";

const Firebase = config.Firebase;

export default async function loginWithFacebook() {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    config.facebook.appId,
    { permissions: ["public_profile"] }
  );

  if (type === "success" && token) {
    // Build Firebase credential with the Facebook access token.
    const credential = Firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    await Firebase.auth().signInWithCredential(credential);
  }
}

/**
* Register a subscription callback for changes of the currently authenticated user
*
* @param callback Called with the current authenticated user as first argument
*/
export default function subscribeAuthChange(callback = false) {
 Firebase.auth().onAuthStateChanged(callback); // callback is (user) => setState({user})
}
