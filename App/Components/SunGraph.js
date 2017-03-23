import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Time from '../Util/TimeFunctions'

// think of a better name for this component
export default class SunClock extends Component {

  constructor(props){
    super(props)
  }

  

	render() {
    return (
      <View style={styles.container}>
        <View style={styles.graph}>
          <Text> graph here </Text>
        </View>
        <View style={styles.times}>
          <Text style={styles.headerText}> {this.props.sunriseStart} </Text>
          <Text style={styles.headerText}> {this.props.sunriseEnd} </Text>
          <Text style={styles.headerText}> {this.props.sunsetStart} </Text>
          <Text style={styles.headerText}> {this.props.sunsetEnd} </Text>
        </View>
      </View>
    )
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#151719'
  },
  headerText: {
    color: '#EBECEB',
    // fontSize: 24
  },
  graph: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  times: {
    flex: 0.2,
    flexDirection: 'row'
  }
});