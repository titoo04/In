export type StateProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
};

export type StateProductCollection = {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  products: StateProduct[];
};

export const stateProducts: StateProduct[] = [
  {
    id: "in-full",
    name: "IN (Full Book)",
    price: "1100 EGP",
    image: "/assets/images/fullBook.png",
  },
  {
    id: "the-noise",
    name: "THE NOISE",
    price: "300 EGP",
    image: "/assets/images/noiseBook.png",
  },
  {
    id: "the-self",
    name: "THE SELF",
    price: "300 EGP",
    image: "/assets/images/selfBook.png",
  },
  {
    id: "the-others",
    name: "THE OTHERS",
    price: "300 EGP",
    image: "/assets/images/othersBook.png",
  },
  {
    id: "the-past",
    name: "THE PAST",
    price: "300 EGP",
    image: "/assets/images/pastBook.png",
  },
  {
    id: "the-quiet",
    name: "THE QUIET",
    price: "300 EGP",
    image: "/assets/images/quietBook.png",
  },
  {
    id: "the-now",
    name: "THE NOW",
    price: "300 EGP",
    image: "/assets/images/nowBook.png",
  },
];

const stateProductsByIdLookup = stateProducts.reduce(
  (acc, product) => {
    acc[product.id] = product;
    return acc;
  },
  {} as Record<string, StateProduct>,
);

const chapterProductIdsByState: Record<string, string> = {
  noise: "the-noise",
  self: "the-self",
  others: "the-others",
  past: "the-past",
  quiet: "the-quiet",
  now: "the-now",
};

export const stateProductCollections: StateProductCollection[] = [
  {
    slug: "noise",
    title: "THE NOISE",
    description: `Thoughts are overlapping,
       jumping from one thing to     another, and it feels hard to 
       slow down.`,
    heroImage: "/assets/images/noiseHero.png",
    products: [
      stateProductsByIdLookup["in-full"],
      stateProductsByIdLookup[chapterProductIdsByState.noise],
    ],
  },
  {
    slug: "self",
    title: "THE SELF",
    description:
      "You have started to notice your thoughts. You are more aware of what is happening in your mind, even if it is still unclear.",
    heroImage: "/assets/images/selfHero.png",
    products: [
      stateProductsByIdLookup["in-full"],
      stateProductsByIdLookup[chapterProductIdsByState.self],
    ],
  },
  {
    slug: "others",
    title: "THE OTHERS",
    description:
      "Some of your thoughts do not fully feel like yours. They come from people around you or expectations you have absorbed.",
    heroImage: "/assets/images/othersHero.png",
    products: [
      stateProductsByIdLookup["in-full"],
      stateProductsByIdLookup[chapterProductIdsByState.others],
    ],
  },
  {
    slug: "past",
    title: "THE PAST",
    description:
      "Certain thoughts keep coming back. They are connected to things you have experienced before.",
    heroImage: "/assets/images/pastHero.png",
    products: [
      stateProductsByIdLookup["in-full"],
      stateProductsByIdLookup[chapterProductIdsByState.past],
    ],
  },
  {
    slug: "quiet",
    title: "THE QUIET",
    description:
      "Things feel a bit calmer. Your thoughts are still there, but they are not as overwhelming as before.",
    heroImage: "/assets/images/quietHero.png",
    products: [
      stateProductsByIdLookup["in-full"],
      stateProductsByIdLookup[chapterProductIdsByState.quiet],
    ],
  },
  {
    slug: "now",
    title: "THE NOW",
    description: `You feel present.
       You are aware of what is happening
        without getting pulled into it.`,
    heroImage: "/assets/images/nowHero.png",
    products: [
      stateProductsByIdLookup["in-full"],
      stateProductsByIdLookup[chapterProductIdsByState.now],
    ],
  },
];

export const stateProductsBySlug = stateProductCollections.reduce(
  (acc, collection) => {
    acc[collection.slug] = collection;
    return acc;
  },
  {} as Record<string, StateProductCollection>,
);

export const stateProductsById = stateProducts.reduce(
  (acc, product) => {
    acc[product.id] = product;
    return acc;
  },
  {} as Record<string, StateProduct>,
);
