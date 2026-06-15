import type { Opening } from '../../types';

const ruyLopez: Opening = {
  id: 'ruy-lopez',
  name: 'Ruy Lopez (Spanish)',
  eco: 'C60',
  side: 'white',
  summary:
    'One of the oldest and most respected openings, where White pins or pressures the knight defending e5 with Bb5, building long-term positional pressure.',
  whyBeginner:
    'It teaches deep opening principles: indirect pressure on the center, smart piece placement, and the value of the bishop pair, while remaining solid and well-mapped.',
  keyIdeas: [
    'Apply indirect pressure on e5 via the pinned knight',
    'Keep the strong light-squared bishop active and retreat it rather than trade',
    'Castle early and use Re1 to support the center',
    'Aim for the d4 break to challenge Black\'s center later',
    'Play for slow positional buildup and the bishop pair',
  ],
  steps: [
    {
      san: 'e4',
      explanation: 'White claims the center and frees pieces.',
    },
    {
      san: 'e5',
      explanation: 'Black contests the center symmetrically.',
    },
    {
      san: 'Nf3',
      explanation: 'White develops and attacks the e5 pawn.',
    },
    {
      san: 'Nc6',
      explanation: 'Black defends e5 with a developing move.',
    },
    {
      san: 'Bb5',
      explanation:
        'The Spanish move: the bishop pins the knight to indirectly pressure the e5 pawn.',
    },
    {
      san: 'a6',
      explanation:
        "Black's Morphy Defense, asking the bishop to declare its intentions.",
    },
    {
      san: 'Ba4',
      explanation:
        'White keeps the bishop on the strong diagonal rather than trading it off.',
    },
    {
      san: 'Nf6',
      explanation: 'Black develops and attacks the e4 pawn, gaining a tempo.',
    },
    {
      san: 'O-O',
      explanation:
        "White castles to safety and sidesteps worries about defending e4 (it's protected indirectly).",
    },
    {
      san: 'Be7',
      explanation:
        'Black develops the bishop to a solid square, preparing to castle.',
    },
    {
      san: 'Re1',
      explanation:
        'White puts the rook on the e-file, reinforcing the e4 pawn and central pressure.',
    },
    {
      san: 'b5',
      explanation: 'Black gains space on the queenside and kicks the bishop away.',
    },
    {
      san: 'Bb3',
      explanation:
        'The bishop retreats to a great diagonal, again eyeing the sensitive f7 square.',
    },
    {
      san: 'd6',
      explanation:
        'Black solidifies e5 and opens lines for development, reaching a classic Closed Ruy Lopez.',
    },
  ],
};

export default ruyLopez;
