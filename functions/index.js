const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      return res.redirect(303, snapshot.ref.toString());
    });
  });
  

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
.onCreate((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const original = snapshot.val();
  console.log('Uppercasing', context.params.pushId, original);
  const uppercase = original.toUpperCase();
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  return snapshot.ref.parent.child('uppercase').set(uppercase);
});


exports.visitsGlobalTally = functions.https.onCall((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;

  return admin
      .database()
      .ref('/visits/Ipt2DXfZ1PgfHcZ6o5QjnMOma9C2')
      .once('value')
      .then(snapshot => {
        res.json(snapshot.val())
      })
   
})


// let's trigger this function with a file upload to google cloud storage
exports.fileUploaded = functions.storage.object().onFinalize(event => {

    const object = event.data; // the object that was just uploaded
    const bucket = gcs.bucket(object.bucket);
    const signedUrlConfig = { action: 'read', expires: '03-17-2025' }; // this is a signed url configuration object
  
    var fileURLs = []; // array to hold all file urls 
  
    // this is just for the sake of this example. Ideally you should get the path from the object that is uploaded :)
    const folderPath = "burgers/";
  
    bucket.getFiles({ prefix: folderPath }, function(err, files) {
      // files = array of file objects
      // not the contents of these files, we're not downloading the files. 
  
      files.forEach(function(file) {
        file.getSignedUrl(signedUrlConfig, function(err, fileURL) {
          console.log(fileURL);
          fileURLs.push(fileURL);
        });
      });
  
    });
  
  });