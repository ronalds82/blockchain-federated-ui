import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());
app.use(express.json());

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Pinata API Credentials
const PINATA_API_KEY = '7762c2df5c8007402dc2';
const PINATA_API_SECRET = '5c22066eeab5650e1c4e088d45b8020e786f5c9b123f1129e71788f980e5404d';

const models = []; // Store models (in-memory for simplicity)

// Upload to IPFS
app.post('/upload-to-ipfs', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ success: false, message: 'No file uploaded' });
    }

    const file = req.file;

    // Create a FormData instance
    const formData = new FormData();
    formData.append('file', fs.createReadStream(file.path));

    // Upload file to Pinata
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity', // Allow large files
        headers: {
          ...formData.getHeaders(),
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_API_SECRET,
        },
      }
    );

    // Delete the file from the server after upload
    fs.unlinkSync(file.path);

    // Store the model information
    const model = {
      id: models.length + 1, // Incremental ID
      cid: response.data.IpfsHash,
      timestamp: new Date().toISOString(),
      version: `v${models.length + 1}`,
    };
    models.push(model);

    // Send the CID back to the client
    res.send({ success: true, cid: response.data.IpfsHash });
  } catch (error) {
    console.error('Pinata upload error:', error.response?.data || error.message);
    res.status(500).send({ success: false, message: 'Error uploading to Pinata' });
  }
});

// Get models
app.get('/models', (req, res) => {
  res.send(models);
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
