import * as firebase from "firebase";

import { config } from "./index";

firebase.initializeApp(config.firebase);

export const Firebase = firebase;
