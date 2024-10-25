package com.example.tourmanagement.config;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

//@Slf4j
//@Component
//public class AuthenticationRequestInterceptor implements RequestInterceptor {
////    @Override
////    public void apply(RequestTemplate template) {
////        ServletRequestAttributes servletRequestAttributes =
////                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
////
////        var authHeader = servletRequestAttributes.getRequest().getHeader("Authorization");
////
////        log.info("Header: {}", authHeader);
////        if (StringUtils.hasText(authHeader))
////            template.header("Authorization", authHeader);
////    }
//}