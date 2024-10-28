-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 28, 2024 lúc 09:08 AM
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
-- Cơ sở dữ liệu: `test2`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `arrivals`
--

CREATE TABLE `arrivals` (
  `ArrivalId` int(11) NOT NULL,
  `ArrivalName` varchar(255) DEFAULT NULL,
  `Arrival_ImageId` int(11) DEFAULT NULL,
  `StatusId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bookings`
--

CREATE TABLE `bookings` (
  `BookingId` int(11) NOT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  `TotalPrice` decimal(10,2) DEFAULT NULL,
  `TimeToOrder` datetime DEFAULT NULL,
  `PaymentId` int(11) DEFAULT NULL,
  `paymentStatus` INT(11) NOT null
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `CustomerId` int(11) NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `Address` VARCHAR(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=UTF8MB4_GENERAL_CI;

CREATE TABLE `paymentname`(
	`paymentName` VARCHAR(255) NOT NULL,
	`id` INT(11) NOT null
)
-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `departures`
--

CREATE TABLE `departures` (
  `DepartureId` int(11) NOT NULL,
  `DepartureName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `detailroutes`
--

CREATE TABLE `detailroutes` (
  `DetailRouteId` int(11) NOT NULL,
  `RouteId` int(11) DEFAULT NULL,
  `DetailRouteName` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `ImageId` int(11) DEFAULT NULL,
  `Stock` INT(11) DEFAULT null
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `employees`
--

CREATE TABLE `employees` (
  `EmployeeId` int(11) NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `Address` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedback`
--

CREATE TABLE `feedback` (
  `FeedBackId` int(11) NOT NULL,
  `BookingId` int(11) DEFAULT NULL,
  `Text` VARCHAR(255) DEFAULT NULL,
  `rating` INT (INT) NOT NULL,
  `DetailRouteId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `images`
--

CREATE TABLE `images` (
  `ImageId` int(11) NOT NULL,
  `textImage` text DEFAULT NULL
  `DetailRouteId` VARCHAR(255) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `legs`
--

CREATE TABLE `legs` (
  `LegId` int(11) NOT NULL,
  `DetailRouteId` int(11) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `objects`
--

CREATE TABLE `objects` (
  `ObjectId` int(11) NOT NULL,
  `ObjectName` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `operations`
--

CREATE TABLE `operations` (
  `OperationId` int(11) NOT NULL,
  `OperationName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `passengers`
--

CREATE TABLE `passengers` (
  `PassengerId` int(11) NOT NULL,
  `ObjectId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `PaymentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `permissions`
--

CREATE TABLE `permissions` (
  `PermissionId` int(11) NOT NULL,
  `PermissionName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roleoperations`
--

CREATE TABLE `roleoperations` (
  `RoleOperationId` int(11) NOT NULL,
  `RoleId` int(11) DEFAULT NULL,
  `PermissionId` int(11) DEFAULT NULL,
  `OperationId` int(11) DEFAULT NULL,
  `StatusId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `RoleId` int(11) NOT NULL,
  `RoleName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `routes`
--

CREATE TABLE `routes` (
  `RouteId` int(11) NOT NULL,
  `ArrivalId` int(11) DEFAULT NULL,
  `DepartureId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `statusroleoperation`
--

CREATE TABLE `statusroleoperation` (
  `StatusId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tickets`
--

CREATE TABLE `tickets` (
  `BookingId` int(11) NOT NULL,
  `DetailRouteId` int(11) NOT NULL,
  `PassengerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `UserId` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `IdentityId` int(11) DEFAULT NULL,
  `RoleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `arrivals`
--
ALTER TABLE `arrivals`
  ADD PRIMARY KEY (`ArrivalId`),
  ADD KEY `StatusId` (`StatusId`);

--
-- Chỉ mục cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`BookingId`),
  ADD KEY `CustomerId` (`CustomerId`),
  ADD KEY `PaymentId` (`PaymentId`);
  ADD KEY `paymentStatus` (`paymentStatus`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`CustomerId`);

--
-- Chỉ mục cho bảng `departures`
--
ALTER TABLE `departures`
  ADD PRIMARY KEY (`DepartureId`);

--
-- Chỉ mục cho bảng `detailroutes`
--
ALTER TABLE `detailroutes`
  ADD PRIMARY KEY (`DetailRouteId`),
  ADD KEY `RouteId` (`RouteId`),
  ADD KEY `ImageId` (`ImageId`);

--
-- Chỉ mục cho bảng `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`EmployeeId`);

--
-- Chỉ mục cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`FeedBackId`),
  ADD KEY `BookingId` (`BookingId`),
  ADD KEY `DetailRouteId` (`DetailRouteId`);

--
-- Chỉ mục cho bảng `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`ImageId`);
	ADD KEY `DetailRouteId` (`DetailRouteId`);
--
-- Chỉ mục cho bảng `legs`
--
ALTER TABLE `legs`
  ADD PRIMARY KEY (`LegId`),
  ADD KEY `DetailRouteId` (`DetailRouteId`);

--
-- Chỉ mục cho bảng `objects`
--
ALTER TABLE `objects`
  ADD PRIMARY KEY (`ObjectId`);

--
-- Chỉ mục cho bảng `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`OperationId`);

--
-- Chỉ mục cho bảng `passengers`
--
ALTER TABLE `passengers`
  ADD PRIMARY KEY (`PassengerId`),
  ADD KEY `ObjectId` (`ObjectId`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`PaymentId`);

--
-- Chỉ mục cho bảng `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`PermissionId`);

--
-- Chỉ mục cho bảng `roleoperations`
--
ALTER TABLE `roleoperations`
  ADD PRIMARY KEY (`RoleOperationId`),
  ADD KEY `RoleId` (`RoleId`),
  ADD KEY `PermissionId` (`PermissionId`),
  ADD KEY `OperationId` (`OperationId`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RoleId`);

--
-- Chỉ mục cho bảng `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`RouteId`),
  ADD KEY `ArrivalId` (`ArrivalId`),
  ADD KEY `DepartureId` (`DepartureId`);

--
-- Chỉ mục cho bảng `statusroleoperation`
--
ALTER TABLE `statusroleoperation`
  ADD PRIMARY KEY (`StatusId`);

--
-- Chỉ mục cho bảng `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`BookingId`,`DetailRouteId`,`PassengerId`),
  ADD KEY `DetailRouteId` (`DetailRouteId`),
  ADD KEY `PassengerId` (`PassengerId`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserId`),
  ADD KEY `RoleId` (`RoleId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `arrivals`
--
ALTER TABLE `arrivals`
  MODIFY `ArrivalId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `bookings`
--
ALTER TABLE `bookings`
  MODIFY `BookingId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `CustomerId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `departures`
--
ALTER TABLE `departures`
  MODIFY `DepartureId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `detailroutes`
--
ALTER TABLE `detailroutes`
  MODIFY `DetailRouteId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `employees`
--
ALTER TABLE `employees`
  MODIFY `EmployeeId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `feedback`
--
ALTER TABLE `feedback`
  MODIFY `FeedBackId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `images`
--
ALTER TABLE `images`
  MODIFY `ImageId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `legs`
--
ALTER TABLE `legs`
  MODIFY `LegId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `objects`
--
ALTER TABLE `objects`
  MODIFY `ObjectId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `operations`
--
ALTER TABLE `operations`
  MODIFY `OperationId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `passengers`
--
ALTER TABLE `passengers`
  MODIFY `PassengerId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
  MODIFY `PaymentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `permissions`
--
ALTER TABLE `permissions`
  MODIFY `PermissionId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `roleoperations`
--
ALTER TABLE `roleoperations`
  MODIFY `RoleOperationId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `RoleId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `routes`
--
ALTER TABLE `routes`
  MODIFY `RouteId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `statusroleoperation`
--
ALTER TABLE `statusroleoperation`
  MODIFY `StatusId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `arrivals`
--
ALTER TABLE `arrivals`
  ADD CONSTRAINT `arrivals_ibfk_1` FOREIGN KEY (`StatusId`) REFERENCES `statusroleoperation` (`StatusId`);

--
-- Các ràng buộc cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`CustomerId`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`PaymentId`) REFERENCES `payments` (`PaymentId`);

--
-- Các ràng buộc cho bảng `detailroutes`
--
ALTER TABLE `detailroutes`
  ADD CONSTRAINT `detailroutes_ibfk_1` FOREIGN KEY (`RouteId`) REFERENCES `routes` (`RouteId`),
  ADD CONSTRAINT `detailroutes_ibfk_2` FOREIGN KEY (`ImageId`) REFERENCES `images` (`ImageId`);

--
-- Các ràng buộc cho bảng `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`BookingId`) REFERENCES `bookings` (`BookingId`),
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`DetailRouteId`) REFERENCES `detailroutes` (`DetailRouteId`);

--
-- Các ràng buộc cho bảng `legs`
--
ALTER TABLE `legs`
  ADD CONSTRAINT `legs_ibfk_1` FOREIGN KEY (`DetailRouteId`) REFERENCES `detailroutes` (`DetailRouteId`);

--
-- Các ràng buộc cho bảng `passengers`
--
ALTER TABLE `passengers`
  ADD CONSTRAINT `passengers_ibfk_1` FOREIGN KEY (`ObjectId`) REFERENCES `objects` (`ObjectId`);

--
-- Các ràng buộc cho bảng `roleoperations`
--
ALTER TABLE `roleoperations`
  ADD CONSTRAINT `roleoperations_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`RoleId`),
  ADD CONSTRAINT `roleoperations_ibfk_2` FOREIGN KEY (`PermissionId`) REFERENCES `permissions` (`PermissionId`),
  ADD CONSTRAINT `roleoperations_ibfk_3` FOREIGN KEY (`OperationId`) REFERENCES `operations` (`OperationId`);

--
-- Các ràng buộc cho bảng `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`ArrivalId`) REFERENCES `arrivals` (`ArrivalId`),
  ADD CONSTRAINT `routes_ibfk_2` FOREIGN KEY (`DepartureId`) REFERENCES `departures` (`DepartureId`);

--
-- Các ràng buộc cho bảng `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`BookingId`) REFERENCES `bookings` (`BookingId`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`DetailRouteId`) REFERENCES `detailroutes` (`DetailRouteId`),
  ADD CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`PassengerId`) REFERENCES `passengers` (`PassengerId`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`RoleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
