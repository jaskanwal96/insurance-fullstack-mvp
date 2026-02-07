package hack.team8_backend.Service;

import hack.team8_backend.Entity.Policy;
import hack.team8_backend.Repository.PolicyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyService {

    private final PolicyRepository policyRepo;

    public PolicyService(PolicyRepository policyRepo) {
        this.policyRepo = policyRepo;
    }

    public List<Policy> getPoliciesForUser(Long userId) {
        return policyRepo.findByUserId(userId);
    }
}
