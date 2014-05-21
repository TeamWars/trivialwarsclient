var casillaActual = 0;
var contador = 0;
var velocidad = 2000;
var aux = false;
var pregunta;
var respuestaCorrecta = false;


//Casillas Actuales de cada jugador
var casillaActualJ1 = 0;
var casillaActualJ2 = 0;
var casillaActualJ3 = 0;
var casillaActualJ4 = 0;

var turno = "#ficha1";
var cambioTurno = false;
//var entroComprobarJugada = false;
//            alert("EMPIEZOOOOO");

function comprobarJugada(num_casilla) {

    //DE NAVE A NAVE Y TIRO PQ ME SALE
    if (num_casilla === 5) {
        velocidad = 4000;
        next = 14;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De nave a nave y tiro porque me sale";
    }
    if (num_casilla === 14) {
        velocidad = 4000;
        //alert("De nave a nave y tiro pq me sale");
        next = 23;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De nave a nave y tiro porque me sale";
    }
    if (num_casilla === 23) {
        velocidad = 4000;
        //alert("De nave a nave y tiro pq me sale");
        next = 32;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De nave a nave y tiro porque me sale";
    }
    if (num_casilla === 32) {
        velocidad = 4000;
        next = 41;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De nave a nave y tiro porque me sale";
    }
    if (num_casilla === 41) {
        velocidad = 4000;
        //alert("De nave a nave y tiro pq me sale");
        next = 50;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De nave a nave y tiro porque me sale";
    }
    if (num_casilla === 50) {
        velocidad = 4000;
        //alert("De nave a nave y tiro pq me sale");
        next = 59;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De nave a nave y tiro porque me sale";
    }
    if (num_casilla === 59) {
        velocidad = 4000;
        //alert("¡¡¡ HAS MUERTO, VUELVES A EMPEZAR !!!");
        next = 63;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "¡¡¡ Has ganado !!!";
    }

    //DE PUENTE A PUENTE Y TIRO PQ ME DA LA CORRIENTE
    if (num_casilla === 6) {
        velocidad = 4000;
        next = 12;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De puente a puente y tiro porque me da la corriente";
    }
    if (num_casilla === 12) {
        velocidad = 4000;
        next = 6;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De puente a puente y tiro porque me da la corriente";
    }


    //DE DADO A DADO Y TIRO PQ ME HA TOCADO
    if (num_casilla === 26) {
        velocidad = 4000;
        next = 53;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De dado a dado y tiro porque me ha tocado";
    }
    if (num_casilla === 53) {
        velocidad = 4000;
        next = 26;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De dado a dado y tiro porque me ha tocado";
    }

    //MUERTE
    if (num_casilla === 56) {
        velocidad = 4000;
        next = 0;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "¡¡¡ Has muerto, vuelves a empezar !!!";
    }

    //POSADA
    if (num_casilla === 19) {
        velocidad = 4000;
        document.getElementById("mensajeP").innerHTML = "Has caído en la posada, 2 turnos sin tirar";
    }

    //LABERINTO
    if (num_casilla === 42) {
        velocidad = 4000;
        next = 30;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "Del Laberinto al 30";
    }

    //CÁRCEL
    if (num_casilla === 52) {
        velocidad = 4000;
        document.getElementById("mensajeP").innerHTML = "Has caído en la carcel, 3 turnos sin tirar";
    }

    //POZO
    if (num_casilla === 31) {
        velocidad = 4000;
        document.getElementById("mensajeP").innerHTML = "Has caído en la pozo, 2 turnos sin tirar";
    }
}

function moverFicha(next) {
    //alert("entro en mover ficha");
    casillaActual = next;
    var position = $("#" + next).position();
    //$("#ficha1").animate({top: position.top, left: position.left}, velocidad); /* el segundo parámetro de animate, en este caso 1000, sirve para ralentizar el movimiento. */
    //alert("el turno es de : " + turno);
    switch (turno) {
        case "#ficha1":
            $(turno).animate({top: position.top, left: position.left}, velocidad); /* el segundo parámetro de animate, en este caso 1000, sirve para ralentizar el movimiento. */
            break;
        case "#ficha2":
            $(turno).animate({top: position.top, left: position.left + 40}, velocidad); /* el segundo parámetro de animate, en este caso 1000, sirve para ralentizar el movimiento. */
            break;
        case "#ficha3":
            $(turno).animate({top: position.top + 40, left: position.left}, velocidad); /* el segundo parámetro de animate, en este caso 1000, sirve para ralentizar el movimiento. */
            break;
        case "#ficha4":
            $(turno).animate({top: position.top + 40, left: position.left + 40}, velocidad); /* el segundo parámetro de animate, en este caso 1000, sirve para ralentizar el movimiento. */

    }
    //alert("salgo de mover ficha");
}

function respuestaAleatoria(ind, data) {
    pregunta = data;
    switch (ind) {
        case 1:
            $("#resp1").text(data.idrespuestacorrecta.contenido);
            $("#resp2").text(data.idrespuestados.contenido);
            $("#resp3").text(data.idrespuestauno.contenido);
            $("#respuestaCorrecta").val("resp1");
            break;
        case 2:
            $("#resp1").text(data.idrespuestados.contenido);
            $("#resp2").text(data.idrespuestacorrecta.contenido);
            $("#resp3").text(data.idrespuestauno.contenido);
            $("#respuestaCorrecta").val("resp2");
            break;
        case 3:
            $("#resp1").text(data.idrespuestauno.contenido);
            $("#resp2").text(data.idrespuestados.contenido);
            $("#resp3").text(data.idrespuestacorrecta.contenido);
            $("#respuestaCorrecta").val("resp3");
            break;

    }

}


