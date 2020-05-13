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

  

  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let m = random(20, 70);
    movers[i] = new Mover(x, y, m);
  }
  // attractor[0] = new Attractor(width / 2, height / 2, random(20, 50));
  background(255);
  
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

function mousePressed() {
  
  createNode(folderName, fbCount, 
    {
      type: "attractor",
      posX: mouseX,
      posY: mouseY,
      size: random(20, 50),
      bg: [random(255), random(255), random(255), random(255)],
    }
  );

  for (let i = 0; i < 2; i++) {
    let x = random(width);
    let y = random(height);
    let m = random(20, 100);
    movers.push(new Mover(x, y, m));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}