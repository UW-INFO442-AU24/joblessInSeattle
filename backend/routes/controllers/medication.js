import express from 'express';
var router = express.Router();


// GET for /medication
router.get('/medications', async (req, res) => {
      try {
          // stuff
          console.log("it connected");
          // let username = req.query.username; WHEN WE HAVE FIREBASE LOGIN STUFF SET UP
          let allMedications = await req.models.Medications.find() //.find({username: username});
          let medications = await Promise.all(
            allMedications.map(async med => {
            try {
              // NEED TO ADD USER
              let {medicationName, medDescription, medFrequency} = med;
              return {medicationName, medDescription, medFrequency};
            }
            catch(error) {
            console.log("Error: ", error);
            return {type, error};
            }
            })
          );
          res.send(medications);
      }
      catch(error) {
        console.log("Error: ", error);
        res.status(500).json({status: "error", error: error});
      }
});

// POST to /medication
router.post('/', async (req, res) => {
    try {
      // saves the medication model data
      const newMedication = new req.models.Medications({
        // user: "me",
        medicationName : req.body.name,
        medDescription : req.body.description,
        medFrequency : req.body.frequency,
      });
      await newMedication.save()
      res.json({"status" : "success"})
    }
    catch(error) {
      console.log("error: ", error);
      res.status(500).json({status: "error", error: error});
    }
});
  
export default router;