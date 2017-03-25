import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native'

/* a pointer for the circle graph */
export default class Triangle extends Component {

	constructor(props){
		super(props)
	}

	render() {

		return(
			<View style={[styles.triangle, this.props.style]} />
		)
	}
}

const styles = StyleSheet.create({
  triangle: {
  	width: 0,
  	height: 0,
  	backgroundColor: 'transparent',
  	borderStyle: 'solid',
  	borderLeftWidth: 7,
  	borderRightWidth: 7,
  	borderBottomWidth: 14,
  	borderLeftColor: 'transparent',
  	borderRightColor: 'transparent',
  	borderBottomColor: '#F4511E'
  }
});