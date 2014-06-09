//DECLARACIÓN DE VARIABLES

//var posicionInicial;//descomentar
var casillaActual = 0;
var contador = 0;
var velocidad = 2000;
var aux = false;
var pregunta;
var respuestaCorrecta = false;             //respuesta correcta si o no
var dadoActivo = true;                     //hasta que no conteste la pregunta el dado NO estará activo
var dadoActivoPorTurno = true;             //hasta que no se termine ese turno el dado NO estará activo
//var arr5 = [19, 4, 3, 2, 1, 5, 9, 8, 6];   //secuencia predefinida de movimientos del dado
var arr5 = [68];   //secuencia predefinida de movimientos del dado
var estadoFichas = new Array(63);


//Casillas Actuales de cada jugador
var casillaActualJ1 = 0;
var casillaActualJ2 = 0;
var casillaActualJ3 = 0;
var casillaActualJ4 = 0;
var contad = 1; //contador para ir recorriendo el array con los turnos predefinidos

//Variables para guardar los turnos de los jugadores (por si alguno de ellos tiene alguno pendiente)
var contadorTurnosJ1 = 0;
var contadorTurnosJ2 = 0;
var contadorTurnosJ3 = 0;
var contadorTurnosJ4 = 0;

var turno = "#ficha1";         //qué ficha tiene el turno ACTUALMENTE
var cambioTurno = false;       //cuándo realizamos el cambio de turno       

var diferencia;
var i = 0;

var numeroJugadores = 3; //Número de jugadores en la partida


