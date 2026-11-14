package com.roadwise.repository;

import com.roadwise.entity.*;
import java.util.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
    @Override @EntityGraph(attributePaths = "options") List<QuizQuestion> findAll();
    @EntityGraph(attributePaths = "options") List<QuizQuestion> findByCategory(QuizCategory category);
    @EntityGraph(attributePaths = "options") List<QuizQuestion> findByDifficulty(Difficulty difficulty);
    @EntityGraph(attributePaths = "options") List<QuizQuestion> findByCategoryAndDifficulty(QuizCategory category, Difficulty difficulty);
    @EntityGraph(attributePaths = "options") Optional<QuizQuestion> findWithOptionsById(Long id);
    @EntityGraph(attributePaths = "options") @Query("select q from QuizQuestion q where q.id in :ids")
    List<QuizQuestion> findAllWithOptionsByIdIn(@Param("ids") Collection<Long> ids);
}
