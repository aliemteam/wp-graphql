import WPGraphQL from './index';

const transport = new WPGraphQL('http://localhost:8080/wp-json');

transport.send(`
    mutation {
        createPost(title: "Test New Post", content: "Hello there!") {
            id
            title
            content {
                rendered
                raw
            }
        }
    }
    {
        posts(context: view, orderby: id, order: asc, per_page: 1) {
            id
        }
        pages {
            title
            id
        }
        users {
            name
        }
        user(id: 1) {
            name
            id
        }
    }
`).then((response: any) => {
    console.log(JSON.stringify(response, null, 2)); // tslint:disable-line
})
.catch(e => console.error(e));
