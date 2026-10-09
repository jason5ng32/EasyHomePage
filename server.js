import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const frontendApp = express();
const frontEndPort = parseInt(process.env.FRONTEND_PORT || 18772, 10);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static assets from docs directory
frontendApp.use(express.static(path.join(__dirname, './docs')));

// Start local static file server
frontendApp.listen(frontEndPort, () => {
    console.log(`Static file server running on port http://localhost:${frontEndPort}`);
});
