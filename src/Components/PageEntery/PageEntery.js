import React from 'react';
import { setState} from 'react';
import './PageEntery.css';
import Login from '../Login/Login.js'
import Register from '../Register/Register.js'



class PageEntery extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:"login",
            timer : null,
            opacityTimer : null,
            actualphoto: 3 ,
            photos:[
                require("../../img/b1.jpg"),
                require("../../img/b2.jpg"),
                require("../../img/b3.jpg")
            ]
          }
          this.componentDidMount = this.componentDidMount.bind(this)
          this.changePage = this.changePage.bind(this)
    }
    
    changePage(pagename){
        this.setState({page:pagename})
    }
    
    componentDidMount() {
       this.state.timer = setInterval(() =>{ 
            if(this.state.actualphoto===3){
                document.getElementById("img3").style.opacity =1.0
                this.state.opacityTimer = setInterval(() =>{
                        let newOpacity = Number(document.getElementById("img3").style.opacity);
                        newOpacity -= 0.05;
                        
                        document.getElementById("img3").style.opacity = newOpacity;
                        if(newOpacity <= 0.0 )   clearInterval(this.state.opacityTimer)
                } , 
                    50)     
                    this.setState({actualphoto:2})
                
            }else if(this.state.actualphoto===2){
                document.getElementById("img2").style.opacity =1.0
                this.state.opacityTimer = setInterval(() =>{
                        let newOpacity = Number(document.getElementById("img2").style.opacity);
                        newOpacity -= 0.05;
                        
                        document.getElementById("img2").style.opacity = newOpacity;
                        if(newOpacity <= 0.0 )   clearInterval(this.state.opacityTimer)
                } , 
                    50)     
                    this.setState({actualphoto:1})
            }else{
                document.getElementById("img3").style.opacity =0.0
                document.getElementById("img2").style.opacity =0.0
                this.state.opacityTimer = setInterval(() =>{
                        let newOpacity = Number(document.getElementById("img3").style.opacity);
                        document.getElementById("img2").style.opacity =0.0
                        newOpacity += 0.05;
                        document.getElementById("img3").style.opacity = newOpacity;
                        if(newOpacity >= 1.0 )  { 
                            clearInterval(this.state.opacityTimer)
                            document.getElementById("img2").style.opacity = 1.0;
                        }
                } , 
                    50)     
                    this.setState({actualphoto:3})
            }
        }
        , 5000)
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
        clearInterval(this.state.opacityTimer)
      }
      


    render(){
        if(this.state.page === "login")
        return (
            <div id="container"    >
                <img id ="img1" src={this.state.photos[0]}/>
                <img id ="img2" src={this.state.photos[1]}/>
                <img id ="img3" src={this.state.photos[2]}/>
                <div id ="inside">
                    <Login changePage= {this.changePage} LogIn = {this.props.LogIn}/>

                </div>
            </div>
        )
        else 
        return (
            <div id="container"    >
                <img id ="img1" src={this.state.photos[0]}/>
                <img id ="img2" src={this.state.photos[1]}/>
                <img id ="img3" src={this.state.photos[2]}/>
                <div id ="inside">
                    <Register changePage= {this.changePage}/>

                </div>
            </div>
        )
    }

}

export default PageEntery;