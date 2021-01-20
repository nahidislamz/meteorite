
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './containers/Layout';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Category from './components/Category';

const App = () => (
    <Router>
        <Layout>
            <Switch>
                <Route exact path='/' component={Blog} />
                <Route exact path='/category/:id' component={Category} />
                <Route exact path='/blog/:id' component={BlogDetail} />
            </Switch>
        </Layout>
    </Router>
);

export default App;