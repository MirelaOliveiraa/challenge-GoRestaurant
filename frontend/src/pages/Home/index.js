import style from "./style.module.scss";
import "./modal.scss";
import React, { useEffect, useState } from "react";

import HomeServices from "./service";
import Logo from "../../assets/Logo.svg";

import Switch from "react-switch";
import Modal from "react-modal";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

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

const Home = () => {
  const [pratos, setPratos] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const listarPratos = () => {
    HomeServices.list().then((response) => {
      setPratos(response.data);
    });
  };

  const apagar = async (id) => {
    await HomeServices.delete(id);
    listarPratos();
  };

  const handleChange = () => {
    pratos.map((...prato) => {
      if (prato.disponivel == true) {
        console.log(prato.id);
      } else {
        console.log("nn");
      }
    });
  };

  useEffect(() => {
    listarPratos();
  }, []);

  return (
    <section className={style.section}>
      <div className={style.cardCabeçalho}></div>
      <div className={style.conteudo}>
        <div className={style.goRestaurant}>
          <div className={style.logo}>
            <img src={Logo} />
          </div>
          <div className={style.buttonAdd}>
            <button onClick={openModal} className={style.addPrato}>
              Novo Prato
            </button>
            <AddBoxOutlinedIcon className={style.iconAdd} onClick={openModal} />
          </div>
        </div>

        <div className={style.cardPratos}>
          {pratos.map((item) => (
            <div key={item.id} className={style.card}>
              <img className={style.imagem} src={item.img} />

              <div className={style.textos}>
                <div className={style.info}>
                  <h3 className={style.nomePrato}>{item.nome}</h3>
                  <span className={style.descricaoPrato}>{item.descricao}</span>
                  <h3 className={style.valor}>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.preco)}
                  </h3>
                </div>
              </div>
              <div className={style.buttons}>
                <div className={style.alinharButtons}>
                  <div className={style.icones}>
                    <EditIcon className={style.icone} />
                    <DeleteOutlineIcon
                      onClick={() => apagar(item.id)}
                      className={style.icone}
                    />
                  </div>
                  <div className={style.disponibilidade}>
                    <span className={style.spanStatus}>
                      {item.disponivel ? "Disponível" : "Indisponível"}
                    </span>

                    <Switch
                      checked={item.disponivel}
                      onChange={handleChange}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#39B100"
                      offColor="#C72828"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        overlayClassName="Overlay"
        style={customStyles}
      >
        <div className="modal">
          <h2>Novo prato</h2>
          <button onClick="buttonClose" onClick={closeModal}>
            close
          </button>
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
    </section>
  );
};
export default Home;
