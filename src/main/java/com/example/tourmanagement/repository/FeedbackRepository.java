package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.response.FeedbackResponse;
import com.example.tourmanagement.entity.Feedback;
import com.example.tourmanagement.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    @Query("SELECT u FROM Feedback u WHERE (:detailRouteId IS NULL OR u.detailRoute.id = :detailRouteId)")
    Page<Feedback> getListFeedback(@Param("detailRouteId") Integer detailRouteId, Pageable pageable);


    @Query("""
        SELECT f 
        FROM Feedback f
        JOIN f.detailRoute u 
        JOIN f.booking.customer c
    """)
    Page<Feedback> getListFeedbackAdmin(Pageable pageable);

    @Query("SELECT f FROM Feedback f WHERE (:detailRouteName IS NULL OR f.detailRoute.detailRouteName LIKE %:detailRouteName%)")
    Page<Feedback> searchFeedbackByDetailRouteName(@Param("detailRouteName") String detailRouteName, Pageable pageable);

    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END " +
            "FROM Booking b " +
            "JOIN b.customer c " +
            "JOIN c.user u " +
            "WHERE u.id = :userId AND b.detailRoute.id = :detailRouteId")
    boolean existsByUserIdAndDetailRouteId(@Param("userId") int userId,
                                           @Param("detailRouteId") int detailRouteId);


    


}
