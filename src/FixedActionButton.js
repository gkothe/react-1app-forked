import React from 'react';

export default class FixedActionButton extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {open:false,action:props.action};
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps != this.props) {
      if(nextProps.action && this.state.action && this.state.action.length!=nextProps.action.length){
        nextState.reload = true;
      }
      nextState.action = nextProps.action;
    }
    return true;
  }
  open(){
    if(this.state.open){
      this.close();
    }else{
      this.setState({open:true})
      $('.fixed-action-btn').openFAB();;//FixedActionButton
    }

  }
  close(){
    this.setState({open:false})
    $('.fixed-action-btn').closeFAB();
  }
  componentDidMount() {
    $('.tooltipped').css({"font-family":"sans-serif"});
  }
  getList(){
    var tags = [];
    if(this.state.action){
      for (var i = 0; i < this.state.action.length; i++) {
        let item  =   this.state.action[i];
        tags.push(
          <li key={"action_bt_"+i}>
            <a data-tooltip={item.title} className="btn-floating waves-effect waves-light red tooltipped" data-position="left" data-delay="30"
              onClick={(e)=>{
                this.open()
                if(item.action){
                  item.action(e);
                }
              }} >
              <i className={"mdi mdi-"+item.icon}></i>
            </a>
          </li>
        )
      }
    }
    return tags;
  }
  render(){
    if(this.state.reload){
      Materialize.fadeInImage('#FixedActionButton')
      setTimeout( ()=> {
        this.setState({reload:false})
      }, 100);
      return <div/>;
    }else{
      setTimeout( ()=> {
        if (this.state.open) {
          Materialize.fadeInImage('#FixedActionButton')
          $('.fixed-action-btn').openFAB();;//FixedActionButton
        }else{
          $('.fixed-action-btn').closeFAB();;//FixedActionButton
        }
      }, 100);
    }
    return (
      <div id={"FixedActionButton"} className="fixed-action-btn vertical click-to-toggle" style={{fontFamily:"sans-serif"}}>
        <a className="btn-floating btn-large waves-effect waves-light red" onClick={()=>{
            this.setState({open:!this.state.open})
          }}>
          <i className="material-icons">{!this.state.open?"add":"remove"}</i>
        </a>
        <ul>
          {this.getList()}
        </ul>
      </div>
    );
  }
}
