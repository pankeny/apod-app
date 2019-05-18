import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import {firebase} from '../components/logon/authentication_logic';
import Apod from '../components/apod/Apod.js'

export default class SelectedApodScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apodData: '',
        };
    }

    componentDidMount() {
        this.getNewApod(this.props.navigation.state.params.apodDate);
    }

    getNewApod(date) {
        firebase.app.database().ref(`apods/${date}`).on('value', (snapshot) => {
            this.setState({
                apodData: snapshot.val()
            });
        });
    }

    render() {
        if (this.state.apodData == '') {
            return <ActivityIndicator size="large" color="#2980b6" style={styles.loadingCircle} />
        }else {
            return (
                <ScrollView style={styles.container}>
                    <Apod title={this.state.apodData.title} date={this.state.apodData.date}
                          url={this.state.apodData.url}
                          description={this.state.apodData.explanation}
                          mediaType={this.state.apodData.media_type}
                          likes={this.state.apodData.likes}/>
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
    }
});