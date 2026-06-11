export const prototypeAssets = {
  logoUnderline:
    "https://www.figma.com/api/mcp/asset/a48d74ed-abed-4370-a19e-41e98244eeb5",
  introBackground:
    "https://www.figma.com/api/mcp/asset/3230236a-a84c-454e-8f86-955a50c76fd2",
  noiseBackground:
  "/assets/images/TheNoiseBg.png",
  selfBackground:
  "/assets/images/TheSelfBg.png",
  pastBackground:
  "/assets/images/ThePastBg.png",
  quietBackground:
  "/assets/images/TheQuietBg.png",
  nowBackground:
  "/assets/images/TheNowBg.png",
  othersBackground:
    "/assets/images/TheOthersBg.png",
  scrollArrow:
    "https://www.figma.com/api/mcp/asset/38978f63-f32f-47c7-86b5-0b9f0402bae5",
};

export type StateScreen = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundClass?: string;
};

export const states: StateScreen[] = [
  {
    slug: "noise",
    index: "1/6",
    title: "THE NOISE",
    subtitle:
      "EVERYTHING HAPPENS AT ONCE. IT FILLS YOUR MIND BEFORE YOU EVEN NOTICE IT.",
    backgroundImage: prototypeAssets.noiseBackground,
  },
  {
    slug: "self",
    index: "2/6",
    title: "THE SELF",
    subtitle:
      "YOU HAVE STARTED TO NOTICE YOUR THOUGHTS. YOU ARE MORE AWARE OF WHAT IS HAPPENING, EVEN IF IT IS STILL UNCLEAR.",
    backgroundClass:
      "bg-[radial-gradient(circle_at_top,_#3a3a3a,_#111111)]",
      backgroundImage: prototypeAssets.selfBackground,
  },
  {
    slug: "others",
    index: "3/6",
    title: "THE OTHERS",
    subtitle:
      "AND AS YOU LOOK CLOSER, IT BECOMES UNCLEAR WHERE IT ALL COMES FROM. NOT ALL OF IT BEGINS WITHIN YOU.",
    backgroundImage: prototypeAssets.othersBackground,
  },
  {
    slug: "past",
    index: "4/6",
    title: "THE PAST",
    subtitle:
      "CERTAIN THOUGHTS KEEP COMING BACK. THEY ARE CONNECTED TO THINGS YOU HAVE EXPERIENCED BEFORE.",
    backgroundClass:
      "bg-[radial-gradient(circle_at_top,_#5a3c2b,_#140b08)]",
      backgroundImage: prototypeAssets.pastBackground,
  },
  {
    slug: "quiet",
    index: "5/6",
    title: "THE QUIET",
    subtitle:
      "THINGS FEEL CALMER. YOUR THOUGHTS ARE STILL THERE, BUT THEY ARE NOT AS OVERWHELMING.",
    backgroundClass:
      "bg-[linear-gradient(135deg,_#4b5b69,_#0f141d)]",
      backgroundImage: prototypeAssets.quietBackground,
  },
  {
    slug: "now",
    index: "6/6",
    title: "THE NOW",
    subtitle:
      "YOU FEEL PRESENT. YOU ARE AWARE OF WHAT IS HAPPENING WITHOUT GETTING PULLED INTO IT.",
    backgroundClass:
      "bg-[linear-gradient(135deg,_#4a4a4a,_#141414)]",
      backgroundImage: prototypeAssets.nowBackground,
  },
];

export type ShopItem = 
{
  id: string;
  name: string;
  price: string;
  slug: string;
};

export const shopItems: ShopItem[] = [
  {
    id: "in-full",
    name: "IN (FULL BOOK)",
    price: "1100 EGP",
    slug: "in-full",
  },
  {
    id: "the-noise",
    name: "THE NOISE",
    price: "300 EGP",
    slug: "the-noise",
  },
  {
    id: "the-self",
    name: "THE SELF",
    price: "300 EGP",
    slug: "the-self",
  },
  {
    id: "the-others",
    name: "THE OTHERS",
    price: "300 EGP",
    slug: "the-others",
  },
  {
    id: "the-past",
    name: "THE PAST",
    price: "300 EGP",
    slug: "the-past",
  },
  {
    id: "the-quiet",
    name: "THE QUIET",
    price: "300 EGP",
    slug: "the-quiet",
  },
  {
    id: "the-now",
    name: "THE NOW",
    price: "300 EGP",
    slug: "the-now",
  },
  {
    id: "the-journal",
    name: "THE JOURNAL",
    price: "250 EGP",
    slug: "the-journal",
  },
  {
    id: "full-set",
    name: "FULL SET",
    price: "900 EGP",
    slug: "full-set",
  },
];

export const shopCopyByState: Record<string, string> = {
  noise:
    "Thoughts are overlapping, jumping from one thing to another, and it feels hard to slow down.",
  self:
    "You have started to notice your thoughts. You are more aware of what is happening in your mind, even if it is still unclear.",
  others:
    "Some of your thoughts do not fully feel like yours. They come from people around you or expectations you have absorbed.",
  past:
    "Certain thoughts keep coming back. They are connected to things you have experienced before.",
  quiet:
    "Things feel a bit calmer. Your thoughts are still there, but they are not as overwhelming as before.",
  now:
    "You feel present. You are aware of what is happening without getting pulled into it.",
};
