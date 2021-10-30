import axios from "axios";
import React, { Component, useState } from "react";







export class APIConsumer extends Component {
    static i=0

    static apis = {};
    
    constructor(props) {
        super(props);

        const { url, mode, responseKey, infoKey, APIClass,id=url} = props
        
        if (APIConsumer.apis===null)
            APIConsumer.apis={};
        
        //APIConsumer.apis[id]=React.createContext(this)
        APIConsumer.apis[id]=this

        this.setState({count:0})


    }

    componentDidMount() {
        console.log("Montando");

    }

    static get(id){

        return new Promise((resolve,reject)=>{
            
            const loop= setInterval(() => {
                
                if (APIConsumer.apis[id]!==undefined){
                    resolve(APIConsumer.apis[id])
                    clearInterval(loop)
                }

            }, 300);

        });        
    }

    add(add=1){
        this.setState((state)=>{return {
            count:state.count+add
        }})
    }

    static mode = {
        SINGLE: "single",
        ARRAY: "array"
    }

    static events = {
        ERROR:'Error',
        MESSAGE:'Message',
        COOKIE:'Cookie',
        CHANGEINFO:'changeInfo',
        MOUNT:'Mount',
        SENDING:'Sending',
        CHANGEDATA:'ChangeData',
        INPUTDATA:'InputData',
        FINISHLOAD:'FinishLoad'
    }

    render() {
        return (<>{this.props.children}</>)
    }
}
