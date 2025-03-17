import { faker } from '@faker-js/faker';

function generateFakeEventData() {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    organisingClub: faker.commerce.department(),
    date: faker.date.future(),
    time: faker.date.future(),
    venue: faker.location.streetAddress(),
    poster: faker.image.url(),
    rules : [
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
    ]
  };
}

const fakeEvents = Array.from({ length: 5 }, generateFakeEventData);

export const eventsData = [
  {
    label: 'Techtix',
    description:
      "Espektro, KGEC's annual extravaganza, seamlessly merges technology and creativity, offering a vibrant experience. Days brim with technical competitions, while evenings dazzle with performances by renowned artists, spotlighting both engineering prowess and cultural richness within KGEC's student community",
    days: [
      {
        day: 0,
        events: fakeEvents,
      },
      {
        day: 1,
        events: fakeEvents,
      },
      {
        day: 2,
        events: fakeEvents,
      },
      {
        day: 3,
        events: fakeEvents,
      },
    ],
  },
  {
    label: 'Exotica',
    description:
      "Espektro, KGEC's annual extravaganza, seamlessly merges technology and creativity, offering a vibrant experience. Days brim with technical competitions, while evenings dazzle with performances by renowned artists, spotlighting both engineering prowess and cultural richness within KGEC's student community",
    days: [
      {
        day: 0,
        events: fakeEvents,
      },
      {
        day: 1,
        events: fakeEvents,
      },
      {
        day: 2,
        events: fakeEvents,
      },
      {
        day: 3,
        events: fakeEvents,
      },
    ],
  },
  {
    label: 'Quixine',
    description:
      "Espektro, KGEC's annual extravaganza, seamlessly merges technology and creativity, offering a vibrant experience. Days brim with technical competitions, while evenings dazzle with performances by renowned artists, spotlighting both engineering prowess and cultural richness within KGEC's student community",
    days: [
      {
        day: 0,
        events: fakeEvents,
      },
      {
        day: 1,
        events: fakeEvents,
      },
      {
        day: 2,
        events: fakeEvents,
      },
      {
        day: 3,
        events: fakeEvents,
      },
    ],
  },
];
