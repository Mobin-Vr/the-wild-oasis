import supabase from './supabase';
import type { Cabin } from '../types';
import type { CabinApiData } from '../features/cabins/types';

export async function getCabins(): Promise<Cabin[]> {
   const { data, error } = await supabase.from('cabins').select('*');

   if (error) {
      console.error(error);
      throw new Error('Cabins could not be loaded');
   }

   return data || [];
}

export async function deleteCabin(id: number): Promise<Cabin[]> {
   const { data, error } = await supabase.from('cabins').delete().eq('id', id);

   if (error) {
      console.error(error);
      throw new Error('Cabin could not be deleted');
   }

   return data || [];
}

export async function createEditCabin(
   newCabin: CabinApiData,
   id?: number,
): Promise<Cabin> {
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;

   // Check if image is already uploaded (edit session without new image)
   const hasImagePath =
      typeof newCabin.image === 'string' &&
      newCabin.image.startsWith(supabaseUrl);

   // Generate unique filename only for new image uploads
   const imageName = hasImagePath
      ? ''
      : `${Math.random()}-${(newCabin.image as File).name}`.replaceAll('/', '');

   // Use existing path or build new storage URL
   const imagePath = hasImagePath
      ? (newCabin.image as string)
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

   // 1. Create or edit cabin record
   let queryBuilder;
   if (!id) {
      queryBuilder = supabase
         .from('cabins')
         .insert([{ ...newCabin, image: imagePath }]);
   } else {
      queryBuilder = supabase
         .from('cabins')
         .update({ ...newCabin, image: imagePath })
         .eq('id', id);
   }

   const { data, error } = await queryBuilder.select().single();

   if (error) {
      console.error(error);
      throw new Error('Cabin could not be created');
   }

   // 2. Upload image only if a new file was provided
   if (!hasImagePath) {
      const { error: storageError } = await supabase.storage
         .from('cabin-images')
         .upload(imageName, newCabin.image as File);

      // 3. Roll back cabin record if image upload fails
      if (storageError) {
         await supabase
            .from('cabins')
            .delete()
            .eq('id', (data as Cabin).id);
         console.error(storageError);
         throw new Error(
            'Cabin image could not be uploaded and the cabin was not created',
         );
      }
   }

   return data as Cabin;
}
