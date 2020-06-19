import React from "react";
import View from "./View";
import Alert from "./Alert";
import Modal from "./Modal";
import {
  Snackbar
} from 'material-ui';
import queryString from 'query-string';

var autoNavigator = false;
var hasPopHistory = false;
export default class NavigatorView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lista: [],
      route: null,
      time: false,
      open: false,
      pgModal: null,
      pos: 0
    };

    if (props.store) {
      props.store.dispatch({
        type: "navigator",
        navigation: this,
        navigator: this
      });
    }
  }
  limitString(text) {
    if (!this.props.limit || !text) {
      return text;
    }
    var limit = parseInt(this.props.limit);
    if (text && text.length) {
      if (text.length > limit && limit > 0) {
        text = text.substring(0, limit) + "...";
      }
    }
    return text;
  }

  alert(text, wait) {
    this.setState({
      alert: this.limitString(text, 250),
      openAlert: true,
      loadAlert: wait ? true : false,
      wait: wait
    });
  }
  closeAlert() {
    this.setState({
      openAlert: false,
      loadAlert: false,
      wait: false
    });
    setTimeout(() => {
      this.setState({
        openAlert: false,
        loadAlert: false,
        wait: false,
        alert: "---"
      });
    }, 500);
  }
  navigate(pageName, props) {
    // this.state.history.push(`/projeto`)
    let history = this.history;
    if (!this.history) {
      if (props && props.oldState && props.oldState.history) {
        history = props.oldState.history;
      } else if (props && props.activity.history) {
        history = this.activity.history;
      } else if (props && props.activity && props.activity.activity && props.activity.activity.history) {
        history = props.activity.activity.history;
      }
    }

    var store = {
      type: "navigator"
    };
    var lista = Object.keys(props);
    for (var i = 0; i < lista.length; i++) {
      var nome = lista[i];
      if (props.oldState) {
        continue;
      }
      store[nome] = props[nome];
    }
    if (props.oldState) {
      var list = Object.keys(props.oldState);
      for (var i = 0; i < list.length; i++) {
        var nome = list[i];
        store[nome] = props.oldState[nome];
      }
    }

    this.props.store.dispatch(store);
    if (history) {
      var search = "";
      if (props.get) {
        search = "?" + queryString.stringify(props.get);
      }
      history.push(pageName + search)
      if (window.scrollTo) {
        window.scrollTo(0, 0)
      }
    }
    // history.pushState("app", null, pageName);
  }

  push(route) {
    this.state.lista.push(route);
    this.setState({
      route: route,
      lista: this.state.lista,
      time: true,
      pos: this.state.lista.length - 1,
      pop: false
    });
  }

  popN(n) {}
  goBack() {
    this.pop();
  }
  pop() {
    if (!this.state.lista.length == 0) {
      this.state.lista.pop();
    } else {
      if (this.props.superNavigator) {
        this.props.superNavigator.closeModal();
      }
      this.closeModal();
    }
    var route = this.state.lista[this.state.lista.length - 1];
    // browserHistory.goBack();

    this.setState({
      route: route,
      lista: this.state.lista,
      time: true,
      pos: this.state.lista.length - 1,
      pop: true
    });
  }

  clone(origin) {
    var copy = {};
    var lista = Object.keys(origin);
    for (var i = 0; i < lista.length; i++) {
      var nome = lista[i];
      copy[nome] = origin[nome];
    }
    return copy;
  }
  closeModal() {
    // console.log(this)
    this.setState({
      pgModal: null,
      open: false
    });
    if (this.activity && this.activity.state && this.activity.shouldComponentUpdate) {
      this.activity.shouldComponentUpdate(this.clone(this.activity.props), this.activity.state);
      this.activity.setState(this.activity.state);
    }
    if (this.props.superNavigator) {
      this.props.superNavigator.closeModal();
    }
  }
  openModal(pgModal, block) {
    // console.log(pgModal)
    if (pgModal.props) {
      this.activity = pgModal.props.activity;
    }

    var screenProps = this.props.screenProps;
    if (!screenProps) {
      screenProps = {
        store: this.props.store,
        actions: this.props.actions,
        dispatch: this.props.store.dispatch
      };
    }

    this.setState({
      block: block ? true : false,
      pgModal: (
        <pgModal.component

          {...this.props}
          {...pgModal.props}
          screenProps={screenProps}
          navigator={this}
          />
      ),
      open: true
    });
  }
  openModalFade(pgModal) {
    this.openModal(pgModal);
  }
  getPage() {
    var pagina = this.props.children;
    if (this.state.route && this.state.route.component) {
      var screenProps = this.props.screenProps;
      if (!screenProps && this.props.store) {
        screenProps = {
          navigator: this,
          navigation: this,
          store: this.props.store,
          actions: this.props.actions,
          dispatch: this.props.store ? this.props.store.dispatch : null
        };
      } else if (this.props.screenProps) {
        screenProps = {
          navigator: this,
          navigation: this,
          store: this.props.screenProps.store,
          actions: this.props.screenProps.actions,
          dispatch: this.props.screenProps.store ? this.props.screenProps.store.dispatch : null
        };
      }
      // if(this.state.route && this.state.route.props && this.state.route.props.activity &&
      //   this.state.route.props.activity.props.screenProps ){
      //     screenProps = this.state.route.props.activity.props.screenProps ;
      //   }
      var newProps = {};
      if (screenProps) {
        var list = Object.keys(screenProps)
        for (var i = 0; i < list.length; i++) {
          var nome = list[i];
          newProps[nome] = screenProps[nome];
        }
      }
      newProps.navigator = this;
      newProps.navigation = this;
      pagina = (

        <this.state.route.component
          {...this.props}
          {...this.state.route.props}
          screenProps={newProps}
          navigator={this}
          superNavigator={this.props.superNavigator}
          navigation={this}
          />
      );
    } else if (this.props.renderScene) {
      var view = this.props.renderScene(this.state.route, this);
      if (view) {
        pagina = view;
      }
    }
    return pagina;
  }

  render() {
    var widthModal = window.innerWidth;
    if (widthModal >= 320) {
      widthModal = 320;
    }


    //     console.log(this.getPage())
    //   if(this.getPage()){
    //       return this.getPage()
    //   }
    // return (
    //   <View style={this.props.style}>
    //     {this.getPage()}
    //   </View>
    // )
    return (
      <View style={this.props.style}>
        {this.getPage()}


        {this.state.open
          ? <Modal
          block = {this.state.block}
          style={{ minWidth: widthModal }}
          visible={this.state.open}
          onClose={() => {
            this.closeModal();
            // this.setState({ open: false });
          }}
          >
          {this.state.pgModal}
        </Modal>
        : ""}

        <Alert />
        <Snackbar
bodyStyle={{
      textAlign: "center",
    color: '#777'
}}
          open={this.state.openAlert?true:false}
          message={this.state.alert+""}
          autoHideDuration={4000}
          onRequestClose={() => {
            this.setState({
              openAlert: false
            });
          }}


          />
      </View>
    );
  }
}

