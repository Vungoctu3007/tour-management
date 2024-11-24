package com.example.tourmanagement.controller;

import com.example.tourmanagement.config.VNPayConfig;
import com.example.tourmanagement.dto.request.PaymentRequest;
import com.example.tourmanagement.service.BookingService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/api/vnpay")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class VNPayController {
    BookingService bookingService;
//
//    @NonFinal
//    @Value("${vnpay.tmncode}")
//    private String vnpTmnCode;
//
//    @NonFinal
//    @Value("${vnpay.hashsecret}")
//    private String hashSecret;
//
//    @NonFinal
//    @Value("${vnpay.payurl}")
//    private String payUrl;
//
//    @NonFinal
//    @Value("${vnpay.returnurl}")
//    private String returnUrl;

    @PostMapping("/payment")
    public ResponseEntity<?> createPayment(@RequestParam long amount, @RequestParam String bookingId) {
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";

        String vnp_TxnRef = bookingId; // Sử dụng bookingId làm mã giao dịch
        String vnp_TmnCode = VNPayConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount * 100)); // Chuyển đổi thành đơn vị VNPay
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef); // Mã giao dịch là bookingId
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", "127.0.0.1");

        // Thời gian tạo giao dịch
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        // Thời gian hết hạn giao dịch
        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        // Tạo chữ ký HMAC SHA-512
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        for (String fieldName : fieldNames) {
            String fieldValue = vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                try {
                    hashData.append(fieldName).append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString())).append('&');
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString())).append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString())).append('&');
                } catch (UnsupportedEncodingException e) {
                    log.error("Error while encoding URL parameters", e);
                    throw new RuntimeException("Error while encoding URL parameters", e);
                }
            }
        }

        // Bỏ ký tự `&` cuối cùng
        hashData.deleteCharAt(hashData.length() - 1);
        query.deleteCharAt(query.length() - 1);

        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
        query.append("&vnp_SecureHash=").append(vnp_SecureHash);

        String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + query.toString();

        // Tạo response
        PaymentRequest paymentRequest = new PaymentRequest();
        paymentRequest.setStatus("ok");
        paymentRequest.setMessage("success");
        paymentRequest.setURL(paymentUrl);

        return ResponseEntity.ok(paymentRequest);
    }


    @GetMapping("/return")
    public void handleVNPayReturn(@RequestParam Map<String, String> params, HttpServletResponse response) throws IOException, IOException {
        log.info("Received VNPAY return params: {}", params);

        // Lấy giá trị vnp_ResponseCode
        String responseCode = params.get("vnp_ResponseCode");

        // Kiểm tra vnp_ResponseCode
        if ("00".equals(responseCode)) {
            String bookingId = params.get("vnp_TxnRef");
            try {
                // Cập nhật trạng thái booking
                int bookingIdInt = Integer.parseInt(bookingId); // Ép kiểu chuỗi bookingId thành Integer
                bookingService.updateBookingStatus(bookingIdInt, 2);

                // Chuyển hướng đến trang /profile/book với thông báo thành công
                response.sendRedirect("http://localhost:3000/profile/book?status=success");
            } catch (NumberFormatException e) {
                log.error("Invalid booking ID: {}", bookingId, e);
                response.sendRedirect("http://localhost:3000/profile/book?status=error&message=InvalidBookingId");
            } catch (Exception e) {
                log.error("Error updating booking status: {}", bookingId, e);
                response.sendRedirect("http://localhost:3000/profile/book?status=error&message=UpdateFailed");
            }
        } else {
            // Nếu thanh toán không thành công, chuyển hướng với thông báo lỗi
            response.sendRedirect("http://localhost:3000/profile/book?status=failed&message=PaymentFailed");
        }
    }


}
