package Vijay.org.Employees;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {
    List<EmployeeEntity> findByNameContainingIgnoreCase(String name);

    EmployeeEntity findById(long id);

    EmployeeEntity findByNameIgnoreCase(String name);


}
