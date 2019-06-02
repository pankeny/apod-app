import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class UserEmail extends Component {
    render() {
        return (
            <View >
                <Text style={styles.user}>{this.props.user}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    user:{
        marginTop:30,
        color: "#92CBC5",
        fontSize:20,
    }
});