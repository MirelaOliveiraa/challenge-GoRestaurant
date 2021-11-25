import React, { useEffect, useState } from "react";
import style from "./style.module.scss";

import Logo from "../../assets/Logo.svg";
import HomeServices from "./service";

import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

const Home = () => {
  const [pratos, setPratos] = useState([]);

  const listarPratos = () => {
    HomeServices.list().then((response) => {
      setPratos(response.data);
    });
  };

  const apagar = async (id) => {
    await HomeServices.delete(id);
    listarPratos();
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
            <button className={style.addPrato}>Novo Prato</button>
            <AddBoxOutlinedIcon className={style.iconAdd} />
          </div>
        </div>

        <div className={style.cardPratos}>
          {pratos.map((item) => (
            <div className={style.card}>
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
                      onClick={apagar}
                      className={style.icone}
                    />
                  </div>
                  <div className={style.disponibilidade}>
                    <span className={style.spanStatus}>{item.status}</span>
                    <button
                      className={
                        pratos.status === "Disponível"
                          ? style.corDisponivel
                          : style.corIndisponivel
                      }
                    >
                      <button className={style.onclick}></button>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Home;
