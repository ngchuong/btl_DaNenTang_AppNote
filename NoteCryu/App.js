import React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Header } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
console.disableYellowBox=true;


import Home from './src/Home';
import showToDo from './src/showToDo';
import AddItem from './src/AddItem';
import addTodo from './src/addTodo';
import UpdateItem from './src/UpdateItem';
import updateToDo from './src/updateToDo';

const add = createBottomTabNavigator({
  AddItem: AddItem,
  addTodo: addTodo,
})
const show = createMaterialTopTabNavigator({
  Home:Home,
  showToDo:showToDo,
  },{
    tabBarOptions: {
      style:{
        backgroundColor:'#ff6f5e',
      }
    },
    navigationOptions:{
      header:null,
    }
  })
const MainNavigator = createStackNavigator({
  show:show,
  blabla2: add,
  UpdateItem: UpdateItem,
  updateToDo: updateToDo,
}, 
{
  initialRouteName:'show',
});

const App = createAppContainer(MainNavigator);

export default App;