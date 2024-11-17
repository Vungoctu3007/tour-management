import BookingPagination from "./bookingPagination";
import { useParams } from 'react-router-dom';

function Book() {
  const userId = localStorage.getItem("userId");
  return (
    <BookingPagination userId={userId} itemsPerPage={5} />
  );
}

export default Book;

