package com.vitalapp.presentation.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth2")
public class OAuth2Controller {

    @GetMapping("/authorization/google")
    public void googleAuth() {
        // Este endpoint es interceptado por Spring Security OAuth2
        // y redirige automáticamente a Google para autenticación
    }

    @GetMapping("/authorization/facebook") 
    public void facebookAuth() {
        // Este endpoint es interceptado por Spring Security OAuth2
        // y redirige automáticamente a Facebook para autenticación
    }
}