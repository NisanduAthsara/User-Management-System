const Userdb = require('../model/model')

//for create a new user
exports.create = (req, res) => {

    //validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty' })
        return
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error occured!'
            });
        });

}

//for find all users and find a specified user
exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({message:`Any user not found by id : ${id}`})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({message:"An error occured...!"})
            })
    }else{
        Userdb.find()
        .then(user=>{
            if(!user){
                res.send({message:'Any User Not Found...!'})
            }else{
                res.send(user)
            }
            
        })
        .catch(err =>{
            res.send({message:err.message || 'Error Ocuured'})
        })
    }

}

//for update specified user
exports.update = (req, res) => {
    if(!req.body){
        return res
        .status(400)
        .send({message:'Data to update cannot be empty'})
    }

    const id = req.params.id
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`User Data Not Found by Id : ${id}`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message:err.message||'Error occured'})
    })
}

//for delete specified user
exports.delete = (req, res) => {
    const id = req.params.id

    Userdb.findByIdAndDelete(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message:`Cannot Delete by id:${id}. Maybe id is wrong `})
            }else{
                res.status({
                    message:'User Deleted Successfully'
                })
            }
        })
        .catch(err =>{
            res.send({message:err.message || `Error occured while deleting user with id : ${id}`}).status(500)
        })
}