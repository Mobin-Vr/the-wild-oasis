import type { Cabin } from '../../types';

export interface CabinRowProps {
   cabin: Cabin;
}

export type CabinFormData = Omit<Cabin, 'id' | 'image'> & {
   image: File;
};
