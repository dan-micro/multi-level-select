import type { ReactNode } from 'react';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import { useOnClickOutside } from 'usehooks-ts';

type Props = {
  className?: string;
  label?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
};

const DropdownMobile = forwardRef<HTMLDivElement, Props>(
  ({ children, label, icon, active, className, onClick }, ref) => {
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);

    const handleClickOutside = useCallback(() => {
      setDropdownPopoverShow(false);
    }, []);

    const handleClick = useCallback(() => {
      setDropdownPopoverShow(true);
      onClick?.();
    }, [onClick]);

    const containerRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(containerRef, handleClickOutside);
    useImperativeHandle(ref, () => {
      return {
        blur: handleClickOutside,
      } as any;
    });
    return (
      <div ref={containerRef}>
        <button
          onClick={handleClick}
          className={clsx(
            className,
            'bg-white',
            'font-normal text-sm',
            'px-4 py-2 text-left',
            'w-full',
            {
              'text-gray-400': !active,
              'text-neutral-700': active,
            },
            'hover:bg-gray-100 flex flex-row items-center'
          )}
          type="button"
        >
          {icon && (
            <span className="mr-2 rounded-lg overflow-hidden">{icon}</span>
          )}
          <span className="w-full">{label}</span>
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
        </button>

        <div
          className={clsx(
            clsx(
              'z-50 w-full absolute bottom-0 left-0 right-0',
              dropdownPopoverShow ? 'block' : 'hidden'
            )
          )}
        >
          <ul className="bg-white text-gray-700 text-sm drop-shadow-md rounded-t-md">
            {children}
          </ul>
        </div>
      </div>
    );
  }
);

export default DropdownMobile;
