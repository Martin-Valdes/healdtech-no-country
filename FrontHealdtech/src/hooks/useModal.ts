import { useState } from "react";

interface UseModal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const useModal = (): UseModal => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);
  const toggleModal = (): void => setIsOpen((prevState) => !prevState);
  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useModal;
