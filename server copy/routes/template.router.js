const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {

  const userID = req.user.id;
  console.log(userID, "userID")
  const query = 
  `
  SELECT * FROM "toys"
  WHERE "user_id" = $1
  ORDER BY "name";
  `;

  //pass userId in as param later to grab specific toy
  //select from toys where user_id = req.body.id
  // req.user.id
  pool.query(query, [userID])
  .then( result => {
    console.log(result.rows, "get result")
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR: in router.get toys', err);
    res.sendStatus(500)
  })
  // GET route code here
});



router.post('/file', rejectUnauthenticated, (req, res) => {
  const uploadedFile = req.files
  //save to file

  console.log(uploadedFile, "files here")
  //do not push to github, but front end needs to access the files
  // Front end needs to access by going to /uploads
  //time stamp the images

  
  uploadedFile.sampleFile.mv('./public/uploads/whatever.jpg', function(err) {
    if(err){
      
      res.sendStatus(500)
      console.log(err, "error in server file upload")
      return;
    }
    res.send('File uploaded!');
    console.log("file success")
    
  })
})



router.post('/', rejectUnauthenticated, (req, res) => {
  const newToy= req.body;
  console.log(newToy.available, "new available")
  console.log(newToy.ID, "owner ID")
  console.log(newToy.image, "image linky here")

   const queryText = `
    INSERT INTO toys (name, ages, phone, user_id, available, image) 
    VALUES ($1, $2, $3, $4, $5, $6);`;
      
  const queryParams = [
    newToy.name,
    newToy.ages,
    newToy.phone,
    newToy.ID,
    newToy.available,
    newToy.image
  ]

  pool.query(queryText, queryParams)
      .then((result) => {
        console.log(result, "result pool")
          res.sendStatus(201);
      })
      .catch((err) => {
          console.log(`Error making query ${queryText}`, err);
          res.sendStatus(500);
      });
});


router.delete('/:toyId', (req, res) => {

  const queryText = `
  DELETE FROM "toys"
  WHERE id = $1
  RETURNING *
  `; 

  const queryParams = req.params.toyId;
  console.log(queryParams, "params")

  pool.query(queryText, [queryParams])
  .then(dbRes =>{
    console.log("deleted rows", dbRes.rows)
    res.sendStatus(200)
  })
  .catch(error => {
    console.log(error, "error pool query delete")
    res.sendStatus(500)
  })
});


router.put('/:toyId', (req, res) => {
  
  const id = req.params.toyId;
  console.log(id, 'TOY ID HERE')
  const available = req.body.adjustedAvailable;
  console.log(available, 'TOY BOOLEAN HERE')
  // if(available == false){
  //   console.log('SUCCESS')
  // }

  let queryText = '';

  const queryParams = id; 

    if(available == false){
     queryText = `
      UPDATE "toys" 
      SET "available" = true
      WHERE "id" = $1;`;
    }
    else{
      queryText = `
      UPDATE "toys" 
      SET "available" = false
      WHERE "id" = $1;`
    }

    console.log(queryText, "text")



  pool.query(queryText, [queryParams])
  .then(dbRes => {
    console.log("updated rows", dbRes.rows)
    res.send(200)
  })
  .catch(error => {
    console.log(error, "err router.put")
    res.sendStatus(500)
  })
});


module.exports = router;
