import { MongoClient } from "mongodb";
require('dotenv').config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)

const connect = async () => {
    await client.connect()
    return client.db('test')
}

const disconnect = async () => {
    await client.close()
}

export {connect, disconnect}