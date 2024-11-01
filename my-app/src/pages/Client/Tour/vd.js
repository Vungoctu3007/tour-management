// import React, { useState } from 'react';
// import { Calendar } from 'react-calendar'; // Giả sử bạn sử dụng thư viện này

// const TourBookingCalendar = () => {
//   const tourDuration = 5; // Thời gian của tour là 5 ngày
//   const interval = tourDuration + 1; // Sau 5 ngày thì ngày bắt đầu tiếp theo là sau 6 ngày

//   const [startDate] = useState(new Date()); // Ngày bắt đầu của tháng hiện tại

//   // Hàm kiểm tra xem ngày nào là ngày bắt đầu có thể đặt được
//   const isSelectableDate = (date) => {
//     const daysFromStart = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
//     return daysFromStart % interval === 0;
//   };

//   return (
//     <Calendar
//       tileDisabled={({ date }) => !isSelectableDate(date)}
//       tileContent={({ date }) => (
//         isSelectableDate(date) ? <span>15,690,000 đ</span> : null
//       )}
//     />
//   );
// };

// export default TourBookingCalendar;



// SELECT ar.arrival_id,ar.arrival_name,COUNT(ro.route_id) FROM arrivals ar
// JOIN routes ro ON ar.arrival_id=ro.arrival_id
// JOIN detailroutes de ON ro.route_id=de.route_id
// JOIN images im ON de.detail_route_id=im.detail_route_id
// WHERE im.is_primary=1
// GROUP BY ar.arrival_id