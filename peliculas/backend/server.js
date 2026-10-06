import express from "express"
import peliculas from './peliculas.json' with { type: 'json' };
import cors from "cors"

const app = express();
app.use(cors());

app.get("", (req, res) => {
    res.send("estoy vivo");

});

app.get("/neta", (req, res) => {

}
)

app.get("/ranking", (req, res) => {
let ranking = []
let titulosdelostop = []
ranking.push(peliculatop1)
peliculas.forEach(calificacion => {
    ranking = calificacion
})
}
)
app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});