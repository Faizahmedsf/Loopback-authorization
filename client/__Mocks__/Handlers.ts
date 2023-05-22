import { rest } from 'msw'

export const handlers = [
    rest.get("http://localhost:8001/getuser" , (req:any , res:any, ctx:any) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    id: 16,
                    firstname: "paul",
                    middlename: "walker",
                    lastname: "diesel",
                    email: "support@sourcefuse.com",
                    phone: "7877777777",
                    role: "SuperAdmin",
                    address: "dddddd" 
                }
              ])
        )
    }),
]