import type { Opening } from '../../types';

const queensGambit: Opening = {
  id: 'queens-gambit',
  name: "Queen's Gambit Declined",
  eco: 'D30',
  side: 'white',
  summary:
    "White offers a flank pawn to deflect Black's central pawn, gaining a strong center and easy development in a classic queen-pawn opening.",
  whyBeginner:
    "It teaches sound central control and harmonious development without sharp tactics, and the 'gambit' is safe because White can usually regain the pawn.",
  keyIdeas: [
    "Use the c4 pawn to pressure and undermine Black's d5 center",
    'Develop pieces toward the center and castle quickly',
    'Pin the f6 knight with Bg5 to increase pressure on d5',
    'Aim for the minority attack or central play in the middlegame',
    'Maintain a strong, flexible pawn center rather than rushing',
  ],
  variations: [
    {
      id: 'main',
      name: 'Main Line',
      trigger: "The Queen's Gambit Declined with 2...e6, the classical main line.",
      steps: [
        {
          san: 'd4',
          explanation: "White takes the center with the queen's pawn.",
        },
        {
          san: 'd5',
          explanation: 'Black stakes an equal claim in the center.',
        },
        {
          san: 'c4',
          explanation:
            "The Queen's Gambit: White offers the c-pawn to pull Black's d-pawn away from the center.",
        },
        {
          san: 'e6',
          explanation:
            'Black declines the gambit, solidly supporting the d5 pawn and opening the f8-bishop.',
        },
        {
          san: 'Nc3',
          explanation: 'White develops a knight and adds pressure on the d5 square.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops and defends d5 again, contesting the center.',
        },
        {
          san: 'Bg5',
          explanation: 'White pins the f6 knight, increasing pressure on d5.',
        },
        {
          san: 'Be7',
          explanation: "Black breaks the pin's sting and prepares to castle.",
        },
        {
          san: 'e3',
          explanation: 'White opens a path for the f1-bishop and solidifies the center.',
        },
        {
          san: 'O-O',
          explanation: 'Black castles to safety, completing kingside development.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops the last minor piece, preparing to castle.',
        },
        {
          san: 'h6',
          explanation:
            'Black questions the bishop, gaining a small kingside foothold before continuing development.',
        },
      ],
    },
    {
      id: 'accepted',
      name: "Queen's Gambit Accepted",
      trigger: 'If Black grabs the pawn with 2...dxc4 instead of declining.',
      steps: [
        {
          san: 'd4',
          explanation: "White takes the center with the queen's pawn.",
        },
        {
          san: 'd5',
          explanation: 'Black stakes an equal claim in the center.',
        },
        {
          san: 'c4',
          explanation: "The Queen's Gambit, offering the c-pawn to deflect d5.",
        },
        {
          san: 'dxc4',
          explanation:
            'Black accepts the gambit; the pawn cannot be safely held for long.',
        },
        {
          san: 'Nf3',
          explanation:
            'White develops calmly, discouraging ...b5 and ...e5 rather than rushing to regain the pawn.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops a knight and controls central squares.',
        },
        {
          san: 'e3',
          explanation: 'White opens the diagonal so the bishop can recapture the c4 pawn.',
        },
        {
          san: 'e6',
          explanation: 'Black opens lines for the dark-squared bishop and prepares to develop.',
        },
        {
          san: 'Bxc4',
          explanation:
            'White regains the gambit pawn and gets an active bishop eyeing f7.',
        },
        {
          san: 'c5',
          explanation: "Black strikes at White's center, the thematic freeing break.",
        },
        {
          san: 'O-O',
          explanation: 'White castles to safety with a comfortable, freer position.',
        },
        {
          san: 'a6',
          explanation: 'Black prepares ...b5 to gain queenside space and develop the bishop.',
        },
      ],
    },
    {
      id: 'slav',
      name: 'Slav Defense',
      trigger: 'If Black supports d5 with 2...c6 instead of 2...e6.',
      steps: [
        {
          san: 'd4',
          explanation: "White takes the center with the queen's pawn.",
        },
        {
          san: 'd5',
          explanation: 'Black stakes an equal claim in the center.',
        },
        {
          san: 'c4',
          explanation: "The Queen's Gambit, pressuring Black's d5 pawn.",
        },
        {
          san: 'c6',
          explanation:
            'The Slav Defense: Black supports d5 with the c-pawn while keeping the c8-bishop free.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops a knight toward the center.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops and defends the d5 pawn again.',
        },
        {
          san: 'Nc3',
          explanation: 'White develops the second knight, piling pressure on d5.',
        },
        {
          san: 'dxc4',
          explanation:
            'Black grabs the pawn, intending ...b5 and ...Bf5 to develop actively.',
        },
        {
          san: 'a4',
          explanation: 'White stops ...b5, ensuring the c4 pawn can be recaptured.',
        },
        {
          san: 'Bf5',
          explanation:
            'Black develops the bishop outside the pawn chain — the whole point of the Slav.',
        },
        {
          san: 'e3',
          explanation: 'White prepares to recapture the pawn and open the f1-bishop.',
        },
        {
          san: 'e6',
          explanation: 'Black opens lines for the dark-squared bishop and prepares to castle.',
        },
        {
          san: 'Bxc4',
          explanation: 'White regains the pawn with a harmonious, well-developed setup.',
        },
        {
          san: 'Bb4',
          explanation: 'Black develops the bishop with a pin, pressuring the c3 knight.',
        },
      ],
    },
  ],
};

export default queensGambit;
