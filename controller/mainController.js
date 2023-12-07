// controller/mainController.js
const { firestore } = require('../config/firebaseConfig');

const getHelloMessage = async () => {
  const doc = await firestore.collection('messages').doc('hello').get();
  return doc.data().message;
};

module.exports = { getHelloMessage };
