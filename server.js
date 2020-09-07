var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')

var Share = require('./share-model')
var User = require('./user-model')
var Comment = require('./user-model')

var app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))

var connectionString = 'mongodb://JayFrost:yoobee02@shareme-shard-00-00.unopg.mongodb.net:27017,shareme-shard-00-01.unopg.mongodb.net:27017,shareme-shard-00-02.unopg.mongodb.net:27017/AppDB?ssl=true&replicaSet=atlas-leqoic-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(connectionString,{useNewUrlParser: true})
var database = mongoose.connection
database.once('open', () => console.log('Connected'))
database.on('error', () => console.log('Error'))
var router = express.Router()

//GET Requests (Read Our Data)
router.get('/shares', (req, res) => {
    Share.find()
    .populate('user')
    .then((share) => {
      res.json(share);
    })
})

router.get('/shares/:id', (req, res) => {
    Share.findOne({id:req.params.id})
	.then((share) => {
	    res.json(share)
 	})
})

router.post('/shares', (req, res) => {
    var share = new Share()
    share.id = Date.now()

    var data = req.body

    Object.assign(share, data)
    share.save()
    .then((share) => {
        res.json(share)
    })
})

router.post('/comments', (req, res) => {
    var comment = new Comment()
    comment.id = Date.now()

    var data = req.body

    Object.assign(comment, data)
    comment.save()
    .then((comment) => {
        res.json(comment)
    })
})

router.get('/users', (req, res) => {
    User.find()
    .then((user) => {
      res.json(user);
    })
})

router.get('/users/:id', (req, res) => {
    User.findOne({id:req.params.id})
	.then((user) => {
	    res.json(user)
 	})
})

app.use('/api', router)
const Port = 4020;
app.listen(Port, () => console.log('Listening Port: '+Port))