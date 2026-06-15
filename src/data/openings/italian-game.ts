import type { Opening } from '../../types';

const italianGame: Opening = {
  id: 'italian-game',
  name: 'Italian Game',
  eco: 'C50',
  side: 'white',
  summary:
    "A classical king-pawn opening where White develops the bishop to c4, aiming at Black's weak f7 square and rapid piece development.",
  whyBeginner:
    'It follows the core opening principles perfectly: control the center, develop knights and bishops quickly, and prepare to castle. The plans are natural and easy to understand.',
  keyIdeas: [
    'Target the f7 square with the bishop on c4',
    'Build a strong pawn center with c3 and d4 when possible',
    'Develop knights and bishops before moving the queen',
    'Castle early to keep your king safe',
    'Aim for harmonious piece play rather than early attacks',
  ],
  steps: [
    {
      san: 'e4',
      explanation:
        'White grabs the center and opens lines for the queen and light-squared bishop.',
    },
    {
      san: 'e5',
      explanation: 'Black mirrors, fighting for an equal share of the center.',
    },
    {
      san: 'Nf3',
      explanation: 'White develops a knight and immediately attacks the e5 pawn.',
    },
    {
      san: 'Nc6',
      explanation: 'Black defends e5 and develops a knight toward the center.',
    },
    {
      san: 'Bc4',
      explanation:
        "The defining move: the bishop targets f7, Black's most vulnerable point.",
    },
    {
      san: 'Bc5',
      explanation: "Black mirrors, aiming the bishop at White's f2 weak square.",
    },
    {
      san: 'c3',
      explanation: 'White prepares to build a big pawn center with d4 next.',
    },
    {
      san: 'Nf6',
      explanation: "Black develops the knight and attacks White's e4 pawn.",
    },
    {
      san: 'd3',
      explanation:
        'White solidly defends e4 and opens a path for the c1-bishop (the quiet, safe Giuoco Pianissimo).',
    },
    {
      san: 'd6',
      explanation:
        'Black supports e5 and frees the c8-bishop, keeping a symmetrical, solid structure.',
    },
    {
      san: 'O-O',
      explanation: 'White castles, tucking the king to safety and connecting the rooks.',
    },
    {
      san: 'O-O',
      explanation: 'Black castles as well, completing development and securing the king.',
    },
  ],
};

export default italianGame;
