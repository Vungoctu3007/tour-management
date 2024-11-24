import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentResult = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    // Lấy query parameters từ URL
    const queryParams = new URLSearchParams(location.search);

    // Gửi query parameters tới backend để xác thực và lấy kết quả thanh toán
    axios
      .get("http://localhost:8080/api/vnpay/return", { params: Object.fromEntries(queryParams) })
      .then((response) => {
        setPaymentStatus(response.data); // Lưu kết quả trả về
      })
      .catch((error) => {
        console.error("Error during VNPay return:", error);
        setPaymentStatus("Thanh toán thất bại hoặc chữ ký không hợp lệ!");
      });
  }, [location.search]);

  return (
    <div>
      <h1>Kết quả Thanh toán</h1>
      {paymentStatus ? (
        <p>{paymentStatus}</p>
      ) : (
        <p>Đang xử lý kết quả thanh toán...</p>
      )}
    </div>
  );
};

export default PaymentResult;
