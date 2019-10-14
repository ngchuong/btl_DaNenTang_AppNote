import React from 'react';
import { Text,
         View, 
         StyleSheet, 
         TextInput,
         TouchableOpacity, 
         TouchableWithoutFeedback } from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default class UpdateItem extends React.Component{
  static navigationOptions = {
    headerTitle: <Text style = {{fontWeight:'bold', fontSize:18, color:'#1a1a1a'}}>SỬA GHI CHÚ</Text>
  };

  constructor(){
    super();
    this.state = {
                  id:'',
                  title:'',
                  content:'',
                }
  }
  blabla(){
    this.refs.content.blur();
    this.refs.content.focus();
  }
  componentDidMount(){
    this.setState({
      id: this.props.navigation.state.params.noteId,
      title: this.props.navigation.state.params.noteTitle,
      content: this.props.navigation.state.params.noteContent,
    })
  }

  updateData(){
    fetch('https://nguyenhai.xyz/AppNote/updateItem.php',{
      method: 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        id:this.state.id,
        title:this.state.title,
        content:this.state.content,
      }),
    }).then((response) =>{
      this.props.navigation.navigate('Home');
    }).catch((error)=>{
      console.error(error);
    });
  }
  render(){
    return(
      <View style={styles.container}>
        <View style = {styles.form}>

          <TextInput 
            style= {styles.Input1} 
            onChangeText = {value => this.setState({title:value})} 
            value={this.state.title} 
            placeholder='Tiêu đề' />

          <TextInput 
            style= {styles.Input2} 
            ref="content" multiline={true} 
            onChangeText = {value => this.setState({content:value})}
            value={this.state.content} 
            placeholder='Nội dung' />

          <TouchableWithoutFeedback onPress={()=>this.blabla()}>
            <View style={{flex:1,}}></View>
          </TouchableWithoutFeedback>

          <TouchableOpacity onPress={()=>this.updateData()} style = {styles.button}>
            <Text style = {styles.innerButton}>Cập nhật ghi chú</Text>
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
  Input1:{
    fontWeight:'bold',
    marginBottom:10,
    fontSize:15,
  },
  Input2:{
    marginBottom:10,
    fontSize:15,
  },
  button:{
    alignItems: 'center',
    backgroundColor: '#FED7E2',
    padding: 10,
    borderRadius:8
  },
  innerButton:{
    fontSize:16,
    fontWeight:'bold',
    color:'#F687B3',
  }
})