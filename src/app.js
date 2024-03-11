const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const app = express();
const MAIN_PORT = 9696; // Change to a number, not a string

// Check if the server.pid file exists


if (fs.existsSync('server.pid')) {
  // Read the PID of the previous server
  const previousServerPID = fs.readFileSync('server.pid', 'utf8');

  // Attempt to terminate the previous server process
  try {
    process.kill(previousServerPID, 'SIGTERM');
    console.log(`Terminated previous server process with PID ${previousServerPID}`);
  } catch (error) {
    console.error(`Error terminating previous server process: ${error.message}`);
  }
}

// Store the current server's PID in the server.pid file
fs.writeFileSync('server.pid', process.pid.toString(), 'utf8');

// Continue with your server setup
const notFoundMiddleware = require('./middleware/notFoundMiddleware');

const patientRoute = require("./routes/patientRoute");
const precriptionRoute = require("./routes/precriptionRoutes");
const treatmentRoutes = require("./routes/treatmentRoute");
const bookingAppointmentRoute = require("./routes/bookingAppointmentRoute");
const invoiceRoutes = require("./routes/invoiceRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const accountRoute = require("./routes/accountRoute");
const dentistRoute = require("./routes/dentistRoute");
const medicineRoute = require("./routes/medicineRoute");

const authRoute = require("./routes/authRoute"); 

const internalServerErrorMiddleware = require('./middleware/internalServerError');

const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  multipleStatements: true, // Allow executing multiple statements in a single query
  connectionConfig: {
    noWrap: process.env.DB_NO_WRAP === 'true',
    transaction: process.env.DB_TRANSACTION === 'true',
  }
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
    connection.release();
  }
});

// Your Express.js routes and middleware can go here

app.listen(MAIN_PORT, function () {
  console.log(`Server started on port ${MAIN_PORT}`);
});
const sessionStoreOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const sessionStore = new MySQLStore(sessionStoreOptions);

app.use(
  session({
    secret: 'healthUs',
    resave: false,
    saveUninitialized: false,
    store: sessionStore, // Use the MySQL session store
  })
);
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render('login');
});
app.get('/signup', (req, res) => {
  res.render('signup');
});
app.use(session({
  secret: 'healthUs',
  resave: false,
  saveUninitialized: false,
}));
app.use("/", accountRoute);
app.use("/", authRoute);
app.use("/", patientRoute);
app.use("/", treatmentRoutes);
app.use("/", precriptionRoute);
app.use("/", invoiceRoutes);
app.use("/", appointmentRoutes);
app.use("/", dentistRoute);
app.use("/", medicineRoute);

app.use("/bookingAppointment", bookingAppointmentRoute);
// Comment them here if you wanna fix bugs
app.use(notFoundMiddleware);
app.use(internalServerErrorMiddleware);
