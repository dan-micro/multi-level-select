import type { MouseEventHandler, ReactNode } from 'react';
import { memo } from 'react';

type Props = {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: MouseEventHandler;
};

const Item = ({ children, icon, onClick }: Props) => {
  if (!children) return null;
  return (
    <li>
      <button
        onClick={onClick}
        className="py-2 px-4 hover:bg-gray-100 flex flex-row items-center w-full"
      >
        <span className="mr-2 rounded-lg overflow-hidden">{icon}</span>
        {children}
      </button>
    </li>
  );
};

export default memo(Item);
