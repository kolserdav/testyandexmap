import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';


const styles = theme => ({
	menuItem: {
		backgroundColor: 'gray',
	},
  root: {
		padding: '20px',
  },
  typography: {
    padding: theme.spacing(2),
  },
});

class Dropdown extends React.Component {
  
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			anchorEl: null,
			open: false,
			placement: null,
			children: []
		};
		this.i = 0;
		this.liItem = -1;
	}

  handleClick = placement => event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: true,
      placement,
    }));
  };

	handleItemClick = (e) => {
		const element = e.target || e;
		this.setState({open: false});
		const elementId = element.getAttribute('id');
		this.dataElements.map(item => {
			if (item.id === elementId) {
				console.log(item)
			}
		});
	};
 
	componentDidMount() {
		//ymaps.ready(this.initMap);
	}

	/*initMap() {
    var myMap = new ymaps.Map("map", {
				center: [55.76, 37.64],
				zoom: 10
			}, {
				searchControlProvider: 'yandex#search'
			});
    myMap.geoObjects
			.add(new ymaps.Placemark([55.694843, 37.435023], {
				balloonContent: 'цвет <strong>носика Гены</strong>',
				iconCaption: 'Очень длиннный, но невероятно интересный текст'
			}, {
				preset: 'islands#greenDotIconWithCaption'
			}))
		}*/


	checkKey = (e) => {
		const lis = document.querySelectorAll('li');
		if (e.keyCode === 13) {
			if (lis.length > 0) {
				for (let i = 0; i < lis.length; i ++) {
					const selected = lis[i].getAttribute('style');
					if (selected === 'background-color: gray') {
						this.handleItemClick(lis[i]);
					}
				}
			}
		}
		else {
			if (e.keyCode === 40) {
				this.liItem ++;
			}
			else if (e.keyCode === 38) {
				if (this.liItem !== -1) {
					this.liItem --;
				}
				else {
					this.liItem = lis.length - 1;
				}
			}
			if (this.liItem === lis.length || this.liItem < -1) {
				this.liItem = 0;
			}
			if (e.keyCode === 40 || e.keyCode === 38) {
				if (this.liItem === 0 && lis[lis.length - 1]) {
					if (e.keyCode === 40) {
						lis[lis.length - 1].removeAttribute('style');
					}
					lis[this.liItem].setAttribute('style', 'background-color: gray')
				}
				if (lis[this.liItem]) {
					lis[this.liItem].setAttribute('style', 'background-color: gray')
				}
				if (lis[this.liItem - 1]) {
					lis[this.liItem - 1].removeAttribute('style');
				}
				if (lis[this.liItem + 1]) {
					lis[this.liItem + 1].removeAttribute('style');
				}
			}
		}
	};

	handleChange = (event) => {
		document.onkeydown = this.checkKey;
		const { classes } = this.props;
		this.i ++;
		axios(`http://localhost:3011?search=${event.target.value}`, {headers: {'Content-Type': 'application/json'}})
			.then(response => {
				this.children = [];
				this.dataElements = [];
				response.data.items.map(item => {
					const insert = <MenuItem onClick={this.handleItemClick} id={item.id} key={`key-${item.id}`}>{ item.name } - { item.description }</MenuItem>;
						this.children.push(insert);
						this.dataElements.push(item);
				});
				this.setState({children: this.children});
			})
			.catch(error => {
				console.log(error)
			});
	};

  render() {
    const { classes } = this.props;
    const { anchorEl, open, placement } = this.state;

    return (
      <div className={classes.root}>
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
								{ this.state.children }
              </Paper>
            </Fade>
          )}
        </Popper>
        <Grid container justify="center">
          <Grid item xs={6}>
						<TextField
							id="outlined-full-width"
							label="Поиск в Яндекс картах"
							style={{ margin: 8 }}
							placeholder="Название организации"
							fullWidth
							onChange={this.handleChange}
							onClick={this.handleClick('bottom-start')}
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
						/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dropdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dropdown);
