import React from "react";
import IconProps from "./IconProps";
import classNames from "classnames";
import styles from "./Icon.module.scss";

export type IconT = React.FC<React.HTMLAttributes<SVGSVGElement> & IconProps>;

const Icon: IconT = (props) => {
  const size = props.size || "sm";
  const color = props.color || "dark";
  return (
    <svg
      strokeWidth="10"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={classNames(
        props.className,
        styles[`size-${size}`],
        styles[`color-${color}`]
      )}
      {...props}
    >
      {props.children}
    </svg>
  );
};

export default Icon;
