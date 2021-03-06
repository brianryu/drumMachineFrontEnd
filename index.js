// OPENING TEXT ANIMATION JS ******************************************************************************

anime.timeline({loop: false})
  .add({
    targets: '.ml15 .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800
  });
  
/////////////////////////////////////////
///   END OF OPENING TEXT ANIMATION  //// ***********************************************************************
////////////////////////////////////////

///////////////////////////////////
// DROP DOWN OFF OF OPENING TEXT //
///////////////////////////////////

const dropDownDiv = document.querySelector('div.dropdown-content');

const getDrumkitNames = () => {
return fetch(`https://infinite-tundra-44498.herokuapp.com/api/v1/drumkits`)
.then((resp) => {
      return resp.json()
}).then((resp) => {
    let x = 0;
    dropDownDiv.innerHTML = ""
     resp.forEach((kit) => {
      
           
           dropDownDiv.innerHTML += `<p data-id=${x}> ${kit.name} </p>`
           x++;
     })
})
}
const dropDownTag = document.querySelector('.dropdown-content')
dropDownTag.addEventListener('click', (event) => {
    let kitid = event.target.dataset.id
    fetchByDrop(kitid)
})
getDrumkitNames()
////////////////////////////
// END OF DROP DOWN LOGIC //
////////////////////////////
////////////////////////////////
//////NEW DB CODE BEGINS
///////////////////////////////
const padClassTag = document.querySelector('.pad')
function fetchByDrop(dropdown) {
let drumkitURL = "https://infinite-tundra-44498.herokuapp.com/api/v1/drumkits"
fetch(drumkitURL)
.then( resp =>  resp.json() )
.then( kits => {
    let soundURLs = kits[dropdown].sounds
   
      let pad1 = soundURLs[0]
      let pad2 = soundURLs[1]
      let pad3 = soundURLs[2]
      let pad4 = soundURLs[3]
      let pad5 = soundURLs[4]
      let pad6 = soundURLs[5]
      let pad7 = soundURLs[6]
      let pad8 = soundURLs[7]
      let padArray = []
      let x = 1
      padArray.push(pad1,pad2,pad3,pad4,pad5,pad6,pad7,pad8)
      padClassTag.innerHTML = ''
      padArray.forEach((url) => {   
      padClassTag.innerHTML += `<div class="box pad-${x}">${x}
     
      <audio id="audio${x}" src="${url.sound_url}" ></audio>

      </div>`
      x++ 
})
})
};


// fetchByDrop()


///////////////////////////////////////////////
// STARTING LOGIC BEHIND MODAL FOR ADD SOUND //
///////////////////////////////////////////////

// Get the modal

const soundModal = document.getElementById('soundModal');
const kitModal = document.getElementById('kitModal');

// Get the button that opens the modal
const soundBtn = document.getElementById("addSoundBtn");
const kitBtn = document.getElementById("createKitBtn");

// Get the <span> element that closes the modal
const soundSpan = document.getElementById("soundSpan");
const kitSpan = document.getElementById("kitSpan");



// When the user clicks the button, open the modal 
soundBtn.onclick = function() {
  soundModal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
soundSpan.onclick = function() {
    soundModal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
document.onclick = function(event) {
    if (event.target == soundModal) {
      soundModal.style.display = "none";
    }
}


kitBtn.onclick = function() {
    listSounds()
    kitModal.style.display = "block";
}

kitSpan.onclick = function() {
    kitModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == kitModal) {
      kitModal.style.display = "none";
    }
  }
//////////////////////////////////////////////
// ENDING LOGIC BEHIND MODAL FOR ADD SOUND ///
//////////////////////////////////////////////


// CREATE SOUND FROM 'ADD SOUND' BUTTON //
const modalDiv = document.getElementById('sound-modal-content')

const addNewSound = (soundUrl) => {
    
    return fetch('https://infinite-tundra-44498.herokuapp.com/api/v1/sounds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },

        body: JSON.stringify({'sound_url': soundUrl})
    }).then((res) => {
        return res.json();
    })
}

