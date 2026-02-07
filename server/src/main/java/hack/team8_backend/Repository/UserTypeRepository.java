package hack.team8_backend.Repository;

import hack.team8_backend.Entity.UserType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserTypeRepository extends JpaRepository<UserType, Long> {
    Optional<UserType> findByEmail(String email);
}
