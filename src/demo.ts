import WPGraphQL from './index';

const transport = new WPGraphQL('http://demo.wp-api.org/wp-json/wp/v2');

transport.send(`
    {
        post(id: 470) {
            slug
        }
        posts(context: view) {
            title
        }
        pages {
            title
            id
        }
        page(id: 292) {
            title
            id
        }
    }
`).then((response: any) => {
    console.log(JSON.stringify(response, null, 2)); // tslint:disable-line
})
.catch(e => console.error(e));
