const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const titleScreen = document.getElementById('title-screen')
titleScreen.style.display = 'flex'
canvas.style.display='none'
const startButton = document.getElementById('start-button')
startButton.addEventListener('click', () => {
  titleScreen.style.display = 'none'
  canvas.style.display = 'flex'
  animate();
})






//GAME CODE/////////
canvas.width = 1024
canvas.height = 576

const offset = {
  x: -350,
  y: -250
}

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 50) {
  collisionsMap.push(collisions.slice(i, 50 + i))
}

const itemsMap = []
for (let i = 0; i < itemsMapData.length; i += 50) {
  itemsMap.push(itemsMapData.slice(i, 50 + i))
}

const boundaries = []

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 2071)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})


const items = []
const item1Image = new Image()
item1Image.src = './assets/item1.png'

const item2Img = new Image()
item2Img.src = './assets/item2.png'

const item3Img = new Image()
item3Img.src = './assets/item3.png'

const item4Img = new Image()
item4Img.src = './assets/item4.png'

const item5Img = new Image()
item5Img.src = './assets/item5.png'

const item6Img = new Image()
item6Img.src = './assets/steve.png'

itemsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    // 2071 === item1
    if (symbol === 2071) {
      items.push(
        new Items({
          position: {
            x: j * Boundary.width + offset.x,   
            y: i * Boundary.height + offset.y
          },
          image: item1Image,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 4,
          animate: true,
          dialogueBoxClass: 'item1' 
        })
      )
    }
    // 2070 === item2
    else if (symbol === 2070) {
      items.push(
        new Items({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: item2Img,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 4,
          animate: true,
          dialogueBoxClass: 'item2'
        })
      )
    }
        // 2069 === item3
    else if (symbol === 2069) {
      items.push(
        new Items({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: item3Img,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 4,
          animate: true,
          dialogueBoxClass: 'item3'
        })
      )
    }
    else if (symbol === 2068) {
      items.push(
        new Items({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: item4Img,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 4,
          animate: true,
          dialogueBoxClass: 'item4'
        })
      )
    }
    else if (symbol === 2067) {
      items.push(
        new Items({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: item5Img,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 4,
          animate: true,
          dialogueBoxClass: 'item5'
        })
      )
    }
    else if (symbol === 2066) {
      items.push(
        new Items({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          },
          image: item6Img,
          frames: {
            max: 4,
            hold: 60
          },
          scale: 4,
          animate: true,
          dialogueBoxClass: 'item6'
        })
      )
    }
    if (symbol !== 0) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
    }
  })
})

const image = new Image()
image.src = './assets/my_room.png'

const playerDownImage = new Image()
playerDownImage.src = './assets/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './assets/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './assets/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './assets/playerRight.png'

const player = new Sprite({
  position: {
    x: canvas.width/2 - 192/4*1.5, 
    y: canvas.height/2 - 68,
  },
  image: playerDownImage,
  frames: {
    max: 4,
    hold: 7
  },
  sprites: {
    up: playerUpImage,
    left: playerLeftImage,
    right: playerRightImage,
    down: playerDownImage
  },
  scale: 0.8 // Set the scale to make the sprite smaller
})

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})


let isMovingUp = false;
let isMovingDown = false;
let isMovingLeft = false;
let isMovingRight = false;

const movables = [
  background,
  ...boundaries,
  ...items
]
const renderables = [
  background,
  ...boundaries,
  ...items,
  player,
]

function animate() {
  
  c.clearRect(0,0, canvas.width, canvas.height)
  window.requestAnimationFrame(animate)
  renderables.forEach((renderable) => {
    renderable.draw()
  })

  let moving = true
  player.animate = false


  if (isMovingUp) {
  
    player.animate = true
    player.image = player.sprites.up

    ItemCollision({
      items,
      player,
      itemOffset: { x: 0, y: 3 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3
      })
  } 
   if (isMovingLeft) {
    player.animate = true
    player.image = player.sprites.left

    ItemCollision({
      items,
      player,
      itemOffset: { x: 3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3
      })
  }  
   if(isMovingDown) {
    player.animate = true
    player.image = player.sprites.down

    ItemCollision({
      items,
      player,
      itemOffset: { x: 0, y: -3 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3
      })
  }  
   if (isMovingRight) {
    player.animate = true
    player.image = player.sprites.right

    ItemCollision({
      items,
      player,
      itemOffset: { x: -3, y: 0 }
    })

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y
            }
          }
        })
      ) {
        moving = false
        break
      }
    }

    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3
      })
  }
}

