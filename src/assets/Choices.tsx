/* eslint-disable @next/next/no-img-element */
import type { Choice } from '../components/NestedChoice/types';

import BlockoImg from './Bloko.png';
import BrixoImg from './Brixo.png';
import HexiImg from './Hexi.png';
import HobroxImg from './Hobrox.png';
import OvalImg from './Oval.png';
import TrioImg from './Trio.png';

const choices: Choice[] = [
  {
    id: 'Bloko',
    icon: <img width={40} height={40} alt="Blocko" src={BlockoImg.src} />,
    label: 'Bloko',
    choices: [
      {
        id: 'Trio',
        icon: <img alt="Trio" src={TrioImg.src} width={40} height={40} />,
        label: 'Trio',
      },
      {
        id: 'Oval',
        icon: <img alt="Oval" src={OvalImg.src} width={40} height={40} />,
        label: 'Oval',
      },
      {
        id: 'Hexi',
        icon: <img alt="Hexi" src={HexiImg.src} width={40} height={40} />,
        label: 'Hexi',
      },
    ],
  },
  {
    id: 'Brixo',
    label: 'Brixo',
    icon: <img alt="Brixo" src={BrixoImg.src} width={40} height={40} />,
  },
  {
    id: 'Trio',
    icon: <img alt="Trio" src={TrioImg.src} width={40} height={40} />,
    label: 'Trio',
  },
  {
    id: 'Hobrox',
    icon: <img alt="Hobrox" src={HobroxImg.src} width={40} height={40} />,
    label: 'Hobrox',
  },
  {
    id: 'Oval',
    icon: <img alt="Oval" src={OvalImg.src} width={40} height={40} />,
    label: 'Oval',
  },
  {
    id: 'Hexi',
    icon: <img alt="Hexi" src={HexiImg.src} width={40} height={40} />,
    label: 'Hexi',
  },
];

export default choices;