NavigatorView.props = function() {
  return {};
};

NavigatorView.setAutoNavigator = function(status) {
  autoNavigator = status;
};

NavigatorView.cloneState = function(page) {
  if (!page || !page.props) {
    return;
  }
  var copia = page.state;
  var original = page.props;
  var foco = page.props;

  if (foco.oldState) {
    foco = foco.oldState;

    var list = Object.keys(foco);
    for (var i = 0; i < list.length; i++) {
      var nome = list[i];
      copia[nome] = foco[nome];
    }
    delete copia.oldState;
  }

  if (page.props.screenProps) {
    var foco = page.props.screenProps;
    var list = Object.keys(foco);
    for (var i = 0; i < list.length; i++) {
      var nome = list[i];
      copia[nome] = foco[nome];
    }
  }


  if (copia.store && copia.store.getState) {
    var state = copia.store.getState();
    var lista = Object.keys(state);
    for (var i = 0; i < lista.length; i++) {
      var nome = lista[i];
      copia[nome] = state[nome];
    }
  }
  ///Repetir screenProps
  if (page.props.screenProps) {
    var foco = page.props.screenProps;
    var list = Object.keys(foco);
    for (var i = 0; i < list.length; i++) {
      var nome = list[i];
      copia[nome] = foco[nome];
    }
  }
  var lista = Object.keys(page.props);
  for (var i = 0; i < lista.length; i++) {
    var nome = lista[i];
    copia[nome] = page.props[nome];
  }
  // if (copia.navigator) {
  //   page.navigator = copia.navigator;
  // }
  if (window.location.search) {
    copia.parameters = queryString.parse(window.location.search);
  } else {
    copia.parameters = {};
  }
  delete copia.data;
};

NavigatorView.updateState = function(original, copia) {
  if (original && copia) {
    NavigatorView.cloneState({
      props: original,
      state: copia
    });
  }
};

NavigatorView.getParameters = function() {
  var search = {};
  if (window.location.search) {
    search = queryString.parse(window.location.search);
  }
  return search;
}