const fetch = require('node-fetch');

fetch(`http://localhost:3000/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
    }),
})
    .then(result => result.json())
    .then(result => {
        // here we're filtering out any type information unrelated to unions or interfaces
        result.data.__schema.types = result.data.__schema.types.filter(
            type => type.possibleTypes !== null,
        );
        console.log(JSON.stringify(result.data, undefined, 4));
    });
