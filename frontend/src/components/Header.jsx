import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';
import { useHistory } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/auth";


const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	brand:{
		fontFamily:'Stalinist One',
		backgroundColor:'#24272a',
		color:'#fff',
		textDecoration:'none',
		textDecorationColor:'#fd344b',
	},
	

}));

const Header = ({ accessToken, logoutUser }) => {
	const classes = useStyles();
	let history = useHistory();
	const [data, setData] = useState({ search: '' });


	const handleLogout = async () => {
		await logoutUser();
		history.push("login/");
	  };

	const goSearch = (e) => {
		history.push({
			pathname: '/search/',
			search: '?search=' + data.search,
		});
		window.location.reload();
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h4"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textSecondary"
							className={classes.brand}>M</Link>
							
					</Typography>

					<SearchBar
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
					/>
						{accessToken ? (
							<>
								<Button
									href="#"
									color="primary"
									variant="outlined"
									className={classes.link}
									component={NavLink}
									to="/logout"
									onClick={handleLogout}
									>Logout </Button>
								<Button
									href="#"
									color="primary"
									variant="outlined"
									className={classes.link}
									component={NavLink}
									to="/profile"
									onClick={handleLogout}
									>Profile </Button>
							</>
						) : (
							<>
								<Button
									href="#"
									color="primary"
									variant="outlined"
									className={classes.link}
									component={NavLink}
									to="/login"
									>Login </Button>
							</>
						)}

				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

Header.propTypes = {
  accessToken: PropTypes.string,
  logoutUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    accessToken: state.auth,
  };
}

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);