import React from 'react';
import Task from './Task';//Taskコンポーネントを呼び出している
import _ from 'lodash';

//コンポーネントを外部ファイルで呼び出せるようにするにはexportを先頭につける
//デフォルトで呼び出すコンポーネントの指定にはdefaultを使う
//例　export default class TodoList extends React.Component {
export class TodoList extends React.Component {

  constructor(props){
    super(props);
    this.state = { //どのTaskがあり表示するかを管理するために必要なデータを定義するisDoneやeditモードはTaskファイルで管理すればいいのでいらない
      data: [ //コレクション型を使用 配列で要素一つ一つがオブジェクトになっている
        {
          id: 0,
          text: 'sample todo1'
        },
        {
          id: 1,
          text: 'sample todo2'
        }
      ]
    };
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleRemove(id){
    // for in などでループしてidをチェックしてもいいが、lodashで簡単にできる
    // let data = [];
    // for(let i in this.state.data){
    //   if(this.state.data[i].id !== id){
    //     data.push(this.state.data[i]);
    //   }
    // }
    let data = _.reject(this.state.data, { 'id': id });//lodashライブラリの_.rejectメソッドを使用
    //_.reject(コレクション型のデータ,{'任意の要素のプロパティ': 吟味データ})とすることで任意の要素のプロパティのデータが吟味データと一致する要素は、第一引数の配列から除外される
    this.setState({
      data: data
    });
  }
  render() {

    let tasks = [];
    for(let i in this.state.data){ //一個一個Taskコンポーネントをtasksに格納していく
      // コンポーネントをループで複数生成する場合は、keyを指定する必要がある。
      // keyはReactがコンポーネントを一意に識別するためのもの
      // keyにはiかidを指定することが一般的
      tasks.push(<Task key={this.state.data[i].id}
                       id={this.state.data[i].id}
                       text={this.state.data[i].text} onRemove={this.handleRemove} />);
                 //propsのid text onRemoveにデータと関数を渡している
    }

    return (
      <ul className="list js-todo_list">
        {tasks}
      </ul>
    );
  }
}
