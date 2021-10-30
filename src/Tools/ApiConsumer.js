import axios from "axios";
import React, { Component, useState } from "react";
import { Button } from "reactstrap";







export class APIConsumer extends Component {
    static i=0

    static apis = {};
    
    constructor(props) {
        super(props);

        const { url, mode, responseKey, infoKey, APIClass,id=url} = props
        
        if (APIConsumer.apis===null)
            APIConsumer.apis={};
        
        //APIConsumer.apis[id]=React.createContext(this)

        this.state={count:0}
        document.APIConsumer=APIConsumer

        this.actualizador=()=>{}

        APIConsumer.apis[id]=this
    }

    componentDidMount() {
        console.log("Montando");

    }

    toString(){
        return JSON.stringify(this.state)
    }


    static updater(id,updater){

        const promesa = APIConsumer.get(id)
        
        if (updater) {
            promesa.then((res)=>{
            res.actualizador=updater
            return res
            })
        }

        return promesa
    }


    static get(id,setter){

        const promesa = new Promise((resolve,reject)=>{
            
            const loop= setInterval(() => {
                
                if (APIConsumer.apis[id]!==undefined){
                    resolve(APIConsumer.apis[id])
                    clearInterval(loop)
                }

            }, 30);

        }); 

        if (setter) {
            promesa.then((res)=>{
            setter(res);
            return res
            })
        }

        return promesa
        
        
    }

    add(add=1){
        this.setState((state)=>{return {
            count:state.count+add
        }}, () => {
            this.actualizador(Math.random());
        })
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
        return (<>{this.props.children}{JSON.stringify(this.state)}<Button onClick={()=>this.add()}>Go</Button></>)
    }
}
