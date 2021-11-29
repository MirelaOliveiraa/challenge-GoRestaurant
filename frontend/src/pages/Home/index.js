import style from "./style.module.scss";
import "./modal.scss";
import React, { useEffect, useState } from "react";

import HomeServices from "./service";
import Logo from "../../assets/Logo.svg";
import Excluir from "../../assets/Excluir.svg";
import Editar from "../../assets/Editar.svg";
import ButtonAddPrato from "../../assets/buttonAddPrato.svg";
import BotaoNovoPrato from "../../assets/buttonNovoPrato.svg";

import Switch from "react-switch";
import Modal from "react-modal";

import { toast, Toaster } from "react-hot-toast";
import CloseIcon from "@material-ui/icons/Close";

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
  const [img, setImg] = useState("");
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  const [pratos, setPratos] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const listarPratos = () => {
    HomeServices.list().then((response) => {
      setPratos(response.data);
    });
  };

  const adicionarPratos = async () => {
    const payload = {
      img: img,
      nome: nome,
      preco: preco,
      descricao: descricao,
      disponivel: true,
    };

    await HomeServices.create(payload);
    toast.success("Novo item inserido!");

    listarPratos();
    closeModal();
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
          <img
            src={BotaoNovoPrato}
            onClick={openModal}
            className={style.buttonAdd}
          />
        </div>

        <div className={style.cardPratos}>
          {pratos.map((item) => (
            <div key={item.id} className={style.card}>
              <div>
                <img className={style.imagem} src={item.img} />
                <div className={style.textos}>
                  <div className={style.info}>
                    <h3 className={style.nomePrato}>{item.nome}</h3>
                    <span className={style.descricaoPrato}>
                      {item.descricao}
                    </span>
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
                      <img src={Editar} className={style.icone} />
                      <img
                        src={Excluir}
                        className={style.icone}
                        onClick={() => apagar(item.id)}
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
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="Overlay"
        style={customStyles}
      >
        <div className="modal">
          <div className="cabecalhoModal">
            <h2>Novo prato</h2>
            <CloseIcon className="iconClose" onClick={closeModal} />
          </div>
          <form className="formulario">
            <span className="temaInput">URL da imagem</span>
            <input
              onChange={(event) => setImg(event.target.value)}
              placeholder="Cole o link aqui"
              className="formInput"
              type="URL"
            />
            <div className="formInputs">
              <div className="inputNome">
                <span className="temaInput">Nome do prato</span>
                <input
                  onChange={(event) => setNome(event.target.value)}
                  placeholder="Ex: Moda Italiana"
                  className="formInput"
                  type="text"
                />
              </div>
              <div className="inputPreco">
                <span className="temaInput">Preço</span>
                <input
                  onChange={(event) => setPreco(event.target.value)}
                  className="formInput"
                  type="number"
                  min="1"
                  step="any"
                />
              </div>
            </div>
            <span className="temaInput">Descrição do prato</span>
            <input
              onChange={(event) => setDescricao(event.target.value)}
              className="formInput"
              type="text"
            />

            <img
              src={ButtonAddPrato}
              className="imgAddPratos"
              onClick={adicionarPratos}
            />
          </form>
        </div>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};
export default Home;
