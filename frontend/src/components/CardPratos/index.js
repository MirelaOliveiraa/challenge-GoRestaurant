import React from "react";
import style from "./style.module.scss";

const CardPratos = (props) => {
  return (
    <section className={style.section}>
      <div className={style.card}>{props.children}</div>
    </section>
  );
};
export default CardPratos;
