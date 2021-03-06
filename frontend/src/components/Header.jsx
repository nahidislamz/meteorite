import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/auth";
import SearchBar from 'material-ui-search-bar';


const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
		display: 'block',
		},
	},
	search: {
		position: 'relative',
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(2),
		width: 'auto',
		},
	},

	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
		display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
		display: 'none',
		},
	},
	brand:{
	 	fontFamily:'Stalinist One',
		backgroundColor:'#242424',
		color:'#fff',
		textDecoration:'none',
		textDecorationColor:'#fd344b',
	},
	appbarBg:{
		backgroundColor:"#c3e8cc",
	},
	avater:{
		color:'#24272a',
	}

}));

const Header = ({ accessToken, logoutUser }) => {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  let history = useHistory();

  const [data, setData] = useState({ search: '' });
  const handleLogout = async () => {
      await logoutUser();
	  history.push("login/");
	  setAnchorEl(null);
	  handleMobileMenuClose();
    };

  const goSearch = (e) => {
      history.push({
          pathname: '/search/',
          search: '?search=' + data.search,
      });
      window.location.reload();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem to="/admin"	component={NavLink} >Profile</MenuItem>
      <MenuItem to="/logout" onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appbarBg} position="static">
        <Toolbar>
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
		 <div className={classes.grow} />
          <div className={classes.search}>
            <SearchBar
                value={data.search}
                onChange={(newValue) => setData({ search: newValue })}
                onRequestSearch={() => goSearch(data.search)}
            />
          </div>
    
		  {accessToken ? (
				<>
					<div className={classes.sectionDesktop}>
						<IconButton
						edge="end"
						aria-label="account of current user"
						aria-controls={menuId}
						aria-haspopup="true"
						onClick={handleProfileMenuOpen}
						color="inherit"
						>
						<AccountCircle className={classes.avater} />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
						aria-label="show more"
						aria-controls={mobileMenuId}
						aria-haspopup="true"
						onClick={handleMobileMenuOpen}
						color="inherit"
						>
						<MoreIcon />
						</IconButton>
					</div>
				</>
				) : (
				
					<Button
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/login"
						>Login </Button>	
					)}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
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