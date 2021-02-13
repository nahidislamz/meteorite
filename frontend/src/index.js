import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Admin from './Admin';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUpPage from './components/auth/SignUpPage';
import LoginPage from './components/auth/LoginPage';
import Logout from './components/auth/Logout';
import PostDetails from './components/posts/PostDetails';
import Search from './components/posts/Search';
import Create from './components/admin/Create';
import Edit from './components/admin/Edit';
import Delete from './components/admin/Delete';
import {Provider as ReduxProvider} from "react-redux";
import configureStore from "./redux/configureStore";
import PrivateRoute from "./components/auth/PrivateRoute"
import ProfilePage from "./components/auth/ProfilePage"
const store = configureStore();
const routing = (
	<Router>
		<React.StrictMode>
			<ReduxProvider store={store}>
				<Header />
				<Switch>
					<Route exact path="/" component={App} />
					<Route exact path="/admin" component={Admin} />
					<Route exact path="/admin/create" component={Create} />
					<Route exact path="/admin/edit/:id" component={Edit} />
					<Route exact path="/admin/delete/:id" component={Delete} />
					<Route path="/register" component={SignUpPage} />
					<Route path="/login" component={LoginPage} />
					<Route path="/logout" component={Logout} />
					<Route path="/post/:slug" component={PostDetails} />
					<Route path="/search" component={Search} />
					<PrivateRoute exact path="/profile" component={ProfilePage}/>
				</Switch>
				<Footer />
			</ReduxProvider>
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));