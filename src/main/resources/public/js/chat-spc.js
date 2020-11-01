
function disconnectSpc() {
    if(connectedUser) {
        document.getElementById('connect-btn-spc').disabled = false;
        document.getElementById('connect-btn').disabled = false;
        document.getElementById('disconnect-btn-spc').disabled = true;
        document.getElementById('send-btn-spc').disabled = true;

        disconnectUser();
    }
};

function connectSpc() {
    var name = document.getElementById("name-spc").value;
    if(name === undefined || name === "") {
        alert("put name");
        return;
    }

    document.getElementById('connect-btn-spc').disabled = true;
    document.getElementById('connect-btn').disabled = true;
    document.getElementById('disconnect-btn-spc').disabled = false;
    document.getElementById('send-btn-spc').disabled = false;

    if(!connectedUser) {
        connectUser(name);
    }
};

function sendSpc() {
    if(!connectedUser) {
        return;
    }
    var name = document.getElementById("name-spc").value;
    sendMessageSpc(name);
};

var stompClient;
var connectedUser = false;

function connectUser(name) {
    var socket = new SockJS('/chat');
    stompClient = Stomp.over(socket);

    url = '/user/' + name + '/reply';

    stompClient.connect({}, function(frame) {
        connectedUser = true;

        console.log('Connected: ' + frame);
        stompClient.subscribe(url, function(messageOutput) {
            showMessageOutputSpc(messageOutput.body);
        });
    });
}

function disconnectUser() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    connectedUser = false;
    console.log("Disconnected");
}

function sendMessageSpc(name) {
    if (!connectedUser) {
        return;
    }
    var url = '/app/chat/spc';
    stompClient.send(url, {},
      JSON.stringify({'from':name, 'text':'Greetings'}));
}

function showMessageOutputSpc(messageOutput) {
    if (!messageOutput) {
        return;
    }
    document.getElementById("log-area-spc").append(messageOutput + "\n");

}
