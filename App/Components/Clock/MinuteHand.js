import React, {Component} from 'react'
import {ART} from 'react-native'

const {Shape} = ART

import * as d3 from 'd3'

export default class MinuteHand extends Component {

  constructor(props){
  	super(props)
    scaleMinutes = d3.scaleLinear().domain([0, 59 + 59 / 60]).range([0, 2 * Math.PI])
  	this.arc = d3.arc()
          .outerRadius(70)
          .innerRadius(0)
          .startAngle( (d) => {
            return scaleMinutes(d.numeric)
          })
          .endAngle( (d) => {
            return scaleMinutes(d.numeric)
          })
  }
  render() {
    return (
      <Shape d={this.arc} strokeWidth={1} fill={this.props.color} />
    );
  }
}