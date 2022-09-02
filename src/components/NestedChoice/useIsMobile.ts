import { useMediaQuery } from 'usehooks-ts';

const useIsMobile = () => {
  return useMediaQuery('(max-width: 480px)');
};

export default useIsMobile;
