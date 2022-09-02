import type { ReactNode } from 'react';
import {
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type { Instance, Placement } from '@popperjs/core';
import { createPopper } from '@popperjs/core';
import clsx from 'clsx';
import { useOnClickOutside } from 'usehooks-ts';

type Props = {
  className?: string;
  label?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  active?: boolean;
  placement?: Placement;
};

const Dropdown = forwardRef<HTMLDivElement, Props>(
  (
    { children, label, icon, active, className, placement = 'bottom-start' },
    ref
  ) => {
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const popper = useRef<Instance>();
    const btnDropdownRef = createRef<HTMLButtonElement>();
    const popoverDropdownRef = createRef<HTMLDivElement>();

    const handleClickOutside = useCallback(() => {
      popper.current?.destroy();
      popper.current = undefined;
      setDropdownPopoverShow(false);
    }, []);

    const handleClick = useCallback(() => {
      if (dropdownPopoverShow) {
        handleClickOutside();
      } else {
        if (!btnDropdownRef.current || !popoverDropdownRef.current) return;
        popper.current = createPopper(
          btnDropdownRef.current,
          popoverDropdownRef.current,
          {
            placement: placement,
          }
        );

        setDropdownPopoverShow(true);
      }
    }, [
      btnDropdownRef,
      dropdownPopoverShow,
      handleClickOutside,
      placement,
      popoverDropdownRef,
    ]);

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
          ref={btnDropdownRef}
          className={clsx(
            className,
            'bg-white',
            'font-normal text-sm',
            'px-4 py-2.5 text-left',
            'w-72',
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
            className={clsx('ml-2 w-4 h-4', {
              '-rotate-90': placement !== 'bottom-start',
            })}
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
          ref={popoverDropdownRef}
          className={clsx(
            clsx('z-50 w-72', dropdownPopoverShow ? 'block' : 'hidden', {
              'pt-1': placement === 'bottom-start',
              'px-1': placement !== 'bottom-start',
            })
          )}
        >
          <ul className="bg-white text-gray-700 text-sm drop-shadow-md rounded-md">
            {children}
          </ul>
        </div>
      </div>
    );
  }
);

export default Dropdown;
