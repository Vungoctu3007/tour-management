package com.example.tourmanagement.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    TOUR_NOT_EXITED(1001, "Tour not existed", HttpStatus.NOT_FOUND),
    //HttpStatus.FORBIDDEN là lỗi 403 không có quyền truy cập
    UNAUTHENTICATED(1002, "You do no have permission", HttpStatus.FORBIDDEN),
    USER_NOT_EXISTED(1003, "User not exited", HttpStatus.NOT_FOUND),
    USER_EXITS(1004,"User exited", HttpStatus.BAD_REQUEST),
    PASSWORD_TOO_SHORT(1005, "Password must be at least 6 characters long", HttpStatus.BAD_REQUEST),
    CUSTOMER_NOT_EXIST(1005, "Customer not exits", HttpStatus.BAD_REQUEST),

    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
