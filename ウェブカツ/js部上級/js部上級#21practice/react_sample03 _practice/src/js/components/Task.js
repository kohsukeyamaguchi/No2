import React from 'react';
import ClassNames from 'classnames';

export default class Task extends React.Component {

  constructor(props) {
    super(props);
    this.state = {//backboneと流れは同じ　Taskコンポーネントひとつに対して使うデータを定義する
      id: this.props.id,//このTaskコンポーネントを使う側からデータを受け取るため、propsを使用する
      text: this.props.text,
      isDone: false,
      editMode: false
    };
    this.handleClickToggleDone = this.handleClickToggleDone.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
    this.handleClickshowEdit = this.handleClickshowEdit.bind(this);
    this.handleKeyUpCloseEdit = this.handleKeyUpCloseEdit.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    //Taskコンポーネントで使う全てのメソッドのthisを縛ってあげる（Task自身に矛先を向ける）
  }
  handleChangeText(e){
    this.setState({
      text: e.target.value
    });
  }
  handleClickToggleDone () {
    this.setState(prevState => ({
      isDone: !prevState.isDone
    }));
  }
  handleClickRemove(e) {
    // 親から渡ってきた関数を実行することで、親へどのitemを削除するのか通知する
    //TodoListファイルのrenderメソッドでのonRemove={this.handleRemove}のhandleRemoveメソッドの引数としてidが渡り、TodoListファイルのhandleRemoveメソッドで削除が完了する
    this.props.onRemove(this.state.id);

    // 自身で削除できなくもない
    // $(e.target).parent('.list__item').remove();
  }
  handleClickshowEdit() {
    this.setState({
      editMode: true
    });
  }
  handleKeyUpCloseEdit(e) {
    if(e.keyCode === 13 && e.shiftKey === true){
      this.setState({
        text: e.currentTarget.value,
        editMode: false
      });
    }
  }
  componentWillUnmount(){//サンプルとして使用　このTaskコンポーネント自体が破棄されたら呼び出されます
    console.log('componentWillUnmount');
  }
  render() {
    // reactにはclassを付け替えする機能はないので、外部ライブラリを使う
    const classNameLi = ClassNames({//importしたclassnamesライブラリから使用　クラス名の書き込みや切り替え
      'list__item': true,
      'list__item--done': this.state.isDone
    //'任意のクラス名': true/false と書いてtrueだったら任意のクラス名がclass属性に書き出される
    });
    const classNameIcon = ClassNames({
      'fa': true,
      'fa-circle-thin': !this.state.isDone,
      'fa-check-circle': this.state.isDone,
      'icon-check': true
    });
    // underscoreのようなif文は使えないので、変数に前もって入れておく
    const input = (this.state.editMode) ? //DOMの切り替え
      <input type="text" className="editText" value={this.state.text}
             onChange={this.handleChangeText} onKeyUp={this.handleKeyUpCloseEdit}/> :
      <span onClick={this.handleClickshowEdit}>{this.state.text}</span>;
    //editModeがtrueだったらinputタグ、falseだったらspanタグが格納される

    //returnでhtmlを返す、お決まりの書き方
    //jsxで上で定義した変数を中括弧を使って入れている
    return (
      <li className={classNameLi}>
        <i className={classNameIcon} onClick={this.handleClickToggleDone} aria-hidden="true" />
        {input}
        <i className="fa fa-trash icon-trash" onClick={this.handleClickRemove} aria-hidden="true" />
      </li>
    );
  }
}
