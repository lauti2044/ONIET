import express from "express"
import ventas from './ventas.json' with { type: 'json' };
import cors from "cors";
const app = express();
app.use(cors());

app.get("", (req, res) => {
    res.send("estoy vivo");

});

app.get("/totalFact", (req, res) => {
    let sum = 0;
    ventas.forEach(transaccion => {
        transaccion.items.forEach(producto => {
            sum += producto.precio_unitario * producto.cantidad;
        })
    });
    res.json(sum);
})

app.get("/totalNeto", (req, res) => {
    let sum = 0;
    ventas.forEach(transaccion => {
        transaccion.items.forEach(producto => {
            if (transaccion.cliente.categoria == "Premium") sum += producto.precio_unitario * producto.cantidad * 0.9;
            else sum += producto.precio_unitario * producto.cantidad;
        })
    });
    res.send(sum);
})

app.get("/masVendido", (req, res) => {
    const productos = [];
    let found = false;
    ventas.forEach(transaccion => {
        if(transaccion.estado=="Completada"){
            transaccion.items.forEach(producto => {
            productos.forEach(prodlist => {
                if (prodlist.nombre == producto.producto){
                    prodlist.cantidad += producto.cantidad;
                    found = true;
                }
            })
            if(found==false){
                const prod = {
                    nombre: producto.producto,
                    cantidad: producto.cantidad
                };
                productos.push(prod);
            }
            found=false;
        }
        )
        }
    })
    productos.sort((a, b) => b.cantidad - a.cantidad);
    res.json(productos[0]);
});

app.get("/metodoPago", (req, res) =>  {
    let descuento = 1
    const resumen = {
        TarjetaOp: 0,
        EfectivoOp: 0,
        TransferenciaOp: 0,
        TarjetaTotal: 0,
        EfectivoTotal: 0,
        TransferenciaTotal: 0
    }

    ventas.forEach(transaccion =>{
        if(transaccion.estado=="Completada"){
        if(transaccion.cliente.categoria=="Premium") descuento=0.9;
            if(transaccion.metodo_pago=="Tarjeta"){
                transaccion.items.forEach(producto =>{
                    resumen.TarjetaTotal+=producto.cantidad*producto.precio_unitario*descuento;
                })
                resumen.TarjetaOp++;
            }

            else if(transaccion.metodo_pago=="Transferencia"){
                transaccion.items.forEach(producto =>{
                    resumen.TransferenciaTotal+=producto.cantidad*producto.precio_unitario*descuento;
                })
                resumen.TransferenciaOp++;
            }

            else if(transaccion.metodo_pago=="Efectivo"){
                transaccion.items.forEach(producto =>{
                    resumen.EfectivoTotal+=producto.cantidad*producto.precio_unitario*descuento;
                })
                resumen.EfectivoOp++;
            }
        }
        descuento = 1;
    })
    res.json(resumen);
})

app.get("/ventas", (req, res) => {
    res.json(ventas);
});

app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});
