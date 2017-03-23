import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

// import {Scene, Router} from 'react-native-router-flux'

import MainWindow from './App/Views/MainWindow'
// import CityList from './App/Views/CityList'

export default class Pulse extends Component {

	render() {

		return (
			<MainWindow />
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


/* use this when adding more cities is going to be added */
// export default class Pulse extends Component {

// 	render() {

// 		return (
// 			<Router>
// 			  <Scene key="root">
// 			    <Scene key="main" component={MainWindow} title="Main" initial={true} />
// 			    <Scene key="cityList" component={CityList} title="City List" />
// 		      </Scene>
// 			</Router>
// 		)
// 	}
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   }
// });