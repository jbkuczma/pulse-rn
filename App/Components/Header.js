import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


export default class Header extends Component {

  shortenGeoCoordinates(coordinate) {
    return coordinate.toFixed(2)
  }

  addCompassDirectionForLatitude(coordinate) {
    return coordinate > 0 ? coordinate + ' N' : coordinate * -1 + ' S'
  }

  addCompassDirectionForLongitude(coordinate) {
    return coordinate > 0 ? coordinate + ' E' : coordinate * -1 + ' W'
  }

	render() {

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}> {this.props.city} </Text>
        </View>
        <View style={styles.secondary}>
          <View style={styles.second}>
            <Text style={styles.secondaryHeaderText}> 
              {this.addCompassDirectionForLatitude(this.shortenGeoCoordinates(this.props.latitude))} 
            </Text>
          </View>
          <View style={styles.second}>
            <Text style={styles.secondaryHeaderText}> 
              {this.addCompassDirectionForLongitude(this.shortenGeoCoordinates(this.props.longitude))} 
            </Text>
          </View>
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
    backgroundColor: '#020202'
  },
  background: {
    backgroundColor: '#101214'
  },
  header: {
    flex: 0.6
  },
  headerText: {
    color: '#EBECEB',
    fontSize: 24,
    textAlign: 'center'
  },
  secondary: {
    flexDirection: 'row',
    flex: 0.4,
    width: '60%'
  },
  secondaryHeaderText: {
    color: '#EBECEB', 
    fontSize: 14,
    textAlign: 'center'
  },
  second: {
    flex: 0.5
  }
});