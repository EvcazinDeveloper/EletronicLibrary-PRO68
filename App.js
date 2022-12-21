import React, {Component} from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigateButton from './components/NavigatingButton';
import { Rajdhani_600SemiBold } from '@expo-google-fonts/rajdhani';
import *as Font from "expo-font"

export default class App extends Component {
  constructor(){
    super();
    this.state = {LoadedFonts: false};
  }
  async LoadFonts(){
    await Font.loadAsync({
      Rajdhani_600SemiBold: Rajdhani_600SemiBold
    })
    this.setState({
      LoadedFonts: true
    })
  }
  componentDidMount(){
    this.LoadFonts();
  }
  render(){
    const {LoadedFonts} = this.state;
    if (LoadedFonts) {
      return(
        <NavigateButton></NavigateButton>
      )
    }
    else {
      return(
        null
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
