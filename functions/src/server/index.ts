import * as express from 'express';
import * as graphqlHTTP from 'express-graphql'
import schema from './schema';
import * as cors from 'cors';

export default (database, search) => {
    const app = express();
    app.use(cors());
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
        context: {
            database: database,
            search: search
        }
    }));
    return app;
}
