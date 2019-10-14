import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  CheckBox,
  ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

export default class addTodo extends React.Component{
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon2 name="checkbox-active" size={22} color="#5f6769" />
          ),
        tabBarLabel: 'Việc phải làm'
    };
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            items: [
                {value: '', isChecked: true}
            ]
        }
    }
    addItem() {
        const items = [
            ...this.state.items, 
            {value:'', isChecked: false}
        ];
        this.setState({
            items,
        });
    }
    insertToDo(){
        if(this.state.items[0].content===''){
            alert("Không được để trống");
        }else{
            //alert(this.state.title);
            fetch('https://nguyenhai.xyz/AppNote/toDo/addToDo.php',{
            method: 'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                title:this.state.title,
                creatd:this.state.creatd,
                timeUpdate:this.state.timeUpdate,
                data: this.state.items
            }),
            }).then(response =>{
                if(response.status === 200){
                this.props.navigation.navigate('showToDo');
                }else if(response.status === 301){
                alert('fail');
                }
            });
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <ScrollView
                    style={{marginLeft:10, marginTop:10, marginRight:5}}
                    ref = {ref=>this.scrollView=ref} // để khi thêm màn hình tự kéo xuống
                    onContentSizeChange={(contentWidth, contentHight)=>{
                        this.scrollView.scrollToEnd({animated:true});
                    }}>
                    <TextInput 
                        style ={{fontWeight:'bold'}}
                        placeholder='Tiêu đề'
                        onChangeText={value=>this.setState({title:value})}
                        value={this.state.title}
                    />
                    <FlatList
                        extraData={this.state}
                        data={this.state.items}
                        renderItem={({item, index})=>(
                            <View style={{flexDirection: 'row', alignItems: "center"}}>
                                <View style={{flexDirection: 'row', alignItems: "center"}}>
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
                                        style={[styles.input, (Boolean(Number(this.state.items[index].ischecked)))? styles.checked : null]}
                                        onChangeText={
                                            value => {
                                                this.state.items[index].content = value
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
                                        name="times" size={16} color="#606163" />
                                </View>
                            </View>
                        )}
                    />
                    <TouchableWithoutFeedback
                        onPress={() => this.addItem()}>
                        <View style={{flexDirection:'row', alignItems: 'center',padding: 1}}>
                            <Icon3 name="add" size={28} color="#878789" fontWeight="bold" />
                            <Text style={{marginLeft: 10, fontWeight: 'bold', color: '#b2b2b2'}}>Thêm việc</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>

                <View style={{marginBottom:10, marginLeft:10, marginRight:10, justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress={()=>this.insertToDo()} style = {styles.button}>
                        <Text style = {styles.innerButton}>Thêm việc phải làm</Text>
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
    btn: {
        marginTop: 8,
        backgroundColor: "#c93838",
        borderRadius: 16,
        padding: 8,
    },
    checked: {
        textDecorationLine: 'line-through',
        color: '#b2b2b2'
    },
    input: {
        flex: 1,
        fontSize: 18
    },
    button:{
      alignItems: 'center',
      backgroundColor: '#ff6f5e',
      padding: 10,
      borderRadius:12,
    },
    innerButton:{
      fontSize:16,
      fontWeight:'bold',
      color:'#fff',
    },
})

