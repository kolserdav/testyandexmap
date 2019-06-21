// Импорт модулей
import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import Typography from '@material-ui/core/Typography';
import Img from './media/pin-red.png';



// Класс компонента Яндекс карты
class YMap extends React.Component {
	
	// Конструктор
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			width: 600,
			height: 600
		};
	}
	
	// Состояние когда компонент монтирован
	// Используется для установки параметров карты, в зависимости от ширины окна
	// Не интерактивно, срабатывает только один раз, при монтировании компонента
	componentDidMount() {
    this.setState({width: window.innerWidth / 2}, 
			this.setState({height: this.state.width})
		);
  }

	// Рендер
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

// Проверка типов
YMap.propTypes = {
	name: PropTypes.string.isRequired,
	lat: PropTypes.number.isRequired,
	lon: PropTypes.number.isRequired
};

// Экспорт без своих стилей
export default YMap;
