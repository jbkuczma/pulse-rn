import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import {Actions} from 'react-native-router-flux'

export default class Footer extends Component {

	render() {

    return (
      <TouchableHighlight onPress={Actions.cityList}>
        <Text> Add City </Text>
      </TouchableHighlight>
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