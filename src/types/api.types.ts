export interface ApiResponse<T> {
   data: T | null;
   error: { message: string } | null;
}

export interface BookingQueryParams {
   date?: string;
   cabinId?: number;
}
