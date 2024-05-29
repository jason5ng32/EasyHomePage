import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const frontendApp = express();
const frontEndPort = parseInt(process.env.FRONTEND_PORT || 18772, 10);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 设置静态文件目录
frontendApp.use(express.static(path.join(__dirname, './docs')));

// 启动静态文件服务
frontendApp.listen(frontEndPort, () => {
    console.log(`Static file server running on port http://localhost:${frontEndPort}`);
});
