package hack.team8_backend.Repository;

import hack.team8_backend.Entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PolicyRepository
        extends JpaRepository<Policy, Long> {

    @Query(value = """
            SELECT p.*
            FROM policies p
            JOIN user_policies up ON up.policy_id = p.policy_id
            WHERE up.user_id = :userId
            """, nativeQuery = true)
    List<Policy> findByUserId(@Param("userId") Long userId);
}
