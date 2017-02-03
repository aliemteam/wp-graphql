import GraphqlJSTransport from 'lokka-transport-graphql-js';
import schema from './index';

const transport = new GraphqlJSTransport(schema);

transport.send(`
    {
      posts {
          id
      }
    }
`).then((response: any) => {
    console.log(JSON.stringify(response, null, 2)); // tslint:disable-line
});
