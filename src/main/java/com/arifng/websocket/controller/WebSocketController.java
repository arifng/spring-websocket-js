package com.arifng.websocket.controller;

import com.arifng.websocket.dto.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.converter.SimpleMessageConverter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
    @SendTo("/topic/message")
    public String sendMessage(Message message) {
        return "From backend: - " + message.getFrom() + ", " + message.getText();
    }

    @MessageMapping("/chat/spc")
    public void sendMessageToSpecificUser(@Payload Message message) {
        //System.out.println(message.getFrom());
        simpMessagingTemplate.convertAndSendToUser(message.getFrom(),
                "/reply", "Test message reply to " + message.getFrom());
    }
}
