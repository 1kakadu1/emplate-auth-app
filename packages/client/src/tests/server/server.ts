import { createServer, Model, Registry } from "miragejs";
import { IUser } from "../../types";
import { ModelDefinition } from "miragejs/-types";
import Schema from "miragejs/orm/schema";

const UserModel: ModelDefinition<IUser> = Model.extend({});

type AppRegistry = Registry<
    {
        user: typeof UserModel;
    },
    {}
>;
type AppSchema = Schema<AppRegistry>;

export function makeServer({ environment = "test" }) {
    return createServer({
        environment,
        models: {
            user: UserModel,
        },

        seeds(server) {
            server.db.loadData({
                users: [
                    {
                        id: 1,
                        name: "test",
                        email: "test@mail.ru"
                    }
                ]
            });
        },

        routes() {
            this.namespace = "api";
            this.get("/users/:id", (schema: AppSchema, request) => {
                const id = request.params.id;
                const data = schema.find("user", id);
                return data;
            })
        },
    });
}