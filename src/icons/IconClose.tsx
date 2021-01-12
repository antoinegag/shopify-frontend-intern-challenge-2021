import React from "react";
import IconProps from "./IconProps";
import classNames from "classnames";
import styles from "./Icon.module.scss";
import Icon, { IconT } from "./Icon";

const IconClose: IconT = (props) => {
  return (
    <Icon {...props}>
      <line x1="15" y1="15" x2="85" y2="85" />{" "}
      <line x1="85" y1="15" x2="15" y2="85" />
    </Icon>
  );
};

export default IconClose;
