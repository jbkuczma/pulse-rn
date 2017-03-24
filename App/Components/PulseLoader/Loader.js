import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Pulse from './Pulse'

export default class PulseLoader extends Component {

	render() {

    return (
      <View style={styles.container}>
        <View style={styles.pulse}>
          <Pulse size={this.props.size} color={this.props.color} />
        </View>
        <View style={styles.help}>
          <Text style={styles.helpText}> Loading data </Text>
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
  pulse: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.7
  },
  help: {
    alignItems: 'center',
    flex: 0.3
  },
  helpText: {
    color: '#EBECEB',
    fontSize: 18
  }
});