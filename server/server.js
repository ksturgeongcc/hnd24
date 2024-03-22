const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGO_URI = 'mongodb+srv://karenmd:MSgyp9jI3dx7KvNA@cluster0.jz6h4uo.mongodb.net/portal?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// User model
const User = mongoose.model('User', {
  email: String,
  password: String,
  forename: String,
  surname: String,
  department: String,
  guardian: String,
  guardian_name: String,
  notes: String,
  dob: Date,
  patient_number: String,
});

// Register route
app.post('/api/register', async (req, res) => {
  try {
    const { patient_number, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ patient_number });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance and save it to the 'users' collection
    const newUser = new User({ patient_number, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ...

app.get('/api/users', async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Verify the token
    jwt.verify(token, 'your-secret-key', async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      // The decoded.userId should match the structure used in jwt.sign during login
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return data only for the authenticated user
    // Inside the /api/users route
const formattedUser = {
  _id: user._id,
  email: user.email,
  forename: user.forename,
  surname: user.surname,
  department: user.department,
  is_admin: user.is_admin, // Add this line
  guardian: user.guardian, // Add this line
  guardian_name: user.guardian_name,
  notes: user.notes, 
  dob: user.dob,
  patient_number: user.patient_number,
  // Add any additional fields you want to include
};

res.json(formattedUser);

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.get('/api/patients', async (req, res) => {
//   try {
//     // Fetch all patients from the User collection
//     const patients = await User.find();

//     // Map the users to include only the desired information
//     const formattedPatients = patients.map((patient) => ({
//       _id: patient._id,
//       email: patient.email,
//       forename: patient.forename,
//       surname: patient.surname,
//       department: patient.department,
//       is_admin: patient.is_admin,
//       guardian: patient.guardian, // Add this line
//       guardian_name: patient.guardian_name,
//       notes: patient.notes, 
//       dob: patient.dob,
      
   
      
//       // Add any additional fields you want to include
//     }));

//     res.json(formattedPatients);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// Login route
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
//       expiresIn: '1h',
//     });

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// Login route
// Inside the /api/login route
app.post('/api/login', async (req, res) => {
  try {
    const { patient_number, password } = req.body;
    const user = await User.findOne({ patient_number });

    if (!user) {
      return res.status(401).json({ error: 'Invalid patient_number or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid patient_number or password' });
    }

    // Include is_admin in the token payload
    const tokenPayload = {
      userId: user._id,
      // is_admin: user.is_admin
    };

    const token = jwt.sign(tokenPayload, 'your-secret-key', {
      expiresIn: '1h',
    });

    // Include is_admin in the response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
