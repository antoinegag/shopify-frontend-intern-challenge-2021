import React from "react";
import styles from "./XButton.module.scss";
import classNames from "classnames";

const TrashButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button {...props} className={classNames(styles.x, props.className)}>
      X
    </button>
  );
};

export default TrashButton;
