-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 29, 2024 lúc 03:29 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `tour_management`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `arrivals`
--

CREATE TABLE `arrivals` (
  `arrival_id` int(11) NOT NULL,
  `arrival_name` varchar(255) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `arrivals`
--

INSERT INTO `arrivals` (`arrival_id`, `arrival_name`, `status_id`) VALUES
(1, 'Bangkok - Pattaya - Công Viên Khủng Long', 1),
(2, 'Lệ Giang - Đại Lý - Shangrila', 1),
(3, 'Nghi Xương - Trương Gia Giới - Thiên Môn Sơn - Phượng Hoàng Cổ Trấn', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `time_to_order` datetime DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `payment_status_id` int(11) DEFAULT NULL,
  `status_booking` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bookings`
--

INSERT INTO `bookings` (`booking_id`, `customer_id`, `total_price`, `time_to_order`, `payment_id`, `payment_status_id`, `status_booking`) VALUES
(1, 1, 200000.00, '2024-10-28 17:21:48', 1, 1, 1),
(2, 1, 100000.00, '2024-10-29 17:23:29', 1, 1, 1),
(3, 2, 150000.00, '2024-10-28 17:24:40', 2, 1, 1),
(4, 2, 200000.00, '2024-10-28 17:21:48', 3, 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`customer_id`, `customer_name`, `customer_email`, `customer_address`) VALUES
(1, 'Tuan', 'b@gmail.com', 'TPHCM'),
(2, 'Tu nomsy', 'a@gmail.com', 'Bình Dương\r\n');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `departures`
--

CREATE TABLE `departures` (
  `departure_id` int(11) NOT NULL,
  `departure_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `departures`
--

INSERT INTO `departures` (`departure_id`, `departure_name`) VALUES
(1, 'Hồ Chí Minh'),
(2, 'Hà Nội'),
(3, 'Đà Lạt'),
(4, 'Đà Nẵng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detailroutes`
--

CREATE TABLE `detailroutes` (
  `detail_route_id` int(11) NOT NULL,
  `route_id` int(11) DEFAULT NULL,
  `detail_route_name` varchar(255) DEFAULT NULL,
  `description` tinytext DEFAULT NULL,
  `time_to_departure` date DEFAULT NULL,
  `time_to_finish` date DEFAULT NULL,
  `stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `detailroutes`
--

INSERT INTO `detailroutes` (`detail_route_id`, `route_id`, `detail_route_name`, `description`, `time_to_departure`, `time_to_finish`, `stock`) VALUES
(1, 1, 'Tour Trung Quốc 6N5Đ: Nghi Xương - Trương Gia Giới - Thiên Môn Sơn - Phượng Hoàng Cổ Trấn', '- Chinh phục Thiên Môn Sơn với hệ thống cáp treo dài nhất thế giới.\r\n\r\n- Khám phá vẻ đẹp huyền bí của Trương Gia Giới, nơi được ví như tiên cảnh.\r\n\r\n- Đi dạo trên Cầu Kính Đại Hiệp Cốc ở Trươn', '2024-10-28', '2024-10-31', 20),
(2, 2, 'Tour Trung Quốc 6N5Đ: Lệ Giang - Đại Lý - Shangrila (No Shopping)', '- Khám phá Lệ Giang Cổ Trấn di sản thế giới được UNESCO công nhận, nổi tiếng với kiến trúc cổ kính và hệ thống kênh rạch độc đáo.\r\n\r\n- Tham quan Đại Lý vùng đất với Tam Tháp Đại Lý nổi tiếng', '2024-10-29', '2024-11-01', 30),
(3, 3, 'Tour Thái Lan 5N4Đ: Bangkok - Pattaya - Công Viên Khủng Long (Bay Sáng, Trưa)', '- Chiêm ngưỡng tượng Phật Vàng tại chùa Wat Traimit, biểu tượng tâm linh nổi tiếng.\r\n\r\n- Khám phá Pattaya sôi động, thành phố biển không bao giờ ngủ.\r\n\r\n- Hòa mình vào thế giới tiền sử đầy ấn tượng', '2024-10-30', '2024-11-05', 25);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employees`
--

CREATE TABLE `employees` (
  `employee_id` varchar(255) NOT NULL,
  `employee_email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `employees`
--

INSERT INTO `employees` (`employee_id`, `employee_email`) VALUES
('NV_01', 'a@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `detail_route_id` int(11) DEFAULT NULL,
  `text` varchar(255) NOT NULL,
  `rating` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `booking_id`, `detail_route_id`, `text`, `rating`) VALUES
(1, 1, 1, 'Rất thân thiện. Chỉ có ăn sáng món ăn lập lại nên hơi không ngon miệng.', 4.5),
(2, 2, 2, 'Nhân viên tư vấn và hướng dẫn viên nhiệt tình. Tuy nhiên, có một số điểm có thể khắc phục được để tour tốt hơn. Khách sạn ở Đại Lý không sạch. Lúc đến nhận phòng dù là chiều tối nhưng khách sạn chưa dọn xong phòng. Bồn cầu có mùi khó chịu. Phòng vệ sinh ở', 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `images`
--

CREATE TABLE `images` (
  `image_id` int(11) NOT NULL,
  `text_image` tinytext DEFAULT NULL,
  `detail_route_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `legs`
--

CREATE TABLE `legs` (
  `leg_id` int(11) NOT NULL,
  `detail_route_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` tinytext DEFAULT NULL,
  `sequence` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `legs`
--

INSERT INTO `legs` (`leg_id`, `detail_route_id`, `title`, `description`, `sequence`) VALUES
(1, 1, 'TP.HCM - Lệ Giang ( Ăn tối )', '11h00: Quý khách có mặt tại sân bay Tân Sơn Nhất ga đi quốc tế. Trưởng Đoàn hướng dẫn làm thủ tục chuyến DR5052 lúc 14:05 - 18:35 đi Lệ Giang.\r\n\r\nĐoàn đến sân bay Lệ Giang, HDV đón đoàn ăn tối và về ', 1),
(2, 1, 'Lệ Giang - Đại lý (Ăn Sáng, trưa , tối)', 'Đoàn dùng bữa sáng tại khách sạn, khởi hành tham quan:\r\n\r\nThi Trấn ShuangLang - Làng chài có lịch sử hơn 1000 năm nằm ở phía Bắc thành phố Đại Lý, thị trấn ven hồ Nhĩ Hải rất được du khách yêu thích', 2),
(3, 1, 'Đại Lý - SHANGRILA ( Ăn sáng, trưa , tối )', 'Đoàn dùng bữa sáng tại khách sạn, khởi hành tham quan:\r\n\r\nThành cổ Đại Lý - Huyền thoại giữa núi Thương Sơn và hồ Nhĩ Hải, nơi Tam tháp và di sản Phật giáo, cũng là quê hương thái tử Đoàn Dự từ \'T', 3),
(4, 1, 'SHANGRILA - Lệ Giang ( Ăn sáng , trưa , tối )', 'Đoàn dùng bữa sáng tại khách sạn, tham quan:\r\n\r\nTu viện Songzanlin - Tu viện Phật giáo Tây Tạng lớn nhất ở tỉnh Vân Nam, cũng là một trong những tu viện nổi tiếng ở huyện Kham và Giáo phái Vàng ở Tứ Xu', 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `objects`
--

CREATE TABLE `objects` (
  `object_id` int(11) NOT NULL,
  `object_name` varchar(255) DEFAULT NULL,
  `description` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `objects`
--

INSERT INTO `objects` (`object_id`, `object_name`, `description`) VALUES
(1, 'Người lớn', 'Độ tuổi > 20'),
(2, 'Trẻ em', 'Độ tuổi từ 5-12'),
(3, 'Em bé', 'Từ 0->5');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `operations`
--

CREATE TABLE `operations` (
  `operation_id` int(11) NOT NULL,
  `operation_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `operations`
--

INSERT INTO `operations` (`operation_id`, `operation_name`) VALUES
(1, 'Add'),
(2, 'Edit'),
(3, 'Delete');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `passengers`
--

CREATE TABLE `passengers` (
  `passenger_id` int(11) NOT NULL,
  `object_id` int(11) DEFAULT NULL,
  `passenger_name` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `date_birth` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `passengers`
--

INSERT INTO `passengers` (`passenger_id`, `object_id`, `passenger_name`, `gender`, `date_birth`) VALUES
(1, 1, 'Tuan', 'Nam', '2024-10-28'),
(2, 1, 'Tu', 'Nam', '2024-10-22'),
(3, 2, 'Truong', 'Nam', '2024-10-15');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `payment_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `payments`
--

INSERT INTO `payments` (`payment_id`, `payment_name`) VALUES
(1, 'Thanh toán qua ngân hàng'),
(2, 'Thanh toán tiền mặt'),
(3, 'Thanh toán qua MoMo');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `paymentstatus`
--

CREATE TABLE `paymentstatus` (
  `payment_status_id` int(11) NOT NULL,
  `status_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `paymentstatus`
--

INSERT INTO `paymentstatus` (`payment_status_id`, `status_name`) VALUES
(1, 'Chờ thanh toán\r\n');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` int(11) NOT NULL,
  `permission_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `permissions`
--

INSERT INTO `permissions` (`permission_id`, `permission_name`) VALUES
(1, 'Account Management'),
(2, 'Statistical Management');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roleoperations`
--

CREATE TABLE `roleoperations` (
  `role_operation_id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `operation_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roleoperations`
--

INSERT INTO `roleoperations` (`role_operation_id`, `role_id`, `permission_id`, `operation_id`, `status_id`) VALUES
(1, 1, 1, 1, 1),
(2, 1, 2, 2, 1),
(3, 1, 1, 3, 1),
(4, 1, 2, 3, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'ADMIN'),
(2, 'STAFF');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `routes`
--

CREATE TABLE `routes` (
  `route_id` int(11) NOT NULL,
  `arrival_id` int(11) DEFAULT NULL,
  `departure_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `routes`
--

INSERT INTO `routes` (`route_id`, `arrival_id`, `departure_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 3, 1),
(5, 3, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `statusroleoperation`
--

CREATE TABLE `statusroleoperation` (
  `status_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `statusroleoperation`
--

INSERT INTO `statusroleoperation` (`status_id`, `description`) VALUES
(1, 'Open'),
(2, 'Block');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tickets`
--

CREATE TABLE `tickets` (
  `booking_id` int(11) NOT NULL,
  `detail_route_id` int(11) NOT NULL,
  `passenger_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tickets`
--

INSERT INTO `tickets` (`booking_id`, `detail_route_id`, `passenger_id`) VALUES
(1, 1, 1),
(1, 1, 2),
(1, 2, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `identity_id` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `identity_id`, `role_id`) VALUES
(2, 'htdyulh', 'rtf', 'h', 1),
(3, 'account2', '131', 'b', 2);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `arrivals`
--
ALTER TABLE `arrivals`
  ADD PRIMARY KEY (`arrival_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Chỉ mục cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `payment_id` (`payment_id`),
  ADD KEY `fk_payment_status` (`payment_status_id`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Chỉ mục cho bảng `departures`
--
ALTER TABLE `departures`
  ADD PRIMARY KEY (`departure_id`);

--
-- Chỉ mục cho bảng `detailroutes`
--
ALTER TABLE `detailroutes`
  ADD PRIMARY KEY (`detail_route_id`),
  ADD KEY `route_id` (`route_id`);

--
-- Chỉ mục cho bảng `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Chỉ mục cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `detail_route_id` (`detail_route_id`);

--
-- Chỉ mục cho bảng `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `fk_detailroute_images` (`detail_route_id`);

--
-- Chỉ mục cho bảng `legs`
--
ALTER TABLE `legs`
  ADD PRIMARY KEY (`leg_id`),
  ADD KEY `detail_route_id` (`detail_route_id`);

--
-- Chỉ mục cho bảng `objects`
--
ALTER TABLE `objects`
  ADD PRIMARY KEY (`object_id`);

--
-- Chỉ mục cho bảng `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`operation_id`);

--
-- Chỉ mục cho bảng `passengers`
--
ALTER TABLE `passengers`
  ADD PRIMARY KEY (`passenger_id`),
  ADD KEY `object_id` (`object_id`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Chỉ mục cho bảng `paymentstatus`
--
ALTER TABLE `paymentstatus`
  ADD PRIMARY KEY (`payment_status_id`);

--
-- Chỉ mục cho bảng `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`);

--
-- Chỉ mục cho bảng `roleoperations`
--
ALTER TABLE `roleoperations`
  ADD PRIMARY KEY (`role_operation_id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `permission_id` (`permission_id`),
  ADD KEY `operation_id` (`operation_id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Chỉ mục cho bảng `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`route_id`),
  ADD KEY `arrival_id` (`arrival_id`),
  ADD KEY `departure_id` (`departure_id`);

--
-- Chỉ mục cho bảng `statusroleoperation`
--
ALTER TABLE `statusroleoperation`
  ADD PRIMARY KEY (`status_id`);

--
-- Chỉ mục cho bảng `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`booking_id`,`detail_route_id`,`passenger_id`),
  ADD KEY `detail_route_id` (`detail_route_id`),
  ADD KEY `passenger_id` (`passenger_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `arrivals`
--
ALTER TABLE `arrivals`
  MODIFY `arrival_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `departures`
--
ALTER TABLE `departures`
  MODIFY `departure_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `detailroutes`
--
ALTER TABLE `detailroutes`
  MODIFY `detail_route_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `images`
--
ALTER TABLE `images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `legs`
--
ALTER TABLE `legs`
  MODIFY `leg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `objects`
--
ALTER TABLE `objects`
  MODIFY `object_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `operations`
--
ALTER TABLE `operations`
  MODIFY `operation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `passengers`
--
ALTER TABLE `passengers`
  MODIFY `passenger_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `paymentstatus`
--
ALTER TABLE `paymentstatus`
  MODIFY `payment_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `roleoperations`
--
ALTER TABLE `roleoperations`
  MODIFY `role_operation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `routes`
--
ALTER TABLE `routes`
  MODIFY `route_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `statusroleoperation`
--
ALTER TABLE `statusroleoperation`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `arrivals`
--
ALTER TABLE `arrivals`
  ADD CONSTRAINT `arrivals_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `statusroleoperation` (`status_id`);

--
-- Các ràng buộc cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`payment_id`),
  ADD CONSTRAINT `fk_payment_status` FOREIGN KEY (`payment_status_id`) REFERENCES `paymentstatus` (`payment_status_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `detailroutes`
--
ALTER TABLE `detailroutes`
  ADD CONSTRAINT `detailroutes_ibfk_1` FOREIGN KEY (`route_id`) REFERENCES `routes` (`route_id`);

--
-- Các ràng buộc cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`),
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`detail_route_id`) REFERENCES `detailroutes` (`detail_route_id`);

--
-- Các ràng buộc cho bảng `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_detailroute_images` FOREIGN KEY (`detail_route_id`) REFERENCES `detailroutes` (`detail_route_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `legs`
--
ALTER TABLE `legs`
  ADD CONSTRAINT `legs_ibfk_1` FOREIGN KEY (`detail_route_id`) REFERENCES `detailroutes` (`detail_route_id`);

--
-- Các ràng buộc cho bảng `passengers`
--
ALTER TABLE `passengers`
  ADD CONSTRAINT `passengers_ibfk_1` FOREIGN KEY (`object_id`) REFERENCES `objects` (`object_id`);

--
-- Các ràng buộc cho bảng `roleoperations`
--
ALTER TABLE `roleoperations`
  ADD CONSTRAINT `roleoperations_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  ADD CONSTRAINT `roleoperations_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`),
  ADD CONSTRAINT `roleoperations_ibfk_3` FOREIGN KEY (`operation_id`) REFERENCES `operations` (`operation_id`);

--
-- Các ràng buộc cho bảng `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`arrival_id`) REFERENCES `arrivals` (`arrival_id`),
  ADD CONSTRAINT `routes_ibfk_2` FOREIGN KEY (`departure_id`) REFERENCES `departures` (`departure_id`);

--
-- Các ràng buộc cho bảng `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`booking_id`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`detail_route_id`) REFERENCES `detailroutes` (`detail_route_id`),
  ADD CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`passenger_id`) REFERENCES `passengers` (`passenger_id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
