export interface Guest {
  id: number;
  name: string;
  numberOfGuests: number;
  qrCodeString: string;
  familySide: 'bride' | 'groom' | 'both';
  willBeAttending: boolean | null;
}

export const guestList: Guest[] = [
  {
    id: 1,
    name: 'Rosa Ramos',
    numberOfGuests: 2,
    qrCodeString: '',
    familySide: 'bride',
    willBeAttending: null,
  },
  {
    id: 2,
    name: 'Palmira Leandro',
    numberOfGuests: 4,
    qrCodeString: '',
    familySide: 'groom',
    willBeAttending: null,
  },
  {
    id: 3,
    name: 'Fell Ramos',
    numberOfGuests: 2,
    qrCodeString: '',
    familySide: 'bride',
    willBeAttending: null,
  },
  {
    id: 4,
    name: 'Anabela Ramos',
    numberOfGuests: 3,
    qrCodeString: '',
    familySide: 'bride',
    willBeAttending: null,
  },
];
