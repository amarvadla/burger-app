import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/ChekOut'
import { Route, Switch } from 'react-router-dom';

class App extends Component {
    render() {
        return (<div >
            <Layout >
                <Switch>
                    <Route path='/checkout' component={CheckOut}></Route>
                    <Route path='/' component={BurgerBuilder}></Route>
                </Switch>
            </Layout> </div>
        );
    }

}

export default App;