modalDiv.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON') {
        let soundUrl = event.target.parentElement.querySelector('input').value;
        addNewSound(soundUrl);
    }
})
//////ADD NEW KIT FUNCTION
const addNewKit = (kitName) => {
   return fetch("https://infinite-tundra-44498.herokuapp.com/api/v1/drumkits", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify( { "name": kitName } ) 
       })
    .then((res) => {
        
        return res.json();
    })
}

/////List Sounds function
let listOfSounds = document.querySelector(".listOfSounds")

const listSounds = () => {
    return fetch('https://infinite-tundra-44498.herokuapp.com/api/v1/sounds')
    .then( ( response ) => { 
        return response.json() } )
    .then((res) => {
       
        let x = 1
        listOfSounds.innerHTML = "<br><br><form>"
        res.forEach((sound) => { 
          
////SOME LOGIC HERE TO WRITE INDEX PAGE
            let soundID = sound.id
            listOfSounds.innerHTML += `<ul>
           
            <audio src="${sound.sound_url}" id="${soundID}"></audio>
            <button onclick="document.getElementById('${soundID}').play()">Preview</button>
            Sound Number: ${x.toString()}

            <input type="checkbox" name="soundSelection" value="${x.toString()}" onclick="return ValidateSoundSelection();">

           <ul>`
            console.log(sound.sound_url)
            x++}
            )
           
            
    })
}
////////////////////////////////
/////Make sure no more than 8 buttons are clicked per drum kit
//////////////////////////////
function ValidateSoundSelection()  
{  
    var checkboxes = document.getElementsByName("soundSelection");  
    var numberOfCheckedItems = 0;  
    for(var i = 0; i < checkboxes.length; i++)  
    {  
        if(checkboxes[i].checked)  
            numberOfCheckedItems++;  
    }  
    if(numberOfCheckedItems > 8)  
    {  
        alert("You can't select more than 8 sounds for your drumKit");  
        return false;  
    }  
}  

///////////////////create listener for drumkit creation
let drumKitSubmit = document.querySelector('input.submit')

drumKitSubmit.addEventListener('click', (event) => {
var checkboxes = document.getElementsByName("soundSelection"); 
var numberOfCheckedItems = 0; 
var checkedTrue = []
    for(var i = 0; i < checkboxes.length; i++)  
     {  
        if(checkboxes[i].checked)  
          {
            checkedTrue.push(checkboxes[i])
            numberOfCheckedItems++;
          }
    }  
   if (checkedTrue.length === 8) {
    let kitName = document.querySelector('#KitName').value
        addNewKit(kitName).then((event) => { 
        ///////////////////////////
        //ADDED ^ NEW KIT TO THE DB
        ///////////////////////////
        ///Then to build new kit using kitSound
            let drumKitId = event.id 
            for (var i = 0; i < checkedTrue.length; i++)
        {
        let soundiD = checkedTrue[i].parentElement.firstElementChild.id
        fetch('https://infinite-tundra-44498.herokuapp.com/api/v1/kit_sounds', { 
                    method:'POST',
                     headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'  },
            body: JSON.stringify( { drumkit_id: drumKitId, sound_id: soundiD } ) 
 
                                  })
                  
        }

        })
      alert("New drum kit created"); 
      kitModal.style.display = "none"; 
      
//////////make the box close on this click
                  
//////END OF checkedTrue length statement/////
}
else if (checkedTrue.length <= 8)
{
    alert(`You have only selected ${checkedTrue.length} sounds for your drumKit\nPlease select 8`);  
        return false;  

} 
getDrumkitNames()
    })
                                                    
// ************************************************************************ //




///////////////////////
////BEGIN 3D scene creation
///////////////////////
const container3d = document.querySelector('#container')
//SCene
var scene = new THREE.Scene();

//camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
//renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container3d.appendChild( renderer.domElement );


function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
///Start building geomatry///////

