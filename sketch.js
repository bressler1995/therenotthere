//Attractor code credit to Daniel Shiffman
//Brian Ressler 5_13_2020

let movers = [];
let attractor = [];

//Firebase
let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let fbCount = 0;
let database; // reference to our firebase database
let folderName = "attractors"; // name of folder you create in db
let initapp = false;
let win_open = -1;
let win_pos = [];

let message_window;
let submit_opt;
let x_opt;
let mycanvas;
let message_text;

function setup() {
  let config = {
    apiKey: "AIzaSyDgyWFlT1-95JJc1YDzXE7UYePUm2I7JZM",
    authDomain: "there-not-there-v2.firebaseapp.com",
    databaseURL: "https://there-not-there-v2.firebaseio.com",
    projectId: "there-not-there-v2",
    storageBucket: "there-not-there-v2.appspot.com",
    messagingSenderId: "701657311516",
    appId: "1:701657311516:web:db7cc1bc473f0240b532d9"
  };

  firebase.initializeApp(config);
  database = firebase.database();
  let ref = database.ref(folderName);
  ref.on('value', gotData, errData);

  

  mycanvas = createCanvas(windowWidth, windowHeight);
  // for (let i = 0; i < 5; i++) {
  //   let x = random(windowWidth);
  //   let y = random(windowHeight);
  //   let m = random(10, 30);
  //   movers[i] = new Mover(x, y, m);
  // }
  // attractor[0] = new Attractor(width / 2, height / 2, random(20, 50));
  message_window = select('#message_window');
  submit_opt = select('#submit_opt')
  x_opt = select('#x_opt');
  message_text = select("#message_text")
  
  mycanvas.mousePressed(toggle_win);
  submit_opt.mousePressed(submit_mark);
  x_opt.mousePressed(close_win);
  background(230);
  
}

function draw() {
  background(230);
  for(i = 0; i < attractor.length; i++) {
    for (let mover of movers) {
      mover.update();
      mover.show();
      attractor[i].attract(mover);
    }

    attractor[i].show();
  }
  
  // if (mouseIsPressed) {
  //   attractor[0].pos.x = mouseX;
  //   attractor[0].pos.y = mouseY;
  // }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function toggle_win() {
  win_pos[0] = mouseX;
  win_pos[1] = mouseY;
  let message_dom = document.getElementById("message_window")
  message_dom.style.top = win_pos[1] + "px";
  message_dom.style.left = win_pos[0] + "px";

  if(message_window.hasClass("hide_window") == false) {
    message_window.addClass("hide_window");
  }

  win_open = 1;
  
}

function close_win() {
  if(message_window.hasClass("hide_window") == true) {
    message_window.removeClass("hide_window");
  }

  win_open = -1;
}

function submit_mark() {
  createNode(folderName, fbCount, 
    {
      type: "attractor",
      posX: win_pos[0],
      posY: win_pos[1],
      size: random(50, 100),
      bg: [random(255), random(255), random(255), random(255)],
      text: message_text.value(),
    }
  );

  close_win();
}

function mouseMoved() {
  for (i = 0; i < attractor.length; i++) {
    if(mouseX > attractor.pos.x) {
      
    }
  }
}