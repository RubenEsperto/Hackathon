const express = require("express")
const { createAnimal, fetchAnimals, fetchAnimalById, modifyAnimal, deleteAnimal } = require("./services/animal");
const { fetchRations, fetchRationById, modifyRation } = require("./services/ration");
const { getUser } = require("./services/user");
const { createToken, verifyToken, removeToken } = require("./services/token");
const { createNewSpent, fetchSpent,} = require("./services/spent");
const app = express();
const cors = require('cors');
const port = 3034;

app.use(cors());
app.use(express.json());

app.post("/animals", async (req, res) => {

    const token = req.headers.authorization

    if ( verifyToken(token) === false) {
        return res.status(403).json({message:`Invalid token.`})
    }

    try {
        const animal = req.body;
        const id = await createAnimal(animal);
        res.status(201).json({ id });
    } catch (error) {
        res.status(500).json({ error: "Failed to create animal" });
    }
});

app.get("/animals", async (req, res) => {
    try {
        const animals = await fetchAnimals();
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch animals" });
    }
});

app.get("/animals/:id", async (req, res) => {

    const token = req.headers.authorization

    if ( verifyToken(token) === false) {
        return res.status(403).json({message:`Invalid token.`})
    }

    try {
        const id = req.params.id;
        const animal = await fetchAnimalById(id);
        if (animal) {
            res.status(200).json(animal);
        } else {
            res.status(404).json({ error: "Animal not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch animal" });
    }
});

app.patch("/animals/:id", async (req, res) => {

    const token = req.headers.authorization

    if ( verifyToken(token) === false) {
        return res.status(403).json({message:`Invalid token.`})
    }

    try {
        const id = req.params.id;
        const update = req.body.ration;
        const success = await modifyAnimal(id, update);
        if (success) {
            res.status(200).json({ message: "Animal updated successfully" });
        } else {
            res.status(404).json({ error: "Animal not found or update failed" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update animal" });
    }
});

app.delete("/animals/:id", async (req, res) => {
    const token = req.headers.authorization

    if ( verifyToken(token) === false) {
        return res.status(403).json({message:`Invalid token.`})
    }

    try {
        const id = req.params.id;
        const success = await deleteAnimal(id);
        if (success) {
            res.status(200).json({ message: "Animal deleted successfully" });
        } else {
            res.status(404).json({ error: "Animal not found or delete failed" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete animal" });
    }
});

app.get("/rations", async (req, res) => {

    const token = req.headers.authorization

    if ( verifyToken(token) === false) {
        return res.status(403).json({message:`Invalid token.`})
    }

    try {
        const rations = await fetchRations();
        res.status(200).json(rations);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch rations" });
    }
});

app.get("/rations/:id", async (req, res) => {

    const token = req.headers.authorization

    if ( verifyToken(token) === false) {
        return res.status(403).json({message:`Invalid token.`})
    }

    try {
        const id = req.params.id;
        const ration = await fetchRationById(id);
        if (ration) {
            res.status(200).json(ration);
        } else {
            res.status(404).json({ error: "Ration not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch ration" });
    }
});

app.patch("/rations/:id", async (req, res) => {

    const token = req.headers.authorization

    if ( verifyToken(token) === false) {
        return res.status(403).json({message:`Invalid token.`})
    }

    const ration = await fetchRationById(req.params.id);

    const spent = {
        date: new Date(),
        rationId: req.params.id,
        quantity: String(Number(req.body.quantity) - Number(ration.quantity.replace("t", ""))) + "t"
    }

    await createNewSpent(spent);

    try {
        const id = req.params.id;
        const update = req.body.quantity;
        const success = await modifyRation(id, update);
        if (success) {
            res.status(200).json({ message: "Ration updated successfully" });
        } else {
            res.status(404).json({ error: "Ration not found or update failed" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update ration" });
    }
});

app.post("/login", async (req, res) => {

    const { name, password } = req.body;

    try {
        const user = await getUser(name);

        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const tokenId = await createToken(user);
        res.status(200).json({ token: tokenId });
    } catch (error) {
        res.status(500).json({ error: "Failed to login" });
    }
});

app.delete("/logout", async (req, res) => {

    const token = req.headers.authorization;

    if ( verifyToken(token) === false) {
        return res.status(403).json({message:`Invalid token.`})
    }

    try {
        await removeToken(token);
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to logout" });
    }
});

app.get("/spent", async (req, res) => {
    const token = req.headers.authorization

    if ( verifyToken(token) === false) {
        return res.status(403).json({message:`Invalid token.`})
    }

    try {
        const spent = await fetchSpent();
        res.status(200).json(spent);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch spent data" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});