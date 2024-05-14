let blocksContainer = document.querySelector(".memory-game-blocks")
let blocks = Array.from(blocksContainer.children)
let duration = 1200;

document.querySelector(".control-buttons span").onclick = function () {
    this.parentElement.remove()
    setTimeout(() => {
        // Ask user for his name
        let userName = prompt("Enter Your Name Please!")
        // if user don't fill it add Unknown to UserName 
        if (userName == null || userName == "") {
            document.querySelector(".info-container .name span").innerHTML = "Unknown"
        } else {
            document.querySelector(".info-container .name span").innerHTML = userName
        }
        // To view the blocks to user When Start Game, [to help him remember]
        blocks.forEach(e => {
            e.classList.add("is-flipped")
            setTimeout(_ => e.classList.remove("is-flipped"), duration)
        });
    }, 10)
}

let success = document.getElementById("success");
let fail = document.getElementById("fail");

blocks.forEach((e) => {
    // Adding the random number to the block
    e.style.order = Math.floor(Math.random() * blocks.length)
    e.onclick = function () {
        // Adding is-flipped class when clicking on the block
        this.classList.add("is-flipped")
        // Filter blocks to extract the contain is-flipped class
        let allFlippedBlocks = blocks.filter(isFlipped => isFlipped.classList.contains("is-flipped"))
        if (allFlippedBlocks.length === 2) {
            firstBlock = allFlippedBlocks[0];
            secondBlock = allFlippedBlocks[1];
            // Stop Clicking [Open Other Blocks] until match
            blocksContainer.classList.add("no-clicking")
            // Match two blocks in allFlippedBlocks
            if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
                firstBlock.classList.remove("is-flipped")
                secondBlock.classList.remove("is-flipped")

                firstBlock.classList.add("has-match")
                secondBlock.classList.add("has-match")
                // Add audio after successful trials
                success.play();
            } else {
                // Increment counter if there is no match
                document.querySelector(".info-container .tries span").textContent++;
                // Add audio after failed trials
                fail.play();
            }
        }
        setTimeout(() => {
            // Remove is flipped class 
            this.classList.remove("is-flipped")
            // Remove stop clicking after match
            blocksContainer.classList.remove("no-clicking")
        }, duration);
    }
})