var jugando;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio() {
  jugando = true;
  miCanvas = $("#mi_canvas")[0];
  contexto = miCanvas.getContext("2d");
  buffer = document.createElement("canvas");
  estudiante = new Estudiante();
  profesores = [new Profesor(), new Profesor(), new Profesor(),
                new Profesor(), new Profesor(), new Profesor(),
                new Profesor()];
  run();

  $('#instrucciones').click(function() {
    $('#popup').fadeIn('slow');
    $('.popup-overlay').fadeIn('slow');
    $('.popup-overlay').height($(window).height());
    return false;
  });

  $('#cerrar').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
  });

  $("#iniciar").click(function(){
		if(jugando==false)
			inicio();
	});
}

function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		quica.actualizar('arriba');
	if(event.which==40 || event.which==83)
		quica.actualizar('abajo');
	if(event.which==39 || event.which==68)
		quica.actualizar('derecha');
	if(event.which==37 || event.which==65)
		quica.actualizar('izquierda');
}

function run() {
  buffer.width = miCanvas.width;
  buffer.height = miCanvas.height;
  contextoBuffer = buffer.getContext("2d");

  if(jugando) {
    contextoBuffer.clearRect(0,0,buffer.width, buffer.height);

    estudiante.dibujar(contextoBuffer);
    for(i = 0; i < profesores.length; i++) {
      profesores[i].dibujar(contextoBuffer);
      profesores[i].actualizar();
      if(estudiante.colision(profesores[i].x, profesores[i].y)) {
        estudiante.sprite = 1;
        estudiante.nota += 1;
        if(estudiante.nota > 50) {
          estudiante.nota = 0;
          estudiante.vida += 20;
        }
        $('#pierde')[0].play();
      }

      if(estudiante.vida <= 0)
        jugando = false;

      contexto.clearRect(0,0, miCanvas.width, miCanvas.height);
      contexto.drawImage(buffer, 0, 0);
      setTimeout("run()", 20);
    }else{
      contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
      contextoBuffer.fillStyle = "#ffffff";
      estudiante.vida = 0;
      contextoBuffer.font = "50px sans-serif";
      contextoBuffer.fillText("GAMEOVER", 300, 440);
      contextoBuffer.fillStyle = "#ff0000";
      contextoBuffer.font = "15px sans-serif";
      contextoBuffer.fillText("Perdiste :(", 550, 460);
      contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
      contexto.drawImage(buffer, 0, 0);
    }
  }
}
