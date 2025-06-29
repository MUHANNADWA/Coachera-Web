import { useState } from "react";

export function useModal(initial = false) {
  const [isModalOpen, setIsModalOpen] = useState(initial);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return { isModalOpen, openModal, closeModal, toggleModal };
}
