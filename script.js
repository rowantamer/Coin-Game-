function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.top + aRect.height < bRect.top ||
		aRect.top > bRect.top + bRect.height ||
		aRect.left + aRect.width < bRect.left ||
		aRect.left > bRect.left + bRect.width
	);
}
function isTouchingBorder(i, c) {
    const iRect = i.getBoundingClientRect();
    const cRect = c.getBoundingClientRect();
    return (
        iRect.top  < cRect.top ||
        iRect.left < cRect.left ||
        iRect.right > cRect.right
        || iRect.bottom > cRect.bottom
    
	);
}
let container = document.querySelector(".container");
let avatar = document.querySelector("#player");
let coin = document.querySelector("#coin");
let score = document.querySelector(".score");
let count = 0;

window.addEventListener("keyup", function (e) {
    if (e.key === "ArrowDown" || e.key === "Down") {
        moveVertical(avatar, 50);
    }
    if (e.key === "ArrowUp" || e.key === "Up") {
        moveVertical(avatar, -50);
    }
    if (e.key === "ArrowRight" || e.key === "Right") {
        moveHorizontal(avatar, 50);
        avatar.style.transform = "scale(1,1)";
    }
    if (e.key === "ArrowLeft" || e.key === "Left") {
        moveHorizontal(avatar, -50);
        avatar.style.transform = "scale(-1,1)";
    }
    if (isTouching(avatar, coin)) {
        moveCoin();
        count += 10;
        console.log(count);
        score.innerText= `score:${count}`
    };
    if(isTouchingBorder(avatar, container)){
        this.alert("You lose!");
        location.reload();
    }
});
const moveVertical = (item, amount) => {
    const currentTop = extractPos(item.style.top);
    item.style.top = `${currentTop + amount}px`;
};
const moveHorizontal = (item, amount) => {
    const currentLeft = extractPos(item.style.left);
    item.style.left = `${currentLeft + amount}px`;
};
const extractPos = (pos) => {
    if (!pos) return 100;
    return parseInt(pos.slice(0, -2)); //remove last 2 characters
}

const moveCoin = () => {
    const y = Math.floor(Math.random() * (container.getBoundingClientRect().height-100));
    const x = Math.floor(Math.random() * (container.getBoundingClientRect().width-100));
    coin.style.top = `${y}px`;
    coin.style.left = `${x}px`;
};
moveCoin();