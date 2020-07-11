import React,{useEffect} from 'react'
import DoubleHeader from '../DoubleHeader/DoubleHeader'
import Container from 'react-bootstrap/Container'
import './kpir.css'
import { render } from '@testing-library/react'
import StandardButton from '../Buttons/StandardButton'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table'
import AddKpirPositionModal from './AddKpirPositionModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash  } from '@fortawesome/free-solid-svg-icons'
import pdfMake,{info,title,subject,keywords,content} from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import SecondButton from '../Buttons/SecondButton'
import printJS from 'print-js'
pdfMake.vfs = pdfFonts.pdfMake.vfs;


class Kpir extends React.Component{
    constructor(props){
        super(props)
        this.state ={
        }
    this.monthName= this.monthName.bind(this)
    this.setMonth=this.setMonth.bind(this)
    this.setYear=this.setYear.bind(this)
    this.getAccountingPeriodKpirPositions=this.getAccountingPeriodKpirPositions.bind(this)
    this.getAccountingPastKpirPositions=this.getAccountingPastKpirPositions.bind(this)
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

    getAccountingPeriodKpirPositions(){
        let yearFilter = this.props.kpirPositions.filter(item=>new Date(item.date).getFullYear() == this.props.accountingYear)   
        return yearFilter.filter(item=>new Date(item.date).getMonth() == this.props.accountingMonth).sort((a,b)=>{return new Date(a.date) - new Date(b.date)})

    }

    getAccountingPastKpirPositions(){
        let yearFilter = this.props.kpirPositions.filter(item=>new Date(item.date).getFullYear() == this.props.accountingYear)   
        return yearFilter.filter(item=>new Date(item.date).getMonth() < this.props.accountingMonth )
    }
   
    setMonth(e){
        this.props.setAccountingPeriodMonth(e.target.value-1)
    }

    setYear(e){
        this.props.setAccountingPeriodYear(e.target.value)
        
    }

    async printToPdf(docDefinition){   
          var x= await pdfMake.createPdf(docDefinition)
          x.download("kpir-"+this.props.accountingYear+"-"+this.props.accountingMonth)
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
        let allSalesIncome=0
        let allOtherIncomes=0
        let allMaterialsCosts=0
        let allSideCosts=0
        let allSalaryCosts=0
        let allOtherCosts=0
        let allOther=0
        let allResearchValue=0

        let kpirRows=[]
        let kpirPdfRows=[]
        let kpirRowsData = this.getAccountingPeriodKpirPositions()
        for(let i=0;i<kpirRowsData.length;i++){
            kpirRows.push(
                <tr>
                    <td>{i+1}</td>
                    <td>{kpirRowsData[i].document} <br></br> {new Date(kpirRowsData[i].date).toLocaleDateString()} <br></br> {kpirRowsData[i].description } </td>
                    <td>{kpirRowsData[i].contractorName}</td>
                    <td>{Number(kpirRowsData[i].salesIncome)}</td>
                    <td>{Number(kpirRowsData[i].otherIncomes)}</td>
                    <td>{Number(kpirRowsData[i].salesIncome)+Number(kpirRowsData[i].otherIncomes)}</td>
                    <td>{Number(kpirRowsData[i].materialsCosts)}</td>
                    <td>{Number(kpirRowsData[i].sideCosts)}</td>
                    <td>{Number(kpirRowsData[i].salaryCosts)}</td>
                    <td>{Number(kpirRowsData[i].otherCosts)}</td>
                    <td>{Number(kpirRowsData[i].salaryCosts)+Number(kpirRowsData[i].otherCosts)}</td>
                    <td>{Number(kpirRowsData[i].other)}</td>
                    <td>{kpirRowsData[i].researchDescription}</td>
                    <td>{Number(kpirRowsData[i].researchValue)}</td>
                    <td>{kpirRowsData[i].comments}</td>
                    <td><FontAwesomeIcon icon={faTrash} onClick={() => {this.props.removeKpirPosition(kpirRowsData[i].id) }}/></td>
                </tr>
            )
            kpirPdfRows.push(
                [
                    {text:i+1,alignment:'center',fontSize: 8},
                    {text:kpirRowsData[i].document+'\n'+ new Date(kpirRowsData[i].date).toLocaleDateString() +'\n'+ kpirRowsData[i].description ,alignment:'center',fontSize: 8},
                    {text:'N: '+ kpirRowsData[i].contractorNip + '\n' +'F: '+kpirRowsData[i].contractorName+'\n'+ 'A: '+ kpirRowsData[i].contractorPost+' '+kpirRowsData[i].contractorPostName+' '+kpirRowsData[i].contractorAdres ,alignment:'left',fontSize: 8},
                    {text:Number(kpirRowsData[i].salesIncome).toFixed(2),alignment:'center',fontSize: 8},
                    {text:Number(kpirRowsData[i].otherIncomes).toFixed(2),alignment:'center',fontSize: 8},
                    {text:(Number(kpirRowsData[i].salesIncome)+Number(kpirRowsData[i].otherIncomes)).toFixed(2),alignment:'center',fontSize: 8},
                    {text:Number(kpirRowsData[i].materialsCosts).toFixed(2),alignment:'center',fontSize: 8},
                    {text:Number(kpirRowsData[i].sideCosts).toFixed(2),alignment:'center',fontSize: 8},
                    {text:Number(kpirRowsData[i].salaryCosts).toFixed(2),alignment:'center',fontSize: 8},
                    {text:Number(kpirRowsData[i].otherCosts).toFixed(2),alignment:'center',fontSize: 8},
                    {text:(Number(kpirRowsData[i].salaryCosts)+Number(kpirRowsData[i].otherCosts)).toFixed(2),alignment:'center',fontSize: 8},
                    {text:Number(kpirRowsData[i].other).toFixed(2),alignment:'center',fontSize: 8},
                    {text:kpirRowsData[i].researchDescription,alignment:'center',fontSize: 8},
                    {text:Number(kpirRowsData[i].researchValue).toFixed(2),alignment:'center',fontSize: 8},
                    {text:kpirRowsData[i].comments,alignment:'center',fontSize: 8},  
                ]
            )
            allSalesIncome+=Number(kpirRowsData[i].salesIncome)
            allOtherIncomes+=Number(kpirRowsData[i].otherIncomes)
            allMaterialsCosts+=Number(kpirRowsData[i].materialsCosts)
            allSideCosts+=Number(kpirRowsData[i].sideCosts)
            allSalaryCosts+=Number(kpirRowsData[i].salaryCosts)
            allOtherCosts+=Number(kpirRowsData[i].otherCosts)
            allOther+=Number(kpirRowsData[i].other)
            allResearchValue+=Number(kpirRowsData[i].researchValue)
        }
        let allPdfRows=[]
        allPdfRows.push(
            [
                {text:'Suma strony:',colSpan:3,alignment:'right',fontSize: 8},
                {},
                {},
                {text:allSalesIncome.toFixed(2),alignment:'center',fontSize: 8},
                {text:allOtherIncomes.toFixed(2),alignment:'center',fontSize: 8},
                {text:(allSalesIncome+allOtherIncomes).toFixed(2),alignment:'center',fontSize: 8},
                {text:allMaterialsCosts.toFixed(2),alignment:'center',fontSize: 8},
                {text:allSideCosts.toFixed(2),alignment:'center',fontSize: 8},
                {text:allSalaryCosts.toFixed(2),alignment:'center',fontSize: 8},
                {text:allOtherCosts.toFixed(2),alignment:'center',fontSize: 8},
                {text:(allSalaryCosts+allOtherCosts).toFixed(2),alignment:'center',fontSize: 8},
                {text:allOther.toFixed(2),alignment:'center',fontSize: 8},
                {text:'',alignment:'center',fontSize: 8},
                {text:allResearchValue.toFixed(2),alignment:'center',fontSize: 8},
                {text:'',alignment:'center',fontSize: 8}
            ]
        )

        let pastSalesIncome=0
        let pastOtherIncomes=0
        let pastMaterialsCosts=0
        let pastSideCosts=0
        let pastSalaryCosts=0
        let pastOtherCosts=0
        let pastOther=0
        let pastResearchValue=0

        let pastKpirRows=this.getAccountingPastKpirPositions()
        for(let i=0;i<pastKpirRows.length;i++){
            pastSalesIncome+=Number(pastKpirRows[i].salesIncome)
            pastOtherIncomes+=Number(pastKpirRows[i].otherIncomes)
            pastMaterialsCosts+=Number(pastKpirRows[i].materialsCosts)
            pastSideCosts+=Number(pastKpirRows[i].sideCosts)
            pastSalaryCosts+=Number(pastKpirRows[i].salaryCosts)
            pastOtherCosts+=Number(pastKpirRows[i].otherCosts)
            pastOther+=Number(pastKpirRows[i].other)
            pastResearchValue+=Number(pastKpirRows[i].researchValue)
        }
        let pastPdfRows=[]
        pastPdfRows.push(
            [
                {text:'Przeniesione z poprzedniej strony:',colSpan:3,alignment:'right',fontSize: 8},
                {},
                {},
                {text:pastSalesIncome.toFixed(2),alignment:'center',fontSize: 8},
                {text:pastOtherIncomes.toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastSalesIncome+pastOtherIncomes).toFixed(2),alignment:'center',fontSize: 8},
                {text:pastMaterialsCosts.toFixed(2),alignment:'center',fontSize: 8},
                {text:pastSideCosts.toFixed(2),alignment:'center',fontSize: 8},
                {text:pastSalaryCosts.toFixed(2),alignment:'center',fontSize: 8},
                {text:pastOtherCosts.toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastSalaryCosts+pastOtherCosts).toFixed(2),alignment:'center',fontSize: 8},
                {text:pastOther.toFixed(2),alignment:'center',fontSize: 8},
                {text:'',alignment:'center',fontSize: 8},
                {text:pastResearchValue.toFixed(2),alignment:'center',fontSize: 8},
                {text:'',alignment:'center',fontSize: 8}
            ]
        )

