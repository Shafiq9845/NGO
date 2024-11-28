const express = require('express');
const mysql = require('mysql');
const bodyParser =require('body-parser');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sendEmail=require('./sendEmail')
const app=express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('File is not an image'), false);
      }
      cb(null, true);
    }
  });


const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ngo'
})

app.use(session({
    secret:'SeCrEt_KeY',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Logout failed", error: err });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: "Logout successful" });
    });
});











app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  db.query('SELECT * FROM ngo_reg WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error querying the database.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found with this email address.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiryDate = new Date(Date.now() + 3600000); 
    const resetTokenExpiration = expiryDate.toISOString().slice(0, 19).replace('T', ' ');

    db.query(
      'UPDATE ngo_reg SET resetToken = ?, resetTokenExpiration = ? WHERE email = ?',
      [resetToken, resetTokenExpiration, email],
      (err, updateResults) => {
        if (err) {
          console.error('Error updating user with reset token:', err);
          return res.status(500).json({ message: 'Error updating user with reset token.' });
        }

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        const subject = 'Password Reset Request';
        const text = `You requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}`;

        sendEmail(email, subject, text)
          .then(() => {
            res.status(200).json({ message: 'Password reset email sent.' });
          })
          if (err) {
            console.log('Error sending email', err);  
          } else {
            console.log('Email sent successfully');  
          }
      }
    );
  });
});

