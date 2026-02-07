package hack.team8_backend.Auth.dto;

public record TokenResponse(
        String token,
        String role
) {}
