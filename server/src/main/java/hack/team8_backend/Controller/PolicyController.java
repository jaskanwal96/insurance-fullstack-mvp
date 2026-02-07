package hack.team8_backend.Controller;

import hack.team8_backend.Entity.Policy;
import hack.team8_backend.Service.PolicyService;
import hack.team8_backend.security.UserContext;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin; // Added import
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
// Added CrossOrigin for localhost:3000
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @GetMapping("/getPolicies")
    public List<Policy> getPolicies(
            @RequestParam(value = "customerId", required = false) Long customerId,
            Authentication authentication
    ) {
        // Safety check to ensure authentication isn't null
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new AccessDeniedException("User is not authenticated");
        }

        UserContext user = (UserContext) authentication.getPrincipal();

        if ("user".equals(user.role())) {
            return policyService.getPoliciesForUser(Long.valueOf(user.customerId()));
        }

        if ("agent".equals(user.role())) {
            if (customerId == null) {
                throw new AccessDeniedException("customerId is required for agents");
            }
            return policyService.getPoliciesForUser(customerId);
        }

        throw new AccessDeniedException("Unauthorized role");
    }
}