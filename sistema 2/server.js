import data from './data.json' with { type: 'json' }
import cors from "cors"
import express from "express"

const app = express();
app.use(cors());
app.use(express.static("."));

app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "."} )
})

app.get("/reporte1", (req,res) =>{
    const rank = []
    data.forEach(cadena => {
        let dc = cadena.CadenaHotelera
        if(!rank[dc]){
            rank[dc]={
                posicion: Number(cadena.NumeroRegistro),
                cadena: cadena.CadenaHotelera,
                reservas: Number(cadena.CantidadReservas),
                noches: Number(cadena.CantidadNoches),
                ingreso_estimado: 0
                
            }
        }
        let ingreso = 0
        ingreso += Number(cadena.CantidadNoches) * Number(cadena.TarifaPromedioNoche)
        rank[dc].ingreso_estimado += Number(ingreso)
    });
    rank.sort((a, b) => b.ingreso_estimado - a.ingreso_estimado);
    const ranking = Object.values(rank)
    res.json(ranking)
    console.log(ranking)
})

app.get("/reporte2", (req,res) =>{
    const rank1 = []
    let found = false
    data.forEach(cadena => {
        rank1.forEach(cadenarank => {
            if(cadenarank.region==cadena.Region){
                cadenarank.noches+=Number(cadena.CantidadNoches)
                found = true
            }
        })
            if(found==false){
                let hotel = {
                    posicion: Number(cadena.NumeroRegistro),
                    region: cadena.Region,
                    noches: Number(cadena.CantidadNoches)
                }
                rank1.push(hotel)
            }
            found = false
    });
    rank1.sort((a, b) => b.noches - a.noches)
    res.json(rank1)
})

app.get("/reporte3", (req,res) =>{
    const rank2 = []
    let found = false
    data.forEach(cadena => {
        rank2.forEach(cadenarank => {
            if(cadenarank.cadena==cadena.CadenaHotelera){
                cadenarank.nochestotales+=Number(cadena.CantidadNoches)
                cadenarank.nochesreservadas+=Number(cadena.CantidadReservas)
                found = true
            }
        })
            if(found==false){
                let hotel = {
                    cadena: cadena.CadenaHotelera,
                    nochestotales: Number(cadena.CantidadNoches),
                    nochesreservadas: Number(cadena.CantidadReservas),
                    promedio: 0
                }
                rank2.push(hotel)
            }
            found = false;
    });
    
    rank2.forEach(cadenas => {
        cadenas.promedio = cadenas.nochesreservadas * 100 / cadenas.nochestotales
    })
    
    rank2.sort((a, b) => b.promedio - a.promedio)
    res.json(rank2)
})

app.get("/reporte4", (req,res) =>{
    const rank3 = []
    let found = false
    data.forEach(cadena => {
        rank3.forEach(cadenarank => {
            if(cadenarank.anio==cadena.Anio && cadenarank.mes==cadena.Mes){
                cadenarank.nochesreservadas+=Number(cadena.CantidadReservas)
                cadenarank.nochestotales+=Number(cadena.CantidadNoches)
                found = true
            }
        })
            if(found==false){
                let hotel = {
                    anio: Number(cadena.Anio),
                    mes: Number(cadena.Mes),
                    nochesreservadas: Number(cadena.CantidadReservas),
                    nochestotales: Number(cadena.CantidadNoches)
                }
                rank3.push(hotel)
            }
            found = false;
    });
    res.json(rank3)
})

app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});