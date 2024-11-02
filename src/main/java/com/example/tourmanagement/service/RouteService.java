package com.example.tourmanagement.service;
import com.example.tourmanagement.dto.response.*;
import com.example.tourmanagement.mapper.RouteMapper;
import com.example.tourmanagement.repository.ImageRepository;
import com.example.tourmanagement.repository.LegRepository;
import com.example.tourmanagement.repository.RouteRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RouteService {
    RouteRepository routeRepository;
    ImageRepository imageRepository;
    LegRepository legRepository;
    //    get all route
    public RouteResponseWrapper getAllRoutes(Pageable pageable) {
        long totalItem = routeRepository.getCountRoute();
        long totalPages =(long) Math.ceil((double) totalItem / pageable.getPageSize());
        List<RouteResponse> routes = routeRepository.getDetailRoute(pageable);
        log.info("Total item count: " + totalItem);
        return new RouteResponseWrapper(totalPages, routes);
    }
    //    get route by id
    public RouteResponseDetail getRouteById(Integer id) {;
        RouteResponseDetail routeResponseDetail = routeRepository.getDetailRouteById(id);
        List<ImageResponse> images =imageRepository.getImagesByDetailRouteId(id);
        List<LegResponse> legs=legRepository.getAllLegByDetailId(id);
        routeResponseDetail.setTextImageList(images);
        routeResponseDetail.setLegs(legs);
        return  routeResponseDetail;
    }
    // get route by arrival name
    public RouteResponseWrapper getRouteByArrivalName(String arrivalName, String departureName, LocalDate timeToDeparture) {
        List<RouteResponse> routeResponse = routeRepository.getRoutesByArrivalName(arrivalName,departureName,timeToDeparture);
        RouteResponseWrapper routeResponseWrapper = new RouteResponseWrapper();
        routeResponseWrapper.setRoutes(routeResponse);
        return routeResponseWrapper;
    }
}
