const socket = io("ws://localhost:9000");

let table = document.getElementById("table");

let ctx = table.getContext("2d");

socket.on('message', async arrayOfDots => {
  //parse data
  console.log(arrayOfDots);
  await arrayOfDots.forEach(function (element, index, arrayOfDots) {
    //draw blue dot
    ctx.clearRect(0, 0, table.widthwidth, table.height)
    ctx.fillStyle = "rgb(0, 0, 255)";
    let x = element.split(", ")[0];
    let y = element.split(", ")[1];
    ctx.fillRect(y * 10, x * 10, 10, 10);
  });
});

let WSButton = document.getElementById("WSButton");

WSButton.addEventListener("click", (e) => {
  e.preventDefault;
  console.log("button is pressed")
  socket.emit("message", "aboba")
});
