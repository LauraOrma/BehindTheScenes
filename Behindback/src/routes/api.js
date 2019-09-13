const express = require('express')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const router = express.Router()
const multer = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'behindscenes'
})
const DIR = './public/'
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

let upload = multer({ storage: storage })
const secret = 'mysecret'

//para interactuar con la base de datos
router.post('/auth', function (request, response) {
  const data = request.body
  let sql = `SELECT id_user
             FROM users 
                LEFT JOIN country ON users.country = country.id
             WHERE email = '${data.email}' AND password = MD5('${data.password}')`
  connection.query(sql, (error, rows) => {
    if (error) throw error
    if (rows.length > 0) {
      let token = jwt.sign({
        id_user: rows[0].id_user
      }, secret)
      response.send(token)//cambiar esto y devolver un token
    } else {
      response.status(400).send('You shall not pass!')//devolvemos error y mensaje de que no se puede conectar
    }
  })
})

router.get('/users', (request, response) => {
  const token = request.headers.authorization.replace('Bearer ', '')
  try {
    const payload = jwt.verify(token, secret)
    if (!payload.is_admin) { //el is_admin no es por la base de datos sino por la variable que estoy usando arriba en var token is_admin: boleanIsAdmin
      connection.query('SELECT email FROM users', (_error, rows) => {
        response.send(rows)
      })
    } else {
      connection.query('SELECT email FROM users', (_error, rows) => {
        response.send(rows)
      })
    }
  } catch (_e) {
    response.status(401).send('You don\'t have permission')
  }
})
//Sign up Insert Query
router.post('/signup', function (request, response) {
  const data = request.body
  let sql = `SELECT (SELECT COUNT(*)
                     FROM users
                     WHERE email = '${data.email}') AS email;`
  connection.query(sql, (error, rows) => {
    if (error) throw error
    if (!rows[0].email && !(data.pass === '') && !(data.user === '')) {
      sql = `INSERT INTO users (password, email, admin, firstname, lastname, city, state, country, dateadd)
                VALUES (MD5('${data.pass}'),'${data.email}', 0, '${data.fName}','${data.lName}', NULL, NULL, 'ES', now());`
      connection.query(sql, (error, rows) => {
        if (error) throw error
        sql = `SELECT id_user
               FROM users
               ORDER BY id_user DESC
               LIMIT 1;`
        connection.query(sql, (error, rows) => {
          let token = jwt.sign({
            id_user: rows[0].id_user
          }, secret)
          response.send(token)
        })
      })
    } else {
      response.status(400).json({
        error: 'User or email already invalid or exists'
      })
    }
  })
})

router.post('/getcountry', function (request, response) {
  let sql = `SELECT id, name
             FROM country;`
  connection.query(sql, (error, rows) => {
    if (error) throw error
    response.json(rows)
  })
})

router.post('/getstate', function (request, response) {
  const data = request.body
  let sql = `SELECT id, name
             FROM state
             WHERE country = '${data.country}'
             ORDER BY name;`
  connection.query(sql, (error, rows) => {
    if (error) throw error
    response.json(rows)
  })
})

router.post('/newCasting', function (request, response) {
  const data = request.body
  let sql = `INSERT INTO casting (status, name, city, state, country, type, date, owner, description, rol, dateadd, category)
                VALUES ('Open', '${data.name}', '${data.city}', '${data.state}', '${data.country}', '${data.type}', now(),
                    '${data.owner}', '${data.description}', '${data.rol}', now(), '${data.category}');`
  connection.query(sql, (error, rows) => {
    if (error) throw error
    response.send(rows)
  })
})

router.post('/getLastCastings', function (request, response) {
  let sql = `SELECT id_casting, category, casting.name AS name, rol, city, c.name AS country
             FROM casting
                      LEFT JOIN country c ON casting.country = c.id
             ORDER BY id_casting DESC
             LIMIT 4;`
  connection.query(sql, (error, rows) => {
    if (error) throw error
    response.json(rows)
  })
})

router.post('/getAllCastings', function (request, response) {
  let sql = `SELECT id_casting,
                    category,
                    casting.name AS name,
                    rol,
                    city,
                    country.name AS country,
                    description,
                    dateadd
             FROM casting
                      LEFT JOIN country ON casting.country = country.id
             ORDER BY id_casting DESC;`
  connection.query(sql, (error, rows) => {
    if (error) throw error
    response.json(rows)
  })
})

