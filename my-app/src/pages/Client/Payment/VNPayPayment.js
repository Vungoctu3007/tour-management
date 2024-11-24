import React, { useState } from "react";
import axios from "axios";

const VNPayPayment = () => {
  const [amount, setAmount] = useState(0); // Số tiền thanh toán
  const [paymentUrl, setPaymentUrl] = useState(""); // URL chuyển hướng tới cổng VNPay
  const [paymentStatus, setPaymentStatus] = useState(null); // Trạng thái thanh toán

  // Hàm gọi API để tạo URL thanh toán
  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/vnpay/payment", null, {
        params: {
          amount, // Số tiền
        },
      });
      setPaymentUrl(response.data.data); // Lưu URL trả về
    } catch (error) {
      console.error("Error during payment creation:", error);
    }
  };

  return (
    <div>
      <h1>Thanh toán qua VNPay</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Nhập số tiền thanh toán"
      />
      <button onClick={handlePayment}>Thanh toán</button>
      {paymentUrl && (
        <div>
          <p>Click vào link bên dưới để thanh toán:</p>
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
            Đi tới VNPay
          </a>
        </div>
      )}
      {paymentStatus && (
        <div>
          <h2>Kết quả giao dịch:</h2>
          <p>{paymentStatus}</p>
        </div>
      )}
    </div>
  );
};

export default VNPayPayment;
