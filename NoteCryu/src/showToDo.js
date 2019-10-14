import React from 'react';
import {Text,
        View,
        ActivityIndicator,
        StyleSheet,
        FlatList,
        TouchableNativeFeedback,
        CheckBox,
        Alert
    } from 'react-native';

    
export default class showToDo extends React.Component{
    static navigationOptions = {
        tabBarLabel: 'Việc phải làm',
        headerTitle: 
        <View style = {{flexDirection:'row', alignItems:'center', marginLeft:10}}>
          <Text style = {{fontWeight:'bold', fontSize:18, color:'#1a1a1a'}}>TẤT CẢ VIỆC PHẢI LÀM</Text>
        </View>
    };
    constructor(props){
        super(props);
        this.state ={ 
                    isLoading: false,
                    id:'',
                    dialogVisible:false,
        }
      }
    componentDidMount(){
        this.focusListener = this.props.navigation.addListener('didFocus', () => {this.reLoad()})
        return fetch('https://nguyenhai.xyz/AppNote/toDo/showToDo.php')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson,
            });
          })
          .catch((error) =>{
            //alert(error)
          });
      }
    reLoad(){
    return fetch('https://nguyenhai.xyz/AppNote/toDo/showToDo.php')
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
    sendToDo(id, title, data){
        //alert(id);
        this.props.navigation.navigate('updateToDo', {
          id:id,
          title:title,
          data:data
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
            {text: 'Có', onPress: () => this.deleteToDo(id)},
        ],
        {cancelable: false},
      );
    }
    deleteToDo(id){
        //alert(id);
        fetch('https://nguyenhai.xyz/AppNote/toDo/delToDo.php',{
          method: 'POST',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            id:id
          }),
        }).then((response) =>{
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
                    onPress={()=>this.sendToDo(item.id, item.title, item.data)}
                    onLongPress = {()=>this.dialog(item.id)}
                    >
                    <View style = {styles.item}>
                      <Text style = {styles.title}>{item.title}</Text>

                      <FlatList
                        style={{marginBottom:15}}
                        extraData={this.state} //tự động load lại dữ liệu
                        data={item.data}
                        renderItem={({item})=>(
                            <View style={{flexDirection:'row'}}>
                                <CheckBox
                                    value={Boolean(Number(item.ischecked))}
                                    onValueChange={() => {
                                        var temp = Boolean(Number(item.ischecked));
                                        temp =!temp;
                                        item.ischecked = temp;                    
                                        this.forceUpdate();
                                    }}
                                />
                                <Text style={[styles.default,(Boolean(Number(item.ischecked)))? styles.checked : null]}>{item.content}</Text>
                            </View>
                        )}
                      />
                      <Text style = {styles.time}>Ngày sửa: {item.timeUpdate} / Ngày tạo: {item.created}</Text>
                    </View>
                  </TouchableNativeFeedback>
                )}
                keyExtractor={({id}, index) => id}
              />
              <TouchableNativeFeedback onPress={()=>this.props.navigation.navigate('addTodo')}>
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
    checked:{
        marginTop:2,
        textDecorationLine: 'line-through',
        color: '#b2b2b2'
    },
    default:{
        marginTop:2
    }
  })