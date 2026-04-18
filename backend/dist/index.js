"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
// Configure multer for memory storage (files are NOT saved to disk)
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
}));
app.use(express_1.default.json());
// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: "Access denied" });
        return;
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ error: "Invalid token" });
            return;
        }
        req.user = user;
        next();
    });
};
app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
});
// Register
app.post("/api/auth/register", async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Email and password required" });
        return;
    }
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    }
    catch (error) {
        res.status(400).json({ error: "User already exists or invalid data" });
    }
});
// Login
app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Email and password required" });
        return;
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        res.status(400).json({ error: "User not found" });
        return;
    }
    const validPassword = await bcrypt_1.default.compare(password, user.password);
    if (!validPassword) {
        res.status(400).json({ error: "Invalid password" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});
// Submit Questionnaire
app.post("/api/questionnaire", authenticateToken, async (req, res) => {
    const { data } = req.body;
    if (!data) {
        res.status(400).json({ error: "Questionnaire data is required" });
        return;
    }
    try {
        const questionnaire = await prisma.questionnaire.create({
            data: {
                userId: req.user.userId,
                data: JSON.stringify(data) // store anything sent by frontend
            }
        });
        res.json(questionnaire);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to save questionnaire" });
    }
});
// Get User's Questionnaires (Analytics)
app.get("/api/questionnaire", authenticateToken, async (req, res) => {
    try {
        const questionnaires = await prisma.questionnaire.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' }
        });
        // Parse the JSON data before sending
        const formatted = questionnaires.map(q => ({
            ...q,
            data: JSON.parse(q.data)
        }));
        res.json(formatted);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch questionnaires" });
    }
});
// AI Analysis Endpoint (Image in memory, not saved)
app.post("/api/analyze", authenticateToken, upload.single("image"), async (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No image uploaded" });
        return;
    }
    // The image is currently in memory (req.file.buffer) and will be discarded after this request.
    // It is NOT stored anywhere on the disk.
    try {
        // Simulate AI analysis delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        const mockResult = "Based on the AI analysis, the provided sample indicates a 95% confidence level for normal tissue structure.";
        // Save only the result in the database
        const analysis = await prisma.aIAnalysis.create({
            data: {
                userId: req.user.userId,
                result: mockResult
            }
        });
        res.json({
            message: "Analysis complete. Image discarded for privacy.",
            analysis
        });
    }
    catch (error) {
        res.status(500).json({ error: "Analysis failed" });
    }
});
// Get User's AI Analyses
app.get("/api/analyze", authenticateToken, async (req, res) => {
    try {
        const analyses = await prisma.aIAnalysis.findMany({
            where: { userId: req.user.userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json(analyses);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch analyses" });
    }
});
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
