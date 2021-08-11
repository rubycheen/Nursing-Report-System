import "antd/dist/antd.css";
import 'ant-design-pro/dist/ant-design-pro.css';
import { Pie, Bar } from 'ant-design-pro/lib/Charts';

const data = require('../data/109-1.json');

const BarChart = ({X}) => {
    let tmp = []
    let column = []
    data.map((d)=>{
        tmp.push(d[X])
        }
    )
    let set
    if(isNaN(Array.from(new Set(tmp)).map((x)=>parseFloat(x))[0])){
        set = Array.from(new Set(tmp)).sort()
    }
    else{
        set = (Array.from(new Set(tmp)).map((x)=>parseFloat(x))).sort((a, b) => a - b)
    }
    Array.from(set).map((year)=>{
        column.push({
        x: year,
        y: tmp.filter(x => x===year).length
        })
    })
    return (
        <div className='charts' style={{marginTop: 50, marginBottom: 100}}>
            <h1 style={{fontSize: '20px'}}>{X}</h1>
            <Pie
            hasLegend
            subTitle="總筆數"
            total={() => (
                <span
                dangerouslySetInnerHTML={{
                    __html: column.reduce((pre, now) => now.y + pre, 0),
                }}
                />
            )}
            data={column}
            valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
            height={200}
            />
            <Bar height={200} data={column}/>
        </div>
    )
}


export default BarChart