package com.example.tourmanagement.service;
import com.example.tourmanagement.dto.response.RouteResponse;
import com.example.tourmanagement.dto.response.RouteResponseWrapper;
import com.example.tourmanagement.mapper.RouteMapper;
import com.example.tourmanagement.repository.RouteRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RouteService {
    RouteRepository routeRepository;
    public RouteResponseWrapper getAllRoutes(Pageable pageable) {
        long totalItem = routeRepository.getCountRoute();
        long totalPages =(long) Math.ceil((double) totalItem / pageable.getPageSize());
        List<RouteResponse> routes = routeRepository.getDetailRoute(pageable);
        log.info("Total item count: " + totalItem);
        return new RouteResponseWrapper(totalPages, routes);
    }

}
