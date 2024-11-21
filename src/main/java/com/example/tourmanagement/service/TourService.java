package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.request.DetailRouteRequest;
import com.example.tourmanagement.dto.request.ImageRequest;
import com.example.tourmanagement.dto.request.LegRequest;
import com.example.tourmanagement.entity.Detailroute;
import com.example.tourmanagement.entity.Image;
import com.example.tourmanagement.entity.Leg;
import com.example.tourmanagement.mapper.DetailRouteMapper;
import com.example.tourmanagement.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TourService {
    DetailRouteRepository detailRouteRepository;
    RouteRepository routeRepository;
    DetailRouteMapper detailRouteMapper;
    BookingRepository bookingRepository;
    ImageRepository imageRepository;
    LegRepository legRepository;
    private List<Image> mapImages(List<ImageRequest> imageRequests, Detailroute detail) {
        return imageRequests.stream().map(imageResponse -> {
            Image image = new Image();
            image.setTextImage(imageResponse.getTextImage());
            image.setIsPrimary(imageResponse.getIsPrimary());
            image.setDetailRoute(detail);
            return image;
        }).collect(Collectors.toList());
    }

    private List<Leg> mapLegs(List<LegRequest> legRequests, Detailroute detail) {
        return legRequests.stream().map(legResponse -> {
            Leg leg = new Leg();
            leg.setTitle(legResponse.getTitle());
            leg.setDescription(legResponse.getDescription());
            leg.setDetailRoute(detail);
            leg.setSequence(legResponse.getSequence());
            return leg;
        }).collect(Collectors.toList());
    }

    public boolean insertTour(DetailRouteRequest detailRouteRequest) {
        var detail = detailRouteMapper.toDetailRoute(detailRouteRequest);
        detail.setDetailRouteName(detailRouteRequest.getDetailRouteName());
        detail.setPrice(detailRouteRequest.getPrice());
        detail.setStock(detailRouteRequest.getStock());
        detail.setTimeToDeparture(detailRouteRequest.getTimeToDeparture());
        detail.setTimeToFinish(detailRouteRequest.getTimeToFinish());
        detail.setDescription(detailRouteRequest.getDescription());
        var route = routeRepository.findById(detailRouteRequest.getRouteId())
                .orElseThrow(() -> new IllegalArgumentException("Route không tồn tại với ID: " + detailRouteRequest.getRouteId()));
        detail.setRoute(route);
        if (detailRouteRequest.getImages() != null) {
            detail.setImages(mapImages(detailRouteRequest.getImages(), detail));
        }
        if (detailRouteRequest.getLegs() != null) {
            detail.setLegs(mapLegs(detailRouteRequest.getLegs(), detail));
        }
        detailRouteRepository.save(detail);
        return true;
    }

    public boolean updateTour(Integer detailRouteId, DetailRouteRequest detailRouteRequest) {
        var detail = detailRouteRepository.findById(detailRouteId)
                .orElseThrow(() -> new IllegalArgumentException("DetailRoute không tồn tại với ID: " + detailRouteId));
        detail.setDetailRouteName(detailRouteRequest.getDetailRouteName());
        detail.setPrice(detailRouteRequest.getPrice());
        detail.setStock(detailRouteRequest.getStock());
        detail.setTimeToDeparture(detailRouteRequest.getTimeToDeparture());
        detail.setTimeToFinish(detailRouteRequest.getTimeToFinish());
        detail.setDescription(detailRouteRequest.getDescription());
        if (detailRouteRequest.getRouteId() != null) {
            var route = routeRepository.findById(detailRouteRequest.getRouteId())
                    .orElseThrow(() -> new IllegalArgumentException("Route không tồn tại với ID: " + detailRouteRequest.getRouteId()));
            detail.setRoute(route);
        }
        if (detailRouteRequest.getImages() != null) {
            detail.setImages(mapImages(detailRouteRequest.getImages(), detail));
        }
        if (detailRouteRequest.getLegs() != null) {
            detail.setLegs(mapLegs(detailRouteRequest.getLegs(), detail));
        }
        detailRouteRepository.save(detail);
        return true;
    }
    public void deleteTour(Integer detailRouteId){
        var detail = detailRouteRepository.findById(detailRouteId)
                .orElseThrow(() -> new IllegalArgumentException("DetailRoute không tồn tại với ID: " + detailRouteId));
//        imageRepository.deleteAll(detail.getImages());
//        legRepository.deleteAll(detail.getLegs());
        detailRouteRepository.delete(detail);
    }
    public boolean checkBooking(Integer detailRouteId) {
        return bookingRepository.existsBookingsByDetailRoute_Id(detailRouteId);
    }
}
