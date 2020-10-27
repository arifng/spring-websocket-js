
document.getElementById("disconnect-btn-spc").onclick = function () {
    if(connectedUser) {
        disconnect();
    }
};

document.getElementById("connect-btn-spc").onclick = function () {
    var name = document.getElementById("name-spc").value;
    if(name === undefined) {
        alert("put name");
        return;
    }
    if(!connectedUser) {
        connect(name);
    }
};

document.getElementById("send-btn-spc").onclick = function () {
    var name = document.getElementById("name-spc").value;
    sendMessage(name);
};

var stompClient;
var connectedUser = false;

function connect(name) {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);

    url = '/user/' + name + '/reply';

    stompClient.connect({}, function(frame) {
        connectedUser = true;

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
    connectedUser = false;
    console.log("Disconnected");
}

function sendMessage(name) {
    var url = '/app/chat/spc';
    stompClient.send(url, {},
      JSON.stringify({'from':name, 'text':'Greetings'}));
}

function showMessageOutput(messageOutput) {
    document.getElementById("log-area-spc").append(messageOutput + "\n");

}
