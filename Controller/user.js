var USER = require('../modul/user')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "dholiyadhruv2023.katargam@gmail.com",
      pass: "mtpockboplyjemgm",
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  async function main(mail) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'dholiyadhruv2023.katargam@gmail.com', // sender address
      to: mail, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  

// sequre
exports.sequre = async function (req, res, next) {
    try {

        let token = req.headers.usertoken
        if (!token) {
            throw new Error('Please Send user Token')
        }
        var decoded = jwt.verify(token, 'SURAT');

        req.userID = decoded.id

        let userCheck = await USER.findById(decoded.id)
        if (!userCheck) {
            throw new Error('user Not Found')
        }
        next()
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.userrSignup = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8)
        

        let userCreate = await USER.create(req.body)
        main(req.body.email)
        res.status(201).json({
            status: "Success",
            message: "user  Create Successfully",
            data: userCreate,
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.userLogin = async function (req, res, next) {
    try {

        let useremail = await USER.findOne({ email: req.body.email })
        if (!useremail) {
            throw new Error("user not found")
        }
        let passComp = await bcrypt.compare(req.body.password, useremail.password)
        console.log(passComp);
        if (!passComp) {
            throw new Error("Invalid Password")
        }
        var token = jwt.sign({ id: useremail._id }, 'SURAT');
        res.status(201).json({
            status: "success",
            message: " user login successfully",
            data: useremail,
            token
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//  Find
exports.userFind = async function (req, res, next) {
    try {

        let data = await USER.find()

        res.status(201).json({
            status: "Success",
            message: "user Data Get Successfully",
            data
        })

    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//  Delete
exports.userDelete = async function (req, res, next) {
    try {

        let userDelete = await USER.findByIdAndDelete(req.params.deleteId)
        if (!userDelete) {
            throw new Error('user Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "user Delete Successfully",
            data: userDelete
        })

    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//  Update
exports.userUpdate = async function (req, res, next) {
    try {

        let userUpdate = await USER.findByIdAndUpdate(req.params.updateId, req.body)
        if (!userUpdate) {
            throw new Error('user Not Found')
        }

        res.status(201).json({
            status: "Success",
            message: "user Update Successfully",
            data: userUpdate
        })

    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}