var BLOG = require('../modul/blog')


// blog create
exports.blogcreate = async function (req, res, next) {
    try {
        let formdata = req.body
        req.body.image = req.file.filename

        let blogCreate = await BLOG.create(formdata)

        res.status(201).json({
            status: "Success",
            message: "Blog Create Successfully",
            data: blogCreate,
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// blog find
exports.blogfind = async function (req, res, next) {
    try {
        
        let blogfind = await BLOG.find()

        res.status(201).json({
            status: "Success",
            message: "Blog all data Successfully",
            data: blogfind,
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.blogSearch = async function (req, res, next) {
    try {
        
        let blogfind = await BLOG.find({title : {$regex : req.query.s,$options : "i"}})

        res.status(201).json({
            status: "Success",
            message: "Blog search data Successfully",
            data: blogfind,
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// blog findone
exports.blogfindone = async function (req, res, next) {
    try { 
        let formdata = req.body
        let blogfindone = await BLOG.findById(req.params.findId)

        res.status(201).json({
            status: "Success",
            message: "Blog one data Successfully",
            data: blogfindone,
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// blog delete
exports.blogdelete = async function (req, res, next) {
    try {
        let formdata = req.body
        let blogdelete = await BLOG.findByIdAndDelete(req.params.deleteId)

        res.status(201).json({
            status: "Success",
            message: "Blog delete Successfully",
            data: blogdelete,
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

// blog update
exports.blogupdate = async function (req, res, next) {
    try {
        let formdata = req.body
        req.body.image = req.file.filename
        let blogUpdate = await BLOG.findByIdAndUpdate(req.params.UpdateId, formdata , { new: true })
        res.status(201).json({
            status: "success",
            message: "blog update successfully",
            data: blogUpdate
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}
