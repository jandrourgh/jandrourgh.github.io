
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

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(backgroundColor);
  var gui = createGui("Cantidad de Ruido");
  sliderRange(0, 1, 0.01);
  gui.addGlobals("n");
  sliderRange(0, 2, 0.01);
  gui.addGlobals("offsetX");
  sliderRange(0, 2, 0.01);
  gui.addGlobals("offsetY");
  sliderRange(0.005, 0.05, 0.0001);
  gui.addGlobals("incremento");
  sliderRange(1, 120, 1);
  gui.addGlobals("framerate");
  sliderRange(0.51, 2, 0.01);
  gui.addGlobals("colorAlpha");
  sliderRange(1, 20, 1);
  gui.addGlobals("tiempoReseteo");
  // escalas = Object.keys(chroma.brewer).map(function(key) {
  //   return [chroma.brewer[key]];
  // });
  
  for(i=0; i<12; i++){
    let escala = chroma.scale([color("black"),chroma.random().darken(10), chroma.random().darken(6), chroma.random().darken(5).darken(3),chroma.random(), chroma.random()]).colors(24)
    escalas.push(escala)
  }
  // escalas = escalas.map(function(escala) {
  //   return escala[0];
  // });
  escalas.forEach(function(escala) {
    //console.log(escala)
  });
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
function keyPressed(canvas) {
  reseteaEscala();
  background(backgroundColor);
}
