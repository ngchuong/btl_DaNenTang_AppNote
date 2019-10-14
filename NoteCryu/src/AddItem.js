import React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddItem extends React.Component{
  static navigationOptions = {
    title: 'THÊM GHI CHÚ',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="sticky-note-o" size={26} color="#5f6769" />
    ),
    tabBarLabel: 'Ghi chú'
  };

  constructor(){
    super();
    this.state = {
                  title:'',
                  content:'',
                }
  }
  blabla(){
    this.refs.content.blur();
    this.refs.content.focus();
  }
  insertData(){
    if(this.state.title === '' && this.state.content === ''){
      this.props.navigation.navigate('Home');
    }else{
      
      fetch('https://nguyenhai.xyz/AppNote/addItem.php',{
      method: 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        title:this.state.title,
        content:this.state.content,
      }),
      }).then(response =>{
        if(response.status === 200){
          this.props.navigation.navigate('Home');
        }else if(response.status === 301){
          alert('fail');
        }
      });
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <View style = {styles.form}>

          <TextInput 
            style= {styles.Input} style={{fontWeight:'bold'}}
            onChangeText = {value => this.setState({title:value})} 
            value={this.state.title} 
            placeholder='Tiêu đề' />

          <TextInput 
            style= {styles.Input} 
            ref="content" 
            multiline={true} 
            onChangeText = {value => this.setState({content:value})} 
            value={this.state.content} 
            placeholder='Nội dung' />
          
          <TouchableWithoutFeedback onPress={()=>this.blabla()}>
            <View style={{flex:1,}}></View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{marginBottom:10, marginLeft:10, marginRight:10}}>
          <TouchableOpacity onPress={()=>this.insertData()} style = {styles.button}>
            <Text style = {styles.innerButton}>Thêm ghi chú</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  form:{
    flex:1,
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    marginBottom:20,
  },
  label:{
    color:'#FC8181',
    fontSize:20,
    fontWeight:'bold',
  },
  Input:{
    marginBottom:10,
  },
  button:{
    alignItems: 'center',
    backgroundColor: '#ff6f5e',
    padding: 10,
    borderRadius:12
  },
  innerButton:{
    fontSize:16,
    fontWeight:'bold',
    color:'#fff',
  }
})