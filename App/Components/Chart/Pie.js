import React, {Component} from 'react';
import {
  ART,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as d3 from 'd3';

const {
  Group,
  Surface
} = ART;

import Arc from './Arc';

export default class Pie extends Component {

  constructor(props) {
    super(props);
    // this.colors = d3.schemeCategory10;
    this.colors = this.props.colorMap
    this.arcs = d3
                .pie()
                .value(this.props.valueMap)
                .padAngle(this.props.padAngle)
                .sort(null) //d3 automatically sorts data 
                (this.props.data);
    this.getArc = this.getArc.bind(this);
  };

  static defaultProps = {
    innerRadius: 0,
    valueMap: ((datum) => {return datum}),
    padAngle: 0.00
  }

  getArc(arcData, index) {
    return (
      <Arc 
        key={`arc-${index}`}
        arcData={arcData}
        outerRadius={this.props.outerRadius}
        innerRadius={this.props.innerRadius}
        color={this.colors[index]} 
      />
    );
  }

  render() {
    return (
      <View>
        <Surface 
          width={2*this.props.outerRadius}
          height={2*this.props.outerRadius} 
        >
          <Group x={this.props.outerRadius} y={this.props.outerRadius}>
                  { this.arcs.map((arcData,index) => this.getArc(arcData, index)) }
          </Group>
        </Surface>
      </View>
    );
  }
}