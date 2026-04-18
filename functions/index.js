import express from 'express'
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());

app.post('/analyzeFarmAgent', async (req, res) => {
    try {
        const inputData = req.body.data || req.body;

        console.log("Processing request for:", inputData.crop, "at", inputData.address);

        if (!inputData.crop || !inputData.address) {
            throw new Error("Missing crop or address in request body");
        }

        const { analyzeFarmAgent: runAgent } = await import("./agent.js");
        const result = await runAgent(inputData);

        res.json(result);
    } catch (error) {
        console.error("SERVER ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.status(200).send("Backend is Live!");
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend is listening on port ${PORT}`);
});




