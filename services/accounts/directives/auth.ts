import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { checkAuthentication } from "./reusable";

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const [_, __, context] = args;
      const user = await checkAuthentication({ context });
      context.user = user?.user;
      return await resolve.apply(this, args);
    };
  }
}
