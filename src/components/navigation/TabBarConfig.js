import React from 'react'

import ApodScreen from '../../screens/ApodScreen';
import LogonScreen from '../../screens/LogonScreen';
import SignupScreen from '../../screens/SignupScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import FavouritesScreen from '../../screens/FavouritesScreen.js';
import TopApodsScreen from '../../screens/TopApodsScreen.js';
import SelectedFavsApodScreen from '../../screens/SelectedFavsApodScreen.js';
import SelectedTopApodScreen from '../../screens/SelectedTopApodScreen.js';
import AddApodScreen from '../../screens/AddApodScreen.js';
import Camera from '../../components/camera/Camera.js';
import UserApodScreen from '../../screens/UserApodScreen.js';
import PhotoPicker from '../../components/camera/PhotoPicker.js';

import Icon from 'react-native-vector-icons/Ionicons';
import { createSwitchNavigator} from 'react-navigation';

const ICON_SIZE=20;

  const LoginStack = createSwitchNavigator({
    SignIn : {screen : LogonScreen},
    SignUp : {screen : SignupScreen },
  });

  const FavouritesStack = createSwitchNavigator({
    Favourites: {screen: FavouritesScreen},
    SelectedFavsApod: {screen : SelectedFavsApodScreen},
  });

  const TopApodsStack = createSwitchNavigator({
    TopApods: {screen: TopApodsScreen},
    SelectedTopApod: {screen : SelectedTopApodScreen},
  });

  const AddApodStack = createSwitchNavigator({
    AddApod: {screen: AddApodScreen},
    Camera: {screen : Camera},
    PhotoPicker: {screen: PhotoPicker}
  });

  export const signedOutElements = {
    Apod: {
      screen: props => <ApodScreen date='today' />,
        navigationOptions: {
          tabBarLabel: 'Home',
          tabBarIcon: ({tintColor}) => (
            <Icon name='ios-home' color={tintColor} size={ICON_SIZE} />
          )
        }},
      Logon: { screen: LoginStack,
          navigationOptions: {
            tabBarLabel: 'Sign In',
            tabBarIcon: ({tintColor}) => (
              <Icon name='ios-log-in' color={tintColor} size={ICON_SIZE} />
            )
          }},
    };

  export const signedInElements = {
    Apod: {
      screen: props => <ApodScreen date='today' />,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-home' color={tintColor} size={ICON_SIZE} />
        )
     }},
    FavouritesScreen: { screen: FavouritesStack,
        navigationOptions: {
          tabBarLabel: 'Favourites',
          tabBarIcon: ({tintColor}) => (
            <Icon name='ios-flame' color={tintColor} size={ICON_SIZE} />
          )
        }},
      AddAppod: { screen: AddApodStack,
          navigationOptions: {
              tabBarLabel: 'Add Appod',
              tabBarIcon: ({tintColor}) => (
                  <Icon name='ios-add-circle' color={tintColor} size={ICON_SIZE} />
              )
          }},
    TopApodsScreen: { screen: TopApodsStack,
        navigationOptions: {
          tabBarLabel: 'Top Apods',
          tabBarIcon: ({tintColor}) => (
            <Icon name='ios-rocket' color={tintColor} size={ICON_SIZE} />
          )
        }},
      UserApodScreen: { screen: UserApodScreen,
          navigationOptions: {
              tabBarLabel: 'Users APODS',
              tabBarIcon: ({tintColor}) => (
                  <Icon name='ios-rocket' color={tintColor} size={ICON_SIZE} />
              )
          }},
      Profile: { screen: ProfileScreen,
        navigationOptions: {
          tabBarLabel: 'Profile',
          tabBarIcon: ({tintColor}) => (
            <Icon name='ios-contact' color={tintColor} size={ICON_SIZE} />
          )
        }},
  };

 export const tabNavigatorConfig = {
    initialRouteName: 'Apod',
    tabBarPosition: 'bottom',
    tabBarOptions : {
      scrollEnabled: true,
      activeTintColor: '#92cbc5',
      inactiveTintColor: '#FFF',
      style: { backgroundColor: '#262e3d' },
      indicatorStyle: {
        height: 0
      },
      showIcon: 'true',
      labelStyle: {
       fontSize: 10
       }
    },
 };