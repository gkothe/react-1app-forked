import React from "react";
import * as Util from "./Util";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.css";
var contador = 0;

const TouchableOpacity = props => {
  contador++;
  let { onClick, onPress } = props;
  let style = Util.styleMack([{}, props.style, props.superStyle]);
  const ButtonN = (props.icon && IconButton) || Button;
  const NavRender = prop =>
    (props.to && (
      <Link
        to={props.to}
        id={props.id || "nv" + contador}
        activeClassName="active"
        style={{
          flex: style.flex,
          alignSelf: style.alignSelf,
          display: style.display,
          flexDirection: "column"
        }}
        children={prop.children}
      />
    )) ||
    prop.children;
  const TooltipRender = prop =>
    (props.tooltip && (
      <Tooltip
        id={props.id || "tv" + contador}
        title={props.tooltip}
        placement="right"
        children={prop.children}
      />
    )) ||
    prop.children;
  return (
    <NavRender>
      <TooltipRender>
        <ButtonN
          color="primary"
          key={props.key || "bt" + contador}
          aria-label={props.tooltip}
          disabled={props.load}
          {...props}
          id={props.id || "bv" + contador}
          onClick={event => {
            if (onPress) onPress(event);
            if (onClick) onClick(event);
          }}
          style={style}
          children={
            (props.load && <CircularProgress size={24} />) || props.children
          }
        />
      </TooltipRender>
    </NavRender>
  );
};
export default TouchableOpacity;
