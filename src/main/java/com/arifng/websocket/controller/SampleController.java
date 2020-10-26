package com.arifng.websocket.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Rana on 2020-10-26.
 */
@RestController
public class SampleController {

    @GetMapping("/sample")
    public String sample() {
        return "Application server run smoothly!";
    }
}
