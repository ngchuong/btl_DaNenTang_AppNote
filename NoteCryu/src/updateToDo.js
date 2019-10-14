import React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, TouchableWithoutFeedback, FlatList, CheckBox } from 'react-native';

import {createAppContainer, ScrollView} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class UpdateTodo extends React.Component{
  static navigationOptions = {
    headerTitle: <Text style = {{fontWeight:'bold', fontSize:18, color:'#1a1a1a'}}>SỬA GHI CHÚ</Text>
  };

  constructor(){
    super();
    this.state = {
                  id:'',
                  title:'',
                  data:'',
                }
  }
  componentDidMount(){
    this.setState({
      id: this.props.navigation.state.params.id,
      title: this.props.navigation.state.params.title,
      data: this.props.navigation.state.params.data,
    })
    //alert(this.props.navigation.state.params.title);
  }
  addItem() {
    const data = [
        ...this.state.data, 
        {content:'', isChecked: false}
    ];
    this.setState({
        data,
    });
    }
  updateData(){
    fetch('https://nguyenhai.xyz/AppNote/toDo/updateToDo.php',{
      method: 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        id:this.state.id,
        title:this.state.title,
        data:this.state.data,
      }),
    }).then((response) =>{
      this.props.navigation.navigate('showToDo');
    }).catch((error)=>{
      console.error(error);
    });
  }
  render(){
    return(
      <View style={styles.container}>
        <View style = {styles.form}>

          <ScrollView>
            <TextInput 
              style= {styles.Input1} 
              onChangeText = {value => this.setState({title:value})} 
              value={this.state.title} 
              placeholder='Tiêu đề' />

            <FlatList
                style={{marginBottom:15}}
                extraData={this.state} //tự động load lại dữ liệu
                data={this.state.data}
                renderItem={({item, index})=>(
                  <View style={{flexDirection:'row', alignItems:'center'}}> 
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <CheckBox 
                            style={{color: '#b2b2b2'}} 
                            value={Boolean(Number(item.ischecked))} 
                            onValueChange={()=>{
                              var temp = Boolean(Number(item.ischecked));
                              temp =!temp;
                              item.ischecked = temp;                    
                              this.forceUpdate();
                        }}/>
                        <TextInput
                            style={[styles.input, (Boolean(Number(this.state.data[index].ischecked)))? styles.checked : null]}
                            onChangeText={
                                value => {
                                    this.state.data[index].content = value
                                    this.forceUpdate();
                                }
                            }
                            value={item.content} />
                        <Icon
                            style={{padding: 14}}
                            onPress={()=> {
                                this.state.items.splice(index, 1)
                                this.forceUpdate();
                            }}
                            name="times" size={16} color="#606163" 
                        />
                        {/* <Text style={[styles.default,(Boolean(Number(item.ischecked)))? styles.checked : null]}>{item.content}</Text> */}
                    </View>
                  </View>
                )}
              />
          </ScrollView>
            <TouchableWithoutFeedback
                onPress={() => this.addItem()}>
                <View style={{flexDirection:'row', alignItems: 'center',padding: 1}}>
                    <Icon3 name="add" size={28} color="#878789" fontWeight="bold" />
                    <Text style={{marginLeft: 10, fontWeight: 'bold', color: '#b2b2b2'}}>Thêm việc</Text>
                </View>
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
  },
  checked:{
    textDecorationLine: 'line-through',
    color: '#b2b2b2'
  },
  input:{
      flex:1,
  }
})