import {GraphQLError} from "graphql";

class ResourceNotFoundError extends GraphQLError {
    constructor() {
        super('Resource Not Found');
    }
}

export {ResourceNotFoundError};
