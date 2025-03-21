import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccount from '../../../firebase-auth-svc-key.json';
import path from "node:path";
import * as fs from "node:fs";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

console.log(`DIR name=${__dirname}`);

// Serve static files from the Angular app
const angularAppPath = path.resolve(__dirname, '../../client/dist/client/browser');
app.use(express.static(angularAppPath));

app.post('/verifyToken', async (req, res) => {
  const idToken = req.body.token;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.json({ uid: decodedToken.uid });
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});

console.log("Checking if index.html exists at:", path.join(angularAppPath, "index.html"));
console.log(fs.existsSync(path.join(angularAppPath, "index.html")));

// All other GET requests not handled before will return the Angular app
app.get('*', (req, res, next) => {
  const filePath = path.join(angularAppPath, 'index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Failed to send index.html:", err);
      res.status(500).send("Error loading Angular app");
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

