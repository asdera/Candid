import { StyleSheet, Dimensions } from "react-native";

const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default StyleSheet.create({
  alignCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  preview: {
    height: winHeight,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  bottomToolbar: {
    width: winWidth,
    position: "absolute",
    height: 100,
    bottom: 0
  },
  captureBtn: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#FFFFFF"
  },
  captureBtnActive: {
    width: 50,
    height: 50
  },
  captureBtnInternal: {
    width: 46,
    height: 46,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "red",
    borderColor: "transparent"
  },
  galleryContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  galleryImageContainer: {
    width: 150,
    height: 150,
    marginRight: 5
  },
  addedGalleryImageContainer: {
    backgroundColor: "green",
    opacity: 0.5,
    width: 150,
    height: 150,
    margin: 10
  },
  galleryImage: {
    width: 150,
    height: 150,
    margin: 10
  }
});
