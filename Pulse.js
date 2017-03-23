import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import MainWindow from './App/Views/MainWindow'

export default class Pulse extends Component {

	render() {

		return (
			<View style={styles.container}>
				<Text> Hello </Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});