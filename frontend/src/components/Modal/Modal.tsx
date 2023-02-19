import React, { useEffect, useRef, FC, useState, useContext } from 'react';
import styled from 'styled-components';
import { StyledButton } from 'pages/HomePage/HomePageStyles';
import { ModalConfig, ModalContext } from 'components/Modal/ModalProvider';
import { createPortal } from 'react-dom';

const StyledBackdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
`;

const ModalWindow = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
  width: 300px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const StyledButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const StyledTitle = styled.p`
  font-family: Verdana;
  font-size: 10pt;
`;

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  closeOnEscape?: boolean;
  important?: boolean;
}

const Modal: FC<ModalProps> = ({ children, visible, onClose, closeOnEscape = true, important = false }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalConfig, setModalConfig] = useState<ModalConfig>();
  const { addModal, removeModal, displayedModal } = useContext(ModalContext);

  useEffect(() => {
    if (visible && !modalConfig?.id) {
      const openedModal = addModal(children, important);
      setModalConfig(openedModal);
    } else if (!visible && modalConfig?.id) {
      removeModal(modalConfig.id);
      onClose();
      setModalConfig(undefined);
    }
  }, [visible, children, important, addModal, modalConfig?.id, removeModal, onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) onClose();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, closeOnEscape]);

  return visible && displayedModal?.id === modalConfig?.id
    ? createPortal(
        <StyledBackdrop>
          <ModalWindow ref={modalRef} tabIndex={-1}>
            <Box>
              <StyledTitle>Window number: {modalConfig?.index}</StyledTitle>
              <Box>{children}</Box>
              <StyledButtonsDiv>
                <StyledButton onClick={onClose}>Close</StyledButton>
              </StyledButtonsDiv>
            </Box>
          </ModalWindow>
        </StyledBackdrop>,
        document.body,
      )
    : null;
};

export default Modal;
