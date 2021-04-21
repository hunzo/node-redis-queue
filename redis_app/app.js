const redis =require('redis')
const ex =require('express')

app = ex()

KEY = 'test-key'

// let redisNotReady = true
const redisClient = redis.createClient({
    host: 'redis',
    port: 6379
})


app.get('/push', (req, res) => {
    redisClient.rpush(KEY, ['l1', 'l2'], (err, reply) => {
        console.log(` length: ${reply}`)
        res.json({
            'key': 'test-key',
            'length': reply
        })
    })
})

app.get('/getqueue', (req, res) => {
    redisClient.lrange(KEY, 0, -1, (err, reply) => {
        res.json({
            result: reply
        })
    })
})

app.get('/test', (req, res) => {
    let x = redisClient.lrange(KEY, 0, -1, (err, reply) => {
        return reply
    })

    res.json({
        test: x
    })
})

app.get('/lpop', (req, res) => {
    redisClient.lpop(KEY, (err, reply) => {
        res.json({
            method: 'lpop',
            pop: reply
        })
    })
})

app.get('/rpop', (req, res) => {
    redisClient.rpop(KEY, (err, reply) => {
        res.json({
            method: 'rpop',
            pop: reply
        })
    })
})

app.get('/pop', (req, res) => {
    redisClient.rpoplpush(KEY, (err, reply) => {
        res.json({
            rpoplpush: reply,
            method: 'rpoplpush',
            host: process.env.HOSTNAME
        })
    })
})


app.listen(process.env.PORT || 3000)

