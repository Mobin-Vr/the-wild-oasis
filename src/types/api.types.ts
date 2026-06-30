export interface ApiResponse<T> {
   data: T | null;
   error: { message: string } | null;
}

export interface BookingQueryParams {
   date?: string;
   cabinId?: number;
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
