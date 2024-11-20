package com.example.tourmanagement.service;

import com.example.tourmanagement.dto.request.DetailRouteRequest;
import com.example.tourmanagement.entity.Image;
import com.example.tourmanagement.entity.Leg;
import com.example.tourmanagement.mapper.DetailRouteMapper;
import com.example.tourmanagement.repository.DetailRouteRepository;
import com.example.tourmanagement.repository.ImageRepository;
import com.example.tourmanagement.repository.LegRepository;
import com.example.tourmanagement.repository.RouteRepository;
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
    ImageRepository imageRepository;
    LegRepository legRepository;
    RouteRepository routeRepository;
    DetailRouteMapper detailRouteMapper;
    public boolean insertTour(DetailRouteRequest detailRouteRequest) {
        var detail=detailRouteMapper.toDetailRoute(detailRouteRequest);
        detail.setDetailRouteName(detailRouteRequest.getDetailRouteName());
//        detail.setRoute(detailRouteRequest.getRouteId());
        detail.setPrice(detailRouteRequest.getPrice());
        detail.setStock(detailRouteRequest.getStock());
        detail.setTimeToDeparture(detailRouteRequest.getTimeToDeparture());
        detail.setTimeToFinish(detailRouteRequest.getTimeToFinish());
        detail.setDescription(detailRouteRequest.getDescription());
        var route = routeRepository.findById(detailRouteRequest.getRouteId())
                .orElseThrow(() -> new IllegalArgumentException("Route không tồn tại với ID: " + detailRouteRequest.getRouteId()));
        detail.setRoute(route);
        if (detailRouteRequest.getImages() != null) {
            List<Image> images = detailRouteRequest.getImages().stream().map(imageResponse -> {
                Image image = new Image();
                image.setTextImage(imageResponse.getTextImage());
                image.setIsPrimary(imageResponse.getIsPrimary());
                image.setDetailRoute(detail);
                return image;
            }).collect(Collectors.toList());
            detail.setImages(images);
        }

        if (detailRouteRequest.getLegs() != null) {
            List<Leg> legs = detailRouteRequest.getLegs().stream().map(legResponse -> {
                Leg leg = new Leg();
                leg.setTitle(legResponse.getTitle());
                leg.setDescription(legResponse.getDescription());
                leg.setDetailRoute(detail);
                leg.setSequence(legResponse.getSequence());
                return leg;
            }).collect(Collectors.toList());
            detail.setLegs(legs);
        }

        detailRouteRepository.save(detail);
        return true;
    }
}
