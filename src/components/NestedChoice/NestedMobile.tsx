import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import BackIcon from './BackIcon';
import DropdownMobile from './DropdownMobile';
import ItemMobile from './ItemMobile';
import type { Choice } from './types';

type Props = {
  header?: ReactNode;
  label: ReactNode;
  icon?: ReactNode;
  choices?: Choice[];
  active?: boolean;
  className?: string;
  onItemClick?: (choice: Choice) => void;
  onNestedClick?: () => void;
};

const NestedMobile = ({
  choices = [],
  active,
  label,
  className,
  header,
  icon,
  onNestedClick,
  onItemClick,
}: Props) => {
  const [parent, setParent] = useState(false);
  const [nested, setNested] = useState<Choice[]>([]);

  useEffect(() => {
    setNested(choices);
  }, [choices]);

  const ref = useRef<HTMLDivElement>(null);
  if (!choices) {
    return null;
  }

  return (
    <DropdownMobile
      ref={ref}
      label={label}
      active={active}
      icon={icon}
      className={className}
      onClick={onNestedClick}
    >
      {!parent ? (
        header
      ) : (
        <ItemMobile
          icon={<BackIcon />}
          onClick={() => {
            setParent(false);
            setNested(choices);
          }}
        >
          {' '}
        </ItemMobile>
      )}
      {nested.map((i) => {
        return (
          <ItemMobile
            key={i.id}
            icon={i.icon}
            hasChoices={!!i.choices}
            onClick={() => {
              if (i.choices) {
                setParent(true);
                setNested(i.choices);
                return;
              }
              onItemClick?.(i);
              ref.current?.blur();
            }}
          >
            {i.label}
          </ItemMobile>
        );
      })}
    </DropdownMobile>
  );
};

export default NestedMobile;
