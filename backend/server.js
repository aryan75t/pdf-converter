// backend/server.js
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fetch from 'node-fetch';
import FormData from 'form-data';

const app = express();
app.use(cors());
const upload = multer();

const API_KEY = 'aryantay26@gmail.com_kYbChZR1BPjtboD5IrGPI3PCOLW5xuGVw4HIZXCqxY01p06oqth8xKNcxpDevoGN';
const API_URL = 'https://api.pdf.co/v1';

app.post('/convert-file', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const extension = file.originalname.split('.').pop().toLowerCase();

    // Upload file to PDF.co
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);

    const uploadRes = await fetch(`${API_URL}/file/upload?name=${file.originalname}`, {
      method: 'POST',
      headers: { 'x-api-key': API_KEY },
      body: formData,
    });

    const uploadData = await uploadRes.json();
    if (!uploadRes.ok || uploadData.error) {
      throw new Error(uploadData.message || 'Upload failed');
    }

    const fileUrl = uploadData.url;
    if (!fileUrl) {
      throw new Error('No upload URL returned');
    }

    // Determine conversion endpoint based on file extension
    let endpoint = '';
    if (['doc', 'docx', 'ppt', 'pptx'].includes(extension)) {
      endpoint = 'pdf/convert/from/doc';
    } else if (['jpg', 'jpeg', 'png', 'bmp', 'tiff', 'gif'].includes(extension)) {
      endpoint = 'pdf/convert/from/image';
    } else if (extension === 'html') {
      endpoint = 'pdf/convert/from/html';
    } else if (['txt'].includes(extension)) {
      endpoint = 'pdf/convert/from/text';
    } else if (['xls', 'xlsx', 'csv'].includes(extension)) {
      // Excel/CSV → PDF
      endpoint = 'xls/convert/to/pdf';  // correct endpoint per PDF.co docs :contentReference[oaicite:1]{index=1}
    } else {
      throw new Error(`Unsupported file format: .${extension}`);
    }

    // Convert to PDF
    const convertRes = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: fileUrl,
        name: file.originalname.split('.')[0] + '.pdf',
      }),
    });

    const convertData = await convertRes.json();
    if (!convertRes.ok || convertData.error) {
      throw new Error(convertData.message || 'Conversion failed');
    }

    // Return result URL
    res.json({ resultUrl: convertData.url });
  } catch (err) {
    console.error('Error converting file:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('Backend listening on http://localhost:3001');
});
