import React from 'react'
import { Table, Select, Card } from 'antd';

const Multi = ({ x_axis, y_axis, z_axis, x_axis_child, legend, element }) => {
    const { Option } = Select;
    const data = require('../data/109-1.json');

    let options = []
    Object.keys(data[0]).map((title)=>{
      options.push(<Option value={title}>{title}</Option>)
      }
    )
    const columns = [
        {
          title: y_axis,
          dataIndex: 'name',
          key: 'name',
          width: 120,
          fixed: 'left',
        },
        {
          title: x_axis,
          children: x_axis_child,
        }
    ];


    return (
      <div className='multi-chart'>
      {z_axis?<h1 style={{fontSize: '20px'}}>{x_axis}、{y_axis}與{z_axis}頻率關係</h1>:x_axis?<h1 style={{fontSize: '20px'}}>{x_axis}與{y_axis}頻率關係</h1>:<></>}
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingBottom: 100}}>
        <Card size="small" title={z_axis} className='legend'>
          {legend}
        </Card>
        <Table
          columns={columns}
          dataSource={element}
          bordered
          size="middle"
          scroll={{ y: 1000 }}
          pagination={false}
        />
      </div>
      </div>
    )
}
export default Multi