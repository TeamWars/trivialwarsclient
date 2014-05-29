var casillaActual = 0;
var contador = 0;
var velocidad = 2000;
var aux = false;
var pregunta;
var respuestaCorrecta = false;             //respuesta correcta si o no
var dadoActivo = true;                     //hasta que no conteste la pregunta el dado NO estará activo
var dadoActivoPorTurno = true;             //hasta que no se termine ese turno el dado NO estará activo
var arr5 = [19, 4, 3, 2, 1, 5, 9, 8, 6];   //secuencia predefinida de movimientos del dado


//Casillas Actuales de cada jugador
var casillaActualJ1 = 0;
var casillaActualJ2 = 0;
var casillaActualJ3 = 0;
var casillaActualJ4 = 0;
var contad = 1;

//Variables para guardar los turnos de los jugadores (por si alguno de ellos tiene alguno pendiente)
var contadorTurnosJ1 = 0;
var contadorTurnosJ2 = 0;
var contadorTurnosJ3 = 0;
var contadorTurnosJ4 = 0;

var turno = "#ficha1";         //qué ficha tiene el turno ACTUALMENTE
var cambioTurno = false;       //cuándo realizamos el cambio de turno       

//Para decrementar un turno en caso de ternerlos acumulados
//function turnos(contadorTurnos) {
//    if (contadorTurnos > 0) {
//        contadorTurnos--;
//    }
//}

//Comprobamos la jugada según la casilla especial
function comprobarJugada(num_casilla) {

    //NAVES (DE NAVE A NAVE Y TIRO PORQUE ME SALE)
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
        next = 50;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De nave a nave y tiro porque me sale";
    }
    if (num_casilla === 50) {
        velocidad = 4000;
        next = 59;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De nave a nave y tiro porque me sale";
    }
    if (num_casilla === 59) {
        velocidad = 4000;
        next = 63;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "¡¡¡ Has ganado !!!";
    }
//    if (num_casilla === 63) {//CASILLA META
//        velocidad = 4000;
//        moverFicha(next);
//        document.getElementById("mensajeP").innerHTML = "¡¡¡ Has ganado !!!";
//    }

    //PUENTES (DE PUENTE A PUENTE Y TIRO PORQUE ME DA LA CORRIENTE)
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

    //DADOS (DE DADO A DADO Y TIRO PORQUE ME HA TOCADO)
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
//        alert("dos turnos sin tirar");
        velocidad = 4000;
        if (turno === "#ficha1") {
            contadorTurnosJ1 = contadorTurnosJ1 + 2;
        }
        else if (turno === "#ficha2") {
            contadorTurnosJ2 = contadorTurnosJ2 + 2;
        }
        else if (turno === "#ficha3") {
            contadorTurnosJ3 = contadorTurnosJ3 + 2;
        }
        else if (turno === "#ficha4") {
            contadorTurnosJ4 = contadorTurnosJ4 + 2;
        }
        document.getElementById("mensajeP").innerHTML = "Has caído en la posada, 2 turnos sin tirar";
    }

    //POZO
    if (num_casilla === 31) {
        velocidad = 4000;
        document.getElementById("mensajeP").innerHTML = "Has caído en el pozo, 2 turnos sin tirar";
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

    //EN LAS CASILLAS ESPECIALES COMO NO TIENEN PREGUNTA, REALIZAMOS EL CAMBIO DE TURNO AQUÍ !!!
    if (num_casilla === 19 || num_casilla === 31 || num_casilla === 42 || num_casilla === 52) {
//        alert("CAMBIO TURNO");
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
        dadoActivo = true;
    }

}

//Para realizar el movimiento de la ficha a la casilla destino
function moverFicha(next) {
    casillaActual = next;
    var position = $("#" + next).position();
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
}

