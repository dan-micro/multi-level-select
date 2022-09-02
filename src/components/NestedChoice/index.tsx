import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';

import dynamic from 'next/dynamic';

import Nested from './Nested';
import NestedMobile from './NestedMobile';
import Search from './Search';
import type { Choice, NestedChoiceProps } from './types';
import useIsMobile from './useIsMobile';

const NestedChoice = ({ choices, placeholder }: NestedChoiceProps) => {
  const [choice, setChoice] = useState<Choice>();
  const [search, onSearch] = useState<string>('');
  const [filteredChoices, setFilteredChoices] = useState(choices);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (search !== '') {
      const fuse = new Fuse(choices, {
        includeScore: false,
        keys: ['label', 'choices.label'],
      });

      setFilteredChoices(
        fuse.search(search).map((f) => {
          return f.item;
        })
      );
    } else {
      setFilteredChoices(choices);
    }
  }, [choices, search]);

  if (isMobile) {
    return (
      <NestedMobile
        className="focus:ring-2 focus:ring-blue-300 focus:outline-none drop-shadow rounded-lg"
        header={<Search onSearch={onSearch} search={search} />}
        label={choice ? choice.label : placeholder}
        active={!!choice}
        choices={filteredChoices}
        onItemClick={setChoice}
      />
    );
  }

  return (
    <Nested
      placement="bottom-start"
      className="focus:ring-2 focus:ring-blue-300 focus:outline-none drop-shadow rounded-lg"
      header={<Search onSearch={onSearch} search={search} />}
      label={choice ? choice.label : placeholder}
      active={!!choice}
      choices={filteredChoices}
      onItemClick={setChoice}
    />
  );
};

const NestedChoiceDynamic = dynamic(
  () => {
    return Promise.resolve(NestedChoice);
  },
  {
    ssr: false,
  }
);

export default NestedChoiceDynamic;
