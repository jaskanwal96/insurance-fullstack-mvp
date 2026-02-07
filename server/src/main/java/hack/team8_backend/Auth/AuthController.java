package hack.team8_backend.Auth;

import hack.team8_backend.Auth.dto.LoginRequest;
import hack.team8_backend.Auth.dto.TokenResponse;
import hack.team8_backend.Entity.Agent;
import hack.team8_backend.Entity.Customer;
import hack.team8_backend.Entity.Role;
import hack.team8_backend.Entity.UserType;
import hack.team8_backend.Repository.AgentRepository;
import hack.team8_backend.Repository.CustomerRepository;
import hack.team8_backend.Repository.UserTypeRepository;
import hack.team8_backend.security.JwtUtil;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AgentRepository agentRepo;
    private final CustomerRepository customerRepo;
    private final UserTypeRepository userTypeRepo;
    private final JwtUtil jwtUtil;

    public AuthController(
            AgentRepository agentRepo,
            CustomerRepository customerRepo,
            UserTypeRepository userTypeRepo,
            JwtUtil jwtUtil
    ) {
        this.agentRepo = agentRepo;
        this.customerRepo = customerRepo;
        this.userTypeRepo = userTypeRepo;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest request) {
        UserType userType = userTypeRepo.findByEmail(request.email())
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (userType.getRole() == Role.agent) {
            Agent agent = agentRepo.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

            if (!Objects.equals(agent.getPassword(), request.password())) {
            throw new RuntimeException("Invalid credentials");
            }

            String token = jwtUtil.generateToken(
                agent.getId().toString(),
                Role.agent.name(),
                agent.getId().toString(),
                null
            );

            return new TokenResponse(token, Role.agent.name());
        }

        Customer customer = customerRepo.findByEmail(request.email())
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!Objects.equals(customer.getPassword(), request.password())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(
            customer.getId().toString(),
            Role.user.name(),
            null,
            customer.getId().toString()
        );

        return new TokenResponse(token, Role.user.name());
    }
}