app.post('/reset-password/:token', (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  db.query('SELECT * FROM ngo_reg WHERE resetToken = ? AND resetTokenExpiration > ?', [token, Date.now()], (err, results) => {
    if (err) {
      console.error('Error querying database for reset token:', err);
      return res.status(500).json({ message: 'Error querying database for reset token.' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired reset token.' });
    }

    const userId = results[0].id;
    const email = results[0].email;

    db.query(
      'UPDATE ngo_reg SET psw = ?, resetToken = NULL, resetTokenExpiration = NULL WHERE id = ?',
      [newPassword, userId],
      (err, updateResults) => {
        if (err) {
          console.error('Error updating password:', err);
          return res.status(500).json({ message: 'Error updating password.' });
        }

        const subject = 'Password Reset';
        const text = `Your password has been reset successfully.`;

        sendEmail(email, subject, text)
          .then(() => {
            res.status(200).json({ message: 'Password reset successful and email sent.' });
          })
          .catch((err) => {
            console.log('Error sending email:', err);
            if (!res.headersSent) {
              res.status(500).json({ message: 'Error sending reset email.' });
            }
          });
      }
    );
  });
});

















app.post('/contact',(req,res)=>{
    try{
    const sql='insert into `contact`(`name`, `email`, `sub`, `msg`) values(?,?,?,?)';
    const values=[
        req.body.name,
        req.body.email,
        req.body.subject,
        req.body.message,
    ];
    db.query(sql, values,(err,data)=>{
        if(err){
            console.error('Error in execution query : ',err);
            return res.status(500).json({message:'Internal server error',error:err});
        }
        return res.status(201).json({message:'Success',data});
    });
    }catch (err){
        console.error('Error during signup',err);
        return res.status(500).json({message:'Internal server error',error:err});
    }
})


app.get("/api/contacts", (req, res) => {
  const query = "SELECT * FROM contact"; 
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching contacts:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.delete("/api/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  const query = "DELETE FROM contacts WHERE id = ?";

  db.query(query, [contactId], (err, results) => {
    if (err) {
      console.error("Error deleting contact:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Contact deleted successfully" });
  });
});


app.post('/volunteer',(req,res)=>{
    try{
    const sql='insert into `volunteer`(`name`, `email`,`pNo`, `msg`, `adr`, `date`) values(?,?,?,?,now())';
    const values=[
        req.body.name,
        req.body.email,
        req.body.pNo,
        req.body.message,
        req.body.adr,
    ];
    db.query(sql, values,(err,data)=>{
        if(err){
            console.error('Error in execution query : ',err);
            return res.status(500).json({message:'Internal server error',error:err});
        }
        return res.status(201).json({status:'Success',data});
    });
    }catch (err){
        console.error('Error during signup',err);
        return res.status(500).json({message:'Internal server error',error:err});
    }
})



app.post('/login',(req,res)=>{

    const sql="SELECT * FROM ngo_reg WHERE `email`=? and `psw`=?";

    db.query(sql, [req.body.email,req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if(data.length>0){
            const userId = data[0].id;
            const selectSql = "SELECT `role`,`status`,`Name` FROM `ngo_reg` WHERE `id` = ?";
            db.query(selectSql, [userId], (err, result) => {
                if (err) {
                    console.error('Error fetching user details:', err);
                    return res.status(500).json({ message: "Internal Server Error", error: err });
                }
                if (result.length > 0) {
                    const role = result[0].role;
                    const st = result[0].status;
                    const ngoName = result[0].Name;
                    return res.status(200).json({ status: 'success', message: 'success', userId, role,st,ngoName});
                }else {
                    return res.json({ status: 'fail', message: 'Invalid credentials' });
                }
            })
        }else {
            return res.json({ status: 'fail', message: 'Invalid credentials' });
        }
});
});

app.post('/signup', upload.single('pImage'), (req, res) => {
  const sql = "SELECT * FROM ngo_reg WHERE `email`=? OR `ngo_reg_no`=?";
  db.query(sql, [req.body.email, req.body.ngoRegistrationNumber], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error", error: err });
    }

    if (data.length > 0) {
      return res.json({ status: 'fail', message: 'Invalid credentials' });
    } else {
      try {
        const sql = "INSERT INTO `ngo_reg`(`Name`,`email`, `psw`, `p_no`, `address`, `type`, `ngo_reg_no`, `contact_person`, `c_p_no`, `pincode`, `city`, `pImage`, `date`, `status`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,now(), 'pending')";

        const values = [
          req.body.ngoName,
          req.body.email,
          req.body.password,
          req.body.number,
          req.body.ngoAddress,
          req.body.ngoType,
          req.body.ngoRegistrationNumber,
          req.body.contactPerson,
          req.body.contactPersonPhone,
          req.body.pincode,
          req.body.city,
          req.file ? req.file.filename : null,
        ];

        db.query(sql, values, (err, data) => {
          if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: "Internal Server Error", error: err });
          }
          const emailSubject = 'Thank You for Registering with Us';
          const emailText = `Dear ${req.body.ngoName},\n\nThank you for registering your NGO with us. Your application is currently under review and the status is pending. We will update your application soon.\n\nBest regards,\nYour Organization`;
          
          sendEmail(req.body.email, emailSubject, emailText)
            .then(() => {
              res.status(201).json({ message: "User registered successfully and email sent", data });
            })
            .catch((err) => {
              console.error('Error sending email:', err);
              res.status(500).json({ message: "User registered, but email not sent", error: err });
            });
        });
      } catch (err) {
        console.error('Error during signup:', err);
        return res.status(500).json({ message: "Internal Server Error", error: err });
      }
    }
  });
});

app.get('/ngo/profile/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM ngo_reg WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching NGO details:', err);
      res.status(500).json({ message: 'Server error' });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'NGO not found' });
    } else {
      res.status(200).json(result[0]);
    }
  });
});


