package com.systembank.app.rest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desativa CSRF
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/**").permitAll() // Permite acesso sem autenticação a todas as rotas
                .anyRequest().authenticated() // Exige autenticação para qualquer outra requisição
            );

        return http.build();
    }
}