//Generación de respuesta aleatoria para cambiar las respuestas de orden
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
//    alert("salgo, valor de respuestaCorrecta" + respuestaCorrecta);
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
    dadoActivo = true;
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
    dadoActivo = true;
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
        //alert("pulso!!!");
        //alert("Valor ahora de dadoActivoPorTurno: " + dadoActivoPorTurno);
        if (dadoActivo) {//Si el dado está activo, es porque no tenemos ninguna pregunta que contestar.

            if (dadoActivoPorTurno) {//Si dadoActivoPorTurno, se pondrá a TRUE, a final del turno para no poder pulsar en medio de un turno.
                //alert("dadoActivoPorTurno ANTES: " + dadoActivoPorTurno);
                dadoActivoPorTurno = false;
                //alert("dadoActivoPorTurno DESPUES: " + dadoActivoPorTurno);
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

//                    alert("Imprimo contadores de mis fichas: ");
//                    alert("contadorTurnosJ1: " + contadorTurnosJ1);
//                    alert("contadorTurnosJ2: " + contadorTurnosJ2);
//                    alert("contadorTurnosJ3: " + contadorTurnosJ3);
//                    alert("contadorTurnosJ4: " + contadorTurnosJ4);

//                    alert(turno);
                    //REALIZO MOVIMIENTO SI MI CONTADOR ESTÁ A 0, SINO 
                    if (contadorTurnosJ1 == 0 && turno === "#ficha1" ||
                            contadorTurnosJ2 == 0 && turno === "#ficha2" ||
                            contadorTurnosJ3 == 0 && turno === "#ficha3" ||
                            contadorTurnosJ4 == 0 && turno === "#ficha4") {

//                        alert("me meto IF PQ CONTADOR ESTA A 0");
//                        alert("Realizo movimiento");
                        if (contad == 1) {
                            next = 19;
                        }
                        if (contad == 2) {
                            next = 1;
                        }
                        if (contad == 3) {
                            next = 2;
                        }
                        if (contad == 4) {
                            next = 3;
                        }
                        if (contad == 5) {
                            next = 1;
                        }
                        if (contad == 6) {
                            next = 1;
                        }
                        if (contad == 7) {
                            next = 2;
                        }
                        if (contad == 8) {
                            next = 1;
                        }
                        contad++;
                        moverFicha(next);
                        if (next == 5 || next == 6 || next == 12 || next == 14 || next == 19 || next == 23 || next == 26 || next == 31 || next == 32 || next == 41 || next == 42 || next == 50 || next == 52 || next == 53 || next == 56 || next == 59 || next == 63) {
                            comprobarJugada(next); /* Comprobamos la jugada con ese valor */
                            if (next !== 19 || next !== 31 || next !== 42 || next !== 52) {
                                aux = true;
                            }
                        }
                        else {
                            dadoActivo = false; //Para que el usuario no pueda clicar el dado
                            document.getElementById("mensajeP").innerHTML = "Contesta a la pregunta";
                            comprobarPregunta();
                            setTimeout(function() {
                                $("#questions").css('display', 'block');
                            }, 2000);
                        }
                        velocidad = 2000;
                    } else {
//                        alert("me meto por ELSE");
//                        alert("decremento a mi contador");
                        //Sino es 0, es que tiene turnos pendientes, ese turno lo utilizo para decrementarle uno al contador.
                        if (turno === "#ficha1") {
//                            alert("entro por aqui?");
                            contadorTurnosJ1--;
                            document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ1 + " para mover";
                            turno = "#ficha2";
                            document.getElementById("marcadorP").innerHTML = "Turno del jugador 2";
//                            alert("pongo el mensaje");
                        }
                        else if (turno === "#ficha2") {
                            contadorTurnosJ2--;
                            document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ2 + " para mover";
                            turno = "#ficha3";
                            document.getElementById("marcadorP").innerHTML = "Turno del jugador 3";
                        }
                        else if (turno === "#ficha3") {
                            contadorTurnosJ3--;
                            document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ3 + " para mover";
                            turno = "#ficha4";
                            document.getElementById("marcadorP").innerHTML = "Turno del jugador 4";
                        }
                        else if (turno === "#ficha4") {
                            contadorTurnosJ4--;
                            document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ4 + " para mover";
                            turno = "#ficha1";
                            document.getElementById("marcadorP").innerHTML = "Turno del jugador 1";
                        }
                        dadoActivo = true;
//                        alert("salgo del else");
                    }
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

//                    alert("fin de turno");
                    dadoActivoPorTurno = true;
                }, 1500);
            }
        }
    });

});

