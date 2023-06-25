import React from "react";
import './InfoTooltip.css';
import successImage from "../../images/success.svg";
import unsuccessImage from "../../images/unsuccess.svg";

function InfoTooltip({ onClose, isInfoTooltip }) {
  return (
    <div className={`infotooltip ${isInfoTooltip.isOpen ? "infotooltip_opened" : ""}`}>
      <div className="infotooltip__container">
        <button
          id="success-close-button"
          type="button"
          className="infotooltip__close-button"
          onClick={onClose}
        />
        <img
          className="infotooltip__image"
          src={`${isInfoTooltip.status ? successImage : unsuccessImage}`}
          alt=""
        />
        <h2 className="infotooltip__title">{`${isInfoTooltip.text}`}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
