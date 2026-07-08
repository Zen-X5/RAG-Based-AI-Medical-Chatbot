// routes/aiRoutes.js

const express = require("express");
const axios = require("axios");

const Message = require("../models/Message");
const Chat = require("../models/Chat");

const router = express.Router();

router.post("/ask-ai", async (req, res) => {

    try {

        const data = req.body;

        // Save user message
        await Message.create({
            role: "user",
            content: data.question,
            chat: data.id
        });

        // Call FastAPI
        const llmRes = await axios.post(
            "http://127.0.0.1:8000/api/ai-service/data",
            {
                question: data.question
            }
        );

        // Save assistant message
        await Message.create({
            role: "assistant",
            content: llmRes.data.message,
            chat: data.id
        });

        // Get current chat
        const existingChat = await Chat.findById(data.id);

        // Update title only first time
        if (existingChat.title === "New Chat") {

            await Chat.findByIdAndUpdate(
                data.id,
                {
                    title: llmRes.data.title
                }
            );

        }

        res.json({
            success: llmRes.data.message
        });

    } catch (e) {

        res.status(500).json({
            error: e.response?.data?.error || e.message
        });

    }

});

router.post("/createNewChat", async (req, res) => {

    try {

        const newChat = await Chat.create({});

        res.json({
            chatid: newChat._id
        });

    } catch (e) {

        res.status(500).json({
            error: e.message
        });

    }

});

router.get("/getChats", async (req, res) => {

    try {

        const allChats = await Chat.find({})
        .sort({ createdAt: -1 });

        res.json({
            success: allChats
        });

    } catch (e) {

        res.status(500).json({
            error: e.message
        });

    }

});

router.get("/getOldChats/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const msgs = await Message.find({
            chat: id
        });

        res.json({
            success: msgs
        });

    } catch (e) {

        res.status(500).json({
            error: e.message
        });

    }

});

module.exports = router;