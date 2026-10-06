import cors from "cors"
import express from "express"
import data from './data.json' with { type: 'json' };

const app = express();
app.use(cors());
app.use(express.static("."));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "." });
});

app.get("/ranking1",(req,res)=>{
    const ranking = {}
    data.forEach(empresa => {
        let dc = empresa.CompaniaSeguro
        if(!ranking[dc]){
            ranking[dc] = {
               compañia_de_seguros:dc,
                total_facturado:0.0,
                total_cobertura_compañia_seguro:0.0
            }
        }
        let total_f = empresa.ValorPorServicio * empresa.CantidadServicios
        ranking[dc].total_facturado +=  total_f
        ranking[dc].total_cobertura_compañia_seguro += total_f * empresa.PorcentajeCobertura
    });
    const rankingvec = Object.values(ranking)
    rankingvec.sort((a, b) => b.total_facturado - a.total_facturado);
    
    res.json(rankingvec)
})

app.get("/ranking2",(req,res)=>{
    const ranking2 = []
    let found = false
    data.forEach(empresa => {
        ranking2.forEach(reg => {
            if(reg.nombre==empresa.Region){
                reg.servicios += Number(empresa.CantidadServicios)
                found = true
            }
        })
        if(found==false){
            let regRank = {
                nombre: empresa.Region,
                servicios: Number(empresa.CantidadServicios)
            }
            ranking2.push(regRank)
        }
        found = false
    })
     ranking2.sort((a, b) => b.servicios - a.servicios);
     res.json(ranking2)
})


app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});
