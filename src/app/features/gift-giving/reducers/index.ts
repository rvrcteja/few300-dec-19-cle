export const featureName = 'giftGivingFeature';
import * as fromHolidays from './holidays.reducers';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;

}

export const reducers = {
  holidays: fromHolidays.reducer
};