let geometry = new THREE.SphereGeometry(randomIntFromInterval(4,10),randomIntFromInterval(5,10),randomIntFromInterval(4,40))
let material = new THREE.MeshNormalMaterial({wireframe: true})

///// 8 spheres for each pad
let sphere1 = new THREE.Mesh(geometry, material)
scene.add(sphere1)

let sphere2 = new THREE.Mesh(geometry, material)
scene.add(sphere2)

let sphere3 = new THREE.Mesh(geometry, material)
scene.add(sphere3)

let sphere4 = new THREE.Mesh(geometry, material)
scene.add(sphere4)
let sphere5 = new THREE.Mesh(geometry, material)
scene.add(sphere5)
let sphere6 = new THREE.Mesh(geometry, material)
scene.add(sphere6)
let sphere7 = new THREE.Mesh(geometry, material)
scene.add(sphere7)
let sphere8 = new THREE.Mesh(geometry, material)
scene.add(sphere8)

//Create some particles
//////////////////////
var tex = new THREE.TextureLoader().load("https://static.wixstatic.com/media/6641d6_b083a3071334433f809d9daf8bba0fcb~mv2.png");
  // load the texture
var partGeom
var particleSystem
var particles = 100000;
var radius = 3000;
var positions = [];
var colors = [];
var sizes = [];
partGeom = new THREE.BufferGeometry();
var color = new THREE.Color();
var shaderMaterial = new THREE.PointsMaterial( { 
    size: 10,
    sizeAttenuation: false,
    alphaTest: 0.5, 
    transparent: true,
    map: tex  } );

for ( var i = 0; i < particles; i ++ ) {
            positions.push( ( Math.random() * 2 - 1 ) * radius );
            positions.push( ( Math.random() * 2 - 1 ) * radius );
            positions.push( ( Math.random() * 2 - 1 ) * radius );
            color.setHSL( i / particles, 1.0, 0.5 );
            colors.push( color.r, color.g, color.b );
            sizes.push( 200 );
        }

partGeom.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
partGeom.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
partGeom.addAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 4 ).setDynamic( true ) );

particleSystem = new THREE.Points( partGeom, shaderMaterial );
scene.add( particleSystem );
//////////////////////

camera.position.z = -70;
camera.position.y = 0;
camera.position.x = 0;


let controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.minDistance = 1
controls.maxDistance = 1000
var t1 =0
var t2 =0
var t3 =0
var t4 =0
var t5 =0
var t6 =0
var t7 =0
var t8 =0
///////////////////////////
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
};
//////////////////////////
var animate = function () {



    requestAnimationFrame( animate );

while (camera.position.x >= 400 ){
    camera.position.x = -100
}
camera.position.x += 0.1

    /////////////////
    t1 += 0.0052;  
    sphere1.rotation.x += 0.0001
    sphere1.rotation.z += 0.002
    sphere1.position.x = 20*Math.cos(t1) + 0;
    sphere1.position.z = 20*Math.sin(t1) + 0; // These to strings make it work
    t2 += -0.0052
    sphere2.rotation.x += 0.0001
    sphere2.rotation.z += 0.002
    sphere2.position.x = 40*Math.cos(t2) + 0;
    sphere2.position.z = 40*Math.sin(t2) + 0; // These to strings make it work
    t3 += 0.0059
    sphere3.rotation.x += 0.0002
    sphere3.rotation.z += 0.002
    sphere3.position.x = 10*Math.cos(t3) + 0;
    sphere3.position.z = 12*Math.sin(t3) + 0; // These to strings make it work
    t4 += 0.0053
    sphere4.rotation.x += 0.0001
    sphere4.rotation.z += 0.002
    sphere4.position.x = 60*Math.cos(t4) + 0;
    sphere4.position.z = 20*Math.sin(t4) + 0; // These to strings make it work
    t5 += -0.0057
    sphere5.rotation.x += 0.0002
    sphere5.rotation.z += 0.002
    sphere5.position.x = 35*Math.cos(t5) + 0;
    sphere5.position.z = 20*Math.sin(t5) + 0; // These to strings make it work
    t6 += -0.0055
    sphere6.rotation.x += 0.0001
    sphere6.rotation.z += 0.002
    sphere6.position.x = 50*Math.cos(t6) + 0;
    sphere6.position.z = 60*Math.sin(t6) + 0; // These to strings make it work
    t7 += -0.0054
    sphere7.rotation.x += 0.0002
    sphere7.rotation.z += 0.002
    sphere7.position.x = 60*Math.cos(t7) + 0;
    sphere7.position.z = 80*Math.sin(t7) + 0; // These to strings make it work
    t8 += -0.0058
    sphere8.rotation.x += 0.0001
    sphere8.rotation.z += 0.002
    sphere8.position.x = 10*Math.cos(t8) + 0;
    sphere8.position.z = 10*Math.sin(t8) + 0; // These to strings make it work
    


        

   
    controls.update()

    renderer.render( scene, camera );
};






