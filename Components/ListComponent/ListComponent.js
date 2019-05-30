import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import { styles } from './styles';

const genericThumb = 'https://api.adorable.io/avatars/285/abott@adorable.png';
export default class ListComponent extends Component {
    render(){
        let { data, navigation: { navigate } } = this.props;
        return(
            <View style= { styles.container }>
                <View style={ styles.innerEl }>
                    <FlatList
                        data={ data }
                        renderItem={({item})=>{
                                let thumb = (item.thumbnail) !== undefined && (item.thumbnail).length > 8?item.thumbnail:genericThumb;
                                return (
                                <TouchableHighlight
                                    onPress={ ()=>{
                                        navigate('Second', { title: item.title, post: item })
                                    } }
                                    style={ styles.postRow }
                                >
                                    <View style={styles.postInnerContainer}>
                                        <Image style={ styles.postImage } source={{uri: thumb}}/>
                                        <Text style={ styles.PostText }>{item.title}</Text>
                                    </View>
                                </TouchableHighlight> 
                                );
                            }
                        }
                    />
                </View>
            </View>
        )
    }
}

ListComponent.defaultProps = {
    data: []
}

ListComponent.propTypes = {
    data: PropTypes.array.isRequired,
    onPress: PropTypes.func
}