import BarChart from './BarChart'
import Table from './Table'

const axes = require('../data/axes.json');
const data = require('../data/109-1.json');

const DefaultReport = () => {
    let X = []
    let multi_X = []
    let multi_Y = []
    let multi_Z = []
    let MultiCharts = []

    axes.map((plot)=>{
        if(plot.page==='default'){
            if(plot.type==='bar'){
                X.push(plot.x)
            }
            else if(plot.type==='multi'){
                multi_X.push(plot.x)
                multi_Y.push(plot.y)
                if(plot.z){multi_Z.push(plot.z)}
            }
        }
    })

    for(let i=0; i<multi_X.length; i++){
        let legend = []
        let element = []
        let x_axis_child = []
        let x_axis=multi_X[i]
        let y_axis=multi_Y[i]

        /* *********************************************** */ 
        /*                    x-axis                       */
        /* *********************************************** */
        let x_axis_tmp = []
        data.map((d)=>{
			x_axis_tmp.push(d[x_axis])
        })
        let x_axis_title = Array.from(new Set(x_axis_tmp)).sort()
        x_axis_title.map((t)=>{
            x_axis_child.push({
                title: t,
                dataIndex: t,
                key: t,
            })
        })

        /* *********************************************** */ 
        /*                    y-axis                       */
        /* *********************************************** */
        let y_axis_tmp = []
        data.map((d)=>{
        y_axis_tmp.push(d[y_axis])
        }
        )
        
        let y_axis_title
        if(isNaN(Array.from(new Set(y_axis_tmp)).map((x)=>parseFloat(x))[0])){
            y_axis_title = Array.from(new Set(y_axis_tmp)).sort()
        }
        else{
            y_axis_title = (Array.from(new Set(y_axis_tmp)).map((x)=>parseFloat(x))).sort((a, b) => a - b)
        }

        /* *********************************************** */ 
        /*              z-axis & legend                    */
        /* *********************************************** */
        let z_axis=multi_Z[i]
        let z_axis_title
        let tmpColor = {}

        if(z_axis!==undefined){
            let z_axis_tmp = []
            data.map((d)=>{
            z_axis_tmp.push(d[z_axis])
            })
            
            if(isNaN(Array.from(new Set(z_axis_tmp)).map((x)=>parseFloat(x))[0])){
                z_axis_title = Array.from(new Set(z_axis_tmp)).sort()
            }
            else{
                z_axis_title = (Array.from(new Set(z_axis_tmp)).map((x)=>parseFloat(x))).sort((a, b) => a - b)
            }
    
            z_axis_title.map((z)=>{
                tmpColor[z]='#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
            })
            legend = z_axis_title.map((z)=><div className='legend-set'><div className='circle' style={{backgroundColor: tmpColor[z]}}></div><p>{z}</p></div>)    
        }

        /* *********************************************** */ 
        /*                    element                      */
        /* *********************************************** */ 

        let tmpTable={}
        data.map((d)=>{
            let index = d[x_axis]+'_'+d[y_axis]
            if(index in tmpTable && d[z_axis] in tmpTable[index]){
                tmpTable[index][d[z_axis]] += 1
            }
            else{
                tmpTable[index] = {}
                tmpTable[index][d[z_axis]] = 1
            }
        })

        for (let i = 0; i < y_axis_title.length; i++) {
            let obj = {
                key: i,
                name: y_axis_title[i],
            }
            element.push(obj)
        }

        for (let i=0; i<element.length;i++){
            for (let k = 0; k < x_axis_title.length; k++) {
                let tmpCircle = []
                if(x_axis_title[k]+'_'+element[i].name in tmpTable){
                    if(z_axis!==undefined){
                        for(let z=0; z<z_axis_title.length; z++){
                            if(z_axis_title[z] in tmpTable[x_axis_title[k]+'_'+element[i].name]){
                                for(let c=0; c<tmpTable[x_axis_title[k]+'_'+element[i].name][z_axis_title[z]];c++){
                                        tmpCircle.push(<div className='circle' style={{backgroundColor: tmpColor[z_axis_title[z]]}}></div>)
                                }
                            }
                        }
                    }
                    else{
                        for(let c=0; c<tmpTable[x_axis_title[k]+'_'+element[i].name][undefined];c++){
                            tmpCircle.push(<div className='circle' style={{backgroundColor: 'gray'}}></div>)
                        }
                    }
                    element[i][x_axis_title[k]]=<div className='circle-container'>{tmpCircle}</div>
                }
            }
        }

        MultiCharts.push( 
            <Table 
                x_axis={multi_X[i]} 
                y_axis={multi_Y[i]} 
                z_axis={multi_Z[i]} 
                legend={legend} 
                element={element} 
                x_axis_child={x_axis_child}
            />
        )
    }

    return(
        <>
            {X.map((x=>{
                return <BarChart X={x}/>
            }))}
            {MultiCharts}
        </>
    )
}

export default DefaultReport
