const http = require('http');


const dbOperationsUser = require('./dbOperationsUser');
const dbOperationsItems = require('./dbOperationsItems');
const dbOperationsMessages = require('./dbOperationsMessages');
const dbOperationMenagment = require('./dbOperationMenagment');
const sendEmail = require('./sendEmail');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { rows } = require('mssql');
var app = express();
const server = http.createServer(app);
var router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router);



router.use((req,res,next) => {
    console.log('middleware');
    next();
})


//user

router.route("/signUp").post((req,res) => {
    let user = {...req.body}
    dbOperationsUser.signUp(user).then(result => {
       res.status(201).json(result);
    })
})

router.route("/login").post((req,res) => {
    let userLogin = {...req.body};
    dbOperationsUser.login(userLogin).then(result => {
        res.status(201).json(result);
    })
})

router.route("/deleteUser").post((req,res) => {
    let user = {...req.body};
    dbOperationsUser.deleteUser(user).then(result => {
       res.status(201).json(result);
    })
})

router.route("/getUser").post((req,res) => {
    let userID = {...req.body};
    dbOperationsUser.getUser(userID).then(result => {
       res.status(201).json(result);
    })
})

router.route("/updateUser").post((req,res) => {
    let user = {...req.body}
    dbOperationsUser.updateUser(user).then(result => {
       res.status(201).json(result);
    })
})

router.route("/forgotPassword").post((req,res) => {
    let email = {...req.body};
    dbOperationsUser.forgotPassword(email).then(result => {
       res.status(201).json(result);
    })
})

// items

router.route("/category").get((req,res) => {
    dbOperationsItems.getCategory().then(result => {
       res.json(result[0]);
    })
})

router.route("/type").get((req,res) => {
    dbOperationsItems.getType().then(result => {
       res.json(result[0]);
    })
})

router.route("/size").get((req,res) => {
    dbOperationsItems.getSize().then(result => {
       res.json(result[0]);
    })
})

router.route("/items").get((req,res) => {
    dbOperationsItems.getNweItems().then(result => {
       res.json(result[0]);
    })
})

router.route("/addItem").post((req,res) => {
    let item = {...req.body}; 
    dbOperationsItems.addItem(item).then(result => {
        res.status(201).json(result);
    })
})

router.route("/userItems").post((req,res) => {
    let user = {...req.body};
    dbOperationsItems.getUsersItemsById(user).then(result => {
       res.status(201).json(result);
    })
})

router.route("/searchItems").post((req,res) => {
    let word = {...req.body};
    dbOperationsItems.searchItems(word).then(result => {
       res.status(201).json(result);
    })
})

router.route("/getItemByID").post((req,res) => {
    let itemID = {...req.body};
    dbOperationsItems.getItemByID(itemID).then(result => {
       res.status(201).json(result);
    })
})

router.route("/deleteItemByID").post((req,res) => {
    let itemID = {...req.body};
    dbOperationsItems.deleteItemByID(itemID).then(result => {
       res.status(201).json(result);
    })
})

// messages

router.route("/createmessage").post((req,res) => {
    let message = {...req.body}; 
    dbOperationsMessages.createMessage(message).then(result => {
        res.status(201).json(result);
    })
})

router.route("/getUserMessages").post((req,res) => {
    let userID = {...req.body}; 
    dbOperationsMessages.getUserMessages(userID).then(result => {
        res.status(201).json(result);
    })
})

router.route("/markAsRead").post((req,res) => {
    let userID = {...req.body}; 
    dbOperationsMessages.markAsRead(userID).then(result => {
        res.status(201).json(result);
    })
})

router.route("/deleteMessage").post((req,res) => {
    let userID = {...req.body}; 
    dbOperationsMessages.deleteMessage(userID).then(result => {
        res.status(201).json(result);
    })
})

// send email

router.route("/sendemail").post((req,res) => {
    let message = {...req.body};
    sendEmail.sendEmail(message).then(result => {
       res.status(201).json(result);
    })
})


// menagment 

router.route("/addcatgory").post((req,res) => {
    let catgory = {...req.body};
    dbOperationMenagment.addcatgory(catgory).then(result => {
       res.status(201).json(result);
    })
})

router.route("/addtype").post((req,res) => {
    let type = {...req.body};
    dbOperationMenagment.addtype(type).then(result => {
       res.status(201).json(result);
    })
})

router.route("/addsize").post((req,res) => {
    let size = {...req.body};
    dbOperationMenagment.addsize(size).then(result => {
       res.status(201).json(result);
    })
})


router.route("/users").get((req,res) => {
    dbOperationMenagment.getUsers().then(result => {
       // console.log(result);
       res.json(result[0]);
    })
})


router.route("/addadmin").post((req,res) => {
    let userID = {...req.body}; 
    dbOperationMenagment.addAdmin(userID).then(result => {
        res.status(201).json(result);
    })
})


const host = '0.0.0.0';
const port = process.env.PORT || 5000;

server.listen(port, host, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });


