const botonSeleccionarJugador = document.getElementById("seleccionar-jugador")
const jugadorSeleccionado = document.getElementById("jugador-seleccionado")
const enemigoSeleccionado = document.getElementById("enemigo-seleccionado")
const zeus = document.getElementById("zeus")
const chester = document.getElementById("chester")
const pelusa = document.getElementById("pelusa")
const botonFuego  = document.getElementById("boton-fuego")
const botonAgua = document.getElementById("boton-agua")
const botonTierra = document.getElementById("boton-tierra")
const textVidasJugador = document.getElementById("vidas-jugador")
const textVidasEnemigo = document.getElementById("vidas-enemigo")
const textResultadoFinal = document.getElementById("resultado-final")
const botonReiniciarJuego = document.getElementById("reiniciar-juego")
const textSecuenciaAtaquesJugador = document.getElementById("ataque-jugador-text")
const textSecuenciaAtaquesEnemigo = document.getElementById("ataque-enemigo-text")

// Secciones del Juego
const seccionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const seccionMensajeSeleccion = document.getElementById("mensaje-seleccion")
const seccionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const seccionFotoJugador = document.getElementById("foto-jugador-content")
const seccionFotoEnemigo = document.getElementById("foto-enemigo-content")
const seccionMensajeFinal = document.getElementById("mensaje-final")
const seccionReiniciarJuego = document.getElementById("reiniciar-juego")

//Canvas 
const seccionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

seccionSeleccionarMascota.style.display = "flex"
seccionVerMapa.style.display = "none"
seccionMensajeSeleccion.style.display = "none"
seccionSeleccionarAtaque.style.display = "none"
seccionMensajeFinal.style.display = "none"
seccionReiniciarJuego.style.display = "none"


botonSeleccionarJugador.addEventListener("click", confirmacionJugador)
botonFuego.addEventListener("click", ataqueFuego)
botonAgua.addEventListener("click", ataqueAgua) 
botonTierra.addEventListener("click", ataqueTierra)
botonReiniciarJuego.addEventListener("click", reiniciarJuego)

let mokepones = []
let ataqueJugador;
let ataqueEnemigo;
let resultadoFinal;
let contadorVidasEnemigo = 3
let contadorVidasJugador = 3
let fotoJugadorContent;
let nombreJugadorMascota;
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mapa-moke.png"
let miMokepon;

let mapHeight;
let mapWidth = window.innerWidth - 20
const mapWidthMax = 450

if (mapWidth > mapWidthMax) {
    mapWidth = mapWidthMax - 20
}

mapHeight = mapWidth * 600 / 800

mapa.width = mapWidth 
mapa.height = mapHeight

class Mokepon {
    constructor (nombre, foto, vida, fotoMapa,) {
        this.nombre = nombre
        this.foto = foto 
        this.vida = vida 
        this.ataques = []
        this.height = 50
        this.width = 50
        this.x = aleatorio(0, mapa.width - this.width)
        this.y = aleatorio(0, mapa.height - this.height)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.height,
            this.width
        )
    }
}

