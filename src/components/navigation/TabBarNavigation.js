import React, { Component } from 'react';

import { createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import {signedInElements, signedOutElements, tabNavigatorConfig} from './TabBarConfig'

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        authUser: props.authUsera
    };
    
  }

  componentWillReceiveProps = (props) => this.setState({authUser: props.authUser})

  render() {
    const TabNavigator = this.state.authUser ? createMaterialTopTabNavigator(signedInElements, tabNavigatorConfig) 
                                             : createMaterialTopTabNavigator(signedOutElements, tabNavigatorConfig)
                                    
    const TabBar = createAppContainer(TabNavigator);

    console.debug('in tab bar : ' + props.authUser)
    return (
        <TabBar />
    );
  }
}
    