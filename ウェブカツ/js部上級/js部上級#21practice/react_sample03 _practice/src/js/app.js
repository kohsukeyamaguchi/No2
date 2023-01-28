//htmlで読み込まれる大元のファイル
import React from 'react';
import ReactDOM from 'react-dom';
import {TodoList} from './components/TodoList'//このファイルを起点にして読み込んでいる
//コンポーネント呼び出し元ファイル(TodoListファイル)に複数コンポーネントクラスが定義されてあった場合に中括弧({任意のコンポーネントのクラス名})を使うことで指定して呼び出すこともできる
//呼び出し元に一つしかコンポーネントクラスがない場合は、中括弧（{})なしでもOK
//jsxの書き方のルールで一番親のDOMと同階層に複数のDOMがあるのはNG、一番親の階層はDOMひとつだけ
//TodoAppコンポーネントの中に、TodoListコンポーネントがあり、またTodoListコンポーネント定義ファイルにいくとTaskコンポーネントが入っているようにコンポーネントを入れ子にできる
//jsxの書き方でclass属性はclassNameと書く
class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <form className="form">
          <div className="inputArea">
            <input type="text" className="inputText js-get-val" value="" placeholder="smothing todo task" />
            <span className="error js-toggle-error">入力が空です</span>
          </div>
        </form>

        <div className="searchBox">
          <i className="fa fa-search searchBox__icon" aria-hidden="true" />
          <input type="text" className="searchBox__input js-search"
                 value="" placeholder="somothing keyword" />
        </div>

        <TodoList />


      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);
