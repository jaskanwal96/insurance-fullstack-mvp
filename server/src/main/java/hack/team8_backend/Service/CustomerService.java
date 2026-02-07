package hack.team8_backend.Service;

import hack.team8_backend.Entity.Customer;
import hack.team8_backend.Repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepo;

    public CustomerService(CustomerRepository customerRepo) {
        this.customerRepo = customerRepo;
    }

    public List<Customer> getCustomersForAgent(Long agentId) {
        return customerRepo.findByAgentId(agentId);
    }
}
