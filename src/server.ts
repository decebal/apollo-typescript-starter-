import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import express from 'express'
import http from 'http'
import logger from 'morgan'
import schema from './schema'

class Server {
  app: express.Application
  server: http.Server
  apollo: ApolloServer

  constructor() {
    this.app = express()
    this.apollo = new ApolloServer({ schema })
    this.middleware()
    this.routes()
  }

  middleware() {
    this.app.use(logger('dev'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))

    this.apollo.applyMiddleware({
      app: this.app,
    })
  }

  routes() {
    const router = express.Router()

    this.app.use('/', router)
  }

  start(cb = () => null) {
    const port = process.env.PORT || 3000

    this.server = this.app.listen(port, (err?: any) => {
      if (err) {
        throw err
      }
      // tslint:disable-next-line:no-console
      console.log(`🔥 Server running on port ${port}...`)
      cb()
    })
  }

  stop(cb = () => null) {
    if (this.server) {
      this.server.close(cb)
    }
  }
}

export default new Server()
