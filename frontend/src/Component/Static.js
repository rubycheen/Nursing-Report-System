import './App.css'
import "antd/dist/antd.css";
import 'ant-design-pro/dist/ant-design-pro.css';
import { Select, Button } from 'antd';
import BarChart from './BarChart';
import React from 'react';
import Table from './Table'
import { useState } from 'react';
import fs from 'fs'


const { Option } = Select;

const Static = () => {
  const data = require('../data/109-1.json');
  let options = []
  const[X, setX] = useState('')
  const [x_axis, setX_axis] = useState('')
  const [y_axis, setY_axis] = useState('')
  const [z_axis, setZ_axis] = useState('')
  const [x_axis_title, setX_axis_title] = useState([])
	const [x_axis_child, setX_axis_child] = useState([])
	const [y_axis_title, setY_axis_title] = useState([])
	const [z_axis_title, setZ_axis_title] = useState([])
  const [legend, setLegend] = useState([])
	const [element, setElement] = useState([])

  Object.keys(data[0]).map((title)=>{
    options.push(<Option value={title}>{title}</Option>)
    }
  )

  const handleZ = (value) => {
		setZ_axis(value.label)
		setZ_axis_title(()=>{
		let z_axis_tmp = []
		data.map((d)=>{
		z_axis_tmp.push(d[value.label])
		}
		)
		
		let tmp_z_axis_title
		if(isNaN(Array.from(new Set(z_axis_tmp)).map((x)=>parseFloat(x))[0])){
			tmp_z_axis_title = Array.from(new Set(z_axis_tmp)).sort()
		}
		else{
			tmp_z_axis_title = (Array.from(new Set(z_axis_tmp)).map((x)=>parseFloat(x))).sort((a, b) => a - b)
		}

		frequencyCnt(x_axis,y_axis,value.label,x_axis_title,y_axis_title,tmp_z_axis_title)
		return tmp_z_axis_title
		})
	}

    const handleY = (value) => {
		setY_axis(value.label)
		setY_axis_title(()=>{
			let y_axis_tmp = []
			data.map((d)=>{
			y_axis_tmp.push(d[value.label])
			}
			)
			
			let tmp_y_axis_title
			if(isNaN(Array.from(new Set(y_axis_tmp)).map((x)=>parseFloat(x))[0])){
				tmp_y_axis_title = Array.from(new Set(y_axis_tmp)).sort()
			}
			else{
				tmp_y_axis_title = (Array.from(new Set(y_axis_tmp)).map((x)=>parseFloat(x))).sort((a, b) => a - b)
			}

			frequencyCnt(x_axis,value.label,z_axis,x_axis_title,tmp_y_axis_title,z_axis_title)

			return tmp_y_axis_title
		})
		}


    const handleX = (value) => {
		setX_axis(value.label)
		setX_axis_title(()=>{
			let x_axis_tmp = []
			data.map((d)=>{
			x_axis_tmp.push(d[value.label])
			})
			let tmp_x_axis_title = Array.from(new Set(x_axis_tmp)).sort()
			let tmp_x_axis_child = []
			tmp_x_axis_title.map((t)=>{
				tmp_x_axis_child.push({
					title: t,
					dataIndex: t,
					key: t,
				})
			})
			setX_axis_child(tmp_x_axis_child)
			frequencyCnt(value.label,y_axis,z_axis,tmp_x_axis_title,y_axis_title,z_axis_title)

			return tmp_x_axis_title
		})
	}

  const frequencyCnt = (x_axis,y_axis,z_axis,x_axis_title,y_axis_title,z_axis_title) => {

		setElement(()=>{
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

			let tmpElement = []
			for (let i = 0; i < y_axis_title.length; i++) {
				let obj = {
					key: i,
					name: y_axis_title[i],
				}
				tmpElement.push(obj)
			}

			let tmpColor = {}
			z_axis_title.map((z)=>{
				tmpColor[z]='#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
			})
			setLegend(z_axis_title.map((z)=><div className='legend-set'><div className='circle' style={{backgroundColor: tmpColor[z]}}></div><p>{z}</p></div>))

			for (let i=0; i<tmpElement.length;i++){
				for (let k = 0; k < x_axis_title.length; k++) {
					let tmpCircle = []
					if(x_axis_title[k]+'_'+tmpElement[i].name in tmpTable){
						if(z_axis!==''){
							for(let z=0; z<z_axis_title.length; z++){
								if(z_axis_title[z] in tmpTable[x_axis_title[k]+'_'+tmpElement[i].name]){
									for(let c=0; c<tmpTable[x_axis_title[k]+'_'+tmpElement[i].name][z_axis_title[z]];c++){
											tmpCircle.push(<div className='circle' style={{backgroundColor: tmpColor[z_axis_title[z]]}}></div>)
									}
								}
							}
						}
						else{
							for(let c=0; c<tmpTable[x_axis_title[k]+'_'+tmpElement[i].name][undefined];c++){
								tmpCircle.push(<div className='circle' style={{backgroundColor: 'gray'}}></div>)
							}
						}
						tmpElement[i][x_axis_title[k]]=<div className='circle-container'>{tmpCircle}</div>
					}
				}
			}
			return tmpElement
		})
	  }

	const SaveChart = (e) => {
		console.log(e.target.value);
		// const jsonfile = require('jsonfile')
		// console.log('jsonfile',jsonfile);
 
		// const file = '../data/test.json'
		// const obj = { name: 'JP' }
		
		// jsonfile.writeFile(file, obj, function (err) {
		// if (err) console.error(err) 
		// else{
		// 	console.log('sucess!');
		// }
	// })
	const originalData = {
		members: [{
			name: "cliff",
			age: "34"
		  },
		  {
			name: "ted",
			age: "42"
		  },
		  {
			name: "bob",
			age: "12"
		  }
		]
	  };
	fs.writeFile("../data/test.txt", JSON.stringify(originalData), function(err) {
		if (err) {
			console.log(err);
		}
	});

	}

  return (
    <div className='App'>
      <h3 style={{fontSize: '23px'}}>長條分析圖</h3>
      <div className='part'>
        <Select
            labelInValue
            style={{ width: 200 }}
            onChange={(value)=>{setX(value.label)}}
          >
            {options}
        </Select>
        <Button type="primary" size='large' value='bar' onClick={SaveChart} style={{ marginBottom:20, marginLeft:'75%' }}>儲存成自訂報表</Button>
        <BarChart X={X} />
      </div>

      <div className='part'>
        <h3 style={{fontSize: '23px'}}>散佈分析表</h3>
      <div className='selectSet'>
        <h3>橫軸:</h3>
        <Select
          labelInValue
          style={{ width: 200, marginLeft: 10, marginBottom: 10 }}
          onChange={handleX}
        >
          {options}
        </Select>
      </div>

      <div className='selectSet'>
        <h3>縱軸:</h3>
        <Select
          labelInValue
          style={{ width: 200, marginLeft: 10, marginBottom: 10 }}
          onChange={handleY}
        >
          {options}
        </Select>
      </div>

	  <div className='selectSet'>
        <h3>案件標記:</h3>
        <Select
          labelInValue
          style={{ width: 200, marginLeft: 10, marginBottom: 10 }}
          onChange={handleZ}
        >
          {options}
        </Select>
      </div>
	  <Button type="primary" size='large' value='multi' onClick={SaveChart} style={{ marginBottom:50, marginLeft:'75%', }}>儲存成自訂報表</Button>
        <Table x_axis={x_axis} y_axis={y_axis} z_axis={z_axis} legend={legend} element={element} x_axis_child={x_axis_child}/>
      </div>

    </div>
  );
}

export default Static;