$(document).ready(function() {
    for (i = 0; i <= 63; i++) {
        estadoFichas[i] = 0;
    }
    estadoFichas[0] = numeroJugadores;

    posicionInicial = $("#" + casillaActual).position();
//                $("ficha1").position({top: $("#" + casillaActual).position().top, left: $("#" + casillaActual).position().left});// DESCOMENTAR
//                $("ficha2").position({top: posicionInicial.top, left: posicionInicial.left});
//                $("ficha3").position({top: posicionInicial.top, left: posicionInicial.left});
//                $("ficha4").position({top: posicionInicial.top, left: posicionInicial.left});

    for (i = 0; i < 64; i++) {
        $("#" + i).css({backgroundImage: "url('../resources/images/casilla" + i + ".png')"});
        $("#" + i).css({backgroundPosition: "center"});
    }

    $("#dado").click(function() {

        if (dadoActivo) {//Si el dado está activo, es porque no tenemos ninguna pregunta que contestar.

            if (dadoActivoPorTurno) {//Si dadoActivoPorTurno, se pondrá a TRUE, a final del turno para no poder pulsar en medio de un turno.

                dadoActivoPorTurno = false;//Lo ponemos a false, para que el usuario no pueda pulsar el dado durante un turno.

                aux = false;//Vuelta a tirar, en principio está a false, se activará en caso de que caiga en una de las casillas especiales

                cambioTurno = false;//Para cambiar el turno

                //Para realizar el efecto del movimiento del dado
                var id = setInterval(function() {
                    var random = Math.floor((Math.random() * 10) + 1);
                    $("#imagenDado").attr("src", "../resources/images/" + random + ".png");
                }, 50);

                //Después de que pase un tiempo...
                setTimeout(function() {
                    clearInterval(id);
                    var random = Math.floor((Math.random() * 6) + 1);
                    //Random, llevará el valor del dado para esa jugada, además cogemos la imagen del dado acorde a él.
                    $("#imagenDado").attr("src", "../resources/images/" + random + ".png");

                    //Modificamos el párrafo correspondiente al mensaje, según el turno de cada jugador
                    if (turno === "#ficha1") {
                        $("#marcadorP").css('color', 'red');
                        document.getElementById("marcadorP").innerHTML = "Turno del jugador 1";
                    }
                    else if (turno === "#ficha2") {
                        $("#marcadorP").css('color', 'red');
                        document.getElementById("marcadorP").innerHTML = "Turno del jugador 2";
                    }
                    else if (turno === "#ficha3") {
                        $("#marcadorP").css('color', 'red');
                        document.getElementById("marcadorP").innerHTML = "Turno del jugador 3";
                    }
                    else if (turno === "#ficha4") {
                        $("#marcadorP").css('color', 'red');
                        document.getElementById("marcadorP").innerHTML = "Turno del jugador 4";
                    }

                    //Según con la ficha que jugemos, actualizamos la casillaActual(que usan todos los jugadores), a la casillaActual de esa ficha.
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

                    alert("casilla que voy a cambiar" + estadoFichas[casillaActual]);
                    estadoFichas[casillaActual]--;
                    alert("DECREMENTOOOOOOOO");
                    if (estadoFichas[casillaActual] === 0) {
                        $("#" + casillaActual).css("background-color", "rgba(0,0,0,0)");
                        $("img").css("opacity", "1");
                    }
                    alert("despues" + estadoFichas[casillaActual]);
                    //Casilla destino
                    next = casillaActual + random;

                    //Sino tengo turnos pendiente realizo el movimiento
                    //alert("turno de: "+turno);
                    //alert("contador de turnos: "+contadorTurnosJ2);
                    if (contadorTurnosJ1 == 0 && turno === "#ficha1" ||
                            contadorTurnosJ2 == 0 && turno === "#ficha2" ||
                            contadorTurnosJ3 == 0 && turno === "#ficha3" ||
                            contadorTurnosJ4 == 0 && turno === "#ficha4") {
                        //alert("me meto por aquí para hacer el movimiento: (turno de: "+turno+" )");
                        if (contad == 1) {
                            next = 62;
                        }
                        if (contad == 2) {
                            next = 58;
                        }
                        if (contad == 3) {
                            next = 60;
                        }
                        if (contad == 4) {
                            next = 57;
                        }
                        contad++;

                        if (next > 63) {
                            moverFicha(63);
                            setTimeout(function() {
                                diferencia = next - 63;
                                next = 63 - diferencia;
                                alert("hago primer movimiento");
                                moverFicha(next);
                                if (next == 5 || next == 6 || next == 12 || next == 14 || next == 19 || next == 23 || next == 26 || next == 31 || next == 32 || next == 41 || next == 42 || next == 50 || next == 52 || next == 53 || next == 56 || next == 59 || next == 63) {
                                    comprobarJugada(next); //Comprobación de jugada con esa casilla especial
                                    if (next == 5 || next == 6 || next == 12 || next == 14 || next == 23 || next == 26 || next == 32 || next == 41 || next == 50 || next == 53 || next == 56 || next == 59 || next == 63) {
                                        aux = true;//Si es una de las casillas especiales, vuelve a tirar
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

                                alert("INCREMENTOOOOO");
                                estadoFichas[next]++;
                                if (estadoFichas[next] > 0) {
                                    $("#" + estadoFichas[i]).css("background-color", "rgba(255,255,0,0.7)");
                                    $("img").css("opacity", "1");
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
                            }, 2000);
                        }

                        else {
                            moverFicha(next);
                            if (next == 5 || next == 6 || next == 12 || next == 14 || next == 19 || next == 23 || next == 26 || next == 31 || next == 32 || next == 41 || next == 42 || next == 50 || next == 52 || next == 53 || next == 56 || next == 59 || next == 63) {
                                comprobarJugada(next); //Comprobación de jugada con esa casilla especial
                                if (next == 5 || next == 6 || next == 12 || next == 14 || next == 23 || next == 26 || next == 32 || next == 41 || next == 50 || next == 53 || next == 56 || next == 59 || next == 63) {
                                    aux = true;//Si es una de las casillas especiales, vuelve a tirar
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
                            alert("casilla a CAMBIAR" + next);
                            velocidad = 2000;
                            alert("llego?¿");
                            alert(estadoFichas[next]);
                            estadoFichas[next]++;
                            alert("ya esta incrementada");
                            if (estadoFichas[next] > 0) {
                                alert("entrooo");
                                alert(estadoFichas[next]);
                                $("#" + next).css("background-color", "rgba(255,255,0,0.7)");
                                $("img").css("opacity", "1");
                            }
                            alert("salgo?!");

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
                        }
                    } else {//Si tengo turnos pendientes, decremento un valor a mis turnos pendientes, y paso el turno a la siguiente ficha.

                        if (numeroJugadores === 2) {
                            if (turno === "#ficha1") {
                                contadorTurnosJ1--;
                                document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ1 + " para mover";
                                turno = "#ficha2";
                                $("#marcadorP").css('color', 'red');
                                document.getElementById("marcadorP").innerHTML = "Turno del jugador 2";
                            }
                            else if (turno === "#ficha2") {
                                contadorTurnosJ2--;
                                document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ2 + " para mover";
                                turno = "#ficha1";
                                $("#marcadorP").css('color', 'red');
                                document.getElementById("marcadorP").innerHTML = "Turno del jugador 1";
                            }
                            //Al haber terminado ya mi turno, pongo el dadoActivo a true.
                            dadoActivo = true;
                        }

                        if (numeroJugadores === 3) {
                            if (turno === "#ficha1") {
                                contadorTurnosJ1--;
                                document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ1 + " para mover";
                                turno = "#ficha2";
                                $("#marcadorP").css('color', 'red');
                                document.getElementById("marcadorP").innerHTML = "Turno del jugador 2";
                            }
                            else if (turno === "#ficha2") {
                                contadorTurnosJ2--;
                                document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ2 + " para mover";
                                turno = "#ficha3";
                                $("#marcadorP").css('color', 'red');
                                document.getElementById("marcadorP").innerHTML = "Turno del jugador 3";
                            }
                            else if (turno === "#ficha3") {
                                contadorTurnosJ3--;
                                document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ3 + " para mover";
                                turno = "#ficha1";
                                $("#marcadorP").css('color', 'red');
                                document.getElementById("marcadorP").innerHTML = "Turno del jugador 1";
                            }
                            //Al haber terminado ya mi turno, pongo el dadoActivo a true.
                            dadoActivo = true;
                        }


                        if (numeroJugadores === 4) {
                            if (turno === "#ficha1") {
                                contadorTurnosJ1--;
                                document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ1 + " para mover";
                                turno = "#ficha2";
                                $("#marcadorP").css('color', 'red');
                                document.getElementById("marcadorP").innerHTML = "Turno del jugador 2";
                            }
                            else if (turno === "#ficha2") {
                                contadorTurnosJ2--;
                                document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ2 + " para mover";
                                turno = "#ficha3";
                                $("#marcadorP").css('color', 'red');
                                document.getElementById("marcadorP").innerHTML = "Turno del jugador 3";
                            }
                            else if (turno === "#ficha3") {
                                contadorTurnosJ3--;
                                document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ3 + " para mover";
                                turno = "#ficha4";
                                $("#marcadorP").css('color', 'red');
                                document.getElementById("marcadorP").innerHTML = "Turno del jugador 4";
                            }
                            else if (turno === "#ficha4") {
                                contadorTurnosJ4--;
                                document.getElementById("mensajeP").innerHTML = "Te quedan " + contadorTurnosJ4 + " para mover";
                                turno = "#ficha1";
                                $("#marcadorP").css('color', 'red');
                                document.getElementById("marcadorP").innerHTML = "Turno del jugador 1";
                            }
                            //Al haber terminado ya mi turno, pongo el dadoActivo a true.
                            dadoActivo = true;
                        }
                    }

                    if (next === 63) {
                        aux = false;
                    }
                    //Si a caído en una casilla especial, modifica el mensaje y no hace cambio de turno, para volver a tirar
                    if (aux) {
                        setTimeout(function() {
                            alert("me meto por aqui");
                            document.getElementById("mensajeP").innerHTML = "Vuelve a tirar";
                        }, 6000);
                    }

                    //alert("turno del siguiente jugador: "+turno);
                    //
                    alert("llego");
                    aux = false;
                    dadoActivoPorTurno = true;
                    //Bucle para oscurecer las casillas o iluminarlas según haya fichas o no
//                    for (i = 0; i <= estadoFichas.length; i++) {
//                        alert(estadoFichas[i]);
//                        if (estadoFichas[i] > 0) {
//                            $("#" + estadoFichas[i]).css("background-color", "rgba(255,255,0,0.7)");
//                            $("img").css("opacity", "1");
//                        } else {
//                            $("#" + estadoFichas[i]).css("background-color", "rgba(0,0,0,0)");
//                            $("img").css("opacity", "1");
//                        }
//                    }
                    ;
                }, 1500);
            }
        }
    });


    //AQUI HACER JNO
    $("#dialogGanador").dialog({
        autoOpen: false,
        width: 450,
        buttons: [{
                text: "Volver al menú principal",
                click: function() {
                    //alert("que pasa chavalote, has ganado");
                    location.assign("/TrivialWarsClient/public_html/user.html");
                }}]
//                    text: "cancelar",
//                    click: function() {
//                        $(this).dialog("close");
//                    }
    });
});







//FUNCIONES AUXILIARES 


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
        next = 23;
        moverFicha(next);
        document.getElementById("mensajeP").innerHTML = "De nave a nave y tiro porque me sale";
    }
    if (num_casilla === 23) {
        velocidad = 4000;
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
        document.getElementById("marcadorP").innerHTML = "Fin de la partida";
        document.getElementById("mensajeP").innerHTML = "¡¡¡ Has ganado !!!";
    }
    if (num_casilla === 63) {//CASILLA META
        velocidad = 4000;
        moverFicha(next);
        document.getElementById("marcadorP").innerHTML = "Fin de la partida";
        document.getElementById("mensajeP").innerHTML = "¡¡¡ Has ganado !!!";
        $("#dialogGanador").dialog("open");
    }

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
        if (turno === "#ficha1") {
            contadorTurnosJ1 = contadorTurnosJ1 + 3;
        }
        else if (turno === "#ficha2") {
            contadorTurnosJ2 = contadorTurnosJ2 + 3;
        }
        else if (turno === "#ficha3") {
            contadorTurnosJ3 = contadorTurnosJ3 + 3;
        }
        else if (turno === "#ficha4") {
            contadorTurnosJ4 = contadorTurnosJ4 + 3;
        }
        document.getElementById("mensajeP").innerHTML = "Has caído en la carcel, 3 turnos sin tirar";
    }



    if (numeroJugadores === 2) {

        //EN LAS CASILLAS ESPECIALES COMO NO TIENEN PREGUNTA, REALIZAMOS EL CAMBIO DE TURNO AQUÍ !!!
        if (num_casilla === 19 || num_casilla === 31 || num_casilla === 42 || num_casilla === 52) {
            if (turno === "#ficha1") {
                turno = "#ficha2";
                $("#marcadorP").css('color', 'red');
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 2";
            }
            else if (turno === "#ficha2") {
                turno = "#ficha1";
                $("#marcadorP").css('color', 'red');
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 1";
            }
            dadoActivo = true;
        }

    }

    if (numeroJugadores === 3) {

        //EN LAS CASILLAS ESPECIALES COMO NO TIENEN PREGUNTA, REALIZAMOS EL CAMBIO DE TURNO AQUÍ !!!
        if (num_casilla === 19 || num_casilla === 31 || num_casilla === 42 || num_casilla === 52) {
            if (turno === "#ficha1") {
                turno = "#ficha2";
                $("#marcadorP").css('color', 'red');
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 2";
            }
            else if (turno === "#ficha2") {
                turno = "#ficha3";
                $("#marcadorP").css('color', 'red');
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 3";
            }
            else if (turno === "#ficha3") {
                turno = "#ficha1";
                $("#marcadorP").css('color', 'red');
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 1";
            }
            dadoActivo = true;
        }

    }

    if (numeroJugadores === 4) {

        //EN LAS CASILLAS ESPECIALES COMO NO TIENEN PREGUNTA, REALIZAMOS EL CAMBIO DE TURNO AQUÍ !!!
        if (num_casilla === 19 || num_casilla === 31 || num_casilla === 42 || num_casilla === 52) {
            if (turno === "#ficha1") {
                turno = "#ficha2";
                $("#marcadorP").css('color', 'red');
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 2";
            }
            else if (turno === "#ficha2") {
                turno = "#ficha3";
                $("#marcadorP").css('color', 'red');
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 3";
            }
            else if (turno === "#ficha3") {
                turno = "#ficha4";
                $("#marcadorP").css('color', 'red');
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 4";
            }
            else if (turno === "#ficha4") {
                turno = "#ficha1";
                $("#marcadorP").css('color', 'red');
                document.getElementById("marcadorP").innerHTML = "Turno del jugador 1";
            }
            dadoActivo = true;
        }

    }



}

//Para realizar el movimiento de la ficha a la casilla destino
function moverFicha(next) {
//    $("#" + casillaActual).css("background-color", "rgba(0,0,0,0)");
    casillaActual = next;
//    $("#" + casillaActual).css("background-color", "rgba(255,255,0,0.7)");
//    $("img").css("opacity", "1");
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

    if (numeroJugadores === 2) {
        if (turno === "#ficha1") {
            turno = "#ficha2";
            document.getElementById("marcadorP").innerHTML = "Turno del jugador 2";
        }
        else if (turno === "#ficha2") {
            turno = "#ficha1";
            document.getElementById("marcadorP").innerHTML = "Turno del jugador 1";
        }
        dadoActivo = true;
    }

    if (numeroJugadores === 3) {
        if (turno === "#ficha1") {
            turno = "#ficha2";
            document.getElementById("marcadorP").innerHTML = "Turno del jugador 2";
        }
        else if (turno === "#ficha2") {
            turno = "#ficha3";
            document.getElementById("marcadorP").innerHTML = "Turno del jugador 3";
        }
        else if (turno === "#ficha3") {
            turno = "#ficha1";
            document.getElementById("marcadorP").innerHTML = "Turno del jugador 1";
        }
        dadoActivo = true;
    }

    if (numeroJugadores === 4) {
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