app.put('/ngo/profile/update/:id', upload.single('pImage'), (req, res) => {
  const { id } = req.params;
  const {
    address,
    city,
    pincode,
    password,
    confirmPassword
  } = req.body;


  const pImage = req.file ? `${req.file.filename}` : null;

  let sql = `UPDATE ngo_reg SET address = ?, city = ?, pincode = ?`;
  const values = [address, city, pincode];

  if(password){
    sql+= `, psw = ?`;
    values.push(password);
  }
  if (pImage) {
    sql += `, pImage = ?`;
    values.push(pImage);
  }

  sql += ` WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating NGO details:', err);
      res.status(500).json({ message: 'Server error', error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'NGO not found' });
    } else {
      res.status(200).json({ message: 'NGO details updated successfully' });
    }
  });
});

app.get('/count',(req,res)=>{
  const sql = "Select sum(damount) as tamount from doners";

  db.query(sql,(err,data)=>{
    if(err){
      console.error('error',err);
      return res.status(500).json({message:'internal server error',error:err});
    }
    res.status(200).json(data[0].tamount);
  })
})


app.get('/api/ngo/pending', (req, res) => {
    const sql = "SELECT * FROM ngo_reg WHERE status = 'pending'";

    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching pending applications:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err });
        }
        res.status(200).json(data);
    });
});


app.get('/api/ngo/accept', (req, res) => {
    const sql = "SELECT * FROM ngo_reg WHERE status = 'accepted'";

    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching pending applications:', err);
            return res.status(500).json({ message: 'Internal Server Error', error: err });
        }

        res.status(200).json(data);
    });
});

app.post('/api/ngo/accept/:id', (req, res) => {
  const applicationId = req.params.id;

  const updateSql = "UPDATE ngo_reg SET status = 'accepted' WHERE id = ?";
  db.query(updateSql, [applicationId], (err, result) => {
    if (err) {
      console.error('Error updating application status:', err);
      return res.status(500).json({ message: 'Internal Server Error', error: err });
    }

    const selectSql = "SELECT email, name FROM ngo_reg WHERE id = ?";
    db.query(selectSql, [applicationId], (err, data) => {
      if (err) {
        console.error('Error fetching NGO email:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err });
      }

      if (data.length > 0) {
        const ngoEmail = data[0].email;
        const ngoName = data[0].name;

        const emailSubject = 'Your Application Has Been Accepted';
        const emailText = `Dear ${ngoName},\n\nWe are pleased to inform you that your application has been accepted.\n\nBest regards,\nYour Organization`;
        sendEmail(ngoEmail, emailSubject, emailText)
          .then(() => {
            res.status(200).json({ message: 'Application accepted and email sent' });
          })
          .catch((err) => {
            console.error('Error sending email:', err);
            res.status(500).json({ message: 'Application accepted but email not sent' });
          });
      }
    });
  });
});


app.post('/api/ngo/reject/:id', (req, res) => {
  const applicationId = req.params.id;

  const updateSql = "UPDATE ngo_reg SET status = 'rejected' WHERE id = ?";
  db.query(updateSql, [applicationId], (err, result) => {
    if (err) {
      console.error('Error updating application status:', err);
      return res.status(500).json({ message: 'Internal Server Error', error: err });
    }

    const selectSql = "SELECT email, name FROM ngo_reg WHERE id = ?";
    db.query(selectSql, [applicationId], (err, data) => {
      if (err) {
        console.error('Error fetching NGO email:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err });
      }

      if (data.length > 0) {
        const ngoEmail = data[0].email;
        const ngoName = data[0].name;

        const emailSubject = 'Your Application Has Been Rejected';
        const emailText = `Dear ${ngoName},\n\nWe regret to inform you that your application has been rejected.\n\nBest regards,\nYour Organization`;
        sendEmail(ngoEmail, emailSubject, emailText)
          .then(() => {
            res.status(200).json({ message: 'Application rejected and email sent' });
          })
          .catch((err) => {
            console.error('Error sending email:', err);
            res.status(500).json({ message: 'Application rejected but email not sent' });
          });
      }
    });
  });
});



app.get('/api/ngo/accepted', (req, res) => {
  const query = 'SELECT * FROM ngo_reg WHERE status = "accepted"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching accepted applications:', err);
      return res.status(500).json({ error: 'Failed to fetch accepted applications' });
    }
    res.json(results);
  });
});

app.post('/api/ngo/block/:id', (req, res) => {
  const applicationId = req.params.id;

  const updateSql = "UPDATE ngo_reg SET status = 'blocked' WHERE id = ?";
  db.query(updateSql, [applicationId], (err, result) => {
    if (err) {
      console.error('Error blocking application:', err);
      return res.status(500).json({ error: 'Failed to block application' });
    }

    const selectSql = "SELECT email, name FROM ngo_reg WHERE id = ?";
    db.query(selectSql, [applicationId], (err, data) => {
      if (err) {
        console.error('Error fetching NGO email:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err });
      }

      if (data.length > 0) {
        const ngoEmail = data[0].email;
        const ngoName = data[0].name;

        const emailSubject = 'Your Application Has Been Blocked';
        const emailText = `Dear ${ngoName},\n\nWe regret to inform you that your application has been blocked due to certain reasons.\n\nBest regards,\nYour Organization`;
        sendEmail(ngoEmail, emailSubject, emailText)
          .then(() => {
            res.status(200).json({ message: 'Application blocked and email sent' });
          })
          .catch((err) => {
            console.error('Error sending email:', err);
            res.status(500).json({ message: 'Application blocked but email not sent' });
          });
      }
    });
  });
});


app.delete('/api/ngo/delete/:id', (req, res) => {
  const applicationId = req.params.id;
  const query = 'DELETE FROM ngo_reg WHERE id = ?';
  db.query(query, [applicationId], (err, result) => {
    if (err) {
      console.error('Error deleting application:', err);
      return res.status(500).json({ error: 'Failed to delete application' });
    }
    res.json({ message: 'Application deleted successfully' });
  });
});

app.get('/api/ngo/blocked', (req, res) => {
  const query = 'SELECT * FROM ngo_reg WHERE status = "blocked"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching blocked applications:', err);
      return res.status(500).json({ error: 'Failed to fetch blocked applications' });
    }
    res.json(results);
  });
});

app.post('/api/ngo/unblock/:id', (req, res) => {
  const applicationId = req.params.id;

  const updateSql = "UPDATE ngo_reg SET status = 'accepted' WHERE id = ?";
  db.query(updateSql, [applicationId], (err, result) => {
    if (err) {
      console.error('Error unblocking application:', err);
      return res.status(500).json({ error: 'Failed to unblock application' });
    }

    const selectSql = "SELECT email, name FROM ngo_reg WHERE id = ?";
    db.query(selectSql, [applicationId], (err, data) => {
      if (err) {
        console.error('Error fetching NGO email:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err });
      }

      if (data.length > 0) {
        const ngoEmail = data[0].email;
        const ngoName = data[0].name;

        const emailSubject = 'Your Application Has Been Unblocked';
        const emailText = `Dear ${ngoName},\n\nWe are pleased to inform you that your application has been unblocked and is now active.\n\nBest regards,\nYour Organization`;
        sendEmail(ngoEmail, emailSubject, emailText)
          .then(() => {
            res.status(200).json({ message: 'Application unblocked and email sent' });
          })
          .catch((err) => {
            console.error('Error sending email:', err);
            res.status(500).json({ message: 'Application unblocked but email not sent' });
          });
      }
    });
  });
});


app.get('/api/ngo/rejected', (req, res) => {
  const query = 'SELECT * FROM ngo_reg WHERE status = "rejected"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching rejected applications:', err);
      return res.status(500).json({ error: 'Failed to fetch rejected applications' });
    }
    res.json(results);
  });
});


app.post('/api/ngo/rej/accept/:id', (req, res) => {
  const applicationId = req.params.id;

  const updateSql = "UPDATE ngo_reg SET status = 'accepted' WHERE id = ?";
  db.query(updateSql, [applicationId], (err, result) => {
    if (err) {
      console.error('Error accepting application:', err);
      return res.status(500).json({ error: 'Failed to accept application' });
    }

    const selectSql = "SELECT email, name FROM ngo_reg WHERE id = ?";
    db.query(selectSql, [applicationId], (err, data) => {
      if (err) {
        console.error('Error fetching NGO email:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err });
      }

      if (data.length > 0) {
        const ngoEmail = data[0].email;
        const ngoName = data[0].name;

        const emailSubject = 'Your Application Has Been Accepted';
        const emailText = `Dear ${ngoName},\n\nWe are pleased to inform you that your application has been accepted.\n\nBest regards,\nYour Organization`;
        sendEmail(ngoEmail, emailSubject, emailText)
          .then(() => {
            res.status(200).json({ message: 'Application accepted and email sent' });
          })
          .catch((err) => {
            console.error('Error sending email:', err);
            res.status(500).json({ message: 'Application accepted but email not sent' });
          });
      }
    });
  });
});


app.get('/api/ngo/volunteer', (req, res) => {
  const query = 'SELECT * FROM volunteer';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching volunteers:', err);
      return res.status(500).json({ error: 'Failed to fetch volunteers' });
    }
    res.json(results);
  });
});

app.delete('/api/ngo/delete/volunteer/:id', (req, res) => {
  const applicationId = req.params.id;
  const query = 'DELETE FROM volunteer WHERE id = ?'; 
  db.query(query, [applicationId], (err, result) => {
    if (err) {
      console.error('Error deleting volunteer:', err);
      return res.status(500).json({ error: 'Failed to delete' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ message: 'Deleted successfully' });
  });
});

app.get('/api/ngo/donors', (req, res) => {
  const query = 'SELECT * FROM doners'; 
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching donors:', err);
      return res.status(500).json({ error: 'Failed to fetch donors' });
    }
    res.json(results);
  });
});


app.delete('/api/ngo/delete/donor/:id', (req, res) => {
  const donorId = req.params.id;
  const query = 'DELETE FROM doners WHERE id = ?'; 
  db.query(query, [donorId], (err, result) => {
    if (err) {
      console.error('Error deleting donor:', err);
      return res.status(500).json({ error: 'Failed to delete donor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Donor not found' });
    }
    res.json({ message: 'Donor deleted successfully' });
  });
});

app.get('/api/ngo/name/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT id, Name FROM ngo_reg WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      res.json({ id: results[0].id, Name: results[0].Name });
    } else {
      res.status(404).json({ message: 'NGO not found' });
    }
  });
});


app.get('/api/ngo/works', (req, res) => {
  const query = 'SELECT * FROM ngo_work'; 
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching donors:', err);
      return res.status(500).json({ error: 'Failed to fetch donors' });
    }
    res.json(results);
  });
});

app.delete('/api/ngo/delete/work/:id', (req, res) => {
  const nid = req.params.id;
  const query = 'DELETE FROM ngo_work WHERE id = ?'; 
  db.query(query, [nid], (err, result) => {
    if (err) {
      console.error('Error deleting donor:', err);
      return res.status(500).json({ error: 'Failed to delete donor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Donor not found' });
    }
    res.json({ message: 'Donor deleted successfully' });
  });
});



app.get('/api/image/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT pImage FROM ngo_reg WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching image from database:', err);
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      res.json({ image: results[0].pImage });
    } else {
      res.status(404).json({ message: 'NGO not found' });
    }
  });
});


app.get('/api/donors', (req, res) => {
  const { ngoId } = req.query;
  const sql = 'SELECT * FROM doners WHERE ngo_id = ?';
  db.query(sql, [ngoId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});



app.post('/ngo/bank',(req,res)=>{
    try{
    const sql='INSERT INTO `bank_details`(`ngo_id`, `acc_hol_name`, `bank_name`, `acc_no`, `ifsc`, `branch_name`, `contact`) VALUES (?,?,?,?,?,?,?)';
    const values=[
        req.body.userId,
        req.body.acc_hol_name,
        req.body.bank_name,
        req.body.acc_no,
        req.body.ifsc,
        req.body.branch_name,
        req.body.contact,
    ];
    db.query(sql, values,(err,data)=>{
        if(err){
            console.error('Error in execution query : ',err);
            return res.status(500).json({message:'Internal server error',error:err});
        }
        return res.status(201).json({status:'Success',data});
    });
    }catch (err){
        console.error('Error during signup',err);
        return res.status(500).json({message:'Internal server error',error:err});
    }
})

app.get('/ngo/bank/:userId', (req, res) => {
    const { userId } = req.params;
  
    const query = `SELECT * FROM bank_details WHERE ngo_id = ?`;
  
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error retrieving bank details:', err);
        res.status(500).send('Failed to retrieve bank details');
      } else if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).send('Bank details not found');
      }
    });
  });


app.put('/ngo/bank/update', (req, res) => {
  const values = [
    req.body.acc_hol_name,
    req.body.bank_name,
    req.body.acc_no,
    req.body.ifsc,
    req.body.branch_name,
    req.body.contact,
    req.body.userId
  ];

  const query = `
    UPDATE bank_details 
    SET acc_hol_name = ?, bank_name = ?, acc_no = ?, ifsc = ?, branch_name = ?, contact = ? 
    WHERE ngo_id = ?
  `;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating bank details:', err);
      res.status(500).send('Failed to update bank details');
    } else {
      res.send('Bank details updated successfully');
    }
  });
});

app.get('/api/bank/details/:userId', (req, res) => {
    const { userId } = req.params;

    const query = `SELECT * FROM bank_details WHERE ngo_id = ?`;

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('Bank details not found');
        }
    });
});

app.post('/donation/:ngoId', (req, res) => {
    const { ngoId } = req.params;

    const query = 'INSERT INTO `doners`(`ngo_id`, `dname`, `demail`, `dphone`, `damount`, `date`) VALUES (?, ?, ?, ?, ?, NOW())';

    const donorDetails = [
        ngoId,             
        req.body.dname,
        req.body.demail,
        req.body.dphone,
        req.body.damount
    ];

    db.query(query, donorDetails, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: "Internal Server Error", error: err });
        }
        return res.status(200).json({ status: 'Success', message: 'success' });
    });
});

app.post('/api/upload-proof', upload.single('proof'), (req, res) => {
    const { userId, ngoName, description, expenses } = req.body;
  
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'File upload failed' });
    }
  
    const proofPath = req.file ? req.file.filename : null;
  
    const sql = 'INSERT INTO `ngo_work` (`ngo_id`, `ngoName`, `description`, `expenses`, `proof`, `date`) VALUES (?, ?, ?, ?, ?, now())';
    const values = [userId, ngoName, description, expenses, proofPath];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).json({ success: false, message: 'Error saving proof of work.' });
      }
      res.status(200).json({ success: true, message: 'Proof of work uploaded successfully!' });
    });
  });

  app.get('/api/works', (req, res) => {
    const ngoId = req.query.ngoId;
    const sql = 'SELECT * FROM ngo_work WHERE ngo_id = ? ORDER BY date DESC'; 
    db.query(sql, [ngoId], (err, results) => {
      if (err) {
        console.error('Error fetching works:', err);
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      res.json(results); 
    });
  });

  app.get('/home/ngo/works', (req, res) => {
    const sql = 'SELECT * FROM ngo_work ORDER BY date DESC'; 
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching works:', err);
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      res.json(results); 
    });
  });

  
app.delete('/api/works/:id', (req, res) => {
  const workId = req.params.id;

  const query = 'DELETE FROM ngo_work WHERE id = ?';

  db.query(query, [workId], (err, result) => {
    if (err) {
      console.error('Error deleting work:', err);
      return res.status(500).json({ error: 'Database error occurred while deleting work' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Work not found' });
    }

    res.json({ message: 'Work deleted successfully' });
  });
});


app.post('/ngo/gallery/upload/:id', upload.array('images', 10), (req, res) => {
  const ngoId = req.params.id;
  const files = req.files.map(file => ({
    filename: file.filename,
    url: `/uploads/${file.filename}`,
    description: file.originalname,
  }));

  const query = 'INSERT INTO gallery (filename, description, ngo_id) VALUES ?';
  const values = files.map(file => [file.filename, file.description, ngoId]);

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error('Error inserting image details into database:', err);
      return res.status(500).send('Failed to upload images');
    }
    res.status(200).json(files); 
  });
});


app.get("/api/bank/list", (req, res) => {
  const sql = `
    SELECT 
      bank_details.id, 
      bank_details.acc_hol_name, 
      bank_details.bank_name, 
      bank_details.acc_no, 
      bank_details.branch_name, 
      bank_details.ifsc, 
      bank_details.contact, 
      ngo_reg.Name AS ngo_name
    FROM bank_details
    JOIN ngo_reg ON bank_details.ngo_id = ngo_reg.id`;  // Assuming `ngo_id` in bank_details refers to `id` in ngo_reg

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching bank list:", err);
      res.status(500).json({ message: "Failed to fetch bank list" });
      return;
    }
    res.json(results);
  });
});


app.delete("/api/bank/:id", (req, res) => {
  const bankId = req.params.id;
  const sql = "DELETE FROM bank_details WHERE id = ?";
  
  db.query(sql, [bankId], (err, result) => {
    if (err) {
      console.error("Error deleting bank entry:", err);
      res.status(500).json({ message: "Failed to delete bank entry" });
      return;
    }
    res.json({ message: "Bank entry deleted successfully" });
  });
});



app.get('/ngo/gallery/:ngoId', (req, res) => {
  const { ngoId } = req.params;

  const query = 'SELECT * FROM gallery WHERE ngo_id = ?';
  
  db.query(query, [ngoId], (err, results) => {
    if (err) {
      console.error('Error fetching images from database:', err);
      return res.status(500).send('Failed to retrieve images');
    }

    const images = results.map(file => ({
      id: file.id,
      url: `http://localhost:8081/uploads/${file.filename}`,
      description: file.description,
      file:file.filename,
    }));

    res.send(images);
  });
});


