function aleatorio(piso, techo){
  return Math.floor(Math.random() * (techo - piso + 1)) + piso;
}

function Profesor(){
  var opc = aleatorio(1,100) % 2;
  if(opc == 1){
    this.img = $("#profesor_bueno")[0];
	this.tipo = 1;
  }else{
    this.img = $("#profesor_malo")[0];
	this.tipo=2;
  }
  var tipo = this.tipo;
  this.x = aleatorio(0,620);
  this.y = aleatorio(100,450);
  this.velocidad = 0;
  while(this.velocidad == 0)
    this.velocidad = aleatorio(-0.7,0.7);
  this.dibujar = function(ctx) {
    var img = this.img;
    ctx.drawImage(img, this.x, this.y);
  }
  this.actualizar = function(){
    this.x += this.velocidad;
    this.x = (640 + this.x) % 640;
  }
}