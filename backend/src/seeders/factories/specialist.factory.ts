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
      image:
        'https://ik.imagekit.io/dianerdiana/sehatmurah/specialists/doctorsearch-modal-cardiology.png',
      isActive: true,
      sortOrder: 1,
    } as ISpecialistSeed,
    {
      name: 'Dermatologist',
      slug: 'dermatologist',
      description: 'Skin disease specialist',
      icon: '🧴',
      image:
        'https://ik.imagekit.io/dianerdiana/sehatmurah/specialists/doctorsearch-modal-dermatology.png',
      isActive: true,
      sortOrder: 2,
    } as ISpecialistSeed,
    {
      name: 'Orthopedic',
      slug: 'orthopedic',
      description: 'Bone and joint specialist',
      icon: '🦴',
      image: 'https://ik.imagekit.io/dianerdiana/sehatmurah/specialists/orthopedic.webp',
      isActive: true,
      sortOrder: 3,
    } as ISpecialistSeed,
    {
      name: 'Pediatrician',
      slug: 'pediatrician',
      description: 'Children health specialist',
      icon: '👶',
      image:
        'https://ik.imagekit.io/dianerdiana/sehatmurah/specialists/doctorsearch-modal-pediatric.png',
      isActive: true,
      sortOrder: 4,
    } as ISpecialistSeed,
    {
      name: 'General Practitioner',
      slug: 'general-practitioner',
      description: 'General health and wellness',
      icon: '⚕️',
      image:
        'https://ik.imagekit.io/dianerdiana/sehatmurah/specialists/homepage-specialist-cardiology.png',
      isActive: true,
      sortOrder: 5,
    } as ISpecialistSeed,
    {
      name: 'Neurologist',
      slug: 'neurologist',
      description: 'Nervous system specialist',
      icon: '🧬',
      image:
        'https://ik.imagekit.io/dianerdiana/sehatmurah/specialists/doctorsearch-modal-neurology.png',
      isActive: true,
      sortOrder: 6,
    } as ISpecialistSeed,
    {
      name: 'Ophthalmologist',
      slug: 'ophthalmologist',
      description: 'Eye care specialist',
      icon: '👁️',
      image:
        'https://ik.imagekit.io/dianerdiana/sehatmurah/specialists/doctorsearch-modal-ophthalmology.png',
      isActive: true,
      sortOrder: 7,
    } as ISpecialistSeed,
  ];
}
