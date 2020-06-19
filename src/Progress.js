import React from "react";
import { CircularProgress } from "@material-ui/core";
export default class Progress extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		var size =
			this.props.style && this.props.style.height
				? this.props.style.height
				: 30;
		return (
			<div style={this.props.style}>
				<CircularProgress size={size} thickness={5} />
			</div>
		);
	}
}
