import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Axios';
import { isAuthenticated , currentUser} from "../auth/Auth";
import { useParams } from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		justifyContent:'space-between',
		alignItems: 'left',
	},
	navTop: {
		display: 'flex',
		'& > *': {
		  margin: theme.spacing(1),
		},
	  },
}));

export default function PostDetails() {

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
  
	const handleClick = (event) => {
	  setAnchorEl(event.currentTarget);
	};
  
	const handleClose = () => {
	  setAnchorEl(null);
	};

	const { slug } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({
		posts: [],
	});
	const [userdata, setUserData] = useState({
		userInfo: [],
	});
	useEffect(() => {
		axiosInstance.get('post/' + slug).then((res) => {
			setData({
				posts: res.data,
			});
			console.log(res.data);
		});
	}, [setData]);


	useEffect(()=>{

		if (isAuthenticated) {
			fetch('http://localhost:8000/api/user/current_user/', {
			  headers: {
				Authorization: `JWT ${localStorage.getItem('access_token')}`
			  }
			})
			  .then(res => res.json())
			  .then(json => {
				  setUserData({
					userInfo: json.userdata,
				  });
				console.log('USER:'+json.userdata)
			  });
		  }
	
	},[setUserData]);
	

	return (
		
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div className={classes.paper}></div>{' '}
			<Breadcrumbs aria-label="breadcrumb">
				<Link color="inherit" href="/">
					Home
				</Link>
				<Link color="inherit" href="#">
				{data.posts.title}{' '}
				</Link>
			</Breadcrumbs>
			<div className={classes.paper}></div>{' '}
			<div style={{ width: '100%' }}>
				<Box display="flex" justifyContent="flex-start">
					<Avatar alt="Profile Sharp" src="/static/images/avatar/1.jpg" />
					<Typography
						component="h3"
						variant="h4"
						align="left"
						color="textPrimary"
						gutterBottom
					>
						{currentUser}{' '}
					</Typography>{' '}
				</Box>
				<Box display="flex" justifyContent="flex-end">
					
					<IconButton
						aria-label="more"
						aria-controls="long-menu"
						aria-haspopup="true"
						onClick={handleClick}
					>
						<MoreVertIcon />
					</IconButton>

					<Menu
						id="long-menu"
						anchorEl={anchorEl}
						keepMounted
						open={open}
						onClose={handleClose}
						PaperProps={{
						style: {
							maxHeight: ITEM_HEIGHT * 4.5,
							width: '20ch',
						},
						}}>
						{isAuthenticated() ? (
							<>
								<MenuItem  onClick={handleClose}>
								<Link color="inherit" href={'/admin/edit/' + data.posts.id}>Edit</Link>
								</MenuItem>
								<MenuItem  onClick={handleClose}>
									<Link color="inherit" href={'/admin/delete/' + data.posts.id}>Delete</Link>
								</MenuItem>
							</>
						) : (
							<MenuItem  onClick={handleClose}>
								<Link color="inherit" href='#!'>Report</Link>
							</MenuItem>
						)}
					
					</Menu>
      			</Box>
			
			</div>
			
			<div className={classes.heroContent}>
				<Container maxWidth="sm">
					<Typography
						component="h3"
						variant="h4"
						align="left"
						color="textPrimary"
						gutterBottom
					>
						{data.posts.title}{' '}
					</Typography>{' '}
					<Typography
						variant="h5"
						align="left"
						color="textSecondary"
						paragraph
					>
						{data.posts.excerpt}{' '}
					</Typography>{' '}
					<Typography
						variant="p"
						align="left"
						color="textSecondary"
						paragraph
					>
						{data.posts.content}{' '}
					</Typography>{' '}
				</Container>{' '}
			</div>{' '}
		</Container>
	);
}
