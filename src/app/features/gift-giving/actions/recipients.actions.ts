import { createAction, props } from '@ngrx/store';
import { RecipientEntity } from '../reducers/recipients.reducer';

let currentId = 1;
export const recipientAdded = createAction(
  '[gift giving] added a recipient',
  ({ name, email, selectedHolidayIds }: { name: string; email: string; selectedHolidayIds: string[] }) => ({
    payload: {
      id: 'T' + currentId++,
      name,
      email,
      selectedHolidayIds
    }
  })
);


export const loadRecipients = createAction(
  '[gift giving] load the Recipients'
);

export const loadRecipientsSucceeded = createAction(
  '[gift giving] loading the recipients worked',
  props<{ payload: RecipientEntity[] }>()
);


export const addRecipientSucceeded = createAction(
  '[gift giving] added recipient successfully',
  props<{ payload: RecipientEntity, oldId: string, savedHolidays: RecipientEntity['selectedHolidayIds'] }>()
);

export const addholidaysToRecipient = createAction(
  '[gift giving] added holidays to recipient successfully',
  props<{ payload: RecipientEntity }>()
);
