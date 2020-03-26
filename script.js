
var x = 0;
var slider;
var canvas;
var escala;
var escalas;
var backgroundColor = 0;
var n = 0;
var offsetX = 1;
var offsetY = 1;
var incremento =0.005
var framerate=30;
var escalas = new Array();
var colorAlpha = 1;
var tiempoReseteo = 10;
var rotateXCam = 0;
var rotateYCam = 0;
var rotateZCam = 0;
var translateZCam=0;

function setup() {
  
  background(backgroundColor);
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  document.oncontextmenu = function() { return false; }
  
  var gui = createGui("Cantidad de Ruido");
  // sliderRange(0, 1, 0.01);
  // gui.addGlobals("n");
  sliderRange(Math.round(PI*100)/100, PI*2, 0.01);
  gui.addGlobals("rotateXCam");
  sliderRange(Math.round(PI*100)/100, PI*2, 0.01);
  gui.addGlobals("rotateYCam");
  sliderRange(Math.round(PI*100)/100, PI*2, 0.01);
  gui.addGlobals("rotateZCam");
  sliderRange(-500, 0, 0.01);
  gui.addGlobals("translateZCam");
  sliderRange(0.005, 0.05, 0.0001);
  gui.addGlobals("incremento");
  sliderRange(1, 120, 1);
  gui.addGlobals("framerate");
  sliderRange(0.51, 2, 0.01);
  gui.addGlobals("colorAlpha");
  sliderRange(1, 20, 1);
  gui.addGlobals("tiempoReseteo");
  
  for(i=0; i<12; i++){
    let escala = chroma.scale([chroma.random().darken(10), chroma.random().darken(6), chroma.random().darken(5).darken(3),chroma.random(), chroma.random()]).colors(24)
    escalas.push(escala)
  }
  console.log(escalas)
  reseteaEscala();
  setInterval(() => {
    reseteaEscala();
  }, tiempoReseteo*1000);

}

function reseteaEscala() {
  escala = escalas[Math.floor(random(0, escalas.length))];
  escala.map((color)=>{
    console.log(color)
    return chroma(color).darken(noise(n))
  })
}
function colorRandom(escala) {
  return escala[Math.floor(random(0, escala.length))];
}


function draw() {
  translate(-width/2, -height/2, translateZCam)
  rotateX(Math.sqrt(rotateXCam));
  rotateY(Math.sqrt(rotateYCam));
  rotateZ(Math.sqrt(rotateZCam));
  //translate(-height/2,-width/2)

  noStroke();
  let c = color(colorRandom(escala));
  c.setAlpha(colorAlpha);
  let m = n

  for (var i = 0; i <  Math.floor(noise(n)*100); i++) {
    m=n+i
    m%2>=1.6?c=color("black"):c = color(colorRandom(escala));
    c.setAlpha(colorAlpha)
    
    fill(c);
    //console.log(noise(n++));
    var radius = noise(m*offsetX, m*offsetY)*200;
    m=m+incremento
    // var x = width*Math.sin(noise(m*offsetX, 0)*random(0, 2));
    var x = width*random(0, 1)
    m=m+incremento
    // var y = height*sin(noise(0, m*offsetY)*random(0, 2));
    var y = height*random(0, 1)
    //console.log(x, y)

    //console.log(noiseX, noiseY, x, y, radius)
    ellipse(x, y, radius);
    
  }
  n=n+incremento
  n=m

  frameRate(framerate);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function keyPressed() {
  console.log(keyCode)
  if (keyCode == "32"){
    reseteaEscala();
    clear()
    background(backgroundColor);
  }else if( keyCode == 83){
    var date = new Date;
    console.log(date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds())
    var fichero = [date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds()].join("-")
    save(fichero+'.jpg');
  }
}
