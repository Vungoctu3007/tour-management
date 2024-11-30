package com.example.tourmanagement.service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.example.tourmanagement.dto.response.AvailableQuantityDetailRouteResponse;
import com.example.tourmanagement.dto.response.BookingDetailResponse;
import com.example.tourmanagement.dto.response.PassengerResponse;
import com.example.tourmanagement.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import com.example.tourmanagement.dto.request.BookingRequest;
import com.example.tourmanagement.dto.request.PassengerRequest;
import com.example.tourmanagement.entity.Booking;
import com.example.tourmanagement.entity.Customer;
import com.example.tourmanagement.entity.Passenger;
import com.example.tourmanagement.entity.Ticket;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BookingService {
    PassengerRepository passengerRepository;
    CustomerRepository customerRepository;
    BookingRepository bookingRepository;
    TicketRepository ticketRepository;
    DetailRouteRepository detailRouteRepository;

    public int createCustomer(BookingRequest request) {
        Customer customer = new Customer();
        customer.setCustomerName(request.getCustomerName());
        customer.setCustomerEmail(request.getCustomerEmail());
        customer.setCustomerPhone(request.getCustomerPhone());
        customer.setCustomerAddress(request.getCustomerAddress());
        customer.setUserId(request.getUserId());
        Customer savedCustomer = customerRepository.save(customer);
        return savedCustomer.getId();
    }

    public List<Integer> createPassengers(BookingRequest request) {
        // Retrieve the list of passenger requests from the booking request
        List<PassengerRequest> passengerRequestList = request.getPassengerRequestList();
        List<Integer> passengerIds = new ArrayList<>();

        // Loop through the passenger request list and save each passenger
        for (PassengerRequest passengerRequest : passengerRequestList) {
            Passenger passenger = new Passenger();
            passenger.setPassengerName(passengerRequest.getPassengerName());
            passenger.setObjectId(passengerRequest.getPassengerObjectId());
            passenger.setGender(passengerRequest.getPassengerGender());
            passenger.setDateBirth(passengerRequest.getPassengerDateBirth());

            // Save the passenger to the database
            Passenger savedPassenger = passengerRepository.save(passenger);
            passengerIds.add(savedPassenger.getId());
        }

        return passengerIds;  
    }

    public void updateBookingInAdvanceBasedOnPassengerCount(Integer detailRouteId, int countPassenger) {
        detailRouteRepository.updateBookingInAdvance(detailRouteId, countPassenger);
    }
    public int createBooking(BookingRequest request, Integer customerId ,Integer passengerCount) {
        Booking booking = new Booking();

        booking.setCustomerId(customerId);
        booking.setTotalPrice(request.getTotal_price());
        booking.setTimeToOrder();
        booking.setPaymentId(request.getPaymentMethod());
        booking.setPaymentStatusId(1);
        booking.setStatusBooking(1);
        booking.setDetailRouteId(request.getDetailRouteId());
        updateBookingInAdvanceBasedOnPassengerCount(request.getDetailRouteId(), passengerCount);
        Booking savedBooking = bookingRepository.save(booking);
        return savedBooking.getId();
    }

    public boolean createTickets(List<Integer> passengerIds, Integer bookingId) {
        try {
            for (Integer passengerId : passengerIds) {
                Ticket ticket = new Ticket();
                ticket.setBookingId(bookingId);
                ticket.setPassengerId(passengerId);
                ticketRepository.save(ticket);
            }
            return true; 
        } catch (Exception e) {
            e.printStackTrace();
            return false; 
        }
    }

    public boolean checkAvailableQuantity(Integer detailTourId, Integer totalPassengers) {
        AvailableQuantityDetailRouteResponse stockAndBookingAdvance = detailRouteRepository.findStockAndBookingAdvanceByTourId(detailTourId);
        if (stockAndBookingAdvance != null) {
            Integer stock = stockAndBookingAdvance.getStock();
            Integer bookInAdvance = stockAndBookingAdvance.getBookInAdvance();
            Integer availableSeats = stock - bookInAdvance;

            return availableSeats >= totalPassengers;
        }
        return false;
    }

    public BookingDetailResponse getBookingDetail(Integer bookingId) {
        BookingDetailResponse bookingDetailResponse = bookingRepository.getBookingDetailByBookingId(bookingId);
        List<PassengerResponse> passengerResponses = passengerRepository.findPassengersByBookingId(bookingId);
        bookingDetailResponse.setPassengers(passengerResponses);
        return bookingDetailResponse;
    }

    @Transactional
    public boolean updateBookingStatus(Integer bookingId, Integer statusId) {
        try {
            int rowsUpdated = bookingRepository.updateBookingStatus(bookingId, statusId);
            return rowsUpdated > 0;
        } catch (Exception e) {
            log.error("Error updating booking status", e);
            return false;
        }
    }

    public void updateBookingStatus(String bookingId, Integer status) {
        Optional<Booking> optionalBooking = bookingRepository.findById(Integer.parseInt(bookingId));
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();
            booking.setPaymentStatusId(status);
            bookingRepository.save(booking);
        } else {
            throw new RuntimeException("Booking not found with id: " + bookingId);
        }
    }

}
