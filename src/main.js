var React = require('react');
var ReactDom = require('react-dom');

var Meetup = React.createClass({


    getInitialState: function () {
        return {
            meetup: "hola paps"
        }
    },

    componentDidMount: function(){
        var self = this;
        var ref = firebase.database().ref("meetup")

        ref.on('value',function (snapshot) {
            
            console.log(snapshot.val())
            self.setState({
                meetup: snapshot.val()
            })
        })
    },

    render: function () {
        return(
            <div>
                <h1>{this.state.meetup}</h1>
            </div>
        );
    }

})

ReactDom.render(<Meetup />, document.getElementById('app'))
