new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego=true
            this.saludJugador=100
            this.saludMonstruo=100
            this.turnos= []

        },
        atacar: function () {
                   
            let danio = this.calcularHeridas(this.rangoAtaque)
            this.saludMonstruo -=danio
            this.turnos.unshift({
                esJugador:true,
                text:'El jugador golpea al monstruo quien ha recibido '+danio+ ' de danio'
            })
            /* Es necesario que devuelva un return... de lo contrario ataca el monstruo
            ,verifica la condicion y vuelve a preguntar.*/
            if(this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo()
        },

        ataqueEspecial: function () {
            let danio = this.calcularHeridas(this.rangoAtaqueEspecial)
            this.saludMonstruo -=danio
            this.turnos.unshift({
                esJugador:true,
                text:'El jugador golpea con ATAQUE ESPECIAL al monstruo quien ha recibido '+danio+ ' de danio'
            })
            if(this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo()
        },

        curar: function () {
            curacion=10
            this.saludJugador+=curacion
            this.turnos.unshift({
                esJugador:true,
                text:'El jugador se cura '+curacion+ ' de Hp'
            })
            if(this.verificarGanador()){
                return;
            }
            
            this.ataqueDelMonstruo()
        },

        /* Por que en este caso no tiene una propiedad? y para que lo usaria? modularizar?*/
        registrarEvento(evento) {
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego=false
        },

        ataqueDelMonstruo: function () {
            let danio = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            this.saludJugador -=danio
            this.turnos.unshift({
                esJugador:false,
                text:'El monstruo golpea al jugador quien ha recibido '+danio+ ' de danio'
            })
            this.verificarGanador();
        },

        calcularHeridas: function (rango) {
                
            return Math.max(Math.floor(Math.random()*rango[1])+1,rango[0]); 

        },
        verificarGanador: function () {

            if(this.saludMonstruo<=0){
                if(confirm('Ganaste! Queres jugar nuevamente?')){
                    this.empezarPartida();
                 }else{
                    this.hayUnaPartidaEnJuego=false;
                 }
                 /*Para que necesitaria esto? */
                 return true
            }else if (this.saludJugador<=0){
                if(confirm('Perdiste!  Queres reintentar?')){
                    this.empezarPartida();
                }else{
                    this.hayUnaPartidaEnJuego=false;
                }
                /*Para que necesitaria esto? */
                return true
            }
            return false;
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});