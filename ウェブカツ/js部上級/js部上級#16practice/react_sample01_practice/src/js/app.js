import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('app1');
);

function formatName(user){
    return user.firstName + ' ' + user.lastName;
}

var user = {
    firstName: 'kaz',
    lastName: 'kichi'
};

var element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);
               
ReactDOM.render(
    element,
    document.getElementById('app2')
);
                
class Welcome extends React.Component{
    render(){
        return <h1>Hello, {this.props.name}</h1>;            
    }        
}
const element2 = <Welcome name = "Sara" />;
ReactDOM.render(
    element2,
    document.getElementById('app3')
);

function Clock(props){
    return(
    <div>
        <h1>Hello, world!</h1>
        <h2>It is {props.date.toLocaleDateString()}.</h2>
    </div>
    );
}
function tick(){
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById('app4')
    );
}
setInterval(tick, 1000);

class Clock2 extends React.Component{
    constructer(props){
        super(props);
        this.state = {
            date; new Date()//backboneのdefaultsみたいな感じ
        };
    }
    
    render(){
        return(
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
        );
    }
}
ReactDOM.render(
    <Clock2 />,
    document.getElementById('app5');
)

class Clock3 extends React.Component{
    constructer(props){
        console.log('constructer');
        super(props);
        this.state = {date: new Date()};
    }
    componentWillMount(){
        console.log()
    }
}