router.post('/getLastUsers', function (request, response) {
  let sql = `SELECT id_user,
                    firstname AS firstName,
                    lastname AS lastName,
                    email AS email,
                    city,
                    gender,
                    country.name AS country,
                    description,
                    profesion,
                    dateadd,
                    profile_img
             FROM users
                      LEFT JOIN country ON users.country = country.id
             ORDER BY id_user DESC
             LIMIT 4;`
  connection.query(sql, (error, rows) => {
    if (error) throw error
    response.json(rows)
  })
})

router.post('/getAllUsers', function (request, response) {
  let sql = `SELECT id_user,
                    firstname AS firstName,
                    lastname AS lastName,
                    email AS email,
                    city,
                    gender,
                    country.name AS country,
                    description,
                    profesion,
                    dateadd,
                    profile_img
             FROM users
                      LEFT JOIN country ON users.country = country.id
             ORDER BY id_user DESC`
  connection.query(sql, (error, rows) => {
    if (error) throw error
    response.json(rows)
  })
})

router.post('/getProfileData', function (request, response) {
  const data = request.body
  let sql = `SELECT id_user,
                    firstname AS firstName,
                    lastname AS lastName,
                    email AS email,
                    city,
                    country.name AS country,
                    description,
                    profesion,
                    dateadd,
                    education,
                    phone1 AS phone,
                    videobook,
                    IFNULL(gender, '') AS gender,
                    profile_img,
                    IFNULL(curriculum,'') AS curriculum
             FROM users
                      LEFT JOIN country ON users.country = country.id
             WHERE id_user = '${data.id}'
             ORDER BY id_user;`
  connection.query(sql, (error, rows) => {
    if (error) throw error
    response.json(rows)
  })
})

router.post('/getProfileData/:id', function (request, response) {
  const data = request.body
  const id = request.params.id
  let sql = `SELECT id_user,
                    firstname AS firstName,
                    lastname AS lastName,
                    email AS email,
                    city,
                    country.name AS country,
                    description,
                    profesion,
                    dateadd,
                    education,
                    phone1 AS phone,
                    videobook,
                    IFNULL(gender, '') AS gender,
                    profile_img
             FROM users
                      LEFT JOIN country ON users.country = country.id
             WHERE id_user = '${id}'
             ORDER BY id_user;`
  connection.query(sql, (error, rows) => {
    if (error) throw error
    response.json(rows)
  })
})

router.post('/setProfileData/img/:id/', upload.single('img'), function (request, response) {
  const id = request.params.id
  const url = request.body.url
  let filename = ''
  if (request.file) {
    filename = request.file.filename
  }
  let update = `UPDATE users
                SET profile_img = '${filename}'
                WHERE id_user = ${id};`
  connection.query(update, (error, rows) => {
    if (error) throw error
    response.redirect(url)
  })
})

router.post('/setProfileData/CV/:id/', upload.single('cv'), function (request, response) {
  const id = request.params.id
  const url = request.body.url
  let filename = ''
  if (request.file) {
    filename = request.file.filename
  }
  let update = `UPDATE users
                SET curriculum = '${filename}'
                WHERE id_user = ${id};`
  connection.query(update, (error, rows) => {
    if (error) throw error
    response.redirect(url)
  })
})

router.post('/setProfileData', function (request, response) {
  let data = request.body
  let update = `UPDATE users
                SET firstname = '${data.firstname}',
                    lastname  = '${data.lastname}',
                    email     = '${data.email}',
                    phone1    = '${data.phone}',
                    gender    = '${data.gender}',
                    profesion = '${data.profesion}',
                    education = '${data.education}',
                    city      = '${data.city}',
                    country   = '${data.country}',
                    videobook = '${data.videobook}',
                    description = '${data.description}'
                WHERE id_user = ${data.id};`
  connection.query(update, (error, rows) => {
    if (error) throw error
    response.send(rows)
  })
})

router.post('/getCastings/:id', function (request, response) {
  const id = request.params.id
  let sql = `SELECT id_casting, category, c.name AS name, rol, c.city AS city, cc.name AS country, type, c.dateadd AS dateadd, owner,
                firstname AS userfirstname, lastname AS userlastname, c.description AS description
            FROM casting c
                LEFT JOIN country cc ON c.country = cc.id
                LEFT JOIN users u ON c.owner = u.id_user
            WHERE c.id_casting = '${id}';`
  connection.query(sql, (error, rows) => {
    if (error) throw error
    response.send(rows)
  })
})

module.exports = router