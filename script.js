let mp = {
    d1:'', d2:'', d3:'', d4:'', d5:'', d6:'', d7:'', d8:'', d9:''
};

window.onload = function(){
    let parent = document.getElementById("drag");
    let children = Array.from(parent.children);
    // Shuffle pieces
    children.sort(() => Math.random() - 0.5);
    children.forEach(child => parent.appendChild(child));
}

function drag(event){
    event.dataTransfer.setData("text", event.target.id);
}

function dropOver(event){
    event.preventDefault();
}

function drop(event){
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let target = event.target;

    // Prevent dropping multiple images into one box
    if (target.className === "dropbox" && target.children.length === 0) {
        let imageElement = document.getElementById(data);
        target.appendChild(imageElement);
        
        let boxId = target.id; // e.g., dropbox1
        let slotIndex = boxId.replace('dropbox', 'd'); // becomes d1
        mp[slotIndex] = data; // e.g., mp['d1'] = 'block1'
        
        checkWin();
    }
}

function checkWin() {
    let isComplete = true;
    for(let i = 1; i <= 9; i++) {
        if(mp['d' + i] !== ("block" + i)) {
            isComplete = false;
            break;
        }
    }

    if(isComplete) {
        setTimeout(() => {
            document.getElementById('win-modal').style.display = 'flex';
        }, 300);
    }
}
