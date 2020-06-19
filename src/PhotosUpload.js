import React from "react";
import MobileStepper from "@material-ui/core/MobileStepper";
import View from "./View";
import ImageUpload from "./ImageUpload";
import Text from "./Text";
import TouchableOpacity from "./TouchableOpacity";
import Icon from "./Icon";
import StyleSheet from "./StyleSheet";
import Alert from "./Alert";

const useStyles = {
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: 4,
    alignSelf: "stretch",
    borderBottomStyle: "solid",
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(0,0,0,0.14)"
    // backgroundColor:'white'
  }
};

export default class FotosUpload extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { activeStep: 0 };
    this.handleNext = () => {
      this.setState({ activeStep: this.state.activeStep + 1 });
    };

    this.handleBack = () => {
      this.setState({ activeStep: this.state.activeStep - 1 });
    };
  }

  novo() {
    this.props.value.push({ url_img: "" });
    this.setState({ activeStep: this.props.value.length - 1 });
  }

  delet() {
    Alert.alert(
      "Apagar",
      "Voce realmente deseja apagar este o item " + this.state.activeStep + "?",
      [
        {
          text: "Ok",
          onPress: () => {
            this.props.value.splice(this.state.activeStep, 1);
            if (this.state.activeStep == 0) {
              this.setState({ alterado: true });
            } else {
              this.handleBack();
            }
          }
        },
        { text: "Cancelar", onPress: () => console.log() }
      ]
    );
  }
  render() {
    const style = StyleSheet.flatten([
      {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: 5,
        minWidth: 5,
        display: "flex",
        alignSelf: "stretch",
        flex: "0 1 auto",
        height: 400,
        elevation: 1
      },
      useStyles,
      this.props.style
    ]);
    let { value } = this.props;
    if (!value || !value[0]) value = [{ url_img: "" }];
    const { activeStep } = this.state;
    if(!value[activeStep]){
      this.setState({activeStep: 0});
      return <div/>;
    }
    const maxSteps = value.length;

    return (
      <View type={"Paper"} elevation={this.props.elevation} style={style}>
        <View style={style.header}>
          <Text style={{ flex: 1 }}>
            {(value[activeStep] || {}).label || this.props.label}
          </Text>
          <TouchableOpacity
            style={{ fontSize: 30, marginRight: 10 }}
            color={"primary"}
            variant="outlined"
            tooltip={"Adicionar"}
            // children={"+"}
            onPress={() => {
              this.novo();
            }}
          >
            <Icon name={"add"} style={{ fontSize: 30 }} color="primary" />
          </TouchableOpacity>
          {value.length > 0 ? (
            <TouchableOpacity
              color={"secondary"}
              variant="outlined"
              tooltip={"Remover"}
              style={{ marginRight: 10 }}
              onPress={() => {
                this.delet();
              }}
            >
              <Icon
                name={"minus"}
                fromFontFamily={"Material Design Icons"}
                style={{ fontSize: 30 }}
                color="secondary"
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <ImageUpload
          {...this.props}
          label={this.props.label}
          style={{
            alignSelf: "stretch",
            // backgroundColor: "rgba(244,244,244,1)",
            flex: 1
          }}
          onChange={text => {
            value[activeStep].url_img = text;
            if (this.props.onChange) {
              this.props.onChange(value, activeStep, text);
            }
          }}
          resizeMode={"cover"}
          value={value[activeStep].url_img}
        ></ImageUpload>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant={maxSteps > 12 ? "progress" : "dots"}
          activeStep={activeStep}
          style={{ alignSelf: "stretch" }}
          nextButton={
            <TouchableOpacity
              size="small"
              onClick={this.handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              <Icon name={"keyboard_arrow_right"} />
            </TouchableOpacity>
          }
          backButton={
            <TouchableOpacity
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              <Icon name={"keyboard_arrow_left"} />
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}
