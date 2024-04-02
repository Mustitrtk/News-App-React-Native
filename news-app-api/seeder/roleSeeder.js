const Role = require("../models/Role");
//Post Seeder bu modulü ../model/db.js içerisinde kullandım
module.exports = async()=>{
    await Role.insertMany([
        {
            name: "kullanici",
        },
        {
            name: "yazar",
        },
        {
            name: "arastirmaci",
        },
        {
            name: "super-admin",
        },
    ]);
};