        let allPastPdfRows=[]
        allPastPdfRows.push(
            [
                {text:'Razem od poczatku roku:',colSpan:3,alignment:'right',fontSize: 8},
                {},
                {},
                {text:(allSalesIncome+pastSalesIncome).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastOtherIncomes+allOtherIncomes).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastSalesIncome+pastOtherIncomes+allSalesIncome+allOtherIncomes).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastMaterialsCosts+allMaterialsCosts).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastSideCosts+allSideCosts).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastSalaryCosts+allSalaryCosts).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastOtherCosts+allOtherCosts).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastSalaryCosts+pastOtherCosts+allSalaryCosts+allOtherCosts).toFixed(2),alignment:'center',fontSize: 8},
                {text:(pastOther+allOther).toFixed(2),alignment:'center',fontSize: 8},
                {text:'',alignment:'center',fontSize: 8},
                {text:(pastResearchValue+allResearchValue).toFixed(2),alignment:'center',fontSize: 8},
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
                                {text: 'Podatkowa Księga Przychodów i Rozchodów'+'\n',fontSize: 19,bold:true},
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
                    widths: [ 12, 'auto', 'auto', 'auto','auto', 'auto', 'auto', 'auto','auto', 'auto', 'auto', 'auto','auto','auto','auto'],
                    
                    body:[
                      [ '','','',{text:'Przychody',fontSize: 11, colSpan:3,alignment: 'center'},{},{}, {text:'Wydatki', colSpan:6,alignment: 'center'},{},{},{},{},{}, {text:'Badania i rozwój', colSpan:2,alignment: 'center'},{},'' ],
                      [ {text:'Lp.',alignment:'center',fontSize: 8},{text:'Nr dowodu księgowego, Data, Opis',alignment:'center',fontSize: 8}, {text:'Kontrahent N:NIP, F:Firma, A:Adres',alignment:'center',fontSize: 8},{text:'Wartość sprzedanych towarów i usług',alignment:'center',fontSize: 8},{text:'Pozostałe przychody',alignment:'center',fontSize: 8},{text:'Razem przychód',alignment:'center',fontSize: 8},{text:'Zakup towarów handlowych i materiałów wg cen zakupu',alignment:'center',fontSize: 8},{text:'Koszty uboczne zakupu',alignment:'center',fontSize: 8},{text:'Wynagrodzenia w gotówce i w naturze',alignment:'center',fontSize: 8},{text:'Pozostałe wydatki',alignment:'center',fontSize: 8},{text:'Razem wydatki',alignment:'center',fontSize: 8},{text:'Inne',alignment:'center',fontSize: 8},{text:'Opis',alignment:'center',fontSize: 8},{text:'Wartość',alignment:'center',fontSize: 8},{text:'Uwagi',alignment:'center',fontSize: 8}],
                      [ '','','',{text:'-7-',alignment:'center',fontSize: 8},{text:'-8-',alignment:'center',fontSize: 8},{text:'-9-',alignment:'center',fontSize: 8},{text:'-10-',alignment:'center',fontSize: 8},{text:'-11-',alignment:'center',fontSize: 8},{text:'-12-',alignment:'center',fontSize: 8},{text:'-13-',alignment:'center',fontSize: 8},{text:'-14-',alignment:'center',fontSize: 8},{text:'-15-',alignment:'center',fontSize: 8},{text:'-16-',colSpan:2,alignment:'center',fontSize: 8},{},{text:'-17-',alignment:'center',fontSize: 8}],
                    ].concat(kpirPdfRows).concat(allPdfRows).concat(pastPdfRows).concat(allPastPdfRows)
                    
                    
                    
                  }
                }
              ],
              styles: {
                header: {
                  fontSize: 22,
                  bold: true
                },
                anotherStyle: {
                  italics: true,
                  alignment: 'right'
                }
              }
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
                            <th>Nr dowodu księgowego ,data ,opis </th>
                            <th>Kontrahent</th>
                            <th>Wartość sprzedanych towarów i usług</th>
                            <th>Pozostałe przychody</th>
                            <th>Razem przychód</th>
                            <th>Zakup towarów handlowych i materiałów wg cen zakupu</th>
                            <th>Koszty uboczne zakupu</th>
                            <th>Wynagrodzenia w gotówce i w naturze</th>
                            <th>Pozostałe wydatki</th>
                            <th>Razem wydatki</th>
                            <th>Inne</th>
                            <th>Badania i rozwój Opis</th>
                            <th>Badania i rozwój Wartość</th>
                            <th>Uwagi</th>
                            <th>Usuń</th>
                            </tr>
                        </thead>
                        <tbody>
                            {kpirRows}
                            <tr>
                                <td colSpan='3'>Suma strony:</td>
                                <td>{allSalesIncome}</td>
                                <td>{allOtherIncomes}</td>
                                <td>{allSalesIncome+allOtherIncomes}</td>
                                <td>{allMaterialsCosts}</td>
                                <td>{allSideCosts}</td>
                                <td>{allSalaryCosts}</td>
                                <td>{allOtherCosts}</td>
                                <td>{allSalaryCosts+allOtherCosts}</td>
                                <td>{allOther}</td>
                                <td></td>
                                <td>{allResearchValue}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan='3'>Przeniesione z poprzedniej strony:</td>
                                <td>{pastSalesIncome}</td>
                                <td>{pastOtherIncomes}</td>
                                <td>{pastSalesIncome+pastOtherIncomes}</td>
                                <td>{pastMaterialsCosts}</td>
                                <td>{pastSideCosts}</td>
                                <td>{pastSalaryCosts}</td>
                                <td>{pastOtherCosts}</td>
                                <td>{pastSalaryCosts+pastOtherCosts}</td>
                                <td>{pastOther}</td>
                                <td></td>
                                <td>{pastResearchValue}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan='3'>Razem od początku roku:</td>
                                <td>{allSalesIncome+pastSalesIncome}</td>
                                <td>{allOtherIncomes+pastOtherIncomes}</td>
                                <td>{allSalesIncome+allOtherIncomes+pastSalesIncome+pastOtherIncomes}</td>
                                <td>{allMaterialsCosts+pastMaterialsCosts}</td>
                                <td>{allSideCosts+pastSideCosts}</td>
                                <td>{allSalaryCosts+pastSalaryCosts}</td>
                                <td>{allOtherCosts+pastOtherCosts}</td>
                                <td>{allSalaryCosts+allOtherCosts+pastSalaryCosts+pastOtherCosts}</td>
                                <td>{allOther+pastOther}</td>
                                <td></td>
                                <td>{allResearchValue+pastResearchValue}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        </Table>
                    </div>
                    <StandardButton onClick={this.props.showAddKpirPosition} value='dodaj' />
                    <SecondButton value="Drukuj" onClick={() => {
                        this.printToPdf(docDefinition)
                    }}/>
                </div>
                <AddKpirPositionModal AddKpirPosition={this.props.AddKpirPosition} contractors ={this.props.contractors} closeAddKpirPosition={this.props.closeAddKpirPosition} showAddKpirPosition={this.props.showAddKpirPosition} show={this.props.showAddKpirPositionModal} accountingMonth={this.props.accountingMonth} accountingYear={this.props.accountingYear}/>
            </>
        )
    }
}

export default Kpir;