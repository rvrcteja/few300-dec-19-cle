export const featureName = 'giftGivingFeature';
import * as fromHolidays from './holidays.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;

}

export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer
};
