import React, {Component} from 'react'
import {ART} from 'react-native'

const {Shape} = ART

import * as d3 from 'd3'

export default class HourHand extends Component {

  constructor(props){
  	super(props)
    scaleHours = d3.scaleLinear().domain([0, 11 + 59 / 60]).range([0, 2 * Math.PI])
  	this.arc = d3.arc()
          .outerRadius(50)
          .innerRadius(0)
          .startAngle( (d) => {
            return scaleHours(d.numeric % 12)
          })
          .endAngle( (d) => {
            return scaleHours(d.numeric % 12)
          })
  }

  render() {
    return (
      <Shape d={this.arc} strokeWidth={1} fill={this.props.color} />
    );
  }
}