//connect to postgres using node-psql package
const Pool = require('pg').Pool

const pool = new Pool ({
    user: 'me',
    host: 'localhost',
    database: 'favlinks',
    password: 'asap',
    port: 5432
})

//create request handler functions for express server

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

//Read by id
const getLinksById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM links WHERE id=$1',[id],
    (error , result) => {
        if (error){
            throw error
        }
        res.status(200).json(result.rows);
    } )
}

//create new links
const createLink = (req,res) => {
    const { name, url} = req.body
    pool.query('INSERT INTO links (name, url) VALUES ($1, $2) RETURNING *', [name, url], 
    (error, results) => {
        if (error) {
            throw error
    }
    res.status(201).send('New link created with id:' + results.rows[0].id)
})
}

//update link


//delete function

module.exports = {
    getLinks,
    getLinksById,
    createLink,
}