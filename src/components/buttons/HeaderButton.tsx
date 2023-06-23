import { FC, ReactNode } from 'react';

interface Props {
  color: string;
  onClick?: () => void;
  children?: ReactNode;
}

export const HeaderButton: FC<Props> = ({ color, onClick, children }) => {
  return (
    <button onClick={onClick} className={`header-btn ${color}`}>
      {children}
    </button>
  );
};
