import React, { useEffect, useState } from "react";
import style from "./style.module.scss";

import "./modal.scss";

import HomeServices from "./service";
import { toast, Toaster } from "react-hot-toast";

import Modal from "react-modal";
import Switch from "react-switch";

import Logo from "../../assets/Logo.svg";
import Editar from "../../assets/Editar.svg";
import Excluir from "../../assets/Excluir.svg";

import CloseIcon from "@material-ui/icons/Close";
import { FiCheckSquare, FiPlusSquare } from "react-icons/fi";

const Home = () => {
  const [img, setImg] = useState("");
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  const [pratos, setPratos] = useState([]);
  const [pratoEditado, setPratoEditado] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModalEdit(item) {
    setPratoEditado(item);
    setIsOpenEdit(true);
  }

  function closeModalEdit() {
    setIsOpenEdit(false);
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

  const editarPratos = async (item) => {
    const payload = {
      id: item.id,
      img: item.img,
      nome: item.nome,
      preco: item.preco,
      descricao: item.descricao,
      disponivel: item.disponivel,
    };
    await HomeServices.update(payload);
    toast.success("Prato editado!");

    listarPratos();
    closeModalEdit();
  };

  const apagar = async (id) => {
    await HomeServices.delete(id);
    listarPratos();
  };

  const handleChange = (pratoId, checked) => {
    const pratosAtualizados = pratos.map((item) => {
      if (item.id === pratoId) {
        return { ...item, disponivel: checked };
      } else {
        return item;
      }
    });

    setPratos(pratosAtualizados);
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

          <div onClick={openModal} className={style.buttonAdd}>
            <button className={style.buttonNome}>Novo Prato</button>
            <FiPlusSquare className={style.iconAdd} />
          </div>
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
                      <img
                        src={Editar}
                        onClick={() => openModalEdit(item)}
                        className={style.icone}
                      />
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
                        onChange={(checked) => handleChange(item.id, checked)}
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
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
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
            <div onClick={adicionarPratos} className="buttonAddPratos">
              <button className="buttonNome">Novo Prato</button>
              <FiCheckSquare className="iconAdd" />
            </div>
          </form>
        </div>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />

      <Modal
        isOpen={modalIsOpenEdit}
        onRequestClose={closeModalEdit}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <div className="modal">
          <div className="cabecalhoModal">
            <h2>Editar prato</h2>
            <CloseIcon className="iconClose" onClick={closeModalEdit} />
          </div>
          <form className="formulario">
            <span className="temaInput">URL da imagem</span>
            <input
              placeholder="Cole o link aqui"
              className="formInput"
              type="URL"
              value={pratoEditado?.img}
              onChange={(event) =>
                setPratoEditado({
                  ...pratoEditado,
                  img: event.target.value,
                })
              }
            />
            <div className="formInputs">
              <div className="inputNome">
                <span className="temaInput">Nome do prato</span>
                <input
                  value={pratoEditado?.nome}
                  onChange={(event) =>
                    setPratoEditado({
                      ...pratoEditado,
                      nome: event.target.value,
                    })
                  }
                  placeholder="Ex: Moda Italiana"
                  className="formInput"
                  type="text"
                />
              </div>
              <div className="inputPreco">
                <span className="temaInput">Preço</span>
                <input
                  value={pratoEditado?.preco}
                  onChange={(event) =>
                    setPratoEditado({
                      ...pratoEditado,
                      preco: event.target.value,
                    })
                  }
                  className="formInput"
                  type="number"
                  min="1"
                  step="any"
                />
              </div>
            </div>
            <span className="temaInput">Descrição do prato</span>
            <input
              value={pratoEditado?.descricao}
              onChange={(event) =>
                setPratoEditado({
                  ...pratoEditado,
                  descricao: event.target.value,
                })
              }
              className="formInput"
              type="text"
            />

            <div
              onClick={() => editarPratos(pratoEditado)}
              className="buttonAddPratos"
            >
              <button className="buttonNome">Editar prato</button>
              <FiCheckSquare className="iconAdd" />
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
};
export default Home;
