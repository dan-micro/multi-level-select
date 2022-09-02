import type { ReactNode } from 'react';
import { useRef } from 'react';
import type { Placement } from '@popperjs/core';

import Dropdown from './Dropdown';
import DropdownMobile from './DropdownMobile';
import Item from './Item';
import type { Choice } from './types';
import useIsMobile from './useIsMobile';

type Props = {
  header?: ReactNode;
  label: ReactNode;
  icon?: ReactNode;
  choices?: Choice[];
  active?: boolean;
  className?: string;
  placement?: Placement;
  onItemClick?: (choice: Choice) => void;
};

const Nested = ({
  choices,
  header,
  active,
  label,
  className,
  placement = 'bottom-start',
  icon,
  onItemClick,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  if (!choices) {
    return null;
  }
  return (
    <Dropdown
      ref={ref}
      label={label}
      active={active}
      icon={icon}
      className={className}
      placement={placement}
    >
      {header}
      {choices.map((i) => {
        if (i.choices) {
          return (
            <Nested
              key={i.id}
              label={i.label}
              icon={i.icon}
              choices={i.choices}
              active
              onItemClick={(d) => {
                ref.current?.blur();
                onItemClick?.(d);
              }}
              placement="right-start"
            />
          );
        }
        return (
          <Item
            key={i.id}
            icon={i.icon}
            onClick={() => {
              onItemClick?.(i);
              ref.current?.blur();
            }}
          >
            {i.label}
          </Item>
        );
      })}
    </Dropdown>
  );
};

export default Nested;
