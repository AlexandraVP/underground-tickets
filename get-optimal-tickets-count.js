
const oneTripTicket = {
    price: 15,
    trips: 1
};
const tenTripsTicket = {
    price: 125,
    trips: 10
};
const sixtyTripsTicket = {
    price: 440,
    trips: 60
};

/**
 *
 * @param tripsCount
 * @return {
 *     oneTripTickets: number,
 *     tenTripTickets: number,
 *     sixtyTripTickets: number
 * }
 */

 export default function getOptimalTicketsDistribution(tripsCount) {
    const numberOfSixtyTripTickets = Math.floor(tripsCount/sixtyTripsTicket.trips);
    const restTripsCount = tripsCount - 60*numberOfSixtyTripTickets;
    if (restTripsCount === 0) {
        return {sixtyTripsTicket: numberOfSixtyTripTickets,
            tenTripsTicket: 0,
            oneTripTicket: 0}
    }
    if (Math.floor (restTripsCount/tenTripsTicket.trips)*
        tenTripsTicket.price >= sixtyTripsTicket.price) {
        return {sixtyTripsTicket: numberOfSixtyTripTickets + 1,
            tenTripsTicket: 0,
            oneTripTicket: 0}

    }
    const numberOfTenTripTickets = Math.floor(restTripsCount/tenTripsTicket.trips);
    const finalRestTripsCount = restTripsCount - 10*numberOfTenTripTickets;
    if (finalRestTripsCount === 0) {
        return {sixtyTripsTicket: numberOfSixtyTripTickets,
            tenTripsTicket: numberOfTenTripTickets,
            oneTripTicket: 0}
    }
    if (Math.floor (finalRestTripsCount/oneTripTicket.trips)*
        oneTripTicket.price >= tenTripsTicket.price) {
        return {sixtyTripsTicket: numberOfSixtyTripTickets,
            tenTripsTicket: numberOfTenTripTickets + 1,
            oneTripTicket: 0}

    }
        return {sixtyTripsTicket: numberOfSixtyTripTickets,
            tenTripsTicket: numberOfTenTripTickets,
            oneTripTicket: finalRestTripsCount / oneTripTicket.trips}
}