let progress = false
let lastKey = ''
window.addEventListener('keydown', (e) => {

  if (player.isInteracting) {
    if (e.key === ' ') {
          if (player.interactionAsset.dialogueBoxClass === "item1" && progress=== false){
            document.querySelector('#dialogueText').innerHTML = 
            "Reach me at <br><br> Mobile phone: +30 6983616172 <br><br>" +
            "Email: evanskaps@gmail.com <br><br>"+
            "LinkedIn: <a  href= 'https://www.linkedin.com/in/evanskaps/' target='blank'>in/evanskaps</a> <br><br>" +
            "GitHub: <a  href= 'https://github.com/Asteryx21/' target='blank'>Asteryx21</a> <br><br>" +
            "Or send me an envelope?<br><br> Adress: 25 Ploutarchou 15122 Athens, Greece<br><br>";
            document.querySelector('.item1 h1').textContent = 'Contact me...';
            document.querySelector('.item1 small').style.display = 'none';
            document.querySelector('#cv_button').style.display = 'none';
            progress=true;
            return
          } 
        // finish conversation
        player.isInteracting = false
        //return divs etc to default
        document.querySelector('.item1').style.display = 'none'
        document.querySelector('.item2').style.display = 'none'
        document.querySelector('.item3').style.display = 'none'
        document.querySelector('.item4').style.display = 'none'
        document.querySelector('.item5').style.display = 'none'
        document.getElementById('dialogueText').innerHTML = "Hey there! I'm the embodiment of the awesomeness that is the creator of this game!<br><br>I am paid to say that...<br><br>I am not really that ugly, I am just a bad designer :-) <br><br>Want to know more about me? Sorry not a choice... <br><br>During my studies, I discovered my passion for software engineering and development. I am a strong team player who can quickly learn and apply new technologies and thrives on working in agile environments. In my free time I enjoy playing MMORPG games."; // Change the text back
        document.querySelector('.item1 h1').textContent = 'About me...';
        document.querySelector('#cv_button').style.display = 'block';
        progress = false
    }
    return
  }
  if (e.key === 'w' || e.key === 'ArrowUp') {
    isMovingUp = true;
  }
  if (e.key === 'a'|| e.key === 'ArrowLeft') {
    isMovingLeft = true;
  }
  if (e.key === 's'|| e.key === 'ArrowDown') {
    isMovingDown = true;
  }
  if (e.key === 'd'|| e.key === 'ArrowRight') {
    isMovingRight = true;
  }
  if (e.key === ' ') {
    if (!player.interactionAsset) return
    // console.log(player.interactionAsset)
    // beginning the conversation
    if (player.interactionAsset.dialogueBoxClass === "item1"){
      document.querySelector('.item1').style.display = 'flex'
      player.isInteracting = true
    } else if (player.interactionAsset.dialogueBoxClass === "item2"){
      document.querySelector('.item2').style.display = 'flex'
      player.isInteracting = true
    }else if (player.interactionAsset.dialogueBoxClass === "item3"){
      document.querySelector('.item3').style.display = 'grid'
      player.isInteracting = true
    }else if (player.interactionAsset.dialogueBoxClass === "item4"){
      document.querySelector('.item4').style.display = 'flex'
      player.isInteracting = true
    }else if (player.interactionAsset.dialogueBoxClass === "item5"){
      document.querySelector('.item5').style.display = 'flex'
      player.isInteracting = true
    }
  }

})

window.addEventListener('keyup', (e) => {

  if (e.key === 'w' || e.key === 'ArrowUp') {
    isMovingUp = false;
  }
  if (e.key === 'a'|| e.key === 'ArrowLeft') {
    isMovingLeft = false;
  }
  if (e.key === 's'|| e.key === 'ArrowDown') {
    isMovingDown = false;
  }
  if (e.key === 'd'|| e.key === 'ArrowRight') {
    isMovingRight = false;
  }

});


let clicked = false
addEventListener('click', () => {
  if (!clicked) {
    audio.Map.play()
    clicked = true
  }
})
