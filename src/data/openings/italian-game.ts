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
  variations: [
    {
      id: 'giuoco-pianissimo',
      name: 'Giuoco Pianissimo',
      trigger: "Black mirrors with 3...Bc5 — the classical, symmetrical main line.",
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
          explanation:
            'White develops a knight and immediately attacks the e5 pawn.',
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
          explanation:
            "Black mirrors, aiming the bishop at White's f2 weak square.",
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
          explanation:
            'White castles, tucking the king to safety and connecting the rooks.',
        },
        {
          san: 'O-O',
          explanation:
            'Black castles as well, completing development and securing the king.',
        },
      ],
    },
    {
      id: 'two-knights',
      name: 'Two Knights Defense',
      trigger: 'If Black plays 3...Nf6, counterattacking your e4 pawn at once.',
      steps: [
        {
          san: 'e4',
          explanation: 'White grabs the center.',
        },
        { san: 'e5', explanation: 'Black contests the center.' },
        { san: 'Nf3', explanation: 'Develop and hit the e5 pawn.' },
        { san: 'Nc6', explanation: 'Black defends e5.' },
        {
          san: 'Bc4',
          explanation: 'The Italian bishop eyes f7.',
        },
        {
          san: 'Nf6',
          explanation:
            "Instead of mirroring, Black counterattacks e4 — the aggressive Two Knights Defense.",
        },
        {
          san: 'd3',
          explanation:
            'The calm, beginner-friendly reply: defend e4 and keep a solid Italian structure (avoiding the sharp Fried Liver complications of 4.Ng5).',
        },
        {
          san: 'Bc5',
          explanation: 'Black develops the bishop actively, eyeing f2.',
        },
        {
          san: 'O-O',
          explanation: 'White castles into safety and gets the rook into play.',
        },
        {
          san: 'O-O',
          explanation: 'Black castles too, finishing development.',
        },
      ],
    },
    {
      id: 'hungarian',
      name: 'Hungarian Defense',
      trigger: 'If Black plays the solid-but-passive 3...Be7.',
      steps: [
        { san: 'e4', explanation: 'White takes the center.' },
        { san: 'e5', explanation: 'Black answers symmetrically.' },
        { san: 'Nf3', explanation: 'Develop and attack e5.' },
        { san: 'Nc6', explanation: 'Black defends the pawn.' },
        { san: 'Bc4', explanation: 'The bishop takes aim at f7.' },
        {
          san: 'Be7',
          explanation:
            'Black sidesteps the sharp lines with a modest developing move — the Hungarian Defense.',
        },
        {
          san: 'd4',
          explanation:
            "White seizes the chance to grab the full center, since Black's setup is passive.",
        },
        {
          san: 'exd4',
          explanation: 'Black captures to avoid being squeezed.',
        },
        {
          san: 'Nxd4',
          explanation:
            'White recaptures with a beautifully centralized knight and a clear space advantage.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops and pressures e4.',
        },
        {
          san: 'O-O',
          explanation: 'White castles, ready to enjoy the freer position.',
        },
        {
          san: 'O-O',
          explanation: 'Black castles to safety.',
        },
      ],
    },
  ],
};

export default italianGame;
