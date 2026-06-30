import {
   cloneElement,
   createContext,
   useContext,
   useEffect,
   useRef,
   useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import useOutsideClick from '../hooks/useOutsideClick';

const StyledModal = styled.div`
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background-color: var(--color-grey-0);
   border-radius: var(--border-radius-lg);
   box-shadow: var(--shadow-lg);
   padding: 3.2rem 4rem;
   transition: all 0.5s;
`;

const Overlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100vh;
   background-color: var(--backdrop-color);
   backdrop-filter: blur(4px);
   z-index: 1000;
   transition: all 0.5s;
`;

const Button = styled.button`
   background: none;
   border: none;
   padding: 0.4rem;
   border-radius: var(--border-radius-sm);
   transform: translateX(0.8rem);
   transition: all 0.2s;
   position: absolute;
   top: 1.2rem;
   right: 1.9rem;

   &:hover {
      background-color: var(--color-grey-100);
   }

   & svg {
      width: 2.4rem;
      height: 2.4rem;
      color: var(--color-grey-500);
   }
`;

type ModalContextType = {
   openName: string;
   close: () => void;
   open: (name: string) => void;
};

type OpenProps = {
   // Must be ReactElement (not ReactNode) because cloneElement needs a real element
   children: React.ReactElement<{ onClick?: () => void }>;
   opens: string;
};

type WindowProps = {
   // onCloseModal is injected automatically via cloneElement — no need to pass it manually
   children: React.ReactElement<{ onCloseModal?: () => void }>;
   name: string;
};

// Shared state lives here — open/close logic is invisible to parent components
const ModalContext = createContext<ModalContextType>({} as ModalContextType);

/**
 * Compound Component Modal
 *
 * Usage:
 * <Modal>
 *   <Modal.Open opens="some-name">
 *     <Button>Open</Button>         ← onClick injected automatically
 *   </Modal.Open>
 *   <Modal.Window name="some-name">
 *     <AnyForm />                   ← onCloseModal injected automatically
 *   </Modal.Window>
 * </Modal>
 *
 * Modal.Open  → injects onClick into its child to open the window
 * Modal.Window → renders as a portal when its name matches openName
 *                and injects onCloseModal into its child
 */
function Modal({ children }: { children: React.ReactNode }) {
   const [openName, setOpenName] = useState('');

   const close = () => setOpenName('');
   const open = (name: string) => setOpenName(name);

   return (
      <ModalContext.Provider value={{ openName, close, open }}>
         {children}
      </ModalContext.Provider>
   );
}

// Injects onClick into child — clicking it opens the window matching "opens"
function Open({ children, opens: opensWindowName }: OpenProps) {
   const { open } = useContext(ModalContext);

   return cloneElement(children, { onClick: () => open(opensWindowName) });
}

// Renders only when name === openName; mounts into document.body via portal
function Window({ children, name }: WindowProps) {
   const { openName, close } = useContext(ModalContext);
   const ref = useOutsideClick(close);

   if (name !== openName) return null;

   return createPortal(
      <Overlay>
         <StyledModal ref={ref}>
            <Button onClick={close}>
               <HiXMark />
            </Button>
            {/* onCloseModal is injected so the child form can close the modal on success */}
            <div>{cloneElement(children, { onCloseModal: close })}</div>
         </StyledModal>
      </Overlay>,
      document.body,
   );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
