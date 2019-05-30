import React, { Component } from 'react';
import { View, Text, Image, Linking, TouchableHighlight } from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { styles } from './styles';

const genericThumb = 'https://api.adorable.io/avatars/285/abott@adorable.png';

export default class PostDetailComponent extends Component {
    constructor(){
        super();
    }

    static navigationOptions =({navigation})=> ({
        title: "Post Details",
        headerTitleStyle :{
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: 15,
            color: '#FF6D00',
            alignItems: 'center'
        },
        headerStyle:{
            backgroundColor:'white',
        },
    });

    openPage = ()=>{
        let { 
            navigation: { 
                state: { 
                    params : {
                        title,
                        post : {
                            thumbnail,
                            ups,
                            num_comments,
                            preview,
                            id,
                            subreddit
                        }
                    }
                } 
            } 
        } = this.props;

        let regex1 = /\[/gi;
        let regex2 = /]/gi;
        let regex3= / /gi;

        let articleTitle = title.replace(regex1, '').replace(regex2, '').replace(regex3, '_');
        let url = 'https://reddit.com/r/'+subreddit+'/comments/'+id+'/'+articleTitle+'/';
        Linking.openURL(url);
        //console.log(articleTitle);
    }

    render(){
        let { 
            navigation: { 
                state: { 
                    params : {
                        title,
                        post : {
                            thumbnail,
                            ups,
                            num_comments,
                            preview,
                            id,
                            subreddit
                        }
                    }
                } 
            } 
        } = this.props;
        let image = thumbnail && thumbnail.length > 8? thumbnail : genericThumb;
        //console.log(preview)
        return(
            <View style={ styles.container }>
                <Text style={ styles.commentsCount }>{ 'Ups: ' + ups + ' | Comments: ' + num_comments }</Text>

                <Text style={ styles.title }>{ title }</Text>

                <Image style= { styles.detailImage } source={{uri: image}} />

                <TouchableHighlight style={ styles.button } onPress={ ()=>this.openPage() } >
                    <Text style={ styles.buttonText }>Open Page</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

PostDetailComponent.defaultProps = {
    post: {}
}

PostDetailComponent.propTypes = {
    post: PropTypes.object.isRequired
}