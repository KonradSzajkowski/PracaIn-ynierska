import React,{useEffect} from 'react'
import DoubleHeader from '../DoubleHeader/DoubleHeader'
import Container from 'react-bootstrap/Container'
import './re.css'
import { render } from '@testing-library/react'
import StandardButton from '../Buttons/StandardButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash  } from '@fortawesome/free-solid-svg-icons'
import pdfMake,{info,title,subject,keywords,content} from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import SecondButton from '../Buttons/SecondButton'
import printJS from 'print-js'
import AddRePositionModal from './AddRePositionModal'
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class Re extends React.Component{
    constructor(props){
        super(props)
        this.state ={
        }
    this.monthName= this.monthName.bind(this)
    this.setMonth=this.setMonth.bind(this)
    this.setYear=this.setYear.bind(this)
    this.getAccountingPeriodRePositions=this.getAccountingPeriodRePositions.bind(this)
    this.getAccountingPastRePositions=this.getAccountingPastRePositions.bind(this)
    this.printToPdf=this.printToPdf.bind(this)
    }
    monthName(month){
        switch(month){
            case 0: return 'styczeń' 
            break
            case 1: return 'luty' 
            break
            case 2: return 'marzec' 
            break
            case 3: return 'kwiecień' 
            break
            case 4: return 'maj' 
            break
            case 5: return 'czerwiec' 
            break
            case 6: return 'lipiec' 
            break
            case 7: return 'sierpień' 
            break
            case 8: return 'wrzesień' 
            break
            case 9: return 'październik' 
            break
            case 10: return 'listopad' 
            break
            case 11: return 'grudzień' 
            break
        }
    }

    getAccountingPeriodRePositions(){

        let yearFilter = this.props.rePositions.filter(item=>new Date(item.salesDate).getFullYear() == this.props.accountingYear)   
        return yearFilter.filter(item=>new Date(item.salesDate).getMonth() == this.props.accountingMonth ).sort((a,b)=>{return new Date(a.documentDate) - new Date(b.documentDate)})

    }

    getAccountingPastRePositions(){
        let yearFilter = this.props.rePositions.filter(item=>new Date(item.salesDate).getFullYear() == this.props.accountingYear)   
        return yearFilter.filter(item=>new Date(item.salesDate).getMonth() < this.props.accountingMonth )
    }
   
    setMonth(e){
        this.props.setAccountingPeriodMonth(e.target.value-1)
    }

    setYear(e){
        this.props.setAccountingPeriodYear(e.target.value)
        
    }

    async printToPdf(docDefinition){   
          var x= await pdfMake.createPdf(docDefinition)
          x.download("re-"+this.props.accountingYear+"-"+this.props.accountingMonth)
    }

    render(){  
        let months = []
        for(let i=1;i<13;i++){

            months.push(<option >{i}</option>)
        }   
        let years=[] 
        for(let i=2019;i<=new Date().getFullYear();i++){

            years.push(<option >{i}</option>)
        }
        let allTax20=0
        let allTax17=0
        let allTax8_5=0
        let allTax5_5=0
        let allTax3=0
        let allTax10=0

        let reRows=[]
        let rePdfRows=[]
        let reRowsData = this.getAccountingPeriodRePositions()
        for(let i=0;i<reRowsData.length;i++){
            reRows.push(
                <tr>
                    <td>{i+1}</td>
                    <td>{new Date(reRowsData[i].documentDate).toLocaleDateString()} </td>
                    <td>{new Date(reRowsData[i].salesDate).toLocaleDateString()}</td>
                    <td>{reRowsData[i].document}</td>
                    <td>{Number(reRowsData[i].tax20)}</td>
                    <td>{Number(reRowsData[i].tax17)}</td>
                    <td>{Number(reRowsData[i].tax8_5)}</td>
                    <td>{Number(reRowsData[i].tax5_5)}</td>
                    <td>{Number(reRowsData[i].tax3)}</td>
                    <td>{Number(reRowsData[i].tax20)+Number(reRowsData[i].tax17)+Number(reRowsData[i].tax8_5)+Number(reRowsData[i].tax5_5)+Number(reRowsData[i].tax3)}</td>
                    <td>{Number(reRowsData[i].tax10)}</td>
                    <td>{reRowsData[i].comments}</td>
                    <td><FontAwesomeIcon icon={faTrash} onClick={() => {this.props.removeRePosition(reRowsData[i].id) }}/></td>
                </tr>
            )
            rePdfRows.push(
                [
                    {text:i+1,alignment:'center',fontSize: 8},
                    {text:new Date(reRowsData[i].documentDate).toLocaleDateString() ,alignment:'center',fontSize: 8},
                    {text:new Date(reRowsData[i].salesDate).toLocaleDateString() ,alignment:'left',fontSize: 8},
                    {text:reRowsData[i].document,alignment:'center',fontSize: 8},
                    {text:Number(reRowsData[i].tax20).toFixed(2),alignment:'center',fontSize: 8},
                    {text:Number(reRowsData[i].tax17).toFixed(2),alignment:'center',fontSize: 8},
                    {text:Number(reRowsData[i].tax8_5).toFixed(2),alignment:'center',fontSize: 8},
                    {text:Number(reRowsData[i].tax5_5).toFixed(2),alignment:'center',fontSize: 8},
                    {text:Number(reRowsData[i].tax3).toFixed(2),alignment:'center',fontSize: 8},
                    {text:(Number(reRowsData[i].tax20)+Number(reRowsData[i].tax17)+Number(reRowsData[i].tax8_5)+Number(reRowsData[i].tax5_5)+Number(reRowsData[i].tax3)).toFixed(2),alignment:'center',fontSize: 8},
                    {text:Number(reRowsData[i].tax10).toFixed(2),alignment:'center',fontSize: 8},
                    {text:reRowsData[i].comments,alignment:'center',fontSize: 8},
                
                ]
            )
            allTax20+=Number(reRowsData[i].tax20)
            allTax17+=Number(reRowsData[i].tax17)
            allTax8_5+=Number(reRowsData[i].tax8_5)
            allTax5_5+=Number(reRowsData[i].tax5_5)
            allTax3+=Number(reRowsData[i].tax3)
            allTax10+=Number(reRowsData[i].tax10)
 
        }
        let allPdfRows=[]
        allPdfRows.push(
            [
                {text:'Suma strony:',colSpan:4,alignment:'right',fontSize: 8},
                {},
                {},
                {},
                {text:allTax20.toFixed(2),alignment:'center',fontSize: 8},
                {text:allTax17.toFixed(2),alignment:'center',fontSize: 8},
                {text:allTax8_5.toFixed(2),alignment:'center',fontSize: 8},
                {text:allTax5_5.toFixed(2),alignment:'center',fontSize: 8},
                {text:allTax3.toFixed(2),alignment:'center',fontSize: 8},
                {text:(allTax20+allTax17+allTax8_5+allTax5_5+allTax3).toFixed(2),alignment:'center',fontSize: 8},
                {text:allTax10.toFixed(2),alignment:'center',fontSize: 8},
                {text:'',alignment:'center',fontSize: 8}
            ]
        )

        let pastTax20=0
        let pastTax17=0
        let pastTax8_5=0
        let pastTax5_5=0
        let pastTax3=0
        let pastTax10=0

        let pastReRows=this.getAccountingPastRePositions()
        for(let i=0;i<pastReRows.length;i++){
            pastTax20+=Number(pastReRows[i].tax20)
            pastTax17+=Number(pastReRows[i].tax17)
            pastTax8_5+=Number(pastReRows[i].tax8_5)
            pastTax5_5+=Number(pastReRows[i].tax5_5)
            pastTax3+=Number(pastReRows[i].tax3)
            pastTax10+=Number(pastReRows[i].tax10)
        }
        let pastPdfRows=[]
        pastPdfRows.push(
            [
                {text:'Przeniesione z poprzedniej strony:',colSpan:4,alignment:'right',fontSize: 8},
                {},
                {},
                {},
                {text:pastTax20.toFixed(2),alignment:'center',fontSize: 8},
                {text:pastTax17.toFixed(2),alignment:'center',fontSize: 8},
                {text:pastTax8_5.toFixed(2),alignment:'center',fontSize: 8},
                {text:pastTax5_5.toFixed(2),alignment:'center',fontSize: 8},
                {text:pastTax3.toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastTax20+pastTax17+pastTax8_5+pastTax5_5+pastTax3).toFixed(2),alignment:'center',fontSize: 8},
                {text:pastTax10.toFixed(2),alignment:'center',fontSize: 8},
                {text:'',alignment:'center',fontSize: 8}
            ]
        )

        let allPastPdfRows=[]
        allPastPdfRows.push(
            [
                {text:'Razem od początku roku:',colSpan:4,alignment:'right',fontSize: 8},
                {},
                {},
                {},
                {text:(pastTax20+allTax20).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastTax17+allTax17).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastTax8_5+allTax8_5).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastTax5_5+allTax5_5).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastTax3+allTax3).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastTax20+pastTax17+pastTax8_5+pastTax5_5+pastTax3+allTax20+allTax17+allTax8_5+allTax5_5+allTax3).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastTax10+allTax10).toFixed(2),alignment:'center',fontSize: 8},
                {text:'',alignment:'center',fontSize: 8}
            ]
        )


        var docDefinition = {  
            pageOrientation: 'landscape',  
            content: [
                {
                    columns:[
                        {
                            text:[
                                {text: 'Ewidencja Przychodów'+'\n',fontSize: 19,bold:true},
                                {text: this.monthName(this.props.accountingMonth)+ " " + this.props.accountingYear,bold:true, fontSize:25},
                            ],
                            width:'55%'
                        },
                        [
                            {text:'Firma:'+this.props.companyInfo.name},
                            {text:'Adres:'+this.props.companyInfo.post + " " + this.props.companyInfo.postName + " "+ this.props.companyInfo.adres },
                            {text:'Nip:'+this.props.companyInfo.nip}
                        ]
                    ],
                },
                {
                  table: {
                    headerRows: 3,
                    widths: [ 12, 'auto', 'auto', 'auto','auto', 'auto', 'auto', 'auto','auto', 'auto', 'auto', 'auto'],
                    
                    body:[
                      [ {text:'Lp.',alignment:'center',fontSize: 8},{text:'Data Wpisu',alignment:'center',fontSize: 8},{text:'Data uzyskania przychodu',alignment:'center',fontSize: 8},{text:'Numer dowodu, na podstawie którego dokonano wpisu',alignment:'center',fontSize: 8},{text:'Kwota przychodu opodatkowana według stawk',alignment:'center',colSpan:5,fontSize: 8},{},{},{},{},{text:'Ogółem przychody (5+6+7+8+9)',alignment:'center',fontSize: 8},{text:'Kwota przychodu opodatkowana według stawk',alignment:'center',fontSize: 8},{text:'Uwagi',alignment:'center',fontSize: 8}],
                      [ '','','','',{text:'20%',alignment:'center',fontSize: 8},{text:'17%',alignment:'center',fontSize: 8},{text:'8,5%',alignment:'center',fontSize: 8},{text:'5,5%',alignment:'center',fontSize: 8},{text:'3%',alignment:'center',fontSize: 8},'',{text:'10%',alignment:'center',fontSize: 8},''],
                      [ {text:'-1-',alignment:'center',fontSize: 8},{text:'-2-',alignment:'center',fontSize: 8},{text:'-3-',alignment:'center',fontSize: 8},{text:'-4-',alignment:'center',fontSize: 8},{text:'-5-',alignment:'center',fontSize: 8},{text:'-6-',alignment:'center',fontSize: 8},{text:'-7-',alignment:'center',fontSize: 8},{text:'-8-',alignment:'center',fontSize: 8},{text:'-9-',alignment:'center',fontSize: 8},{text:'-10-',alignment:'center',fontSize: 8},{text:'-11-',alignment:'center',fontSize: 8},{text:'-12-',alignment:'center',fontSize: 8}],
                    ].concat(rePdfRows).concat(allPdfRows).concat(pastPdfRows).concat(allPastPdfRows)
                  }
                }
              ],
        }
        return(
            <>

                <div id="mainContainer">
                    <DoubleHeader bigger={"Miesiąc rozrachunkowy"} smaller={this.monthName(this.props.accountingMonth)+ " " + this.props.accountingYear}/>     
                    <Form>
                        
                        <Form.Row>
                            <Form.Group as={Col} xs="3" md="2" >
                                <Form.Label>Miesiąc</Form.Label>
                                <Form.Control as={Col} as="select" onChange={this.setMonth} defaultValue={this.props.accountingMonth+1}>
                                    {months}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} xs="3" md="2">
                                <Form.Label>Rok</Form.Label>
                                <Form.Control as={Col} as="select" onChange={this.setYear} defaultValue={this.props.accountingYear}>
                                    {years}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                    </Form> 
                    <div id="tab">
                        <Table striped bordered hover size="sm" variant="dark">
                        <thead>
                            <tr>
                            <th>Lp.</th>
                            <th>Data wpisu</th>
                            <th>Data uzyskania przychodu</th>
                            <th>Numer dowodu, na podstawie którego dokonano wpisu</th>
                            <th>stawka opodatkowania 20%</th>
                            <th>stawka opodatkowania  17%</th>
                            <th>stawka opodatkowania 8,5%</th>
                            <th>stawka opodatkowania 5,5%</th>
                            <th>stawka opodatkowania 3%</th>
                            <th>ogółem przychody </th>
                            <th>stawka opodatkowania 10%</th>
                            <th>Uwagi</th>
                            <th>Usuń</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reRows}
                            <tr>
                                <td colSpan='4'>Suma strony:</td>
                                <td>{allTax20}</td>
                                <td>{allTax17}</td>
                                <td>{allTax8_5}</td>
                                <td>{allTax5_5}</td>
                                <td>{allTax3}</td>
                                <td>{allTax20+allTax17+allTax8_5+allTax5_5+allTax3}</td>
                                <td>{allTax10}</td>
                                <td></td>
                                <td></td>

                            </tr>
                            <tr>
                                <td colSpan='4'>Przeniesione z poprzedniej strony:</td>
                                <td>{pastTax20}</td>
                                <td>{pastTax17}</td>
                                <td>{pastTax8_5}</td>
                                <td>{pastTax5_5}</td>
                                <td>{pastTax3}</td>
                                <td>{pastTax20+pastTax17+pastTax8_5+pastTax5_5+pastTax3}</td>
                                <td>{pastTax10}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan='4'>Razem od początku roku:</td>
                                <td>{pastTax20+allTax20}</td>
                                <td>{pastTax17+allTax17}</td>
                                <td>{pastTax8_5+allTax8_5}</td>
                                <td>{pastTax5_5+allTax5_5}</td>
                                <td>{pastTax3+allTax3}</td>
                                <td>{pastTax20+pastTax17+pastTax8_5+pastTax5_5+pastTax3+allTax20+allTax17+allTax8_5+allTax5_5+allTax3}</td>
                                <td>{pastTax10+allTax10}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        </Table>
                    </div>
                    <StandardButton onClick={this.props.showAddRePosition} value='dodaj' />
                    <SecondButton value="Drukuj" onClick={() => {
                        this.printToPdf(docDefinition)
                    }}/>
                </div>
                <AddRePositionModal AddRePosition={this.props.AddRePosition} contractors ={this.props.contractors} closeAddRePosition={this.props.closeAddRePosition} showAddRePosition={this.props.showAddRePosition} show={this.props.showAddRePositionModal} accountingMonth={this.props.accountingMonth} accountingYear={this.props.accountingYear} rePositions={this.props.rePositions}/>
            </>
        )
    }
}

export default Re;