import type { Opening } from '../../types';

const scandinavian: Opening = {
  id: 'scandinavian',
  name: 'Scandinavian Defense',
  eco: 'B01',
  side: 'black',
  summary:
    "A direct reply to 1.e4 where Black plays 1...d5 to trade off White's center pawn immediately. After 2.exd5 Qxd5, Black gets quick development and a clear, easy-to-learn plan.",
  whyBeginner:
    'It is one of the easiest defenses to learn: you challenge the center on move one, the main lines are short and logical, and you reach a sound position with natural development on almost every move.',
  keyIdeas: [
    "Challenge White's center immediately with 1...d5",
    'Recapture and develop with tempo when the queen is attacked',
    'Retreat the queen to a safe, active square (a5 or d6)',
    'Develop the light-squared bishop actively, often to f5 or g4',
    'Castle queenside or kingside and keep a solid structure',
  ],
  variations: [
    {
      id: 'main-qa5',
      name: 'Main Line (3...Qa5)',
      trigger: 'The classic main line: after 3.Nc3 Black retreats with 3...Qa5.',
      steps: [
        {
          san: 'e4',
          explanation: 'White grabs the center.',
        },
        {
          san: 'd5',
          explanation:
            "Black challenges the center at once — the Scandinavian Defense.",
        },
        {
          san: 'exd5',
          explanation: 'White captures the offered pawn.',
        },
        {
          san: 'Qxd5',
          explanation: 'Black recaptures with the queen to regain the pawn.',
        },
        {
          san: 'Nc3',
          explanation: "White develops a knight and attacks the queen with tempo.",
        },
        {
          san: 'Qa5',
          explanation:
            'Black retreats the queen to a safe, active diagonal — the main line.',
        },
        {
          san: 'd4',
          explanation: 'White takes a big center now that the queen has moved.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops a knight toward the center.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops the other knight.',
        },
        {
          san: 'c6',
          explanation:
            'Black gives the queen a retreat square on c7 and shores up d5/b5.',
        },
        {
          san: 'Bc4',
          explanation: 'White develops the bishop to an active diagonal.',
        },
        {
          san: 'Bf5',
          explanation:
            'Black develops the bishop actively before playing ...e6.',
        },
      ],
    },
    {
      id: 'qd6',
      name: 'Modern (3...Qd6)',
      trigger: 'If you prefer the modern queen retreat to d6 after 3.Nc3.',
      steps: [
        {
          san: 'e4',
          explanation: 'White takes the center.',
        },
        {
          san: 'd5',
          explanation: 'Black challenges the center immediately.',
        },
        {
          san: 'exd5',
          explanation: 'White captures the pawn.',
        },
        {
          san: 'Qxd5',
          explanation: 'Black recaptures to regain the pawn.',
        },
        {
          san: 'Nc3',
          explanation: 'White develops and hits the queen.',
        },
        {
          san: 'Qd6',
          explanation:
            'Black retreats to d6 — the flexible modern line, keeping the queen central but safe.',
        },
        {
          san: 'd4',
          explanation: 'White builds a strong center.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops a knight toward the center.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops the second knight.',
        },
        {
          san: 'a6',
          explanation:
            'Black makes luft and stops Nb5 ideas hitting the queen on d6.',
        },
        {
          san: 'g3',
          explanation: 'White prepares to fianchetto the bishop.',
        },
        {
          san: 'Bg4',
          explanation:
            'Black develops the bishop actively, pinning the f3-knight.',
        },
      ],
    },
  ],
};

export default scandinavian;
