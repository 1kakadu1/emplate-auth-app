import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { API_URL } from '../../services/api'
import { USERS_MOCK } from '../mocks/user.mock'

interface LoginBody {
    id: number
}
export const handlers = [
    rest.get<LoginBody, any>(`${API_URL}/users/:id`, async (req, res, ctx) => {
        console.log("SERVE REQ", `${API_URL}/users/:id`);
        const { id } = req;
        const user = USERS_MOCK.find(user => user.id.toString() === id.toString());

        if (user === undefined) {
            return res(
                ctx.json({
                    data: {
                        error: "Not found"
                    }
                }),
                ctx.status(404)
            )
        }

        return res(
            ctx.status(200),
            ctx.json({ data: { user: user } })
        )
    }),
]

export const server = setupServer(...handlers);
//export const worker = setupWorker(...handlers)