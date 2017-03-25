import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Pie from './Pie';

export default class Graph extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Pie 
          data={this.props.data}
          outerRadius={this.props.outerRadius}
          innerRadius={this.props.innerRadius}
          valueMap={(item) => item.value}
          // colorMap={(item) => item.color}
          colorMap={this.props.colorMap}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#151719',
    backgroundColor: 'rgba(0,0,0,0)'
  }
});