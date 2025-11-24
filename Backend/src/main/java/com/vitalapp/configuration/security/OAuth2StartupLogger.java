package com.vitalapp.configuration.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.stereotype.Component;

@Component
public class OAuth2StartupLogger implements ApplicationRunner {

    private final ClientRegistrationRepository clientRegistrationRepository;

    @Value("${GOOGLE_CLIENT_ID:}")
    private String googleClientIdEnv;

    @Value("${GOOGLE_CLIENT_SECRET:}")
    private String googleClientSecretEnv;

    public OAuth2StartupLogger(ClientRegistrationRepository clientRegistrationRepository) {
        this.clientRegistrationRepository = clientRegistrationRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        System.out.println("[OAuth2] === Inicio de aplicación ===");
        // Enumerar las registraciones conocidas (google, facebook, etc.)
        try {
            ClientRegistration google = getRegistration("google");
            if (google != null) {
                System.out.println("[OAuth2] Google clientId (registration): " + safe(google.getClientId()));
                System.out.println("[OAuth2] Google scopes: " + google.getScopes());
                System.out.println("[OAuth2] Google redirectUriTemplate: " + google.getRedirectUri());
            } else {
                System.out.println("[OAuth2] Registro 'google' NO encontrado");
            }
        } catch (Exception ex) {
            System.out.println("[OAuth2] Error al leer registro google: " + ex.getMessage());
        }

        // Validar variables de entorno reales
        if (googleClientIdEnv == null || googleClientIdEnv.isBlank() || googleClientIdEnv.contains("your-google-client-id")) {
            System.out.println("[OAuth2][WARN] GOOGLE_CLIENT_ID no configurado o usando placeholder. El flujo OAuth fallará.");
        } else {
            System.out.println("[OAuth2] GOOGLE_CLIENT_ID presente.");
        }
        if (googleClientSecretEnv == null || googleClientSecretEnv.isBlank() || googleClientSecretEnv.contains("your-google-client-secret")) {
            System.out.println("[OAuth2][WARN] GOOGLE_CLIENT_SECRET no configurado o usando placeholder. El flujo OAuth fallará.");
        } else {
            System.out.println("[OAuth2] GOOGLE_CLIENT_SECRET presente (no se imprime por seguridad).");
        }
        System.out.println("[OAuth2] =================================");
        System.out.println("[OAuth2] Si obtienes 'invalid_client': verifica que el clientId coincide EXACTAMENTE con el de Google Cloud y que la credencial es de tipo 'Web application'.");
    }

    private ClientRegistration getRegistration(String registrationId) {
        if (clientRegistrationRepository instanceof org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository repo) {
            for (ClientRegistration reg : repo) {
                if (reg.getRegistrationId().equalsIgnoreCase(registrationId)) {
                    return reg;
                }
            }
        }
        return null;
    }

    private String safe(String value) {
        if (value == null) return "<null>";
        if (value.length() <= 6) return value;
        return value.substring(0, 3) + "***" + value.substring(value.length() - 3);
    }
}