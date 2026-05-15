export interface ISpecialistSeed {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
}

export function generateSpecialists(): ISpecialistSeed[] {
  return [
    {
      name: 'Cardiologist',
      slug: 'cardiologist',
      description: 'Heart and cardiovascular disease specialist',
      icon: '❤️',
      image: 'https://via.placeholder.com/150?text=Cardiologist',
      isActive: true,
      sortOrder: 1,
    } as ISpecialistSeed,
    {
      name: 'Dermatologist',
      slug: 'dermatologist',
      description: 'Skin disease specialist',
      icon: '🧴',
      image: 'https://via.placeholder.com/150?text=Dermatologist',
      isActive: true,
      sortOrder: 2,
    } as ISpecialistSeed,
    {
      name: 'Orthopedic',
      slug: 'orthopedic',
      description: 'Bone and joint specialist',
      icon: '🦴',
      image: 'https://via.placeholder.com/150?text=Orthopedic',
      isActive: true,
      sortOrder: 3,
    } as ISpecialistSeed,
    {
      name: 'Pediatrician',
      slug: 'pediatrician',
      description: 'Children health specialist',
      icon: '👶',
      image: 'https://via.placeholder.com/150?text=Pediatrician',
      isActive: true,
      sortOrder: 4,
    } as ISpecialistSeed,
    {
      name: 'Psychiatrist',
      slug: 'psychiatrist',
      description: 'Mental health specialist',
      icon: '🧠',
      image: 'https://via.placeholder.com/150?text=Psychiatrist',
      isActive: true,
      sortOrder: 5,
    } as ISpecialistSeed,
    {
      name: 'General Practitioner',
      slug: 'general-practitioner',
      description: 'General health and wellness',
      icon: '⚕️',
      image: 'https://via.placeholder.com/150?text=General+Practitioner',
      isActive: true,
      sortOrder: 6,
    } as ISpecialistSeed,
    {
      name: 'Neurologist',
      slug: 'neurologist',
      description: 'Nervous system specialist',
      icon: '🧬',
      image: 'https://via.placeholder.com/150?text=Neurologist',
      isActive: true,
      sortOrder: 7,
    } as ISpecialistSeed,
    {
      name: 'Ophthalmologist',
      slug: 'ophthalmologist',
      description: 'Eye care specialist',
      icon: '👁️',
      image: 'https://via.placeholder.com/150?text=Ophthalmologist',
      isActive: true,
      sortOrder: 8,
    } as ISpecialistSeed,
  ];
}
