const ranking_hardcodeado = [{
    "nombre": "Producto1",
    "cantidad": 3,
},
{
    "nombre": "Producto4",
    "cantidad": 4,
},
{
    "nombre": "Producto5",
    "cantidad": 8,
},
{
    "nombre": "Producto6",
    "cantidad": 10,
},
]
async function cargarRanking() {
    //const facturado = await axios.get("http://172.16.4.126:3000/totalFact");
const ranking = ranking_hardcodeado;
    document.getElementById("resultado").textContent = facturado.data;
}


async function cargarTotal() {
    const facturado = await axios.get("http://172.16.6.147:3000/totalFact");

    document.getElementById("resultado").textContent = facturado.data;
}

cargarTotal();

async function cargarDesc() {
    const descuentos = await axios.get("http://172.16.6.147:3000/totalNeto");

    document.getElementById("referencia").textContent = descuentos.data;
}

cargarDesc();