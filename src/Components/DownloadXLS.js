
import React from "react";
import ReactExport from "react-export-excel";
import { Button } from "reactstrap";


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export class DownloadXLS extends React.Component {
    render() {
        const { api, children,name}=this.props

        const data = JSON.parse(JSON.stringify(api.getHookData()))
        if (data.length>0)
            data[2].cell="JAJA"

        return (
            <ExcelFile filename={name} element={<Button>Descargar</Button>}>
                <ExcelSheet data={data} name={name}>
                    {children.map((column,i)=>{
                        return <ExcelColumn label={getName(column)} value={(elemento)=>
                            (column.key && elemento[column.key]) ? elemento[column.key] :
                                column.props.text ? column.props.text :
                                column.props.func ? column.props.func(elemento) || "" :
                                        "" 
                        }/>
                        }
                    )}
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

function getName(params) {
    if (params.props.children)
        return `${params.props.children}`
    return ``
}


/*


const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];

 <ExcelSheet data={dataSet1} name="Employees">
    <ExcelColumn label="Name" value="name"/>
    <ExcelColumn label="Wallet Money" value="amount"/>
    <ExcelColumn label="Gender" value="sex"/>
    <ExcelColumn label="Marital Status"
        value={(col) => col.is_married ? "Married" : "Single"}/>
</ExcelSheet>
<ExcelSheet data={dataSet2} name="Leaves">
    <ExcelColumn label="Name" value="name"/>
    <ExcelColumn label="Total Leaves" value="total"/>
    <ExcelColumn label="Remaining Leaves" value="remaining"/>
</ExcelSheet>

*/