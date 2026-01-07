// // backend/server.js
// const express = require('express');
// const cors = require('cors');
// const db = require('./db/database');

// const authRoutes = require('./routes/authRoutes');
// const traineeRoutes = require('./routes/traineeRoutes');
// const attendanceRoutes = require('./routes/attendanceRoutes');
// const marksheetRoutes = require('./routes/marksheetRoutes');
// const profileRoutes = require('./routes/profileRoutes');
// const trainerRoutes = require('./routes/trainerRoutes');

// const app = express();
// //app.use(cors());
// //app.use(cors({ origin: "*" }));


// const allowedOrigins = [
//   "http://localhost:5173",              // local frontend (Vite)
//   "https://supervisortrainingcentre.onrender.com" // backend self
//   // later you will add Vercel URL here
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (Postman, curl)
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true
// }));

// app.use(express.json({ limit: '20mb' }));
// app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// // ✅ Simple test route (must come before other routes)
// app.get('/api/ping', (req, res) => {
//   res.send('✅ API is alive');
// });

// // ✅ Mount actual routes
// app.use('/api/trainees', traineeRoutes);
// app.use('/api', authRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.use('/api', marksheetRoutes);
// app.use('/api/profile', profileRoutes);
// app.use('/api/trainers', trainerRoutes);


// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db/database');

const authRoutes = require('./routes/authRoutes');
const traineeRoutes = require('./routes/traineeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const marksheetRoutes = require('./routes/marksheetRoutes');
const profileRoutes = require('./routes/profileRoutes');
const trainerRoutes = require('./routes/trainerRoutes');

const app = express();

/* ✅ ALLOWED ORIGINS */
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://supervisor-training-centre.vercel.app", // ✅ Vercel frontend
  "https://supervisortrainingcentre.onrender.com" // backend itself
];

/* ✅ CORS CONFIG */
app.use(cors({
  origin: function (origin, callback) {
    // allow Postman / server-to-server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

/* ✅ TEST ROUTE */
app.get('/api/ping', (req, res) => {
  res.send('✅ API is alive');
});

/* ✅ ROUTES */
app.use('/api/trainees', traineeRoutes);
app.use('/api', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api', marksheetRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/trainers', trainerRoutes);

/* ✅ IMPORTANT: USE ENV PORT */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
