const castingController = {}

castingController.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM casting', (err, casting) => {
      res.render('casting', {
        data: casting,
        title: 'Casting',
      })
    })
  })
}

castingController.save = (req, res) => {
  const data = req.body
  console.log(data)
  req.getConnection((err, conn) => {
    let sql = `INSERT INTO casting (status, name, city, state, country, type, date, owner, description, rol, dateadd)
               VALUES ('${data.status}','${data.name}','${data.city}','${data.state}','${data.country}','${data.type}','${data.date}',${data.iduser}, '${data.description}','${data.rol}', now());`
    conn.query(sql, [data], (err, result) => {
      if (err) throw err
      res.redirect('/casting')
    })
  })
}

castingController.edit = (req, res) => {
  const data = req.body
  console.log(data)
  req.getConnection((err, conn) => {
    let sql = `UPDATE casting
                SET status  = '${data.status}',
                name        = '${data.name}',
                city        = '${data.city}',
                state       = '${data.state}',
                country     = '${data.country}',
                type        = '${data.type}',
                DATE        = '${data.date}',
                description = '${data.description}',
                rol         = '${data.rol}'
                WHERE id_casting = '${data.idcasting}';`
    conn.query(sql, [data], (err, result) => {
      if (err) throw err
      res.redirect('/casting')
    })
  })
}

castingController.delete = (req, res) => {
  const data = req.body
  req.getConnection((err, conn) => {
    let sql = `DELETE FROM casting WHERE id_casting = '${data.id_casting}';`
    conn.query(sql, [data], (err, result) => {
      if (err) throw err
      res.redirect('/casting')
    })
  })
}

module.exports = castingController