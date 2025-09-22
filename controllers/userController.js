
let db = require("../config/db");
const sequelize = require("sequelize");
let User = db.user;

let addUSer = async (req, res) => {
    // const jane = User.build({ firstName: 'Jane', lastName: 'Janelast', });
    // let jane = await User.create({ firstName: "Dhaneshwari", lastName: "shinde" })
        let jane = await User.create(req.body)

    // jane.set({
    //   firstName: 'Ada',
    //   lastName: 'blue',
    // });
    // await jane.update({ firstName: 'Arun' });

    // console.log(jane instanceof User); // true
    // console.log(jane.firstName); // "Jane"
    // await jane.save();
    // console.log('Jane was saved to the database!');
    // console.log(jane.toJSON()); // This is good!
    res.status(201).send({ data: jane, status: "success" });
}


let getAllUsers = async (req, res) => {
    let allUser = await User.findAll();
    res.status(200).send({ data: allUser, status: "success" });
}


let getUSerById = async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({ data: user, status: "success" });
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}


let postUser = async function (req, res) {
    let requestBody = req.body;
    let data;
    if (Array.isArray(requestBody) && requestBody.length > 1) {
        data = await User.bulkCreate(requestBody);
    } else {
        data = await User.create(requestBody);
    }
    res.status(201).send({ data: data, status: "success" })
}

let deleteUserById = async function (req, res) {
    let userid = req.params.id;
    let findtodeleteuser = User.destroy({
        where: {
            id: userid
        }
    })
    res.status(200).send({ data: findtodeleteuser, status: "success" });

}

let updateUserByid = async function (req, res) {
    let updateddata = req.body;
    let updateUser = await User.update(updateddata,
        {
            where: {
                id: req.params.id
            }
        }
    );
    res.status(200).send({ data: updateUser, status: "success" });
}

let queryUser = async function (req, res) {
    try {
        let queryUser = await User.findAll({
            // attributes: ['firstName'],
            // attributes:['id',['firstName','fname'],['lastName','lname']]
              attributes: ['id',['firstName','fname'],[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
 
        });
        res.status(200).send({ data: queryUser, status: "success" });
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}

module.exports = { addUSer, getAllUsers, getUSerById, postUser, deleteUserById, updateUserByid, queryUser };