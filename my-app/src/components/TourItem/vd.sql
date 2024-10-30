CREATE TABLE `arrivals` (
  `arrival_id` int(11) NOT NULL,
  `arrival_name` varchar(255) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `arrivals` (`arrival_id`, `arrival_name`, `status_id`) VALUES
(1, 'Bangkok - Pattaya - Công Viên Khủng Long', 1),
(2, 'Lệ Giang - Đại Lý - Shangrila', 1),
(3, 'Nghi Xương - Trương Gia Giới - Thiên Môn Sơn - Phượng Hoàng Cổ Trấn', NULL);

CREATE TABLE `departures` (
  `departure_id` int(11) NOT NULL,
  `departure_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `departures` (`departure_id`, `departure_name`) VALUES
(1, 'Hồ Chí Minh'),
(2, 'Hà Nội'),
(3, 'Đà Lạt'),
(4, 'Đà Nẵng');


CREATE TABLE `detailroutes` (
  `detail_route_id` int(11) NOT NULL,
  `route_id` int(11) DEFAULT NULL,
  `detail_route_name` varchar(255) DEFAULT NULL,
  `description` tinytext DEFAULT NULL,
  `time_to_departure` date DEFAULT NULL,
  `time_to_finish` date DEFAULT NULL,
  `stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `detailroutes` (`detail_route_id`, `route_id`, `detail_route_name`, `description`, `time_to_departure`, `time_to_finish`, `stock`) VALUES
(1, 1, 'Tour Trung Quốc 6N5Đ: Nghi Xương - Trương Gia Giới - Thiên Môn Sơn - Phượng Hoàng Cổ Trấn', '- Chinh phục Thiên Môn Sơn với hệ thống cáp treo dài nhất thế giới.\r\n\r\n- Khám phá vẻ đẹp huyền bí của Trương Gia Giới, nơi được ví như tiên cảnh.\r\n\r\n- Đi dạo trên Cầu Kính Đại Hiệp Cốc ở Trươn', '2024-10-28', '2024-10-31', 20),
(2, 2, 'Tour Trung Quốc 6N5Đ: Lệ Giang - Đại Lý - Shangrila (No Shopping)', '- Khám phá Lệ Giang Cổ Trấn di sản thế giới được UNESCO công nhận, nổi tiếng với kiến trúc cổ kính và hệ thống kênh rạch độc đáo.\r\n\r\n- Tham quan Đại Lý vùng đất với Tam Tháp Đại Lý nổi tiếng', '2024-10-29', '2024-11-01', 30),
(3, 3, 'Tour Thái Lan 5N4Đ: Bangkok - Pattaya - Công Viên Khủng Long (Bay Sáng, Trưa)', '- Chiêm ngưỡng tượng Phật Vàng tại chùa Wat Traimit, biểu tượng tâm linh nổi tiếng.\r\n\r\n- Khám phá Pattaya sôi động, thành phố biển không bao giờ ngủ.\r\n\r\n- Hòa mình vào thế giới tiền sử đầy ấn tượng', '2024-10-30', '2024-11-05', 25);



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
(4, 1, 'SHANGRILA - Lệ Giang ( Ăn sáng , trưa , tối )', 'Đoàn dùng bữa sáng tại khách sạn, tham quan:\r\n\r\nTu viện Songzanlin - Tu viện Phật giáo Tây Tạng lớn nhất ở tỉnh Vân Nam, cũng là một trong những tu viện nổi tiếng ở huyện Kham và Giáo phái Vàng ở Tứ Xu\ 'T', 4);

CREATE TABLE `images` (
  `image_id` int(11) NOT NULL,
  `text_image` tinytext DEFAULT NULL,
  `detail_tour_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `routes` (
  `route_id` int(11) NOT NULL,
  `arrival_id` int(11) DEFAULT NULL,
  `departure_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;