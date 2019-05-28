import React, { Component } from 'react';
import { View, ScrollView, Text, Picker } from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types';
import { styles } from './styles';

import ListComponent from '../ListComponent/ListComponent';

export default class Posts extends Component {
    constructor(){
        super();
        this.state = {
            category: 'food',
            limit: 1,
            categoryPosts: []
        }
    }

    componentWillMount(){
        this.fetchSubReddits();
    }

    componentWillReceiveProps(nextProps){
        this.props = {...nextProps};
        this.fetchSubReddits();
    }

    fetchSubReddits=()=>{
        let { category, limit } = this.props;
        let categoryPosts = [];
        const redditCategories = 'https://www.reddit.com/r/'+ category +'/top.json?limit=' + limit;
        axios(redditCategories + limit).then(res=>{
            let { 
                data: {
                    kind,
                    data: {
                    children
                    }
                } 
            } = res;
            let childrenLen = children.length;
            for(let count = 0; count < childrenLen; count++){
                let { 
                    data: {
                        author_fullname,
                        title,
                        thumbnail
                    } 
                } = children[count];
                categoryPosts[count]= {
                    key: "post" + count,
                    author_fullname,
                    title,
                    thumbnail
                }
            }

            this.setState({
                categoryPosts
            });
            //console.log(categoryPosts);
        });
    }

    render(){
        let { categoryPosts } = this.state;
        return(
            <ScrollView syle= { styles.container }>
                <ListComponent data = { categoryPosts } />
            </ScrollView>
        )
    }
}