/////////////////////////
///AUDIO 
//////////



 function play(value){
       var audio = document.getElementById(`${value}`);
       audio.play();
                 }

//////////////
/////END AUDIO
/////////////////
var randomScaleValue = getRandomArbitrary(-0.1, 0.1);
animate()
padClassTag.addEventListener('click', (event) => {
    // debugger
   switch (event.target.innerText) {
    case '1':
    console.log("pad 1 pressed")
    play(event.target.lastElementChild.id)
   
    sphere1.scale.x += randomScaleValue
    sphere1.scale.y += randomScaleValue
    sphere1.scale.z += randomScaleValue
    break;
    case '2':
    console.log("pad 2 pressed")
    play(event.target.lastElementChild.id)
   
    sphere2.scale.x += randomScaleValue
    sphere2.scale.y += randomScaleValue
    sphere2.scale.z += randomScaleValue
    break;
    case '3':
    console.log("pad 3 pressed")
    play(event.target.lastElementChild.id)
    
    sphere3.scale.x += randomScaleValue
    sphere3.scale.y += randomScaleValue
    sphere3.scale.z += randomScaleValue
    break;
    case '4':
    console.log("pad 4 pressed")
    play(event.target.lastElementChild.id)
   
    sphere4.scale.x += randomScaleValue
    sphere4.scale.y += randomScaleValue
    sphere4.scale.z += randomScaleValue
    break;
    case '5':
    console.log("pad 5 pressed")
    play(event.target.lastElementChild.id)
  
    sphere5.scale.x += randomScaleValue
    sphere5.scale.y += randomScaleValue
    sphere5.scale.z += randomScaleValue
    break;
    case '6':
    console.log("pad 6 pressed")
    play(event.target.lastElementChild.id)

    sphere6.scale.x += randomScaleValue
    sphere6.scale.y += randomScaleValue
    sphere6.scale.z += randomScaleValue
    break;
    case '7':
    console.log("pad 7 pressed")
    play(event.target.lastElementChild.id)
 
    sphere7.scale.x += randomScaleValue
    sphere7.scale.y += randomScaleValue
    sphere7.scale.z += randomScaleValue
    break;
    case '8':
    console.log("pad 8 pressed")
    play(event.target.lastElementChild.id)

    sphere8.scale.x += randomScaleValue
    sphere8.scale.y += randomScaleValue
    sphere8.scale.z += randomScaleValue
    break;
   }
})
//Work on adding key listeners

// pads appear on skin logic end ----



