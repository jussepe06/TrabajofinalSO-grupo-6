const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

const MONGO_URL = "mongodb://172.31.43.24:27017";
const DB_NAME = "techzone_social";

app.use(cors());
app.use(express.json());

let db;

async function conectarMongo() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(DB_NAME);
    console.log("Conectado a MongoDB:", DB_NAME);
}

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "TechZone Social API funcionando"
    });
});

app.get("/comentarios/:id_producto", async (req, res) => {
    const id_producto = parseInt(req.params.id_producto);

    const comentarios = await db.collection("comentarios")
        .find({ id_producto })
        .sort({ fecha: -1 })
        .toArray();

    res.json(comentarios);
});

app.post("/comentarios", async (req, res) => {
    const { id_producto, usuario, comentario, rating } = req.body;

    if (!id_producto || !usuario || !comentario) {
        return res.status(400).json({
            success: false,
            message: "Datos incompletos"
        });
    }

    const nuevoComentario = {
        id_producto: parseInt(id_producto),
        usuario,
        comentario,
        rating: Number(rating) || 5,
        fecha: new Date(),
        likes: 0,
        reacciones: [],
        respuestas: []
    };

    await db.collection("comentarios").insertOne(nuevoComentario);

    res.json({
        success: true,
        message: "Comentario registrado correctamente"
    });
});

app.post("/comentarios/:id/like", async (req, res) => {
    const id = req.params.id;

    await db.collection("comentarios").updateOne(
        { _id: new ObjectId(id) },
        { $inc: { likes: 1 } }
    );

    res.json({
        success: true,
        message: "Like agregado"
    });
});

app.post("/comentarios/:id/reaccion", async (req, res) => {
    const id = req.params.id;
    const { tipo } = req.body;

    if (!tipo) {
        return res.status(400).json({
            success: false,
            message: "Tipo de reacción requerido"
        });
    }

    await db.collection("comentarios").updateOne(
        { _id: new ObjectId(id) },
        {
            $push: {
                reacciones: {
                    tipo,
                    fecha: new Date()
                }
            }
        }
    );

    res.json({
        success: true,
        message: "Reacción agregada"
    });
});

app.post("/comentarios/:id/responder", async (req, res) => {
    const id = req.params.id;
    const { usuario, respuesta } = req.body;

    if (!usuario || !respuesta) {
        return res.status(400).json({
            success: false,
            message: "Datos incompletos"
        });
    }

    await db.collection("comentarios").updateOne(
        { _id: new ObjectId(id) },
        {
            $push: {
                respuestas: {
                    usuario,
                    respuesta,
                    fecha: new Date()
                }
            }
        }
    );

    res.json({
        success: true,
        message: "Respuesta agregada"
    });
});

conectarMongo()
    .then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Social API escuchando en puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error conectando a MongoDB:", error);
    });
