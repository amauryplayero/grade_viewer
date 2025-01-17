import React from 'react'
import {useState, useEffect} from 'react'
import {useDropZone} from 'react-dropzone'
// import XLSX_ZAHL_PAYLOAD from 'https://cdn.sheetjs.com/xlsx-0.18.7/package/dist/xlsx.zahl.mjs';
import * as XLSX from 'xlsx'
import '../App.css';



export default function Promedios() {

    const [excelFile, setExcelFile] = useState() 
    const [promediosDePrimero, setPromediosDePrimero] = useState()
    const [promediosDeSegundo, setPromediosDeSegundo] = useState()
    const [promediosDeTercero, setPromediosDeTercero] = useState()
    const [nombrePromedio, setNombrePromedio] = useState()
    const [nombrePromedioDeSegundo, setNombrePromedioDeSegundo] = useState()
    const [nombrePromedioDePrimero, setNombrePromedioDePrimero] = useState()
    useEffect(() => {
     
    if(promediosDeTercero!==undefined){

        }
      }, [promediosDeSegundo, nombrePromedioDePrimero, nombrePromedioDeSegundo]);
    


    const handlePrimerAno = (e) =>{

        const [file] = e.target.files
        const reader = new FileReader();
        reader.onload = (evt) => {
         
            const bstr = evt.target.result;
            let body = {
              fileEncoded:bstr
            }

            const wb = XLSX.read(bstr, { type: "binary" });
            setPromediosDePrimero(wb)
            
        };
        reader.readAsBinaryString(file);

    }
 
    const handleSegundoAno = (e) =>{
        const [file] = e.target.files
        const reader = new FileReader();
        reader.onload = (evt) => {
         
            const bstr = evt.target.result;
            let body = {
              fileEncoded:bstr
            }

            const wb = XLSX.read(bstr, { type: "binary" });
            setPromediosDeSegundo(wb)
            
        };
        reader.readAsBinaryString(file);
        if(promediosDeSegundo===undefined){

        }else{
            createPromedioDeSegundo()
        }
       
    }

    const handleTercerAno = (e) =>{
        
        const [file] = e.target.files
        const reader = new FileReader();
        reader.onload = (evt) => {
         
            const bstr = evt.target.result;
            let body = {
              fileEncoded:bstr
            }

            const wb = XLSX.read(bstr, { type: "binary" });
            setPromediosDeTercero(wb)
            
        };
        reader.readAsBinaryString(file);
        
    }


        

    const createPromedioDePrimero = () =>{
        // console.log(promediosDeSegundo)
        let entries = Object.entries(promediosDePrimero.Sheets['Table 1'])
        let filteredEntriesThatContainProm = entries.filter(entry=>{
            return entry[1].v==='PROMEDIO FINAL DE GRADO'
        })
        let filteredEntriesThatContainNombre = entries.filter(entry=>{
            let value = entry[1].v

            return value==="NOMBRE DEL ALUMNO\r\nPRIMER APELLIDO        SEGUNDO APELLIDO     NOMBRE(S)"
        })



        // where U5 the 5 goes down to where it actually has a number so we gotta filter the entries to when a number

        let numeroInicial =6
        // mappea de las celdas donde se encuentran prom y nom para eliminar el numero y solamente 
        let celdasDeProm = filteredEntriesThatContainProm.map((e, i)=>{
        
            return e[0]
            //  EG. 'N5'
        })
        let celdasDeNom = filteredEntriesThatContainNombre.map((e, i)=>{
       
            return e[0]
            //  EG. 'N5'
        })


        let letraOnlyProm = celdasDeProm.map(e=>{
            return e.replace(/[0-9]/g, '')
        })

        let letraOnlyNom = celdasDeNom.map(e=>{
            return e.replace(/[0-9]/g, '')
        })

       
        // Then we loop through the thingys to create array of data that then needs to be injected into tercero's file
        let nombresPromediosArr = []
        for (let i = 0; i<200; i++){
            let letraNombre = letraOnlyNom[0]
            let letraPromedio = letraOnlyProm[0]
            let archivo = promediosDePrimero.Sheets['Table 1']
            
            if(archivo[`${letraNombre+i}`]===undefined){
                // console.log('hai')
            }else {
                nombresPromediosArr.push([archivo[`${letraNombre+i}`].v, parseFloat(archivo[`${letraPromedio+i}`].v).toFixed(1)])
            
            }
               
            
        }

        setNombrePromedioDePrimero([...nombresPromediosArr])
        console.log(nombrePromedioDePrimero)
    }


    const createPromedioDeSegundo = () =>{
        // console.log(promediosDeSegundo)
        let entries = Object.entries(promediosDeSegundo.Sheets['Table 1'])
        let filteredEntriesThatContainProm = entries.filter(entry=>{
            return entry[1].v==='PROMEDIO FINAL DE GRADO'
        })
        let filteredEntriesThatContainNombre = entries.filter(entry=>{
            let value = entry[1].v

            return value==="NOMBRE DEL ALUMNO\r\nPRIMER APELLIDO        SEGUNDO APELLIDO     NOMBRE(S)"
        })



        // where U5 the 5 goes down to where it actually has a number so we gotta filter the entries to when a number

        let numeroInicial =6
        // mappea de las celdas donde se encuentran prom y nom para eliminar el numero y solamente 
        let celdasDeProm = filteredEntriesThatContainProm.map((e, i)=>{
        
            return e[0]
            //  EG. 'N5'
        })
        let celdasDeNom = filteredEntriesThatContainNombre.map((e, i)=>{
       
            return e[0]
            //  EG. 'N5'
        })


        let letraOnlyProm = celdasDeProm.map(e=>{
            return e.replace(/[0-9]/g, '')
        })

        let letraOnlyNom = celdasDeNom.map(e=>{
            return e.replace(/[0-9]/g, '')
        })

       
        // Then we loop through the thingys to create array of data that then needs to be injected into tercero's file
        let nombresPromediosArr = []
        for (let i = 0; i<200; i++){
            let letraNombre = letraOnlyNom[0]
            let letraPromedio = letraOnlyProm[0]
            let archivo = promediosDeSegundo.Sheets['Table 1']
            
            if(archivo[`${letraNombre+i}`]===undefined){
                // console.log('hai')
            }else {
                nombresPromediosArr.push([archivo[`${letraNombre+i}`].v, parseFloat(archivo[`${letraPromedio+i}`].v).toFixed(1)])
            
            }
               
            
        }

        setNombrePromedioDeSegundo([...nombresPromediosArr])
    }
    const createPromediosDeTercero = () =>{
        let promediosTrimestre1 = Object.keys(promediosDeTercero.Sheets)[0]
        let promediosKey = Object.keys(promediosDeTercero.Sheets)[1]
        let terceraPestana = Object.keys(promediosDeTercero.Sheets)[2]
        let object = promediosDeTercero.Sheets[promediosTrimestre1]
        let entries = Object.entries(promediosDeTercero.Sheets[promediosTrimestre1])
        
      

        // find the entries where name of student and promedio are from the trimestres section
        let filteredEntriesThatContainNombre = entries.filter(entry=>{
            return entry[1].v==='NOMBRE DEL ALUMNO'
        })
        let filteredEntriesThatContainProm = entries.filter(entry=>{
            return entry[1].v==='PROM.'
        })

        

      

        let segundaTab = Object.entries(promediosDeTercero.Sheets[promediosKey])

        
        let numeroInicial 
        // mappea de las celdas donde se encuentran prom y nom para eliminar el numero y solamente 
        let celdasDeProm = filteredEntriesThatContainProm.map((e, i)=>{
            numeroInicial = parseInt(e[0].replace(/\D/g, ""))
            numeroInicial+=1
            return e[0]
            //  EG. 'N5'
        })
        let celdasDeNom = filteredEntriesThatContainNombre.map((e, i)=>{
            numeroInicial = parseInt(e[0].replace(/\D/g, ""))
            numeroInicial+=1
            return e[0]
            //  EG. 'N5'
        })
     
        let letraOnlyProm = celdasDeProm.map(e=>{
            return e.replace(/[0-9]/g, '')
        })

        let letraOnlyNom = celdasDeNom.map(e=>{
            return e.replace(/[0-9]/g, '')
        })


        let archivoSegundaPestana = promediosDeTercero.Sheets[promediosKey]
        let archivoPrimeraPestana = promediosDeTercero.Sheets[promediosTrimestre1]
        // console.log(archivoSegundaPestana)
       
        let nombresPromediosArr = []
        for (let i = 0; i<letraOnlyNom.length; i++){
            for(let n = numeroInicial; n<60; n++){
            
            if(archivoPrimeraPestana[`${letraOnlyNom[i]+n}`]===undefined){
                // console.log('hai')
            }else {
                nombresPromediosArr.push([archivoPrimeraPestana[`${letraOnlyNom[i]+n}`].v, parseFloat(archivoPrimeraPestana[`${letraOnlyProm[i]+n}`].v).toFixed(1)])
            
            }
               
            }
        }
        setNombrePromedio([...nombresPromediosArr])
        
     

    
    } 

    

    

    // create workbook from grado into state EX. promedios de Tercero


    const addEquationToCells = () =>{
        let promediosKey = Object.keys(promediosDeTercero.Sheets)[1]
        let entries = Object.entries(promediosDeTercero.Sheets[promediosKey])
        let filteredEntriesThatContainNombre = entries.filter(entry=>{
            return entry[1].v==='NOMBRE DEL ALUMNO'
        })

        

    }

    
     
// console.log(promediosDeTercero)
    const anadirPromediosToSheet = () =>{
    
        // 
        let promediosTrimestre1 = Object.keys(promediosDeTercero.Sheets)[0]
        let promediosKey = Object.keys(promediosDeTercero.Sheets)[1]
        let terceraPestana = Object.keys(promediosDeTercero.Sheets)[2]
        let archivoSegundaPestana = promediosDeTercero.Sheets[promediosKey]
        let archivoPrimeraPestana = promediosDeTercero.Sheets[promediosTrimestre1]
        let archivoTerceraPestana = promediosDeTercero.Sheets[terceraPestana]
        let entriesDeSegundaPestana = Object.entries(archivoSegundaPestana)
       

        let archivo = promediosDeTercero.Sheets[terceraPestana]

        // let filteredEntryThatContainsNombreEnTercera = terceraPestana.filter(entry=>{
        //     return entry[1].v==='NOMBRE DEL ALUMNO'
        // })
        
        for(let i = 0; i<entriesDeSegundaPestana.length; i++){

            let filtered = nombrePromedio.filter(e=>{
                return entriesDeSegundaPestana[i][1].v === e[0]
            })

            if(filtered.length===0){
                
            }else{
                let cellNo = entriesDeSegundaPestana[i][0].substring(1)
                // console.log(cellNo)
                
                archivoSegundaPestana['C'+`${cellNo}`].v=filtered[0][1]
                archivoSegundaPestana['D'+`${cellNo}`].v=filtered[1][1]
                archivoSegundaPestana['E'+`${cellNo}`].v=filtered[2][1]
                archivoSegundaPestana['F'+`${cellNo}`].z="0.0"
                // console.log(filtered)
              

            }
           
        }
        
// loop where the third sheets is injected with values. 
      
        
console.log(promediosDeTercero)
        let entriesDeTerceraPestana = Object.entries(archivoTerceraPestana)
        // console.log(archivoTerceraPestana)
       console.log(nombrePromedioDePrimero)
       console.log(entriesDeTerceraPestana)

        for(let i = 0; i<entriesDeTerceraPestana.length; i++){

             let celdaDeNombre = 'D'
           
           let calificacionDePrimero = nombrePromedioDePrimero.filter(e=>{
               if(typeof entriesDeTerceraPestana[i][1].v==='number' || entriesDeTerceraPestana[i][1].v===undefined){

               }else {
                   console.log(entriesDeTerceraPestana[i][1].v.replace(/\s/g, ""))
               let nombreEnBoletaDeTercero = entriesDeTerceraPestana[i][1].v.replace(/\s+/g, '')
               let nombreEnBoletaVieja = e[0].replace(/\s+/g, '')
               
               return nombreEnBoletaDeTercero === nombreEnBoletaVieja
               }
           })
            let calificacionDeSegundo = nombrePromedioDeSegundo.filter(e=>{
                if(typeof entriesDeTerceraPestana[i][1].v==='number' || entriesDeTerceraPestana[i][1].v===undefined){

                }else {
                    console.log(entriesDeTerceraPestana[i][1].v.replace(/\s/g, ""))
                let nombreEnBoletaDeTercero = entriesDeTerceraPestana[i][1].v.replace(/\s+/g, '')
                let nombreEnBoletaVieja = e[0].replace(/\s+/g, '')
                
                return nombreEnBoletaDeTercero === nombreEnBoletaVieja
                }
                
               
            })
            let calificacionDeTercero = nombrePromedio.filter(e=>{
                return entriesDeSegundaPestana[i][1].v === e[0]
            })


            // console.log(calificacionDeSegundo)
            if(calificacionDePrimero.length===0){
                // console.log(entriesDeTerceraPestana[i])
            }else{
                let cellNo = entriesDeTerceraPestana[i][0].substring(1)

                archivoTerceraPestana['C'+`${cellNo}`].v=calificacionDePrimero[0][1]
                archivoTerceraPestana['D'+`${cellNo}`].v=calificacionDeSegundo[0][1]
                archivoTerceraPestana['E'+`${cellNo}`].v=calificacionDeTercero[0][1]
  
                archivoTerceraPestana['F'+`${cellNo}`].z="0.0"
                
              

            }
           


        }
        
        let archivoEnTerceraPestana = promediosDeTercero.Sheets[terceraPestana]

        for(let i = 0; i<50; i++){
            // if(archivoTerceraPestana['F'+`${[i]}`].v===undefined){

            // }else {
            // console.log(archivoTerceraPestana['F'+`${[i]}`].v.toFixed(1))
            console.log(archivoTerceraPestana['F'+`${[i]}`])

            // }
        }

        console.log(promediosDeTercero)
        XLSX.writeFile(promediosDeTercero,'PROMEDIOS.xlsx', { ignoreEC: true, bookType: 'xlsx'})

 
    }
  
    async function changeValue (){
        excelFile.Sheets["CONCENTRADOS DE LOS TRIM"].G7 = { t:'n', v:93, w:'93'} 
        XLSX.writeFile(excelFile,'TEST DELETE.xlsx', { ignoreEC: true, bookType: 'xlsx'})
    }
    let greenCheckMark = <img src="https://i.imgur.com/52es1vp.png" class="checkMarkIcon"></img>
    let fileChecker1 = <img src="https://i.imgur.com/AuFpdp2.png" class="checkMarkIcon"></img>
    if(nombrePromedioDePrimero!==undefined){
        fileChecker1 = greenCheckMark
    } else {
    }
    let fileChecker2 =<img src="https://i.imgur.com/AuFpdp2.png" class="checkMarkIcon"></img>
     if(nombrePromedioDeSegundo!==undefined){
        fileChecker2 = greenCheckMark
    } else {
    }

    let fileChecker3 = <img src="https://i.imgur.com/AuFpdp2.png" class="checkMarkIcon"></img>
    if(nombrePromedio!==undefined){
        fileChecker3 = greenCheckMark
    } else {
    }

    let descargarButton
    if(fileChecker1===greenCheckMark && fileChecker2===greenCheckMark && fileChecker3===greenCheckMark){
    descargarButton = <button id="downloadButton" onClick={()=>{anadirPromediosToSheet()}}><img id="downloadIcon" src="https://i.imgur.com/GAASer9.png"></img>DESCARGAR</button>
    }else {
        
       
    }

    let xlsxIcon = <img class="xlsxIcon"src="https://i.imgur.com/4wfuxJT.png"></img>


   
  return (
      <>
          
      <div class="mainPromediosContainer">
            <div id="instructions">
            <h3>Elije un archivo por año. Despues presiona Listo.<br></br>
                Cuando hayan salido las tres palomitas, saldra un<br></br>
                boton que dirá descargar. </h3>
                <br></br>
            </div>

            <div class='yearContainer'>
                
                <h2>{xlsxIcon}1er Año </h2>
                <input type="file" onChange={(e)=>handlePrimerAno(e)} />
                {fileChecker1}
                <button onClick={()=>createPromedioDePrimero()}>Listo</button>
                
            </div>
            

            <div class="yearContainer">
                <h2>{xlsxIcon}2do Año</h2>
          
                <input type="file" onChange={(e)=>{handleSegundoAno(e)}} />
                {fileChecker2}
                <button onClick={()=>createPromedioDeSegundo()}>Listo</button>
            </div>
        
            <div class='yearContainer'>
                <h2>{xlsxIcon}3er Año</h2>
                <input type="file" onChange={(e)=>{handleTercerAno(e)}} />
                {fileChecker3}
            <button onClick={()=>{createPromediosDeTercero()}}>Listo</button>
            </div>
        
        
            {/* <button onClick={()=>createPromedios()}>get promedios</button> */}
                <br></br>
                <br></br>
        
            {descargarButton}
            {/* <button id="downloadButton"onClick={()=>{anadirPromediosToSheet()}}>DESCARGAR  <img id="downloadIcon" src="https://i.imgur.com/GAASer9.png"></img></button> */}
    </div>
    </>
  )
}
