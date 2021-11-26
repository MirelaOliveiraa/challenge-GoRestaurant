import React, { useState } from "react";

import Modal from "react-modal";

const Modall = () => {
  const customStyles = {
    content: {
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function closeModal() {
    setIsOpen(false);
  }
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <section>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="Overlay"
          style={customStyles}
        >
          <div>
            <h2>Novo prato</h2>
            <button onClick={closeModal}>close</button>
            <div>I am a modal</div>
            <form>
              Img
              <input className="formInput" />
              Nome
              <input className="formInput" />
              Preço
              <input className="formInput" />
              Descrição
              <input className="formInput" />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
          </div>
        </Modal>
      </div>
    </section>
  );
};
export default Modall;
