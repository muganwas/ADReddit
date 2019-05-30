import React, { Component } from 'react';
import { View, Text, Image, Picker, StatusBar } from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { styles } from './styles';
import PostsComponent from '../PostsComponent/PostsComponent';

export default class BaseComponent extends Component {
    constructor(){
        super();
        this.state = {
            category: 'food',
            limit: 1
        }
    }

    static navigationOptions =({navigation})=> ({
        headerLeft: <Image style={ styles.navLogo } source={require('./images/promo_graphic.png')} />,
        headerTitleStyle :{
            textAlign: 'center',
            justifyContent: 'center',
            color: '#FF6D00',
            alignItems: 'center'
        },
        headerStyle:{
            backgroundColor:'white',
        },
    })

    changeCategory=(value)=>{
        //console.log(value)
        this.setState({
            category: value
        });
    }

    changeLimit=(value)=>{
        this.setState({
            limit: value
        });
    }

    render(){
        let { navigation } = this.props;
        let { category, limit } = this.state;
        //console.log(navigation)
        return(
            <View style= { styles.container }>
                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content"
                />
                <View style={ styles.innerEl }>
                    <Picker
                        selectedValue={ category }
                        onValueChange={ this.changeCategory }
                    >
                        <Picker.Item label="Food" value="food"/>
                        <Picker.Item label="News" value="news"/>
                        <Picker.Item label="Funny" value="funny"/>
                        <Picker.Item label="Movies" value="Movies"/>
                        <Picker.Item label="TIFU" value="tifu"/>
                    </Picker>
                    <Slider 
                        maximumValue={50}
                        minimumValue={1}
                        step={5}
                        value= { limit }
                        onValueChange={ this.changeLimit }
                    />
                    <PostsComponent limit = { limit } category={ category } navigation = { navigation } />
                </View>
            </View>
        )
    }
}