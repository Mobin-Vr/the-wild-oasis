import supabase from './supabase';
import type { Cabin } from '../types';
import type { CabinFormData } from '../features/cabins/types';

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

export async function createCabin(newCabin: CabinFormData): Promise<Cabin[]> {
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;

   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      '/',
      '',
   );

   // Build the full image URL path
   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

   // 1. Create cabin
   const { data, error } = await supabase
      .from('cabins')
      .insert([{ ...newCabin, image: imagePath }])
      .select();

   if (error) {
      console.error(error);
      throw new Error('Cabin could not be created');
   }

   // 2. Upload the image
   const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

   // 3. Delete the cabin if the image upload fails
   if (storageError) {
      await supabase.from('cabins').delete().eq('id', data?.[0]?.id);
      console.error(storageError);
      throw new Error(
         'Cabin image could not be uploaded and the cabin was not created',
      );
   }

   return data || [];
}