document.addEventListener('keypress', function (e) {
    if (e.key === '1') {
    console.log("1 key pressed")
    document.querySelector('div.box.pad-1').style.opacity = 1
    document.getElementById('audio1').load()
    document.getElementById('audio1').play()
    
    sphere1.scale.x += 1
    sphere1.scale.y += 1
    sphere1.scale.z += 1
    }
    if (e.key === '2') {
    console.log("2 key pressed")
    document.querySelector('div.box.pad-2').style.opacity = 1
    document.getElementById('audio2').load()
    document.getElementById('audio2').play()
    
    sphere2.scale.x += 1
    sphere2.scale.y += 1
    sphere2.scale.z += 1
    }
    if (e.key === '3') {
    console.log("3 key pressed")
    document.querySelector('div.box.pad-3').style.opacity = 1
    document.getElementById('audio3').load()
    document.getElementById('audio3').play()
    
    sphere3.scale.x += 1
    sphere3.scale.y += 1
    sphere3.scale.z += 1
    }
        if (e.key === '4') {
    console.log("4 key pressed")
    document.querySelector('div.box.pad-4').style.opacity = 1
    document.getElementById('audio4').load()
    document.getElementById('audio4').play()
    
    sphere4.scale.x += 1
    sphere4.scale.y += 1
    sphere4.scale.z += 1
    }
        if (e.key === '5') {
    console.log("5 key pressed")
    document.querySelector('div.box.pad-5').style.opacity = 1
    document.getElementById('audio5').load()
    document.getElementById('audio5').play()
    
    sphere5.scale.x += 1
    sphere5.scale.y += 1
    sphere5.scale.z += 1
    }
        if (e.key === '6') {
    console.log("6 key pressed")
    document.querySelector('div.box.pad-6').style.opacity = 1
    document.getElementById('audio6').load()
    document.getElementById('audio6').play()
    
    sphere6.scale.x += 1
    sphere6.scale.y += 1
    sphere6.scale.z += 1
    }
        if (e.key === '7') {
    console.log("7 key pressed")
    document.querySelector('div.box.pad-7').style.opacity = 1
    document.getElementById('audio7').load()
    document.getElementById('audio7').play()
    
    sphere7.scale.x += 1
    sphere7.scale.y += 1
    sphere7.scale.z += 1
    }
        if (e.key === '8') {

    console.log("8 key pressed")
    document.querySelector('div.box.pad-8').style.opacity = 1
    document.getElementById('audio8').load()
    document.getElementById('audio8').play()
    
    sphere8.scale.x += 1
    sphere8.scale.y += 1
    sphere8.scale.z += 1
    }

});
document.addEventListener("keyup", function(e) {
      if (e.key === '1') {
    console.log("1 key release")
    document.querySelector('div.box.pad-1').style.opacity = ""
    sphere1.scale.x -= 1
    sphere1.scale.y -= 1
    sphere1.scale.z -= 1
    
    }
    if (e.key === '2') {
    console.log("2 key released")
    document.querySelector('div.box.pad-2').style.opacity = ""
    sphere2.scale.x -= 1
    sphere2.scale.y -= 1
    sphere2.scale.z -= 1
    }
    if (e.key === '3') {
    console.log("3 key released")
document.querySelector('div.box.pad-3').style.opacity = ""
    sphere3.scale.x -= 1
    sphere3.scale.y -= 1
    sphere3.scale.z -= 1
    }
        if (e.key === '4') {
    console.log("4 key released")
document.querySelector('div.box.pad-4').style.opacity = ""
    sphere4.scale.x -= 1
    sphere4.scale.y -= 1
    sphere4.scale.z -= 1
    }
        if (e.key === '5') {
    console.log("5 key released")
document.querySelector('div.box.pad-5').style.opacity = ""
    sphere5.scale.x -= 1
    sphere5.scale.y -= 1
    sphere5.scale.z -= 1
    }
        if (e.key === '6') {
    console.log("6 key released")
document.querySelector('div.box.pad-6').style.opacity = ""
    sphere6.scale.x -= 1
    sphere6.scale.y -= 1
    sphere6.scale.z -= 1
    }
        if (e.key === '7') {
    console.log("7 key released")
document.querySelector('div.box.pad-7').style.opacity = ""
    sphere7.scale.x -= 1
    sphere7.scale.y -= 1
    sphere7.scale.z -= 1
    }
        if (e.key === '8') {

    console.log("8 key released")
document.querySelector('div.box.pad-8').style.opacity = ""
    sphere8.scale.x -= 1
    sphere8.scale.y -= 1
    sphere8.scale.z -= 1
    }
});
