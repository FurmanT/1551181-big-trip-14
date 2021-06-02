import {FilterType} from '../const';
import { isPointExpired, isPointFuture } from './point';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.startDate, point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointExpired(point.endDate)),
};
