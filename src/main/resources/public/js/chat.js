
function connect() {
    if(!connected) {
        document.getElementById('connect-btn-spc').disabled = true;
        document.getElementById('connect-btn').disabled = true;
        document.getElementById('disconnect-btn').disabled = false;
        document.getElementById('send-btn').disabled = false;

        doConnect();
    }
};

function disconnect() {
    if(connected) {
        document.getElementById('connect-btn-spc').disabled = false;
        document.getElementById('connect-btn').disabled = false;
        document.getElementById('disconnect-btn').disabled = true;
        document.getElementById('send-btn').disabled = true;
        doDisconnect();
    }
};

function send() {
    sendMessage();
};

var stompClient;
var connected = false;

function doConnect(name) {
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

function doDisconnect() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    connected = false;
    console.log("Disconnected");
}

function sendMessage(name) {
    if (!connected) {
        return;
    }
    var url = '/app/chat';
    var user = 'CommonUser';
    stompClient.send(url, {},
      JSON.stringify({'from':user, 'text':'Greetings'}));
}

function showMessageOutput(messageOutput) {
    if (!messageOutput) {
        return;
    }
    document.getElementById("log-area").append(messageOutput + "\n");
}
