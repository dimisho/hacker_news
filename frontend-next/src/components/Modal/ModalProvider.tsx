import React, { createContext, useState, FC, useCallback, useEffect } from 'react';

interface ModalProviderProps {
  children: React.ReactNode;
}
interface ModalContextData {
  addModal: (children: React.ReactNode, important?: boolean) => ModalConfig;
  removeModal: (id: number) => void;
  displayedModal?: ModalConfig;
}

export interface ModalConfig {
  id: number;
  closeModal: () => void;
  children: React.ReactNode;
  index: number;
  important?: boolean;
}
export const ModalContext = createContext<ModalContextData>({
  addModal: () => ({
    id: 0,
    closeModal: () => null,
    children: null,
    index: 0,
  }),
  removeModal: () => null,
  displayedModal: undefined,
});

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ModalConfig[]>([]);
  const [displayedModal, setDisplayedModal] = useState<ModalConfig>();

  const removeModal = useCallback((id: number) => {
    setModals((prevModals) => {
      return prevModals.filter((modal) => modal.id !== id);
    });
  }, []);

  const addModal = useCallback(
    (children: React.ReactNode, important?: boolean) => {
      const id = Date.now();
      let index: number = 0;
      const newModal: Omit<ModalConfig, 'index'> = {
        id,
        closeModal: () => removeModal(id),
        children,
        important,
      };
      setModals((prevModals) => {
        index = prevModals.length + 1;
        return [...prevModals, { ...newModal, index }];
      });
      return { ...newModal, index };
    },
    [removeModal],
  );

  useEffect(() => {
    const mostImportantModal = modals
      .slice()
      .reverse()
      .find((modal) => modal.important);
    if (mostImportantModal?.id) setDisplayedModal(mostImportantModal);
    else setDisplayedModal(modals[modals.length - 1]);
  }, [modals]);

  useEffect(() => {
    if (modals.length) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modals.length]);

  return <ModalContext.Provider value={{ addModal, removeModal, displayedModal }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
