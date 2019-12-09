import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as recipientActions from '../actions/recipients.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { RecipientEntity } from '../reducers/recipients.reducer';
import { environment } from '../../../../environments/environment';

@Injectable()
export class RecipientsEffects {

  addTheRecipient$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(recipientActions.recipientAdded),
        switchMap((originalAction) => this.client.post<RecipientEntity>(`${environment.rootApiUrl}recipients`, {
          name: originalAction.payload.name,
          email: originalAction.payload.email
        }).pipe(
          map(newRecipient => recipientActions.addRecipientSucceeded(
            { payload: newRecipient, oldId: originalAction.payload.id, savedHolidays: originalAction.payload.selectedHolidayIds }))
        ))
      ), { dispatch: true }
  );

  addholidaysToRecipient$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(recipientActions.addRecipientSucceeded),
        switchMap((originalAction) => this.client.put<RecipientEntity>(
          `${environment.rootApiUrl}recipients/${originalAction.payload.id}/`, {
          holidays: originalAction.savedHolidays
        }).pipe(
          map(newRecipient => recipientActions.addholidaysToRecipient({ payload: newRecipient }))
        ))
      ), { dispatch: true }
  );

  // when we get loadHolidays -> loadHolidaysSucceeded
  loadTheRecipients$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(recipientActions.loadRecipients),
        switchMap(() => this.client.get<GetRecipientsResponse>(`${environment.rootApiUrl}recipients`)
          .pipe(
            map(response => response.recipients),
            map((recipients) => recipientActions.loadRecipientsSucceeded({ payload: recipients }))
          ))
      ), { dispatch: true });



  constructor(private actions$: Actions, private client: HttpClient) { }
}

interface GetRecipientsResponse {
  recipients: RecipientEntity[];
}
