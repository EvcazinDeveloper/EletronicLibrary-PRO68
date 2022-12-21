import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput } from "react-native";
import { Permissions } from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import database from "../config.js"

export default class Transition extends Component {
    constructor(props){
        super(props);
        this.state = {
            domState: "normal",
            hasCameraPermission: null,
            scanned: false,
            scannedData: "",
            studentID: "",
            bookID: ""
        }
    }
    cameraPermittor=async domState=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission: status == "granted",
            domState: domState,
            scanned: false
        })
    }
    scannedCode=async ({type, data})=>{
      if (domState == "bookID") {
        this.setState({
          bookID: data,
          domState: "normal",
          scanned: true
        })
      }
      if (domState == "studentID") {
        this.setState({
          studentID: data,
          domState: "normal",
          scanned: true
        })
      }
    }
  send=()=>{
    var {bookID} = this.state;
    database.collection("books")
    .doc(bookID)
    .get()
    .then(
      doc=> {
        var book = doc.data()
        if(book.isBookAvaiable){this.initiateTheReserve()}
        else{this.initiateDevolution()}
      }
    )
  }
  initiateTheReserve=()=>{
    console.log("Livro entregue para o aluno")
  }
  initiateDevolution=()=>{
    console.log("Livro Devolvido à Biblioteca")
  }
    render(){
        const { bookID, studentID, domState, scanned } = this.state;
        if (domState == "scanned") {
            return(
                <BarCodeScanner onBarCodeScanned={
                    scanned? undefined: this.scannedCode()
                }
                style={styleSheet.absoluteFillObject}></BarCodeScanner>
            )
        }
        return(
          
            <View style={styleSheet.container2}>
                <ImageBackground source={require("../assets/background2.png")} style={styleSheet.bgi}>
                <View style={styleSheet.iconOrganization}>
                <Image source={require("../assets/appIcon.png")} style={styleSheet.icon}></Image>
                <Image source={require("../assets/appName.png")} style={styleSheet.name}></Image>
                </View>
              <View style={styleSheet.lowerContainer}>
            <View style={styleSheet.tStyle}>
              <TextInput
                style={styleSheet.textInput}
                placeholder={"ID do Livro"}
                placeholderTextColor={"#FFFFFF"}
                value={bookID}
              />
              <TouchableOpacity
                style={styleSheet.button}
                onPress={() => this.getCameraPermissions("bookID")}
              >
                <Text style={styleSheet.scanbuttonText}>Digitalizar</Text>
              </TouchableOpacity>
            </View>
            <View style={[styleSheet.tStyle, { marginTop: 25 }]}>
              <TextInput
                style={styleSheet.textInput}
                placeholder={"ID do Estudante"}
                placeholderTextColor={"#FFFFFF"}
                value={studentID}
              />
              <TouchableOpacity
                style={styleSheet.button}
                onPress={() => this.getCameraPermissions("studentID")}
              >
                <Text style={styleSheet.scanbuttonText}>Digitalizar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styleSheet.sendButton} onPress={this.send}>
              <Text style={{color: "white"}}>
                Enviar
              </Text>
            </TouchableOpacity>
          </View>
                </ImageBackground>
            </View>
        )
    }
}

const styleSheet = StyleSheet.create({
    container2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5653D4",
    },
    text2: {
        color: "white"
    },
    button: {
        width: "43%",
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0072FF",
        borderRadius: 15
    },
    bgi: {
      resizeMode: "cover",
      flex: 1,
      justifyContent: "center",
    },
    icon: {
      width: 200,
      height: 200,
      resizeMode: "contain",
      marginTop: 80
    },
    name: {
      width: 80,
      height: 80,
      resizeMode: "contain"
    },
    iconOrganization: {
      flex: 0.5,
      justifyContent: "center",
      alignItems: "center"
    },
    textInput: {
      width: "57%",
      height: 50,
      padding: 10,
      borderColor: "blue",
      borderRadius: 10,
      fontSize: 18,
      backgroundColor: "purple",
      color: "white"
    },
    tStyle: {
      marginTop: 25,
      borderWidth: 2,
      borderRadius: 10,
      flexDirection: "row",
      backgroundColor: "purple",
      borderColor: "blue"
    },
    lowerContainer: {
    flex: 0.5,
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 20,
    color: "#0A0101",
    fontFamily: "Rajdhani_600SemiBold"
  },
  sendButton: {
    width: "43%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 25,
    backgroundColor: "purple",
    borderColor: "blue",
    borderWidth: 2
  }
})