function comprobarRespuesta(respuesta) {
    var respCorrecta = $("#respuestaCorrecta").val();
    if (respuesta.id === respCorrecta) {
        respuestaCorrecta = true;
        respuestaEsCorrecta();
    } else {
        respuestaCorrecta = false;
        respuestaIncorrecta();
    }
    alert("salgo, valor de respuestaCorrecta" + respuestaCorrecta);
}

function comprobarPregunta() {
    var id = Math.floor((Math.random() * 7) + 1);
    $("#idQuestion").val(id);
    $.ajax({
        url: 'http://localhost/TrivialWarsServer/web/app_dev.php/trivial/pregunta',
        method: 'POST',
        dataType: 'json',
        data: {id: $("#idQuestion").val()},
        success: function(data) {
            console.log(data.pregunta);
            $("#question").text(data.pregunta);
            var ind = Math.floor((Math.random() * 3) + 1);
            respuestaAleatoria(ind, data);
        },
        error: function(error) {
            alert("error");
        }
    });
}

function respuestaEsCorrecta() {
    document.getElementById("mensajeP").innerHTML = "¡¡¡ Respuesta correcta !!!";

    if (turno == "#ficha1") {
        document.getElementById("marcadorP").innerHTML = "Vuelve a tirar jugador 1";
    }
    if (turno == "#ficha2") {
        document.getElementById("marcadorP").innerHTML = "Vuelve a tirar jugador 2";
    }
    if (turno == "#ficha3") {
        document.getElementById("marcadorP").innerHTML = "Vuelve a tirar jugador 3";
    }
    if (turno == "#ficha4") {
        document.getElementById("marcadorP").innerHTML = "Vuelve a tirar jugador 4";
    }
}

function respuestaIncorrecta() {
    document.getElementById("mensajeP").innerHTML = "¡¡¡ Respuesta incorrecta !!!";
    if (turno === "#ficha1") {
        turno = "#ficha2";
        document.getElementById("marcadorP").innerHTML = "Turno del jugador 2";
    }
    else if (turno === "#ficha2") {
        turno = "#ficha3";
        document.getElementById("marcadorP").innerHTML = "Turno del jugador 3";
    }
    else if (turno === "#ficha3") {
        turno = "#ficha4";
        document.getElementById("marcadorP").innerHTML = "Turno del jugador 4";
    }
    else if (turno === "#ficha4") {
        turno = "#ficha1";
        document.getElementById("marcadorP").innerHTML = "Turno del jugador 1";
    }
}

$(document).ready(function() {

    posicionInicial = $("#" + casillaActual).position();
    $("ficha1").position({top: $("#" + casillaActual).position().top, left: $("#" + casillaActual).position().left});
//                $("ficha2").position({top: posicionInicial.top, left: posicionInicial.left});
//                $("ficha3").position({top: posicionInicial.top, left: posicionInicial.left});
//                $("ficha4").position({top: posicionInicial.top, left: posicionInicial.left});

    for (i = 0; i < 64; i++) {
        $("#" + i).css({backgroundImage: "url('../resources/images/casilla" + i + ".png')"});
        $("#" + i).css({backgroundPosition: "center"});
    }

    $("#dado").click(function() {
        aux = false;
        cambioTurno = false;

        var id = setInterval(function() {
            var random = Math.floor((Math.random() * 10) + 1);
            $("#imagenDado").attr("src", "../resources/images/" + random + ".png");
        }, 50);

        setTimeout(function() {
            clearInterval(id);
            var random = Math.floor((Math.random() * 6) + 1);
            $("#imagenDado").attr("src", "../resources/images/" + random + ".png");

            $("#marcadorP").css('color', 'r');
            if (turno === "#ficha1") {
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 1";
            }
            else if (turno === "#ficha2") {
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 2";
            }
            else if (turno === "#ficha3") {
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 3";
            }
            else if (turno === "#ficha4") {
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 4";
            }


            if (turno === "#ficha1") {
                casillaActual = casillaActualJ1;
            }
            else if (turno === "#ficha2") {
                casillaActual = casillaActualJ2;
            }
            else if (turno === "#ficha3") {
                casillaActual = casillaActualJ3;
            }
            else if (turno === "#ficha4") {
                casillaActual = casillaActualJ4;
            }
            next = casillaActual + random;
            /* 
             * Si la casilla destino es una casilla especial, vamos a comprobarJugada(int num_casilla)
             */
            moverFicha(next);
            if (next == 5 || next == 6 || next == 12 || next == 14 || next == 23 || next == 26 || next == 32 || next == 41 || next == 50 || next == 56) {
                comprobarJugada(next); /* Comprobamos la jugada con ese valor */
                aux = true;
            }
            else {
                document.getElementById("mensajeP").innerHTML = "Contesta a la pregunta";
                comprobarPregunta();
                setTimeout(function() {
                    $("#questions").css('display', 'block');
                }, 2000);
            }
            velocidad = 2000;
            if (turno === "#ficha1") {
                casillaActualJ1 = next;
            }
            else if (turno === "#ficha2") {
                casillaActualJ2 = next;
            }
            else if (turno === "#ficha3") {
                casillaActualJ3 = next;
            }
            else if (turno === "#ficha4") {
                casillaActualJ4 = next;
            }

            if (aux) {
                setTimeout(function() {
                    document.getElementById("mensajeP").innerHTML = "Vuelve a tirar";
                }, 6000);
            }

        }, 1500);
    });

});

