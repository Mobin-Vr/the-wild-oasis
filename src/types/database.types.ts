export interface Cabin {
   id: number;
   name: string;
   maxCapacity: number;
   regularPrice: number;
   discount: number;
   image: string;
   description: string;
}

export interface Guest {
   id?: number;
   fullName: string;
   email: string;
   nationality: string;
   nationalID: string;
   countryFlag: string;
}

export interface Booking {
   id?: number;
   created_at?: string;
   startDate: string;
   endDate: string;
   cabinId: number;
   guestId: number;
   hasBreakfast: boolean;
   observations: string;
   isPaid: boolean;
   numGuests: number;
   guests?: Guest;
   cabins?: Cabin;
}

export interface BookingUpdate {
   startDate?: string;
   endDate?: string;
   isPaid?: boolean;
   hasBreakfast?: boolean;
   numGuests?: number;
   observations?: string;
}

export interface Settings {
   id: number;
   created_at?: string;
   minBookingLength: number;
   maxBookingLength: number;
   maxGuestsPerBooking: number;
   breakfastPrice: number;
}

export interface SettingsUpdate {
   [key: string]: string | number | boolean;
}
