import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, NavigatorIOS } from 'react-native';
import Home from './components/Home';

export default class App extends React.Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: Home,
                    title: 'Home',
                }}
                style={styles.navigator}
            />
        );
      }
}

const styles = StyleSheet.create({
    navigator: {
        flex: 1,
    }
});
