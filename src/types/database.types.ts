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
