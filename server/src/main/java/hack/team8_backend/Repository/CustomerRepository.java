package hack.team8_backend.Repository;

import hack.team8_backend.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository
        extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String email);

    @Query(value = """
            SELECT u.*
            FROM users u
            JOIN agent_user_mapping aum ON aum.user_id = u.user_id
            WHERE aum.agent_id = :agentId
            """, nativeQuery = true)
    List<Customer> findByAgentId(@Param("agentId") Long agentId);
}
