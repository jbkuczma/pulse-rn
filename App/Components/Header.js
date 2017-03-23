import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


export default class Header extends Component {

	render() {

    return (
      <View>
        <Text> {this.props.city} </Text>
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