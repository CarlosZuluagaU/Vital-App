package com.vitalapp.presentation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/oauth2")
public class OAuth2DebugController {

    private final ClientRegistrationRepository clientRegistrationRepository;

    @Value("${GOOGLE_CLIENT_ID:}")
    private String googleClientIdEnv;

    @Value("${GOOGLE_CLIENT_SECRET:}")
    private String googleClientSecretEnv;

    @Value("${app.oauth2.authorizedRedirectUris:}")
    private List<String> authorizedRedirectUris;

    public OAuth2DebugController(ClientRegistrationRepository clientRegistrationRepository) {
        this.clientRegistrationRepository = clientRegistrationRepository;
    }

    @GetMapping("/debug")
    public ResponseEntity<Map<String, Object>> debug() {
        Map<String, Object> data = new HashMap<>();
        ClientRegistration google = getRegistration("google");
        if (google != null) {
            data.put("registrationId", google.getRegistrationId());
            data.put("clientIdRegistration", google.getClientId());
            data.put("redirectUriTemplate", google.getRedirectUri());
            data.put("scopes", google.getScopes());
        } else {
            data.put("registrationId", "google-not-found");
        }
        data.put("envClientId", mask(googleClientIdEnv));
        data.put("envClientSecretPresent", googleClientSecretEnv != null && !googleClientSecretEnv.isBlank() && !googleClientSecretEnv.contains("your-google-client-secret"));
        data.put("authorizedRedirectUris", authorizedRedirectUris);
        data.put("clientIdLooksPlaceholder", googleClientIdEnv == null || googleClientIdEnv.isBlank() || googleClientIdEnv.contains("your-google-client-id"));
        return ResponseEntity.ok(data);
    }

    private ClientRegistration getRegistration(String id) {
        if (clientRegistrationRepository instanceof org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository repo) {
            for (ClientRegistration reg : repo) {
                if (reg.getRegistrationId().equalsIgnoreCase(id)) return reg;
            }
        }
        return null;
    }

    private String mask(String value) {
        if (value == null || value.isBlank()) return value;
        if (value.length() < 10) return value;
        return value.substring(0, 6) + "***" + value.substring(value.length() - 6);
    }
}