let objectZeus = new Mokepon("Zeus", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png", 50, 50)
let objectChester = new Mokepon("Chester", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png", 50, 50)
let objectPelusa = new Mokepon("Pelusa", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png", 50, 50)


let objectZeusEnemigo = new Mokepon("Zeus", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png")
let objectChesterEnemigo = new Mokepon("Chester", "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png")
let objectPelusaEnemigo = new Mokepon("Pelusa", "./assets/mokepons_mokepon_ratigueya_attack.png", 5, "./assets/ratigueya.png")


mokepones.push(objectZeus, objectChester, objectPelusa)

console.log(mokepones)

function confirmacionJugador() {

    if (zeus.checked) {
        jugadorSeleccionado.innerHTML = objectZeus.nombre
        nombreJugadorMascota = objectZeus.nombre
    } else if (chester.checked) {
        jugadorSeleccionado.innerHTML = objectChester.nombre
        nombreJugadorMascota = objectChester.nombre
    } else if (pelusa.checked) {
        jugadorSeleccionado.innerHTML = objectPelusa.nombre
        nombreJugadorMascota = objectPelusa.nombre
    } else {
        alert("Selecciona mascota")
        return 
    }

    seccionSeleccionarMascota.style.display = "none"
    seccionVerMapa.style.display = "flex"
    iniciarMapa()
    fotoJugador()
    
}

function fotoJugador() {
    for (let i = 0; i < mokepones.length; i++) {
        if (nombreJugadorMascota == mokepones[i].nombre) {
            fotoJugadorContent = `
                <img src="${mokepones[i].foto}" alt="">
            `
        }
    }

    seccionFotoJugador.innerHTML = fotoJugadorContent
    
}

function mascotaEnemigaAleatoria(enemigo) {
    const enemigoAleatorio = aleatorio(0, mokepones.length - 1)
    enemigoSeleccionado.innerHTML = enemigo.nombre
    seccionFotoEnemigo.innerHTML = `<img src="${enemigo.foto}" alt="">`


}

function ataqueFuego (){
    ataqueJugador = "🔥"
    seleccionAtaqueEnemigo()
}
function ataqueAgua(){
    ataqueJugador = "💧"
    seleccionAtaqueEnemigo()
}
function ataqueTierra(){
    ataqueJugador = "🌾"
    seleccionAtaqueEnemigo()
}

function seleccionAtaqueEnemigo() {
    const ataqueAleatorioEnemigo = aleatorio(1,3) 
    if (ataqueAleatorioEnemigo == 1 ) {
        ataqueEnemigo = "🔥"
    } else if (ataqueAleatorioEnemigo == 2) {
        ataqueEnemigo = "💧"
    } else {
        ataqueEnemigo = "🌾"
    }

    ataquesDuelo()
    resultadoJuego()
}

function ataquesDuelo() {
    textSecuenciaAtaquesJugador.innerHTML = ataqueJugador
    textSecuenciaAtaquesEnemigo.innerHTML = ataqueEnemigo
}



function resultadoJuego() {
    if (ataqueEnemigo == ataqueJugador) {
        resultadoFinal = "EMPATE"
    } else if (ataqueJugador == "🔥" & ataqueEnemigo == "🌾" || ataqueJugador == "💧" & ataqueEnemigo == "🔥" || ataqueJugador == "🌾" & ataqueEnemigo == "💧") {
        contadorVidasEnemigo--
        textVidasEnemigo.innerHTML = contadorVidasEnemigo
        resultadoFinalBatalla()
    } else {
        contadorVidasJugador--
        textVidasJugador.innerHTML = contadorVidasJugador
        resultadoFinalBatalla()
    }
}

function resultadoFinalBatalla() {
    if (contadorVidasEnemigo == 0) {
        resultadoFinal = "GANASTE"
        textResultadoFinal.innerHTML = resultadoFinal
        desahabilitarBotones()
    } else if (contadorVidasJugador == 0){
        resultadoFinal = "PERDISTE"
        textResultadoFinal.innerHTML = resultadoFinal
        desahabilitarBotones()
    } else {
        return
    }
}

function desahabilitarBotones() {
    seccionMensajeFinal.style.display = "flex"
    seccionReiniciarJuego.style.display = "flex"
    botonFuego.disabled = true
    botonAgua.disabled = true 
    botonTierra.disabled = true
}

function pintarCanvas() {
    miMokepon.x = miMokepon.x + miMokepon.velocidadX
    miMokepon.y = miMokepon.y + miMokepon.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    miMokepon.pintarMokepon()
    objectChesterEnemigo.pintarMokepon()
    objectPelusaEnemigo.pintarMokepon()
    objectZeusEnemigo.pintarMokepon()
    if(miMokepon.velocidadX !== 0 || miMokepon.velocidadY !== 0) {
        revisarColision(objectChesterEnemigo)
        revisarColision(objectPelusaEnemigo)
        revisarColision(objectZeusEnemigo)
    }
}

function moverDerecha() {
    miMokepon.velocidadX = 5
}

function moverIzquierda() {
    miMokepon.velocidadX = -5
}

function moverAbajo() {
    miMokepon.velocidadY = 5
}

function moverArriba() {
    miMokepon.velocidadY = -5
}

function detenerMovimiento() {
    miMokepon.velocidadX = 0
    miMokepon.velocidadY = 0
}

function teclaActiva(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;
        default:
            break;
    }
}

function iniciarMapa() {
    miMokepon = obtenerObjectoMascota()
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", teclaActiva)

    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjectoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (nombreJugadorMascota == mokepones[i].nombre) {
                return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.height 
    const derechaEnemigo = enemigo.x + enemigo.width
    const izquierdaEnemigo = enemigo.x 
    
    const arribaMascota = miMokepon.y
    const abajoMascota = miMokepon.y + miMokepon.height 
    const derechaMascota = miMokepon.x + miMokepon.width
    const izquierdaMascota = miMokepon.x 
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return 
    }

    detenerMovimiento()
    seccionVerMapa.style.display = "none"
    seccionMensajeSeleccion.style.display = "flex"
    seccionSeleccionarAtaque.style.display = "flex"
    mascotaEnemigaAleatoria(enemigo)
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}