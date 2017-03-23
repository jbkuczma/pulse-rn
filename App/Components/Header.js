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
        <Text style={styles.headerText}> {this.props.city} </Text>
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
    fontSize: 24
  }
});