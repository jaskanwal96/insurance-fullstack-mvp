package hack.team8_backend.security;

public record UserContext(
        String userId,
        String role,
        String agentId,
        String customerId
) {}
