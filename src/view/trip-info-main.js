export const createMainTripInfoTemplate = (trip) => {
  return `<div class="trip-info__main">
            <h1 class="trip-info__title">${trip.title}</h1>
            <p class="trip-info__dates">${trip.date}</p>
          </div>
          <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${trip.price}</span>
          </p>`;
};
