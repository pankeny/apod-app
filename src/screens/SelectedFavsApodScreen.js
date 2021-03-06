import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    BackHandler,
    TouchableOpacity,
    Text
} from 'react-native';
import { firebase } from '../components/logon/authentication_logic';
import Apod from '../components/apod/Apod.js'
import Icon from 'react-native-vector-icons/Ionicons';
import UserApod from "../components/apod/userapod/UserApod";

export default class SelectedFavsApodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apodData: '',
            type: ''
        };
    }

    componentDidMount() {
        if (this.checkIfItsNasaApod()) {
            this.getNewApod(this.props.navigation.state.params.apodDate);
        } else {
            this.setState({
                apodId: this.props.navigation.state.params.apodId
            });
            this.getUserApod(this.props.navigation.state.params.apodId);
        }
        BackHandler.addEventListener('hardwareBackPress', this.goBackToFavs);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.goBackToFavs);
    }

    checkIfItsNasaApod() {
        return typeof this.props.navigation.state.params.apodId === "undefined";
    }

    goBackToFavs = () => {
        this.props.navigation.navigate('Favourites');
        return true;
    };

    getUserApod(id) {
        firebase.app.database().ref(`userApods/${id}`).on('value', (snapshot) => {
            this.setState({
                apodData: snapshot.val(),
                type: 'userApod'
            });
        });
    }

    getNewApod(date) {
        firebase.app.database().ref(`apods/${date}`).on('value', (snapshot) => {
            this.setState({
                apodData: snapshot.val(),
                type: 'nasaApod'
            });
        });
    }

    render() {
        if (this.state.apodData === '') {
            return <ActivityIndicator size="large" color="#841584" style={styles.loadingCircle} />
        } else {
            var apod;
            if(this.state.type === 'userApod') {
                apod = <UserApod id={this.state.apodId}
                                 title={this.state.apodData.title}
                                 date={this.state.apodData.date}
                                 url={this.state.apodData.url}
                                 description={this.state.apodData.explanation}
                                 likes={this.state.apodData.likes}
                                 author={this.state.apodData.author}/>
            }else {
                apod = <Apod
                    title={this.state.apodData.title}
                    date={this.state.apodData.date}
                    url={this.state.apodData.url}
                    description={this.state.apodData.explanation}
                    mediaType={this.state.apodData.media_type}
                    likes={this.state.apodData.likes} />;
            }

            return (
                <ScrollView style={styles.container}>
                    <TouchableOpacity
                        onPress={() => this.goBackToFavs()}
                        style={styles.btnContainer}
                    >
                        <Icon name='ios-arrow-back' color={"#fff"} size={24} />
                        <Text style={styles.btn}>Back to favourites</Text>
                    </TouchableOpacity>

                    {apod}
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2c3e50"
    },
    loadingCircle: {
        flex: 1,
        backgroundColor: "#2c3e50"
    },
    btnContainer:{
        flex:1,
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20
    },
    btn:{
        color:"#fff",
        flex: 1,
        fontSize:20,
        marginLeft:15,
        justifyContent: 'flex-start',
    }
});