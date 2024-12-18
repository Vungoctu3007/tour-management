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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

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
    public RouteResponseWrapper getAllRoutes(Pageable pageable,String sort) {
        Page<RouteResponse> routes = routeRepository.getDetailRoute(pageable,sort);
        return new RouteResponseWrapper(routes.getTotalPages(),routes.getTotalElements(), routes.getContent());
    }
    //    get route by id
    public RouteResponseDetail getRouteById(Integer id) {
        RouteResponseDetail routeResponseDetail = routeRepository.getDetailRouteById(id);
        List<ImageResponse> images =imageRepository.getImagesByDetailRouteId(id);
        List<LegResponse> legs=legRepository.getAllLegByDetailId(id);
        routeResponseDetail.setTextImageList(images);
        routeResponseDetail.setLegs(legs);
        return  routeResponseDetail;
    }
    // find Routes By Arrival Departure And Date
    public RouteResponseWrapper findRoutesByArrivalDepartureAndDate(String arrivalName, String departureName, LocalDate timeToDeparture,Pageable pageable,String sort) {
        Page<RouteResponse> routeResponse= routeRepository.findRoutesByArrivalDepartureAndDate(arrivalName,departureName,timeToDeparture,pageable,sort);
        RouteResponseWrapper routeResponseWrapper = new RouteResponseWrapper();
        routeResponseWrapper.setRoutes(routeResponse.getContent());
        routeResponseWrapper.setTotalPages(routeResponse.getTotalPages());
        routeResponseWrapper.setTotalElements(routeResponse.getTotalElements());
        return routeResponseWrapper;
    }
    // find routes by arrival name
    public RouteResponseWrapper findRouteByArrivalName(String arrivalName, Pageable pageable,String sort) {
        Page<RouteResponse> routeResponses=routeRepository.findRoutesByArrival(arrivalName,pageable,sort);
        RouteResponseWrapper routeResponseWrapper = new RouteResponseWrapper();
        routeResponseWrapper.setRoutes(routeResponses.getContent());
        routeResponseWrapper.setTotalPages(routeResponses.getTotalPages());
        routeResponseWrapper.setTotalElements(routeResponses.getTotalElements());
        return routeResponseWrapper;
    }


    public List<DepartureAndArrivalResponse> getAllDepartureAndArrivals(){
        return routeRepository.getAllDepartureAndArrivals();
    }
}