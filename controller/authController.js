const { admin } = require('../config/firebaseConfig');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().getUserByEmail(email);

    if (!userRecord) {
      return res.status(404).json({
        message: 'User not found',
        error: 'Email address not registered',
      });
    }

    const isPasswordValid = await verifyPassword(password, userRecord.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Login failed',
        error: 'Invalid password',
      });
    }

    const authToken = await loginUser(userRecord.uid);
    return res.status(200).json({
      message: 'Login successful',
      user: {
        email: userRecord.email,
        uid: userRecord.uid,
      },
      authToken,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRecord = await admin.auth().createUser({
      email: email,
      password: hashedPassword,
    });

    await saveUserInfoToFirestore(userRecord.uid, { username });

    const authToken = await loginUser(userRecord.uid);

    return res.status(201).json({
      message: 'Signup successful',
      user: {
        username,
        email,
        uid: userRecord.uid,
      },
      authToken,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(400).json({
      message: 'Signup failed',
      error: error.message,
    });
  }
};

// Save additional user information to Firestore
const saveUserInfoToFirestore = async (userId, userInfo) => {
  const userRef = admin.firestore().collection('users').doc(userId);
  await userRef.set(userInfo);
};

// Function to perform login
const loginUser = async (userId) => {
  const idToken = await admin.auth().createCustomToken(userId);
  return idToken;
};

// Function to verify password using bcrypt
const verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { login, signup };