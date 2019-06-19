const tripsCountInput = document.getElementById("trips-count-input");
const countButton = document.getElementById("count-button");
const oneTripTicketsCountOutput = document.getElementById("one-trip-tickets-count-output");
const tenTripTicketsCountOutput = document.getElementById("ten-trip-tickets-count-output");
const sixtyTripTicketsCountOutput = document.getElementById("sixty-trip-tickets-count-output");

function recalculate() {
    const tripsCount = parseInt(tripsCountInput.value);
    const tickets = getOptimalTicketsDistribution(tripsCount);
    oneTripTicketsCountOutput.textContent = tickets.oneTripTicket;
    tenTripTicketsCountOutput.textContent = tickets.tenTripsTicket;
    sixtyTripTicketsCountOutput.textContent = tickets.sixtyTripsTicket;
}

countButton.addEventListener("click", recalculate);


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

function getOptimalTicketsDistribution(tripsCount) {
    const numberOfSixtyTripTickets = Math.floor(tripsCount / sixtyTripsTicket.trips);
    const restTripsCount = tripsCount - 60 * numberOfSixtyTripTickets;
    if (restTripsCount === 0) {
        return {
            sixtyTripsTicket: numberOfSixtyTripTickets,
            tenTripsTicket: 0,
            oneTripTicket: 0
        }
    }
    if (Math.floor(restTripsCount / tenTripsTicket.trips) *
        tenTripsTicket.price >= sixtyTripsTicket.price) {
        return {
            sixtyTripsTicket: numberOfSixtyTripTickets + 1,
            tenTripsTicket: 0,
            oneTripTicket: 0
        }

    }
    const numberOfTenTripTickets = Math.floor(restTripsCount / tenTripsTicket.trips);
    const finalRestTripsCount = restTripsCount - 10 * numberOfTenTripTickets;
    if (finalRestTripsCount === 0) {
        return {
            sixtyTripsTicket: numberOfSixtyTripTickets,
            tenTripsTicket: numberOfTenTripTickets,
            oneTripTicket: 0
        }
    }
    if (Math.floor(finalRestTripsCount / oneTripTicket.trips) *
        oneTripTicket.price >= tenTripsTicket.price) {
        return {
            sixtyTripsTicket: numberOfSixtyTripTickets,
            tenTripsTicket: numberOfTenTripTickets + 1,
            oneTripTicket: 0
        }

    }
    return {
        sixtyTripsTicket: numberOfSixtyTripTickets,
        tenTripsTicket: numberOfTenTripTickets,
        oneTripTicket: finalRestTripsCount / oneTripTicket.trips
    }
}