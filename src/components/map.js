import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import Typography from '@material-ui/core/Typography';
import Img from './media/pin-red.png';


class YMap extends React.Component {
	
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			width: 600,
			height: 600
		};
	}
	
	componentDidMount() {
    this.setState({width: window.innerWidth / 2}, 
			this.setState({height: this.state.width})
		);
  }

	render() {
		return (
			<Map
				width={this.state.width}
				height={this.state.height}
				center={[this.props.lat, this.props.lon]} 
				zoom={11}>
				<Marker lat={this.props.lat} lon={this.props.lon}>
					<MarkerLayout>
						<div>
							<img src={Img} width={40} height={40} alt="Метка организации"/>
							<Typography variant="body2">{ this.props.name }</Typography>
						</div>						
					</MarkerLayout>
				</Marker>
			</Map>
		);
	}
}

YMap.propTypes = {
	name: PropTypes.string.isRequired,
	lat: PropTypes.number.isRequired,
	lon: PropTypes.number.isRequired
};

export default YMap;
