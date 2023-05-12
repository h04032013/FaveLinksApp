//connect to postgres using node-psql package
const POOL = require('pg').Pool

const pool = new POOL({
    user: 'me',
    host: 'localhost',
    database: 'favlinks',
    password: 'asap',
    port: 5432
})



//create request handler functions for express server


//Create function for new link

//Read function for db
const getLinks = (req, res) =>{
    pool.query('SELECT * FROM links ORDER BY id ASC;',
    (error , result) => {
        if (error){
            throw error
        }
        res.status(200).json(result.rows);
    } )
}

//update function

//delete function

module.exports = {
    getLinks
}