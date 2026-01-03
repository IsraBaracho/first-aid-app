import express from 'express';
import cors from 'cors';
import emergencyRoutes from './routes/emergencyRoutes';

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.use('/api', emergencyRoutes);

app.listen(PORT, () => {
    console.log('server is running');
    console.log(`http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/emergencies`);
    console.log(`Health: http://localhost:${PORT}/health`);
});