package hack.team8_backend.Auth.dto;

public record LoginRequest(
        String email,
        String password
) {}
