import React, { Component } from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import { firebase } from '../../logon/authentication_logic';
import ApodPic from '../ApodPic.js';
import ApodVideo from '../ApodVideo.js';
import UserApodComments from './UserApodComments.js';
import Icon from 'react-native-vector-icons/Ionicons';

export default class UserApod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            star: 'ios-star-outline',
            heart: 'ios-heart-empty'
        };
    }

    componentWillReceiveProps() {
        this.componentDidMount();
    }

    componentDidMount() {
        if(this.isUserLoggedIn()) {
            if (this.checkIfUserAlreadyLikedThisApod()) {
                this.setState({ heart: 'ios-heart' })
            } else {
                this.setState({ heart: 'ios-heart-empty' })
            }
            if (this.hasUserApodInFavourites()) {
                this.setState({ star: 'ios-star' });
            } else {
                this.setState({ star: 'ios-star-outline' });
            }
        } else {
            this.setState({
                heart: 'ios-heart-empty',
                star: 'ios-star-outline'
            });
        }
    }

    updateLikes(id) {
        if (this.isUserLoggedIn()) {
            if (!this.checkIfUserAlreadyLikedThisApod()) {
                var likes = 0;
                var likesDb = firebase.app.database().ref(`userApods/${id}/likes`);
                likesDb.on('value', res => {
                    likes = res.val();
                });
                likes++;
                this.props.likes = likes;
                this.setState({ heart: 'ios-heart' });
                likesDb.set(likes);
                var userId = firebase.auth.currentUser.uid;
                var userLikeDb = firebase.app.database().ref(`users/likes/${userId}/${id}`);
                userLikeDb.set(id);
            } else {
                this.setState({ heart: 'ios-heart' })
            }
        } else {
            Alert.alert("Log in to like an APOD.")
        }
    }

    checkIfUserAlreadyLikedThisApod() {
        var exists = false;
        if (this.isUserLoggedIn()) {
            var userId = firebase.auth.currentUser.uid;
            var id = this.props.id;
            firebase.app.database().ref(`users/likes/${userId}/${id}`).on('value', (snapshot) => {
                if (snapshot.exists()) {
                    exists = true;
                    this.setState({ heart: 'ios-heart' });
                }
                else {
                    exists = false;
                    this.setState({ heart: 'ios-heart-empty' });
                }
            });
        }
        return exists;
    }

    updateFavourites(id) {
        if (this.isUserLoggedIn()) {
            var userId = firebase.auth.currentUser.uid;
            var favs = firebase.app.database().ref(`users/favourites/${userId}/${id}`);
            if (this.hasUserApodInFavourites()) {
                favs.remove();
                this.setState({ star: 'ios-star-outline' })
            } else {
                favs.update({ 'title': this.props.title});
                favs.update({ 'url': this.props.url});
                favs.update({ 'date': this.props.date});
                favs.update({ 'id': id});
                this.setState({ star: 'ios-star' });
            }
        } else {
            Alert.alert("Log in to add an APOD to favourites.")
        }
    }

    hasUserApodInFavourites() {
        var exists = false;
        if (this.isUserLoggedIn()) {
            var userId = firebase.auth.currentUser.uid;
            var id = this.props.id;
            firebase.app.database().ref(`users/favourites/${userId}/${id}`).on('value', (snapshot) => {
                if (snapshot.exists()) {
                    exists = true;
                    this.setState({ star: 'ios-star' });
                }
                else {
                    exists = false;
                    this.setState({ star: 'ios-star-outline' });
                }
            });
        }
        return exists;
    }

    isUserLoggedIn() {
        return firebase.auth.currentUser != null;
    }

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.topGrid}>
                    <Icon style={{ marginRight: 25 }} name={this.state.star} color='#92CBC5' size={28}
                          onPress={() => this.updateFavourites(this.props.id) } />
                    <Text style={{ marginTop: 6, color: "#fff" }}> {this.props.date} </Text>
                </View>
                <Text style={{ marginTop: 6, color: "#fff" }}> Author: {this.props.author} </Text>
                <Text style={styles.title}> {this.props.title} </Text>
                <ApodPic url={this.props.url} />
                <View style={styles.infoContainer}>

                    <View style={styles.grid}>
                        <Icon style={{ marginRight: 10 }} name={this.state.heart} color='#92CBC5' size={24}
                              onPress={() =>  this.updateLikes(this.props.id) } />

                        <Text style={{ marginLeft: 10, marginTop: 3, color: '#fff' }}> {this.props.likes} </Text>
                    </View>

                    <Text style={styles.description}>  {this.props.description} </Text>
                </View>
                    <UserApodComments apodId={this.props.id} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    topGrid: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 12,
        marginBottom: 12,
        marginRight: 20,
        marginLeft: 20,
        flex: 1,
        flexDirection: 'row'
    },
    grid: {
        marginTop: 12,
        marginBottom: 12,
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    infoContainer: {
        margin: 5,
        textAlign: 'justify',
        color: "white"
    },
    description: {
        color: 'white',
        textAlign: 'justify',
        marginLeft: 6,
        marginRight:6
    },
    title: {
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
        color: '#92CBC5'
    },
    date: {
        marginBottom: 5
    }
});
