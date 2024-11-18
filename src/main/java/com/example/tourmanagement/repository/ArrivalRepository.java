package com.example.tourmanagement.repository;

import com.example.tourmanagement.dto.response.ArrivalResponse;
import com.example.tourmanagement.entity.Arrival;
import com.example.tourmanagement.entity.Departure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArrivalRepository extends JpaRepository<Arrival,Integer> {
    @Query("select new com.example.tourmanagement.dto.response.ArrivalResponse(" +
            "arrival.id,arrival.arrivalName, count (route.id)) " +
            "from Arrival arrival " +
            "join Route route on arrival.id = route.arrival.id " +
            "join Detailroute detail on route.id = detail.route.id " +
            "group by arrival.id")
    public List<ArrivalResponse> getAllArrivals();
}
