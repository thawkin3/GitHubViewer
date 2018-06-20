import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, NavigatorIOS, ActivityIndicator } from 'react-native';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            users: null,
            searchInProgress: false,
        };

        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.searchForUser = this.searchForUser.bind(this);
    }

    handleTextInputChange(text) {
        this.setState({
            searchText: text,
        });
    }

    searchForUser() {
        this.setState({
            searchInProgress: true,
        });
        return fetch(`https://api.github.com/search/users?q=${this.state.searchText}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    users: responseJson.items,
                    searchInProgress: false,
                });
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    searchInProgress: false,
                });
            });
    }

    renderUser({item}) {
        return (
            <View style={styles.itemView}>
                <Text style={styles.userListItem}>{item.login}</Text>
            </View>
        );
    }

    FlatListItemSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
      }

    keyExtractor(item, index) {
        return item.login;
    }

    render() {
        const { searchText, users, searchInProgress } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.mainText}>GitHub Viewer</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter username here"
                        onChangeText={this.handleTextInputChange}
                        value={searchText}
                    />
                    <Button
                        onPress={this.searchForUser}
                        title="Search"
                        accessibilityLabel="Click to search for a GitHub user"
                    />
                </View>
                { searchInProgress && (
                    <View style={styles.spinningView}>
                        <ActivityIndicator size="large" />
                    </View>
                )}
                { users && users.length && !searchInProgress && (
                    <View style={styles.flatListView}>
                        <FlatList
                            data={users}
                            renderItem={this.renderUser}
                            ItemSeparatorComponent = {this.FlatListItemSeparator}
                            keyExtractor={this.keyExtractor}
                            contentContainerStyle={styles.flatList}
                        />
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: 80,
        width: '100%',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    mainText: {
        color: '#000',
        fontSize: 48,
        marginBottom: 20,
    },
    textInput: {
        color: '#000',
        fontSize: 24,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        width: 400,
        maxWidth: '80%',
        padding: 10,
        textAlign: 'center',
    },
    spinningView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    flatListView: {
        flex: 1,
        alignItems: 'stretch',
        alignSelf: 'stretch',
    },
    flatList: {
        width: '100%',
    },
    itemView: {
    },
    userListItem: {
        fontSize: 32,
        padding: 10,
        color: '#000',
        backgroundColor: '#efefef',
    }
});

// import React, { Component } from 'react';
// import { AppRegistry, StyleSheet, FlatList, Text, View, Alert } from 'react-native';
 
// export default class Home extends Component {
  
//   constructor(props)
//   {
//     super(props);
 
//     this.state = { FlatListItems: [
//       {key: 'One'},
//       {key: 'Two'},
//       {key: 'Three'},
//       {key: 'Four'},
//       {key: 'Five'},
//       {key: 'Six'},
//       {key: 'Seven'},
//       {key: 'Eight'},
//       {key: 'Nine'},
//       {key: 'Ten'},
//       {key: 'Eleven'},
//       {key: 'Twelve'}
//     ]}
//   }
 
// FlatListItemSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 1,
//           width: "100%",
//           backgroundColor: "#607D8B",
//         }}
//       />
//     );
//   }
 
//   GetItem (item) {
   
//   Alert.alert(item);
 
//   }
 
 
//   render() {
//     return (
 
// <View style={styles.MainContainer}>
  
//        <FlatList
       
//           data={ this.state.FlatListItems }
          
//           ItemSeparatorComponent = {this.FlatListItemSeparator}
 
//           renderItem={({item}) => <Text style={styles.item} onPress={this.GetItem.bind(this, item.key)} > {item.key} </Text>}
//          />
    
    
// </View>
            
//     );
//   }
// }
 
// const styles = StyleSheet.create({
 
// MainContainer :{
 
// // Setting up View inside content in Vertically center.
// justifyContent: 'center',
// flex:1,
// margin: 10
 
// },
 
// item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
 
// });