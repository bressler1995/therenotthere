'use strict';

function gotData(data) {

  // need to retrieve firebase data with val() method
  // this returns an object of all data
  fbData = data.val();

  if (fbData) { // check to see if there is something in your database to start
    console.log('received data:');
    console.log(fbData);

    // create an array of the post values (if you need to loop through it retaining order of entries)
    fbDataArray = Object.values(fbData);
    fbCount = fbDataArray.length;
    
    if(initapp == false) {
        initapp = true;
        movers = [];
    }

    for(let i = 0; i < fbDataArray.length; i++) {
        attractor.push(new Attractor(fbDataArray[i].posX, fbDataArray[i].posY, fbDataArray[i].size, fbDataArray[i].bg, fbDataArray[i].text));

        let x = random(windowWidth);
        let y = random(windowHeight);
        let m = random(20, 100);
        movers.push(new Mover(x, y, m));
    }

  } else {
    console.log('nothing in this folder yet');
  }
}


function errData(err) {
  console.log("error! did not receive data");
  console.log(err);
}

// create a new node
// the node folder name, id, and object are all passed in as parameters

function createNode(_nodeFolder, _nodeId, _nodeObject) {
    firebase.database().ref(_nodeFolder + '/' + _nodeId).set(_nodeObject);
    
    // call this function to create and seed the folder!
    // createNode(folderName, "seed", {text: "this is to seed folder"});
    // (to test you can just paste it into the web console)
    
}
    
    
    // the update method will update an existing node
    
function updateNode(_nodeFolder, _nodeID, _updateObject) {
    firebase.database().ref(_nodeFolder + '/' + _nodeId).update(_updateObject);
    // this will update existing key:value pair(s) OR add new ones to your object
    // so your object might look like:
    // { existingKey: updatedKeyValue,
    //   newKey: newValue }
    // Where the existing key is updated and newKey is added
    }
    
    // And this removes an entire node from your folder
    
    function deleteNode(_nodeFolder, _nodeID) {
    firebase.database().ref(_nodeFolder + '/' + _nodeID).remove();
}

// createNode(folderName, "test", {text: "hello"});