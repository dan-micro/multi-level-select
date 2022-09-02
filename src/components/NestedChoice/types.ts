import type { ReactNode } from 'react';

export type Choice = {
  id: string;
  label: string;
  icon?: ReactNode;
  choices?: Choice[];
};

export type NestedChoiceProps = {
  placeholder: string;
  choices: Choice[];
  onItemClick?: (choice: Choice) => void;
};
