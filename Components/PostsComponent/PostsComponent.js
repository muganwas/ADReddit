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

                console.log(children[count])
                let { 
                    data: {
                        author_fullname,
                        title,
                        thumbnail,
                        ups,
                        score,
                        num_comments,
                        id,
                        subreddit
                    } 
                } = children[count];
                categoryPosts[count]= {
                    key: "post" + count,
                    author_fullname,
                    title,
                    thumbnail,
                    ups,
                    score,
                    num_comments,
                    id,
                    subreddit
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
        let { navigation } = this.props;
        return(
            <ScrollView style= { styles.container }>
                <ListComponent navigation={ navigation } data = { categoryPosts } />
            </ScrollView>
        )
    }
}