import type { Opening } from '../../types';

const scotchGame: Opening = {
  id: 'scotch-game',
  name: 'Scotch Game',
  eco: 'C45',
  side: 'white',
  summary:
    'An open, classical king-pawn opening where White strikes in the center with 3.d4 immediately, trading off a central pawn to free the pieces and open lines for rapid development.',
  whyBeginner:
    'The Scotch teaches the value of an early central break. After 3.d4 the position opens up quickly, so good piece activity and king safety matter most — exactly the principles beginners should practice.',
  keyIdeas: [
    'Break the center early with d4 to open lines',
    'Recapture on d4 with a centralized, active knight',
    'Develop pieces quickly toward the center',
    'Castle early and keep the king safe',
    'Use your space and active pieces to pressure Black',
  ],
  variations: [
    {
      id: 'classical',
      name: 'Classical Variation',
      trigger: 'Black develops naturally with 4...Bc5, hitting the d4-knight — the main line.',
      steps: [
        {
          san: 'e4',
          explanation:
            'White claims the center and opens lines for the queen and light-squared bishop.',
        },
        {
          san: 'e5',
          explanation: 'Black mirrors, fighting for an equal share of the center.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops a knight and attacks the e5 pawn at once.',
        },
        {
          san: 'Nc6',
          explanation: 'Black defends e5 and develops a knight toward the center.',
        },
        {
          san: 'd4',
          explanation:
            'The defining Scotch move: White strikes in the center to open the position immediately.',
        },
        {
          san: 'exd4',
          explanation: 'Black captures, since otherwise White would win the e5 pawn.',
        },
        {
          san: 'Nxd4',
          explanation:
            'White recaptures with a strong, centralized knight that controls many squares.',
        },
        {
          san: 'Bc5',
          explanation:
            'Black develops the bishop actively, attacking the centralized knight on d4.',
        },
        {
          san: 'Be3',
          explanation:
            'White supports the d4-knight and develops the bishop, preparing to castle.',
        },
        {
          san: 'Qf6',
          explanation:
            'Black piles up on the d4-knight while developing the queen toward the kingside.',
        },
        {
          san: 'c3',
          explanation:
            'White reinforces the d4-knight and gives the queen a retreat square on c2.',
        },
        {
          san: 'Nge7',
          explanation:
            'Black develops the other knight, keeping the f-file clear for the queen.',
        },
      ],
    },
    {
      id: 'schmidt',
      name: 'Schmidt Variation',
      trigger: 'If Black replies 4...Nf6, counterattacking the e4 pawn.',
      steps: [
        { san: 'e4', explanation: 'White takes the center.' },
        { san: 'e5', explanation: 'Black answers symmetrically.' },
        { san: 'Nf3', explanation: 'Develop the knight and hit e5.' },
        { san: 'Nc6', explanation: 'Black defends the e5 pawn.' },
        {
          san: 'd4',
          explanation: 'White breaks open the center, the heart of the Scotch.',
        },
        { san: 'exd4', explanation: 'Black captures the d4 pawn.' },
        {
          san: 'Nxd4',
          explanation: 'White recaptures with a centralized knight.',
        },
        {
          san: 'Nf6',
          explanation:
            "Instead of ...Bc5, Black counterattacks White's e4 pawn — the Schmidt Variation.",
        },
        {
          san: 'Nxc6',
          explanation:
            'White trades off the active knight, damaging Black’s pawn structure.',
        },
        {
          san: 'bxc6',
          explanation:
            'Black recaptures toward the center but is left with doubled c-pawns.',
        },
        {
          san: 'e5',
          explanation:
            'White gains space and kicks the f6-knight, seizing the initiative.',
        },
        {
          san: 'Qe7',
          explanation:
            'Black pins the e5 pawn to develop the queen and regain the pawn safely.',
        },
      ],
    },
  ],
};

export default scotchGame;
