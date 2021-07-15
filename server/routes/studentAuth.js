const router = require("express").Router();
const pool = require("../db");


const bcrypt = require("bcrypt");

const jwtGenerator = require("../routes/utils/jwtGenerator");

const validInfo = require("../middleware/validInfo");

router.post("/register", validInfo, async (req, res) => {
    try {
        // 1. Break down req to get (std_id, name, email, password)

        const {sid, sname, semail, spassword} = req.body;


        // 2. Check if user exist (if user exist show error)
        const user = await pool.query("SELECT * FROM student WHERE std_id = $1", [
            sid
        ]);

        if ( user.rows.length !== 0)
        {
         return res.status(401).send("User Already Exist.");   
        }


        // 3. Bcrypt user password

        //const saltRound = 10;
        const salt = await bcrypt.genSalt(10);

        const bcryptPassword = await bcrypt.hash(spassword, salt);

        // 4. Enter the new user in database

        const newUser = await pool.query(
            "INSERT INTO student (std_id, std_name, std_email, std_password) VALUES ($1, $2, $3, $4) RETURNING *",
            [sid, sname, semail, bcryptPassword]);

        //res.json(newUser.rows[0]);
        // 5. Generating JWT token

        const token = jwtGenerator(newUser.rows[0].sid);

        res.json({token});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});


// Login Route

router.post("/login", validInfo, async(req,res) => {
    try {
        
        //1. desturcture req.body

        const {sid, semail , spassword} = req.body; 

        //2. check if user doesn't exist (if true throw error)

        const user = await pool.query("SELECT * FROM student WHERE std_id = $1",[
            sid
        ]);
        

        if (user.rows.length === 0)
        {
            return res.status(401).json("Email or Password Inccorect");
        }
        //3. Confirming the password

        const vaildPasswod = await bcrypt.compare(spassword, user.row[0].std_password);

        if (!vaildPasswod)
        {
            return res.status(401).json("Email or Password is incorrect");
        }

        //4. give them JWT token

        const token = jwtGenerator(user.rows[0].std_id);
        res.json(token);


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;