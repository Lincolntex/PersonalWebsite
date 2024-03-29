import Fastify from 'fastify'
import blogsRout from './routes/blogs.js'


const fastify = Fastify({
  logger: true
})

fastify.register(blogsRout)

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 8080 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

