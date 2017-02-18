# wp-graphql [![Build Status](https://travis-ci.org/aliemteam/wp-graphql.svg?branch=master)](https://travis-ci.org/aliemteam/wp-graphql) [![codecov](https://codecov.io/gh/aliemteam/wp-graphql/branch/master/graph/badge.svg)](https://codecov.io/gh/aliemteam/wp-graphql)

> Client-side GraphQL convenience wrapper for the WordPress REST API

## Why?

- Declarative data fetching.
- Human-readable queries/mutations.
- Zero nested callbacks or long promise chains.

## Install

```
$ npm install --save wp-graphql
```

## Usage

### Load and localize script

When loading the script, localize it with a `rest_url` and generated `nonce` (only required if you need to make authenticated requests).

```php
<?php

function load_scripts() {
    wp_register_script('myscript', 'path/to/myscript.js');
    wp_localize_script('myscript', 'AUTH', array(
        root => esc_url_raw(rest_url()),
        nonce => wp_create_nonce('wp_rest'),
    ));
    wp_enqueue_script('myscript');
}
add_action('wp_enqueue_scripts', 'load_scripts');

```

### Create and use instance

Once an instance is created, you are able to query and mutate data using standard GraphQL syntax.

```js
// myscript.js

import WPGraphQL from 'wp-graphql';

const transport = new WPGraphQL(AUTH.root, { nonce: AUTH.nonce });

transport.send(`
    mutation {
        addPost(title: "My New Post", content: "My post content.") {
            title
            content
        }
    }
    query {
        user(id: 1, context: edit) {
            id
            name
            email
        }
        firstThreeUsers: users(per_page: 3, orderby: id) {
            name
        }
        settings {
            title
        }
    }
`).then(data => console.log(data));
```
<details>
<summary><strong>Result</strong></summary>
<pre>
{
    addPost: {
        title: 'My New Post',
        content: 'My post content.'
    },
    user: {
        id: 1,
        name: 'root',
        email: 'admin@wordpress.com',
    },
    firstThreeUsers: [
        { name: 'Bob' },
        { name: 'Sue' },
        { name: 'Jan' },
    ],
    settings: {
        title: 'My WordPress Site',
    },
}
</pre>
</details>

## API

The preloaded `queries` and `mutations` are listed below with their **required** parameters where applicable. For a list of **all** available parameters, see the definitions located in the `./src/models/<type>` directory of this repo.

**Note:** Some of the parameters are `enum` type (e.g. `context`). Do not surround these in quotes when performing your queries/mutations. Additionally, parameters of type `String` must be surrounded in **double quotes** (`"`).

### Queries

Query | Description
---|---
`categories` |  Fetch a list of categories.
`category(id: Int!)` | Fetch a single category by ID.
`comments` | Fetch a list of comments.
`comment(id: Int!)` | Fetch a single comment by ID.
`mediaList` | Fetch a list of media items.
`media(id: Int!)` | Fetch a single media item by ID.
`pages` | Fetch a list of pages.
`page(id: Int!)` | Fetch a single page by ID.
`postStatuses` | Fetch a list of post statuses.
`postStatus(id: PostStatus!)` | Fetch a single post status by name.
`postTypes` | Fetch a list of post types.
`postType(slug: String!)` | Fetch a post type by slug.
`posts` | Fetch a list of posts.
`post(id: Int!)` | Fetch a single post by ID.
`revisions(id: Int!)` | Fetch a list of revisions by post ID.
`revision(id: Int!, parentId: Int!)` | Fetch a single revision by revision ID and parent post ID.
`settings` | Fetch site settings.
`tags` | Fetch a list of tags.
`tag(id: Int!)` | Fetch a single tag by ID.
`taxonomies` | Fetch a list of taxonomies.
`taxonomy(slug: String!)` | Fetch a single taxonomy by slug.
`users` | Fetch a list of users.
`user(id: Int!)` | Fetch a single user by ID.
`me` | Fetch the currently logged in user.


### Mutations

Mutation | Description
---|---
`addCategory(name: String!)` | Create a new category.
`updateCategory(id: Int!)` | Update a category by ID.
`deleteCategory(id: Int!)` | Delete a category by ID.
`addComment(content: String!)` | Create a new comment.
`updateComment(id: Int!)` | Update a comment by ID.
`deleteComment(id: Int!)` | Delete a comment by ID.
`addMedia(file: String!, filename: String!)` | Create a new media item. **Note:** `file` must be of type `Blob`, `File`, or `ArrayBuffer`.
`updateMedia(id: Int!)` | Update media by ID.
`deleteMedia(id: Int!)` | Delete media by ID.
`addPage()` | Create a new page.
`updatePage(id: Int!)` | Update a page by ID.
`deletePage(id: Int!)` | Delete a page by ID.
`addPost(title: String!, content: String!, excerpt: String!)` | Create a new post. **Note:** Only one of `title`, `content`, or `excerpt` is required for a sucessful request.
`updatePost(id: Int!)` | Update a post by ID.
`deletePost(id: Int!)` | Delete a post by ID.
`deleteRevision(id: Int!, parentId: Int!)` | Delete a single revision by revision ID and parent post ID.
`updateSettings()` | Update site settings.
`addTag(name: String!)` | Create a new tag.
`updateTag(id: Int!)` | Update a tag by ID.
`deleteTag(id: Int!)` | Delete a tag by ID.
`addUser(email: String!, password: String!, username: String!)` | Create a new user.
`updateUser(id: Int!)` | Update a user by ID.
`deleteUser(id: Int!)` | Delete a user by ID.


## Advanced Usage

TODO: ...

## Limitations

The primary limitation of this library is that it only provides a convenient way to fetch and mutate data over top of the existing REST API on the **client side**. Because of this, the **primary benefit of GraphQL**, querying and mutating data in a single round trip, is lost.

