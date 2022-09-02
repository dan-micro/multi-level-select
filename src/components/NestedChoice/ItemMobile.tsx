import type { MouseEventHandler, ReactNode } from 'react';
import { memo } from 'react';

type Props = {
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: MouseEventHandler;
  hasChoices?: boolean;
};

const Item = ({ children, icon, onClick, hasChoices }: Props) => {
  if (!children) return null;
  return (
    <li>
      <button
        onClick={onClick}
        className="py-2 px-4 hover:bg-gray-100 flex flex-row items-center w-full bg-white"
      >
        <span className="mr-2 rounded-lg overflow-hidden">{icon}</span>
        <span className="w-full text-start">{children}</span>
        {hasChoices && (
          <svg
            className="ml-2 w-4 h-4 -rotate-90"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        )}
      </button>
    </li>
  );
};

export default memo(Item);
