const socket = new WebSocket("ws://localhost:3000/webSocket", "protocoleOne");

let connect = false;

let data = {
    speed1 : 0,
    speed2 : 0,
    direction1 : 0,
    direction2 : 0,
    token: ""
}

window.addEventListener('load', function () {
    const speedInput = document.getElementById("speedInput");
    speedInput.addEventListener("input", () => {
        data.speed1 = speedInput.value;
        data.speed2 = speedInput.value;
    })
})

socket.onopen = () => {
    socket.send(JSON.stringify({token: data.token}));
}

socket.onmessage = (msg) => {
    const receivedData = JSON.parse(msg.data);

    if (receivedData.err) {
        console.log(receivedData)
    }
    else if (receivedData.token !== "") {
        data.token = receivedData.token;
        console.log(receivedData.token)
        connect = true;
    }
}

setInterval(() => {
    if (connect) {
        socket.send(JSON.stringify(data));
    }
}, 1000);

function changeDirection(d) {
    switch (d) {
        default:
            data.direction1 = 0;
            data.direction2 = 0;
            data.speed1 = 0;
            data.speed2 = 0;
            break

        case 0:
            data.direction1 = 2;
            data.direction2 = 2;
            data.speed1 = 50;
            data.speed2 = 50;
            break

        case 1:
            data.direction1 = 2;
            data.direction2 = 0;
            data.speed1 = 50;
            data.speed2 = 0;
            break

        case 2:
            data.direction1 = 1;
            data.direction2 = 1;
            data.speed1 = 50;
            data.speed2 = 50;
            break

        case 3:
            data.direction1 = 0;
            data.direction2 = 2;
            data.speed1 = 50;
            data.speed2 = 50;
            break
    }
}
