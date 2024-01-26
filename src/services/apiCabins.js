import supabase from './supabase';

export async function getCabins() {
  let { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return cabins;
}
export async function createCabin(newCabin) {
  const { data, error } = await supabase.from('cabins').insert([newCabin]);
  if (error) {
    throw new Error('Error occured while creating a cabin');
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    throw new Error('Error occured while deleting a cabin');
  }
  return null;
}
