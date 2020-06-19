import React from 'react';
var QRCode = require('qrcode.react');
import * as Util from "./Util"

const QRCodeView=(props)=>(
  <QRCode style={ Util.styleMack([props.style,props.superStyle]) } {...props}  bgColor={props.fgColor} fgColor={props.bgColor} />
)

export default QRCodeView;
