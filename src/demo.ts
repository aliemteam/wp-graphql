import WPGraphQL from './index';

const transport = new WPGraphQL('http://demo.wp-api.org/wp-json/wp/v2');

transport.send(`
    {
        post(id: 470) {
            slug
        }
        posts(context: view, orderby: "id", order: "asc", per_page: 1) {
            id
        }
        pages {
            title
            id
        }
        page(id: 292) {
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
