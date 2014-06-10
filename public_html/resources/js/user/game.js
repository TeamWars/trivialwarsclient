var fichaSelec = "";
var usuarioActual = "";
var nombrePartida = "";
var numJugadores;
var idUsuario = "";
var jugadoresUnidos = 0;
var socket = io.connect("http://localhost:8080");

function fichaSeleccionada(nombre, fichero) {
    $('#nameFich').val(nombre);
    fichaSelec = fichero;
    $("img").css("opacity", "0.5");
    palabras = fichero.split(".");
    nombre = palabras[0];
    $("#" + nombre).find("img").css("opacity", "1");
}

function confirmarDatosPartida() {
    var valido = validarDatos();
    if (valido) {
        alert("me meto por aqui");
        recuperarSesion();
    } else {
        alert("faltan datos por concretar");
    }
}

function recuperarSesion() {
    $.ajax({
        url: 'http://localhost/TrivialWarsServer/web/app_dev.php/trivial/user/auth',
        method: 'POST',
        dataType: 'json',
        success: function(data) {
            alert("segundo" + data.usuario.id);
            numJugadores = numeroJugadores();
            usuarioActual = data.usuario["username"];
            var datos = {"jugadores": numJugadores, "ficha": fichaSelec, "nombre": nombrePartida, "id": data.usuario.id};
            if (data.autenticado) {
                $.ajax({
                    url: 'http://localhost/TrivialWarsServer/web/app_dev.php/trivial/game/create',
                    method: 'POST',
                    dataType: 'json',
                    data: datos,
                    success: function(data) {
                        if (data) {
                            alert("dpm");
                            jugadoresUnidos++;
                            $("#waitPlayers").find("p").remove();
                            $("#waitPlayers").append("<p>" + usuarioActual + " ha creado la partida</p>");
                            socket.emit("crear_partida", {sala: nombrePartida});
                        }
                    },
                    error: function(error) {
                        alert("error");
                    }
                });
            } else {
                window.location = "/TrivialWarsClient/public_html/index.html";
            }
        },
        error: function(error) {
            window.location = "/TrivialWarsClient/public_html/index.html";
        }
    });
}

socket.on("confirmar_partida", function(datos) {
    jugadoresUnidos++;
    $("#waitPlayers").append("<p>" + datos.nombreUsuario + " se ha unido</p>");
    if (jugadoresUnidos === numJugadores) {
        $("#waitPlayers").append("<p>***SALA LLENAA***</p>");
        socket.emit("comenzar_partida", datos);
        partidaActual = datos.nombrePartida;
        window.location = "/TrivialWarsClient/public_html/board/board.html";
    }
});

function numeroJugadores() {
    var boton = document.getElementsByName("radiog_lite");

    if (boton[0].checked) {
        return 2;
    }
    if (boton[1].checked) {
        return 3;
    }
    if (boton[2].checked) {
        return 4;

    }
}

function validarDatos() {
    nombrePartida = $("#gameName").val();
    if (nombrePartida === "") {
        alert("falta el nombre");
        return false;
    }
    if (fichaSelec === "") {
        alert("falta la ficha");
        return false;
    }
    return true;
}


$(document).ready(function() {

    $('#cssmenu ul ul li:odd').addClass('odd');
    $('#cssmenu ul ul li:even').addClass('even');
    $('#cssmenu > ul > li > a').click(function() {
        $('#cssmenu li').removeClass('active');
        $(this).closest('li').addClass('active');
        var checkElement = $(this).next();
        if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            $(this).closest('li').removeClass('active');
            checkElement.slideUp('normal');
        }
        if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('#cssmenu ul ul:visible').slideUp('normal');
            checkElement.slideDown('normal');
        }
        if ($(this).closest('li').find('ul').children().length == 0) {
            return true;
        } else {
            return false;
        }
    });
});

