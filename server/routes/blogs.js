import sql from "../services/database.js"
import { randomUUID } from 'node:crypto'

/**
 * Encapsulates the routes
 * @param {import('fastify').FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
    fastify.get('/blogs', async (request, reply) => {
        
        // return all blogs into a blogs table
        const blogs = await sql`
            select * from blogs;
        `
        return blogs
    })

    fastify.get('/blogs/:uuid', async (request, reply) => {
        
        // Get blogs whos name matches the uuid
        const uuid = request.params.uuid

        const blog = await sql`
            select * from blogs where id = ${uuid};
        `

        return blog
    })

    fastify.post('/blogs', async (request, reply) => {
        
        // TODO: create a blog from the request body
        const payload = {
            ...request.body,
            id: randomUUID(),
            created_date: new Date(Date.now()).toISOString(),
            last_updated: new Date(Date.now()).toISOString()
        }
        console.log ('Chase', request.body)
        // wrap insert in database trasaction 
        await sql.begin(async (sql) => {
            await sql`
                insert into blogs ${
                    sql(payload, 'id', 'title', 'topic', 'content', 'author', 'created_date','last_updated')
                }
            `

        })
        
        const blog = await sql`
            select * from blogs Where id = ${payload.id}
        `

        return blog
    })

    fastify.patch('/blogs', async (request, reply) => {
        // update an exiting blog by ID
        const payload = {
            ...request.body,
            last_updated: new Date(Date.now()).toISOString()
        }

        const uuid = request.body.id
        await sql.begin(async (sql) => {
            await sql`
                update blogs set ${
                    sql(payload, 'title', 'topic', 'content', 'author', 'last_updated')
                }
                where id = ${uuid}
            `
        })

        const blog = await sql`
            select * from blogs Where id = ${payload.id}
        `

        return blog
        
    })

    fastify.delete('/blogs/:uuid', async (request, reply) => {
        // TODO: delete a single blog
        const uuid = request.params.uuid

        try {
            await sql`
                delete from blogs where id = ${uuid}
            `
            reply.code(200).type('application/json').send({ message: 'Records successfuly removed'})
        } catch(error) {
            reply.code(404).type('application/json').send({ message: 'Requested blog entry not found.'})
        }
    })
  }
  
  //ESM
  export default routes;