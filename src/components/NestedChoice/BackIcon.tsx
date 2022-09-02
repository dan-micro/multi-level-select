import BackImg from './BackImg.png';

const BackIcon = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      width={18}
      height={14}
      style={{ margin: '13px 11px' }}
      alt="Back"
      src={BackImg.src}
    />
  );
};

export default BackIcon;
