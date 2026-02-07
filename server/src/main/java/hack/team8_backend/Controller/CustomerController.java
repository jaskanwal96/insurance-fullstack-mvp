package hack.team8_backend.Controller;

import hack.team8_backend.Entity.Customer;
import hack.team8_backend.Service.CustomerService;
import hack.team8_backend.security.UserContext;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerController {

	private final CustomerService customerService;

	public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}

	@GetMapping("/customer")
	public List<Customer> getCustomers(Authentication authentication) {
		UserContext user = (UserContext) authentication.getPrincipal();

		if (!"agent".equals(user.role())) {
			throw new AccessDeniedException("Only agents allowed");
		}

		return customerService.getCustomersForAgent(Long.valueOf(user.agentId()));
	}
}
