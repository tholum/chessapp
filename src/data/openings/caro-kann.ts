import type { Opening } from '../../types';

const caroKann: Opening = {
  id: 'caro-kann',
  name: 'Caro-Kann Defense',
  eco: 'B12',
  side: 'black',
  summary:
    "A rock-solid reply to 1.e4 where Black prepares ...d5 with 1...c6, supporting the center with a pawn so that the light-squared bishop can develop outside the pawn chain before ...e6.",
  whyBeginner:
    'It is forgiving and strategically clear: Black gets a sound pawn structure, an active light-squared bishop, and few early tactical traps. You learn good development and solid structures rather than memorizing sharp lines.',
  keyIdeas: [
    'Challenge the center with ...c6 and ...d5',
    'Develop the light-squared bishop to f5 or g4 before playing ...e6',
    'Keep a solid, hard-to-crack pawn structure',
    'Castle early and complete development',
    'Aim for a safe, sound game with few weaknesses',
  ],
  variations: [
    {
      id: 'classical',
      name: 'Classical Variation',
      trigger: 'The main line: White exchanges with 3.Nxe4 after 2.d4 d5.',
      steps: [
        {
          san: 'e4',
          explanation: 'White grabs the center with the king pawn.',
        },
        {
          san: 'c6',
          explanation:
            'Black prepares ...d5 with pawn support — the calm, solid Caro-Kann.',
        },
        {
          san: 'd4',
          explanation: 'White builds a broad two-pawn center.',
        },
        {
          san: 'd5',
          explanation: 'Black strikes at the center immediately, as planned.',
        },
        {
          san: 'Nc3',
          explanation: 'White defends e4 and develops a knight.',
        },
        {
          san: 'dxe4',
          explanation: 'Black trades off the central tension to free the position.',
        },
        {
          san: 'Nxe4',
          explanation: 'White recaptures with a well-placed central knight.',
        },
        {
          san: 'Bf5',
          explanation:
            "The point of the Caro-Kann: Black develops the bishop actively before locking it in with ...e6.",
        },
        {
          san: 'Ng3',
          explanation: "White attacks the bishop to gain a tempo.",
        },
        {
          san: 'Bg6',
          explanation: 'Black retreats the bishop to a safe, useful diagonal.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops the other knight toward the center.',
        },
        {
          san: 'Nd7',
          explanation:
            'Black develops the queenside knight, ready to support ...Ngf6 and ...e6.',
        },
      ],
    },
    {
      id: 'advance',
      name: 'Advance Variation',
      trigger: 'If White grabs space with the Advance Variation 3.e5.',
      steps: [
        {
          san: 'e4',
          explanation: 'White takes the center.',
        },
        {
          san: 'c6',
          explanation: 'Black prepares ...d5 with support.',
        },
        {
          san: 'd4',
          explanation: 'White builds the big center.',
        },
        {
          san: 'd5',
          explanation: 'Black challenges the center right away.',
        },
        {
          san: 'e5',
          explanation: "White pushes past to gain space — the Advance Variation.",
        },
        {
          san: 'Bf5',
          explanation:
            'Black gets the bishop out first, the key Caro-Kann idea, before ...e6 shuts it in.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops the knight and prepares to castle.',
        },
        {
          san: 'e6',
          explanation:
            'Now Black supports d5 with the pawn, having already freed the bishop.',
        },
        {
          san: 'Be2',
          explanation: 'White develops the bishop and readies kingside castling.',
        },
        {
          san: 'Nd7',
          explanation: 'Black develops a knight to support a later ...c5 break.',
        },
        {
          san: 'O-O',
          explanation: 'White castles to safety.',
        },
        {
          san: 'Ne7',
          explanation:
            'Black brings the other knight out, keeping the f5-bishop guarded by ...Ng6 ideas.',
        },
      ],
    },
    {
      id: 'exchange',
      name: 'Exchange Variation',
      trigger: 'If White simplifies with the Exchange Variation 3.exd5.',
      steps: [
        {
          san: 'e4',
          explanation: 'White claims the center.',
        },
        {
          san: 'c6',
          explanation: 'Black prepares the ...d5 break.',
        },
        {
          san: 'd4',
          explanation: 'White supports a strong center.',
        },
        {
          san: 'd5',
          explanation: 'Black challenges immediately.',
        },
        {
          san: 'exd5',
          explanation: "White trades pawns — the simple Exchange Variation.",
        },
        {
          san: 'cxd5',
          explanation:
            'Black recaptures, getting an easy, symmetrical structure with no weaknesses.',
        },
        {
          san: 'Bd3',
          explanation: 'White develops the bishop to an active diagonal.',
        },
        {
          san: 'Nc6',
          explanation: 'Black develops a knight and eyes the d4 pawn.',
        },
        {
          san: 'c3',
          explanation: 'White supports d4 against the pressure.',
        },
        {
          san: 'Nf6',
          explanation: 'Black develops the kingside knight toward the center.',
        },
        {
          san: 'Nf3',
          explanation: 'White develops and prepares to castle.',
        },
        {
          san: 'Bg4',
          explanation:
            'Black develops the bishop actively, pinning the knight to pressure d4.',
        },
      ],
    },
  ],
};

export default caroKann;
