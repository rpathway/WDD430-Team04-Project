/**
 * server.js - Entry point
 *
 *
 * Responsibilities:
 *   - Bootstrap Express with middleware
 *   - Mount all route modules
 *
 * Everything else lives in routes/.
 */
import 'dotenv/config';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';

import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '8080', 10);


////////////////////////////////////////
// Middleware
////////////////////////////////////////
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


////////////////////////////////////////
// Routes
////////////////////////////////////////
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});


////////////////////////////////////////
// Server
////////////////////////////////////////
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});


process.on('SIGINT', () => {
  console.log('\nGoodbye!');
  process.exit(0);
});