app.get('/api/ngo/images/:id', (req, res) => {
    const { id } = req.params;
  
    const query = 'SELECT * FROM gallery WHERE ngo_id = ?';
    
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error fetching images from database:', err);
        return res.status(500).send('Failed to retrieve images');
      }
  
      if (results.length === 0) {
        return res.status(404).send('No images found for this NGO');
      }
  
      const images = results.map(file => ({
        id: file.id,
        url: `http://localhost:8081/uploads/${file.filename}`, 
        description: file.description,
        file: file.filename,
      }));
  
      res.send(images);
    });
  });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.delete('/ngo/gallery/:ngoId/:imagename', (req, res) => {
    const { ngoId, imagename } = req.params;

    const query = 'DELETE FROM gallery WHERE ngo_id = ? AND  filename= ?';
    db.query(query, [ngoId, imagename], (err) => {
        if (err) {
            console.error('Error deleting image from database:', err);
            return res.status(500).send('Failed to delete image from database');
        }


        const filePath = path.join(__dirname, 'uploads', imagename);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
                return res.status(500).send('Failed to delete image file');
            }

            res.status(200).send('Image deleted successfully');
        });
    });
});

app.get('/api/donations', (req, res) => {
  const ngoId = req.query.ngoId;
  const sql = 'SELECT ngo_id, damount, date, dname FROM doners WHERE ngo_id = ?';
  
  db.query(sql, [ngoId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


app.get('/api/works', (req, res) => {
  const ngoId = req.query.ngoId;
  const sql = 'SELECT ngo_id, expenses, date, description FROM ngo_work WHERE ngo_id = ?';
  
  db.query(sql, [ngoId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

  
app.listen(8081,()=>{
    console.log("Listening")
})