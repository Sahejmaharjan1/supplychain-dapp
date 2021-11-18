import { FC } from "react";

const NormalLayout: FC = ({ children }) => {
  return (
    <>
      <header className='disableTextSelection'> HEADER </header>
      <div className='tbdContentWrapper'>{children}</div>
      <footer className='disableTextSelection'> FOOTER </footer>
    </>
  );
};

export { NormalLayout };
