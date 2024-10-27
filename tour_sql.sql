-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 26, 2024 lúc 09:24 AM
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
-- Cấu trúc bảng cho bảng `age_groups`
--

CREATE TABLE `age_groups` (
  `id` int(11) NOT NULL,
  `age_group` varchar(255) NOT NULL,
  `price_factor` decimal(5,2) NOT NULL,
  `description` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `age_groups`
--

INSERT INTO `age_groups` (`id`, `age_group`, `price_factor`, `description`) VALUES
(1, 'Child', 0.50, 'Children aged 0-12 years'),
(2, 'Teen', 0.75, 'Teens aged 13-17 years'),
(3, 'Adult', 1.00, 'Adults aged 18-59 years'),
(4, 'Senior', 0.85, 'Seniors aged 60 years and above'),
(5, 'Infant', 0.20, 'Infants aged 0-2 years'),
(6, 'Child', 0.50, 'Children aged 0-12 years'),
(7, 'Teen', 0.75, 'Teens aged 13-17 years'),
(8, 'Adult', 1.00, 'Adults aged 18-59 years'),
(9, 'Senior', 0.85, 'Seniors aged 60 years and above'),
(10, 'Infant', 0.20, 'Infants aged 0-2 years'),
(11, 'Child', 0.50, 'Children aged 0-12 years'),
(12, 'Teen', 0.75, 'Teens aged 13-17 years'),
(13, 'Adult', 1.00, 'Adults aged 18-59 years'),
(14, 'Senior', 0.85, 'Seniors aged 60 years and above'),
(15, 'Infant', 0.20, 'Infants aged 0-2 years');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL,
  `total_adults` int(11) DEFAULT 0,
  `total_children` int(11) DEFAULT 0,
  `total_seniors` int(11) DEFAULT 0,
  `total_passengers` int(11) GENERATED ALWAYS AS (`total_adults` + `total_children` + `total_seniors`) VIRTUAL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` tinytext DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `booking_passengers`
--

CREATE TABLE `booking_passengers` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `booking_payments`
--

CREATE TABLE `booking_payments` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `payment_method` tinytext NOT NULL,
  `payment_status` tinytext DEFAULT 'pending',
  `amount` decimal(10,2) NOT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `destinations`
--

CREATE TABLE `destinations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` tinytext DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `destinations`
--

INSERT INTO `destinations` (`id`, `name`, `description`, `country`, `city`, `created_at`, `updated_at`) VALUES
(1, 'Paris', 'City of Lights', 'France', 'Paris', '2024-10-23 08:33:41', '2024-10-23 08:33:41'),
(2, 'New York', 'The Big Apple', 'USA', 'New York', '2024-10-23 08:33:41', '2024-10-23 08:33:41'),
(3, 'Tokyo', 'Capital of Japan', 'Japan', 'Tokyo', '2024-10-23 08:33:41', '2024-10-23 08:33:41'),
(4, 'Sydney', 'Harbour City', 'Australia', 'Sydney', '2024-10-23 08:33:41', '2024-10-23 08:33:41'),
(5, 'Rome', 'Eternal City', 'Italy', 'Rome', '2024-10-23 08:33:41', '2024-10-23 08:33:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invalidated_token`
--

CREATE TABLE `invalidated_token` (
  `id` varchar(255) NOT NULL,
  `expiry_time` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `invalidated_token`
--

INSERT INTO `invalidated_token` (`id`, `expiry_time`) VALUES
('token1', '2024-12-31 23:59:59.000000'),
('token2', '2024-11-30 23:59:59.000000'),
('token3', '2024-10-31 23:59:59.000000'),
('token4', '2025-01-31 23:59:59.000000'),
('token5', '2025-02-28 23:59:59.000000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `itinerary`
--

CREATE TABLE `itinerary` (
  `id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL,
  `day_number` int(11) NOT NULL,
  `description` tinytext DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `itinerary`
--

INSERT INTO `itinerary` (`id`, `tour_id`, `day_number`, `description`, `start_time`, `end_time`, `location`, `created_at`, `updated_at`) VALUES
(6, 1, 1, 'Arrival in Paris', '09:00:00', '18:00:00', 'Paris', '2024-10-23 08:34:35', '2024-10-23 08:34:35'),
(7, 1, 2, 'Eiffel Tower visit', '09:00:00', '12:00:00', 'Eiffel Tower', '2024-10-23 08:34:35', '2024-10-23 08:34:35'),
(8, 2, 1, 'Statue of Liberty tour', '10:00:00', '14:00:00', 'Liberty Island', '2024-10-23 08:34:35', '2024-10-23 08:34:35'),
(9, 3, 1, 'Explore Tokyo', '10:00:00', '17:00:00', 'Tokyo', '2024-10-23 08:34:35', '2024-10-23 08:34:35'),
(10, 4, 1, 'Sydney Opera House tour', '11:00:00', '15:00:00', 'Sydney Opera House', '2024-10-23 08:34:35', '2024-10-23 08:34:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `permissions`
--

CREATE TABLE `permissions` (
  `permission_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` tinytext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `permissions`
--

INSERT INTO `permissions` (`permission_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'create_tour', 'Permission to create new tours', '2024-10-23 08:36:02', '2024-10-23 08:36:02'),
(2, 'edit_tour', 'Permission to edit existing tours', '2024-10-23 08:36:02', '2024-10-23 08:36:02'),
(3, 'delete_tour', 'Permission to delete tours', '2024-10-23 08:36:02', '2024-10-23 08:36:02'),
(4, 'view_tour', 'Permission to view tours', '2024-10-23 08:36:02', '2024-10-23 08:36:02'),
(5, 'manage_bookings', 'Permission to manage bookings', '2024-10-23 08:36:02', '2024-10-23 08:36:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `review` tinytext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` tinytext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`role_id`, `permission_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'ADMIN', 'Administrator with full access', '2024-10-23 08:36:10', '2024-10-25 15:53:53'),
(2, 2, 'STAFF', 'Guide for the tours', '2024-10-23 08:36:10', '2024-10-25 15:53:59'),
(3, 3, 'CUSTOMER', 'Regular user of the platform', '2024-10-23 08:36:10', '2024-10-25 15:54:05');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role_permissions`
--

CREATE TABLE `role_permissions` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tours`
--

CREATE TABLE `tours` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` tinytext DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tours`
--

INSERT INTO `tours` (`id`, `name`, `description`, `price`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, 'Paris Tour', 'A week-long tour in Paris', 1000.00, '2024-01-01', '2024-01-07', '2024-10-23 08:34:28', '2024-10-23 08:34:28'),
(2, 'New York Tour', 'Experience the sights of New York', 1200.00, '2024-02-01', '2024-02-07', '2024-10-23 08:34:28', '2024-10-23 08:34:28'),
(3, 'Tokyo Tour', 'Explore the culture of Tokyo', 1100.00, '2024-03-01', '2024-03-07', '2024-10-23 08:34:28', '2024-10-23 08:34:28'),
(4, 'Sydney Tour', 'Discover the beauty of Sydney', 1300.00, '2024-04-01', '2024-04-07', '2024-10-23 08:34:28', '2024-10-23 08:34:28'),
(5, 'Rome Tour', 'A cultural journey through Rome', 900.00, '2024-05-01', '2024-05-07', '2024-10-23 08:34:28', '2024-10-23 08:34:28'),
(6, 'Paris Tour', 'A week-long tour in Paris', 1000.00, '2024-01-01', '2024-01-07', '2024-10-23 08:37:17', '2024-10-23 08:37:17'),
(7, 'New York Tour', 'Experience the sights of New York', 1200.00, '2024-02-01', '2024-02-07', '2024-10-23 08:37:17', '2024-10-23 08:37:17'),
(8, 'Tokyo Tour', 'Explore the culture of Tokyo', 1100.00, '2024-03-01', '2024-03-07', '2024-10-23 08:37:17', '2024-10-23 08:37:17'),
(9, 'Sydney Tour', 'Discover the beauty of Sydney', 1300.00, '2024-04-01', '2024-04-07', '2024-10-23 08:37:17', '2024-10-23 08:37:17'),
(10, 'Rome Tour', 'A cultural journey through Rome', 900.00, '2024-05-01', '2024-05-07', '2024-10-23 08:37:17', '2024-10-23 08:37:17');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'john@example.com', 'admin', 1, '2024-10-23 08:36:57', '2024-10-25 15:41:05'),
(2, 'user1', 'jane@example.com', '12345', 2, '2024-10-23 08:36:57', '2024-10-25 15:29:04'),
(3, 'Emily Davis', 'emily@example.com', 'password789', 3, '2024-10-23 08:36:57', '2024-10-23 08:38:04'),
(4, 'Michael Johnson', 'michael@example.com', 'password101', 1, '2024-10-23 08:36:57', '2024-10-23 08:38:08'),
(5, 'Sarah Brown', 'sarah@example.com', 'password102', 2, '2024-10-23 08:36:57', '2024-10-23 08:38:13');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users_role`
--

CREATE TABLE `users_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `age_groups`
--
ALTER TABLE `age_groups`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_bookings_user` (`user_id`),
  ADD KEY `fk_bookings_tour` (`tour_id`);

--
-- Chỉ mục cho bảng `booking_passengers`
--
ALTER TABLE `booking_passengers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_booking_passengers_booking` (`booking_id`);

--
-- Chỉ mục cho bảng `booking_payments`
--
ALTER TABLE `booking_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_booking_payments_booking` (`booking_id`);

--
-- Chỉ mục cho bảng `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `invalidated_token`
--
ALTER TABLE `invalidated_token`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `itinerary`
--
ALTER TABLE `itinerary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_itinerary_tour` (`tour_id`);

--
-- Chỉ mục cho bảng `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reviews_tour` (`tour_id`),
  ADD KEY `fk_reviews_user` (`user_id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD KEY `fk_role_permission` (`permission_id`);

--
-- Chỉ mục cho bảng `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`role_id`,`permission_id`),
  ADD KEY `FKegdk29eiy7mdtefy5c7eirr6e` (`permission_id`);

--
-- Chỉ mục cho bảng `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Chỉ mục cho bảng `users_role`
--
ALTER TABLE `users_role`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKeejqlb4gq1av9540jg66ju2pi` (`role_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `age_groups`
--
ALTER TABLE `age_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `booking_passengers`
--
ALTER TABLE `booking_passengers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `booking_payments`
--
ALTER TABLE `booking_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `itinerary`
--
ALTER TABLE `itinerary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT cho bảng `tours`
--
ALTER TABLE `tours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_bookings_tour` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_bookings_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `booking_passengers`
--
ALTER TABLE `booking_passengers`
  ADD CONSTRAINT `fk_booking_passengers_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `booking_payments`
--
ALTER TABLE `booking_payments`
  ADD CONSTRAINT `fk_booking_payments_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `itinerary`
--
ALTER TABLE `itinerary`
  ADD CONSTRAINT `fk_itinerary_tour` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_reviews_tour` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reviews_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `roles`
--
ALTER TABLE `roles`
  ADD CONSTRAINT `fk_role_permission` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `FKegdk29eiy7mdtefy5c7eirr6e` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`),
  ADD CONSTRAINT `FKn5fotdgk8d1xvo8nav9uv3muc` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `users_role`
--
ALTER TABLE `users_role`
  ADD CONSTRAINT `FKeejqlb4gq1av9540jg66ju2pi` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  ADD CONSTRAINT `FKqpe36jsen4rslwfx5i6dj2fy8` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
