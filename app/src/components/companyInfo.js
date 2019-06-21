// Импорт компонентов
import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageInput from '@material-ui/icons/Input';
import PlaceIcon from '@material-ui/icons/Place';
import CollectionsIcon from '@material-ui/icons/Collections';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import LinkIcon from '@material-ui/icons/Link';



// Класс компонента Информация о компании
class CompanyInfo extends React.Component {

	// Конструктор
	constructor(props) {
		super(props);
		this.props = props;
		this.NO_INFO = "Нет информации"
	}

	// Рендер
	render() {
		const { data } = this.props;
		// Выборка данных о компании из props
		const categories = (data.Categories)? data.Categories.map(item => {
			return item.name;
		}) : [this.NO_INFO];
		const features = (data.Features)? data.Features.map(item => {
			return item.name;	
		}) : [this.NO_INFO];
		const phones = (data.Phones)? data.Phones.map(item => {
			return item.formatted
		}) : [this.NO_INFO];
		const hours = (data.Hours)? data.Hours.text : this.NO_INFO;
		const links = (data.Links)? data.Links.map((item, index) => {
			return <span key={`key-link-${index}`} dangerouslySetInnerHTML={{__html: `<a target="_blank" href=${item.href}>${item.href}</a></br>`}} />
		}) : [this.NO_INFO];
		return (
			<List>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<ImageInput />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Название" secondary={data.name} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<PlaceIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Адрес" secondary={data.description} />
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<CollectionsIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Категории" secondary={categories.join(', ')} />
				</ListItem>
				<ListItem>
          <ListItemAvatar>
            <Avatar>
              <RoomServiceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Услуги"secondary={features.join(', ')} />
        </ListItem>
				<ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessTimeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Часы работы" secondary={hours} />
        </ListItem>
				<ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalPhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Телефоны" secondary={phones.join(', ')} />
        </ListItem>
				<ListItem>
          <ListItemAvatar>
            <Avatar>
              <LinkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Ссылки" secondary={links} />
        </ListItem>
			</List>
		);
	}
}

// Проверка типов
CompanyInfo.propTypes = {
	data: PropTypes.object.isRequired
};

// Экспорт компонента без своих стилей
export default CompanyInfo;
