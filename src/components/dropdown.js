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

// Components
import YMap from './map.js';
import CompanyInfo from './companyInfo.js';

const styles = theme => ({
	menuItem: {
		backgroundColor: 'gray',
	},
  root: {
		padding: '20px',
  },
  typography: {
    padding: '20px',
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
			children: [],
			showMap: false,
			showInfo: false
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
				this.lat = item.geometry.coordinates[1];
				this.lon = item.geometry.coordinates[0];
				this.name = item.name;
				this.dataCompany = item;
				this.setState({showInfo: true});
				this.setState({showMap: true});
			}
		});
	};

	checkKey = (e) => {
		const lis = document.querySelectorAll('.menu-item1');
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
					const insert = <MenuItem className="menu-item1" onClick={this.handleItemClick} id={item.id} key={`key-${item.id}`}>{ item.name } - { item.description }</MenuItem>;
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
		const map = () => (
			<Grid item xs={6}>
				<Typography className={classes.typography} variant="subtitle1">Место на карте</Typography>
				<YMap
					lat={this.lat}
					lon={this.lon}
					name={this.name}
				/>
			</Grid>
		);
		const info = () => (
			<Grid item xs={6}>
				<CompanyInfo data={this.dataCompany} />
			</Grid>
		);
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
							label="Поиск по организациям в Яндекс"
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
				<Grid container justify="center">
					{ this.state.showInfo? info() : '' }
				</Grid>
				<Grid container justify="center">
					{ this.state.showMap? map() : '' }
				</Grid>
      </div>
    );
  }
}

Dropdown.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dropdown);
