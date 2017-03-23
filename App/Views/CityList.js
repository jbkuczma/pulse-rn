import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export default class CityList extends Component {

	render() {

		return (
			<View style={styles.container}>
        <Text> City List </Text>
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
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
    width: '100%',
    backgroundColor: 'red'
  },
  body: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  }
});