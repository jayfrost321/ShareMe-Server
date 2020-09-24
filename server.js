//importing modules and initial setup
var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')
var fileUpload = require('express-fileupload')

var Share = require('./share-model')
var User = require('./user-model')
var Comment = require('./comment-model')

var app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use(express.static('public'))
app.use(logger('dev'))

var connectionString = 'mongodb://jayfrost:yoobee02@shareme-shard-00-00.lisym.mongodb.net:27017,shareme-shard-00-01.lisym.mongodb.net:27017,shareme-shard-00-02.lisym.mongodb.net:27017/ShareDB?ssl=true&replicaSet=atlas-slbfyh-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(connectionString,{useNewUrlParser: true})
var database = mongoose.connection
database.once('open', () => console.log('Connected'))
database.on('error', () => console.log('Error'))
var router = express.Router()

//Shares
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

router.get('/shares', (req, res) => {
    Share.find()
    .sort({'updatedAt': -1})
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

router.put('/shares/:id', (req, res) => {
	Share.findOne({id:req.params.id})
	.then((share) => {
		var data = req.body
		Object.assign(share,data)
		return share.save()	
	})
	.then((artist) => {
		 res.json(artist)
	}) 
})

router.delete('/shares/:id', (req, res) => {
	Share.deleteOne({id:req.params.id})
	.then(() => {
		res.json('deleted')
	})
})

//Users
router.post('/users', (req, res) => {
    var user = new User()
    user.id = Date.now()

    var data = req.body
    Object.assign(user,data)
    user.save()
    .then((user) => {
            res.json(user)
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

router.put('/users/:id', (req, res) => {
	User.findOne({id:req.params.id})
	.then((user) => {
		var data = req.body
		Object.assign(user,data)
		return user.save()	
	})
	.then((user) => {
		 res.json(user)
	})
})

router.delete('/users/:id', (req, res) => {
	User.deleteOne({id:req.params.id})
	.then(() => {
		res.json('deleted')
	})
})

/*Upload*/
router.post('/upload', (req, res) => {
	var files = Object.values(req.files)
	var uploadedFile = files[0]
	var newName = Date.now() + uploadedFile.name

	uploadedFile.mv('public/'+ newName, function(){
		res.send(newName)
	})
})

/*Login Authentication*/
router.post('/users/authenticate', (req, res) => {
	var {email,password} = req.body;
	// var credential = {email,password}
	User.findOne({email}).where('password').equals(password)
	.then((user) => {
	    return res.json(user)
	})
})

//Setup port and routes
app.use('/api', router)
const Port = 4020;
app.listen(Port, () => console.log('Listening Port: '+Port))