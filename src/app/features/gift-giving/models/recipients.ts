export interface RecipientListModel {
  id: string;
  name: string;
  email: string;
  // holidays: { id: string; description: string }[];
  holidays: RecipientListHolidayModel[];
}

export interface RecipientListHolidayModel {
  id: string;
  description: string;
}
