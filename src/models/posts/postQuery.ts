import * as axios from 'axios';
import { GraphQLList } from 'graphql';
import { postType } from './postType';

const BASE_URL = 'http://demo.wp-api.org/wp-json/wp/v2';

function fetchResponseByURL(relativeURL: string) {
  return axios.get(`${BASE_URL}${relativeURL}`).then(res => res.data);
}

function fetchPosts() {
  return fetchResponseByURL('/posts');
}

export const postQuery: any = {
    posts: {
        type: new GraphQLList(postType),
        resolve: fetchPosts,
    },
};
