export const queryKeys = {
  services: {
    all:    ['services']                         as const,
    list:   (category?: string) =>
              ['services', 'list', category ?? 'all'] as const,
  },
  barbers: {
    all:  ['barbers']       as const,
    list: () => ['barbers', 'list'] as const,
  },
  gallery: {
    all:  ['gallery']       as const,
    list: (category?: string) =>
            ['gallery', 'list', category ?? 'all'] as const,
  },
  availability: {
    all:   ['availability'] as const,
    slots: (barberId: string, serviceId: string, date: string) =>
             ['availability', 'slots', barberId, serviceId, date] as const,
  },
} as const
