import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';

import Header from '../Components/Header'

// import Footer from '../Components/Footer'

export default class MainWindow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentCity: ''
    }
  }

  componentWillMount() {
    this.getCurrentCity()
  }

  getCurrentCity() {
    this.setState({
      currentCity: 'Buffalo'
    })
  }

	render() {

		return (
			<View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <Header city={this.state.city}/>
        </View>
        <View style={styles.body}>
				  <Text> Hello </Text>
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