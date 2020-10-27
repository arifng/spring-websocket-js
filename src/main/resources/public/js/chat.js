
document.getElementById("connect-btn").onclick = function () {
    if(!connected) {
        connect();
    }
};

document.getElementById("disconnect-btn").onclick = function () {
    if(connected) {
        disconnect();
    }
};

document.getElementById("send-btn").onclick = function () {
    sendMessage();
};

var stompClient;
var connected = false;

function connect(name) {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);

    var url = "/topic/message";
    stompClient.connect({}, function(frame) {
        connected = true;
        console.log('Connected: ' + frame);
        stompClient.subscribe(url, function(messageOutput) {
            showMessageOutput(messageOutput.body);
        });
    });
}

function disconnect() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    connected = false;
    console.log("Disconnected");
}

function sendMessage(name) {
    var url = '/app/chat';
    var user = 'CommonUser';
    stompClient.send(url, {},
      JSON.stringify({'from':user, 'text':'Greetings'}));
}

function showMessageOutput(messageOutput) {
    document.getElementById("log-area").append(messageOutput + "\n");
}
