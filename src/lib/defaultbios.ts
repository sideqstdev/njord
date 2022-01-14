export const bios = [
  `Forcing kayle... ☀️`,
  `First or eighth... 🎰`,
  `Space pirates... 🚀☠️`,
  `Just hit... 🎯🙌`,
  `Going fast 9... 🥇`,
  `Fortune baby... 🤑`,
  `Hardstuck... 💎`,
  `Unlucky... 😢`,
  `Donkey roll... 🐴`,
  `Its an eighth... 😞`,
  `Highroll... 🏦`,
  `Hyper Roll ftw... ⚡`,
  `Stinky Chemtech 🧪`,
  `Academics anyone? 🤓`,
  `Top 4! 😀`,
  // add more as community suggestions
];

export const randomBio = (): string => {
  const random = Math.floor(Math.random() * bios.length);
  return bios[random];
};
