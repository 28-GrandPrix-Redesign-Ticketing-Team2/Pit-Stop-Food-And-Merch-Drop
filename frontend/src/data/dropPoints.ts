export interface DropPoint {
  id: string;
  name: string;
  locationDetails: string;
  walkTimeMins: number;
  queueWaitMins: string;
  status: 'fastest' | 'busy' | 'normal';
  availableLockers: number;
  counterNumber: string;
  isRecommended: boolean;
}

export interface ViewingLocation {
  id: string;
  name: string;
  turn: string;
  zoneType: 'Grandstand' | 'General Admission';
  recommendedDropPointId: string;
  dropPoints: DropPoint[];
}

export const VIEWING_LOCATIONS: ViewingLocation[] = [
  {
    id: 'clark',
    name: 'Clark Grandstand',
    turn: 'Turn 9',
    zoneType: 'Grandstand',
    recommendedDropPointId: 'M2',
    dropPoints: [
      {
        id: 'M2',
        name: 'Pit Stop M2 (Turn 9 East)',
        locationDetails: 'Directly behind Clark Grandstand, Entry Gate 3',
        walkTimeMins: 2,
        queueWaitMins: '< 3 mins (Fastest)',
        status: 'fastest',
        availableLockers: 18,
        counterNumber: '#04',
        isRecommended: true,
      },
      {
        id: 'M1',
        name: 'Pit Stop M1 (Main Lawn)',
        locationDetails: 'Main Concession Village, Central Lawn',
        walkTimeMins: 6,
        queueWaitMins: '~ 14 mins (Busy)',
        status: 'busy',
        availableLockers: 4,
        counterNumber: '#12',
        isRecommended: false,
      },
    ],
  },
  {
    id: 'brabham',
    name: 'Brabham Grandstand',
    turn: 'Turn 1 & 2',
    zoneType: 'Grandstand',
    recommendedDropPointId: 'M3',
    dropPoints: [
      {
        id: 'M3',
        name: 'Pit Stop M3 (Turn 1 Infield)',
        locationDetails: 'Behind Brabham Stand 3 concourse',
        walkTimeMins: 2,
        queueWaitMins: '< 2 mins (Fastest)',
        status: 'fastest',
        availableLockers: 22,
        counterNumber: '#02',
        isRecommended: true,
      },
      {
        id: 'M2',
        name: 'Pit Stop M2 (Turn 9 East)',
        locationDetails: 'East Lakeside walk',
        walkTimeMins: 8,
        queueWaitMins: '~ 5 mins',
        status: 'normal',
        availableLockers: 14,
        counterNumber: '#08',
        isRecommended: false,
      },
    ],
  },
  {
    id: 'fangio',
    name: 'Fangio Grandstand',
    turn: 'Pit Straight',
    zoneType: 'Grandstand',
    recommendedDropPointId: 'M1',
    dropPoints: [
      {
        id: 'M1',
        name: 'Pit Stop M1 (Pit Straight Concourse)',
        locationDetails: 'Under Fangio Grandstand Section B',
        walkTimeMins: 1,
        queueWaitMins: '< 4 mins',
        status: 'fastest',
        availableLockers: 30,
        counterNumber: '#01',
        isRecommended: true,
      },
      {
        id: 'M5',
        name: 'Pit Stop M5 (Paddock Annex)',
        locationDetails: 'Behind Support Paddock',
        walkTimeMins: 5,
        queueWaitMins: '~ 8 mins',
        status: 'normal',
        availableLockers: 11,
        counterNumber: '#06',
        isRecommended: false,
      },
    ],
  },
  {
    id: 'senna',
    name: 'Senna Grandstand',
    turn: 'Turn 16 Hairpin',
    zoneType: 'Grandstand',
    recommendedDropPointId: 'M4',
    dropPoints: [
      {
        id: 'M4',
        name: 'Pit Stop M4 (Turn 16 Hairpin)',
        locationDetails: 'Hairpin concourse, Locker Bank D',
        walkTimeMins: 2,
        queueWaitMins: '< 3 mins (Fastest)',
        status: 'fastest',
        availableLockers: 16,
        counterNumber: '#05',
        isRecommended: true,
      },
      {
        id: 'M1',
        name: 'Pit Stop M1 (Main Lawn)',
        locationDetails: 'Central Lawn Village',
        walkTimeMins: 9,
        queueWaitMins: '~ 14 mins (Busy)',
        status: 'busy',
        availableLockers: 3,
        counterNumber: '#12',
        isRecommended: false,
      },
    ],
  },
  {
    id: 'brockys',
    name: "Brocky's Hill GA",
    turn: 'Turn 9 / 10 Viewing Mound',
    zoneType: 'General Admission',
    recommendedDropPointId: 'GA-East',
    dropPoints: [
      {
        id: 'GA-East',
        name: 'Pit Stop GA-East (Lakeside Lawn)',
        locationDetails: 'Base of Brocky\'s Hill viewing mound',
        walkTimeMins: 2,
        queueWaitMins: '< 4 mins (Fastest)',
        status: 'fastest',
        availableLockers: 20,
        counterNumber: '#07',
        isRecommended: true,
      },
      {
        id: 'M2',
        name: 'Pit Stop M2 (Turn 9 East)',
        locationDetails: 'Clark Stand pedestrian walkway',
        walkTimeMins: 5,
        queueWaitMins: '~ 6 mins',
        status: 'normal',
        availableLockers: 12,
        counterNumber: '#04',
        isRecommended: false,
      },
    ],
  },
];
