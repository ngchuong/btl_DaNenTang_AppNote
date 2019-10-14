import React from 'react';
import { Text,
        View,
        StyleSheet,
        ActivityIndicator,
        FlatList,
        TouchableNativeFeedback,
        TouchableOpacity,
        onLongPress,
        Alert
       } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { ConfirmDialog } from 'react-native-simple-dialogs';
import {withNavigationFocus} from 'react-navigation';

class Home extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Ghi chú',
    headerTitle: 'Tất cả ghi chú'
  };
  constructor(props){
    super(props);
    this.state ={ 
                isLoading: true,
                id:'',
                dialogVisible:false}
  }

  componentDidMount(){
    this.focusListener = this.props.navigation.addListener('didFocus', () => {this.reLoad()})
    return fetch('https://nguyenhai.xyz/AppNote/api.php')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });

      })
      .catch((error) =>{
        alert(error)
      });
  }
  reLoad(){
    return fetch('https://nguyenhai.xyz/AppNote/api.php')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });

      })
      .catch((error) =>{
        alert(error)
      });
  }
  sendData(id, title, content){
    //alert(id);
    this.props.navigation.navigate('UpdateItem', {
      noteId:id,
      noteTitle:title,
      noteContent:content
    });
  }
  dialog(id){
    Alert.alert(
      'Xác nhận',
      'Bạn có thực sự muốn xóa?',
      [
          {
          text: 'Không',
          style: 'cancel',
          },
          {text: 'Có', onPress: () => this.deleteItem(id)},
      ],
      {cancelable: false},
    );
  }
  deleteItem(id){
    //alert(id);
    fetch('https://nguyenhai.xyz/AppNote/deleteItem.php',{
      method: 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        id:id
      }),
    }).then((response) =>{
      this.setState({dialogVisible:false});
      this.reLoad();
    }).catch((error)=>{
      alert(error);
    });
    
  }
  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      
      <View style={styles.container}>
        
        <FlatList 
          refreshing={false}
          onRefresh={()=>this.reLoad()}

          data={this.state.dataSource}
          renderItem={({item}) => (
            <TouchableNativeFeedback 
              onPress={()=>this.sendData(item.id, item.title, item.content)}
              onLongPress = {()=>this.dialog(item.id)}
              >
              <View style = {styles.item}>
                <Text style = {styles.title}>{item.title}</Text>
                <Text style = {styles.content}>{item.content}</Text>
                <Text style = {styles.time}>Ngày sửa: {item.timeUpdate} / Ngày tạo: {item.created}</Text>
              </View>
            </TouchableNativeFeedback>
          )}
          keyExtractor={({id}, index) => id}
        />
        <TouchableNativeFeedback onPress={()=>this.props.navigation.navigate('AddItem')}>
          <View style = {styles.fab1}>
            <Text style = {{color:'#fff', fontWeight:'bold', fontSize:20}}>+</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#E2E8F0',
    paddingTop:10 //
  },
  item:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,

    borderRadius:8,
    backgroundColor:'#fff',
    marginLeft:10,
    marginRight:10,
    marginBottom:10
  },
  title:{
    marginLeft:10,
    marginRight:10,
    fontWeight:'bold',
    fontSize:16,
    //borderBottomColor: '#CBD5E0',
    //borderBottomWidth:1,
  },
  content:{
    marginLeft:10,
    marginRight:10,
    marginBottom:40,
    fontSize:14,
  },
  time:{
    fontSize:10,
    marginLeft:10,
    marginRight:10,
    borderTopColor:'#CBD5E0',
    borderTopWidth:1,
  },
  fab1:{
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor:'#ff6f5e',
    position:'absolute',
    bottom:10,
    right:10,
    justifyContent:'center',
    alignItems:'center',
  },
})
export default withNavigationFocus(Home);