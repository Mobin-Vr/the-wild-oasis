import type { Cabin } from '../../types';

export interface CabinRowProps {
   cabin: Cabin;
}

// Type for react-hook-form output
export type CabinFormData = Omit<Cabin, 'id' | 'image'> & {
   image: FileList | string;
};

// Type for API calls
export type CabinApiData = Omit<Cabin, 'id' | 'image'> & {
   image: File | string;
};

export interface CreateCabinFormProps {
   cabinToEdit?: Cabin;
   onShowForm?: (updater: (show: boolean) => boolean) => void;
   onCloseModal?: () => void;
}
