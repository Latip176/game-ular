//get Object
const color = document.querySelector("#color"),
      player = document.querySelector(".user"),
      char = document.querySelector("#character"),
      nyawaa = document.querySelector("#nyawa"),
      sc = document.querySelector("#sc"),
      btn = document.querySelector("#control"),
      audio = document.querySelector("#playAudio"),
      point = document.querySelector(".point");

audio.play(); // play music

//data-data
let x = 0, y = 0;
let nyawa = 3; // setting jumlah nyawa default
var kondisiAB = false;
var kondisiKK = false;
var atas,bawah,kiri,kanan;
var A = 0;
var B = 0;
var K1 = 0;
var K2 = 0;
var score = 0;

// function nge random Number untuk posisi Point
function getRandomEvenNumber() {
  var randomNumber = Math.floor(Math.random() * 126) * 2;
  if(randomNumber < 10) {
    return randomNumber+20;
  } else {
    return randomNumber-30;
  }
}

// getar jika nabrak dinding, dengan navigator vibrate
const getar = () => {
  navigator.vibrate(50);
  navigator.vibrate([
    100, 30, 100
  ]); 
}

// nge set random point
const randomPoint = () => {
  var top = getRandomEvenNumber();
  var left = getRandomEvenNumber();
  point.style.top = top+"px";
  point.style.left = left+"px";
  return {
    a1: Math.floor(top),
    a2: Math.floor(left)
  };
}

const setScore = (scoreTerbaru) => {
  sc.innerHTML = "Score: "+scoreTerbaru;
}

// get posisi Object
function getPosition(element) {
  const rect = element.getBoundingClientRect();
  return {
    left: Math.floor(rect.left),
    top: Math.floor(rect.top),
    right: Math.floor(rect.right),
    bottom: Math.floor(rect.bottom),
    width: rect.width,
    height: rect.height
  };
}

// running
const run = setInterval(() => {
  randomPoint();
  const pos1 = getPosition(player);
  const pos2 = getPosition(point);
  if(
    pos1.left < pos2.right &&
    pos1.right > pos2.left &&
    pos1.top < pos2.bottom &&
    pos1.bottom > pos2.top
  ) {
    score += 1;
    setScore(score);
  }
}, 1000);

//clear all interval
const clearAll = () => {
  clearInterval(atas);
  clearInterval(bawah);
  clearInterval(kiri);
  clearInterval(kanan);
}

//set heading nyawa
const setNyawa = (sisaNyawa) => {
  if(nyawa>0){
    nyawaa.innerHTML = "Sisa nyawa: "+sisaNyawa;
  } else {
    //audio.play();
    alert("Game Over!")
    const ayo = document.querySelector("#ayo");
    nyawaa.innerHTML = "Game Over!";
    nyawaa.style.color = "red";
    ayo.innerHTML = "Klik button 'reset' untuk Mengulang!";
    clearAll();
  }
}

//logic atas bawah
const atas_bawah = () => {
  if(atas > bawah) {
    clearInterval(bawah);
  } else {
    clearInterval(atas);
  }
}

//logic kiri kanan
const kiri_kanan = () => {
  if(kiri > kanan) {
    clearInterval(kanan);
  } else {
    clearInterval(kiri);
  }
}

// logic double click disable
const doubleClick = (koordinate, location) => {
  if(location=="A" && koordinate != 0){
    if(B != 0 || K1 != 0 || K2 != 0) {
      B = 0;
      K1 = 0;
      K2 = 0;
    }
  } else if(location=="B" && koordinate != 0) {
    if(A != 0 || K1 != 0 || K2 != 0) {
      A = 0;
      K1 = 0;
      K2 = 0;
    }
  } else if(location=="K1" && koordinate != 0) {
    if(B != 0 || A != 0 || K2 != 0) {
      B = 0;
      A = 0;
      K2 = 0;
    }
  } else {
    if(B != 0 || K2 != 0 || A != 0) {
      B = 0;
      K1 = 0;
      A = 0;
    }
  }
}

//function controls
function controls(arah) {
  if(arah==="atas" || arah==="bawah") {
    kondisiAB = true;
    if(kondisiKK==true) {
      kondisiKK = false;
      clearInterval(kiri);
      clearInterval(kanan);
    }
    if(arah==="atas") {
      A += 1;
      doubleClick(A, "A");
      //char.src = "assets/img/atas.png";
      char.style.transform = "rotate(270deg)";
      if(A==1) {
        atas = setInterval(() => {
          x -= 2;
          player.style.top = x+"px";
          if(x < -30) {
            getar();
            x = 250;
            nyawa -= 1;
            setNyawa(nyawa);
          }
        },10);
      }
    } else {
      B += 1;
      doubleClick(B, "B");
      //char.src = "assets/img/bawah.png";
      char.style.transform = "rotate(90deg)";
      //char.style.transform = "rotate(90deg)";
      if(B==1) {
        bawah = setInterval(() => {
          x += 2;
          player.style.top = x+"px";
          if(x > 250) {
            getar();
            x = 0;
            nyawa -= 1;
            setNyawa(nyawa);
          }
        },10);
      }
    }
    atas_bawah();
  } else if(arah==="kiri" || arah==="kanan") {
    kondisiKK = true;
    if(kondisiAB==true) {
      kondisiAB = false;
      clearInterval(atas);
      clearInterval(bawah);
    }
    if(arah==="kiri") {
      K1 += 1;
      doubleClick(K1, "K1");
      //char.src = "assets/img/kiri.png";
      char.style.transform = "rotate(180deg)";
      if(K1==1) {
        kiri = setInterval(() => {
          y -= 2;
          player.style.left = y+"px";
          if(y < -30) {
            getar();
            y = 250;
            nyawa -= 1;
            setNyawa(nyawa);
          }
        },10);
      }
    } else {
      K2 += 1;
      doubleClick(K2, "K2");
      //char.src = "assets/img/kanan.png";
      char.style.transform = "rotate(360deg)";
      if(K2==1) {
        kanan = setInterval(() => {
          y += 2;
          player.style.left = y+"px";
          if(y > 250) {
            getar();
            y = -30;
            nyawa -= 1;
            setNyawa(nyawa);
          }
        }, 10);
      }
    }
    kiri_kanan();
  } else if(arah==="reset") {
    nyawa = 3;
    x = 0;
    y = 0;
    nyawaa.innerHTML = "Sisa nyawa: "+nyawa;
    player.style.left = 0+"px";
    player.style.top = 0+"px";
    location.reload();
  }
}

//set inner text Nyawa dan Score
nyawaa.innerHTML = "Sisa nyawa: "+nyawa;
sc.innerHTML = "Score: "+score;