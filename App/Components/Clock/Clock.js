import React, {Component} from 'react';
import {
  ART
} from 'react-native'

const {
  Shape,
  Surface,
  Path
} = ART

export default class Clock extends Component {

	constructor(props){
		super(props)
	}

	render() {
		const {radius} = this.props
		const {size} = this.props
		const width = size * 2
		const height = size * 2
		
		const path = Path()
				.moveTo(0, -radius)
				.arc(0, radius * 2, radius)
				.arc(0, radius * -2, radius)
				.close()

		return (
			<Surface width={width} height={height}>
				<Shape
					radius={size}
					fill={this.props.color}
					x={size}
					y={size}	
					d={path}
				/>
			</Surface>
		)
	}
}