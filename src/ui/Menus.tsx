import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import useOutsideClick from '../hooks/useOutsideClick';

type Position = {
   x: number;
   y: number;
};

type StyledListProps = {
   position: Position;
};

type MenuContextType = {
   openId: string;
   close: () => void;
   open: (id: string) => void;
   position: Position;
   setPosition: (position: Position) => void;
};

type ButtonProps = {
   children: React.ReactNode;
   icon: React.ReactElement;
   onClick?: () => void;
};

const Menu = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
`;

const StyledToggle = styled.button`
   background: none;
   border: none;
   padding: 0.4rem;
   border-radius: var(--border-radius-sm);
   transform: translateX(0.8rem);
   transition: all 0.2s;

   &:hover {
      background-color: var(--color-grey-100);
   }

   & svg {
      width: 2.4rem;
      height: 2.4rem;
      color: var(--color-grey-700);
   }
`;

const StyledList = styled.ul<StyledListProps>`
   position: fixed;
   background-color: var(--color-grey-0);
   box-shadow: var(--shadow-md);
   border-radius: var(--border-radius-md);
   right: ${(props) => props.position.x}px;
   top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
   width: 100%;
   text-align: left;
   background: none;
   border: none;
   padding: 1.2rem 2.4rem;
   font-size: 1.4rem;
   transition: all 0.2s;
   display: flex;
   align-items: center;
   gap: 1.6rem;

   &:hover {
      background-color: var(--color-grey-50);
   }

   & svg {
      width: 1.6rem;
      height: 1.6rem;
      color: var(--color-grey-400);
      transition: all 0.3s;
   }
`;

const MenusContext = createContext<MenuContextType>({} as MenuContextType);

function Menus({ children }: { children: React.ReactNode }) {
   const [openId, setIsOpenid] = useState('');
   const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

   const close = () => setIsOpenid('');
   const open = (id: string) => setIsOpenid(id);

   return (
      <MenusContext.Provider
         value={{ openId, close, open, position, setPosition }}
      >
         {children}
      </MenusContext.Provider>
   );
}

function Toggle({ id }: { id: string }) {
   const { openId, close, open, setPosition } = useContext(MenusContext);

   function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      const rect = (e.target as HTMLElement)
         .closest('button')!
         .getBoundingClientRect();

      setPosition({
         x: window.innerWidth - rect.width - rect.x,
         y: rect.y + rect.height + 8,
      });

      if (openId === '' || openId !== id) open(id);
      else close();
   }

   return (
      <StyledToggle onClick={handleClick}>
         <HiEllipsisVertical />
      </StyledToggle>
   );
}

function List({ id, children }: { id: string; children: React.ReactNode }) {
   const { openId, position, close } = useContext(MenusContext);
   const ref = useOutsideClick<HTMLUListElement>(close);

   useEffect(() => {
      function handleScroll() {
         close();
      }

      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
   }, [close]);

   if (openId !== id) return null;

   return createPortal(
      <StyledList ref={ref} position={position}>
         {children}
      </StyledList>,
      document.body,
   );
}

function Button({ children, icon, onClick }: ButtonProps) {
   const { close } = useContext(MenusContext);

   function handleClick() {
      onClick?.();
      close();
   }

   return (
      <li>
         <StyledButton onClick={handleClick}>
            {icon}
            <span>{children}</span>
         </StyledButton>
      </li>
   );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
