function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
      rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
      rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
      rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
  
function ItemCollision({
    items,
    player,
    itemOffset = { x: 0, y: 0 }
}) {
    player.interactionAsset = null
    // monitor for character collision
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
  
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...item,
            position: {
              x: item.position.x + itemOffset.x,
              y: item.position.y + itemOffset.y
            }
          }
        })
      ) {
        player.interactionAsset = item
        break
      }
    }
}
  
function showCV(){
    window.open('./assets/evanskaps.pdf', '_blank');
}
function showDiploma(){
  window.open('./assets/Diploma.pdf', '_blank');
}
function showThesis(){
    window.open('https://evanskaps.itch.io/galaxy-solutions', '_blank');
}
function showPaper(){
    window.open('./assets/m65496-paper-final.pdf', '_blank');
}
function showRecommendation(){
  window.open('./assets/Recommendation-Letter.pdf', '_blank');
}
  
function viewDemo(demo){
  if (demo===2){
    window.open('https://evanskaps.itch.io/galaxy-solutions', '_blank');
  }
  if (demo===3){
    window.open('https://asteryx21.github.io/project_kapa/', '_blank');
  }
  if (demo===4){
    window.open('https://asteryx21.github.io/waste_project/', '_blank');
  }
  if (demo===5){
    window.open('https://asteryx21.github.io/game_hopper/', '_blank');
  }
  if (demo===8){
    window.open('https://www.youtube.com/watch?v=KuOnzobrXpc', '_blank');
  }
}

function viewGit(git){
  if (git===3){
    window.open('https://github.com/Asteryx21/projectkapa', '_blank');
  }
  if (git===4){
    window.open('https://github.com/Asteryx21/waste_project', '_blank');
  }
  if (git===5){
    window.open('https://github.com/Asteryx21/game_hopper', '_blank');
  }
  if (git===6){
    window.open('https://github.com/Asteryx21/Decision-Theory', '_blank');
  }
  if (git===7){
    window.open('https://github.com/Asteryx21/Natural-language-processing', '_blank');
  }
  if (git===8){
    window.open('https://github.com/Asteryx21/Knowledge-representation-and-reasoning', '_blank');
  }
  if (git===9){
    window.open('https://github.com/Asteryx21/Databases', '_blank');
  }
}

function staticPage(){
  window.open('https://asteryx21.github.io/evanskaps/', '_blank');
}