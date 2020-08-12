import React from 'react';
import MaterialTable from 'material-table';

export default function Table({data=[],title = '',actions=[]}) {
    return (
      <MaterialTable
        title={title}
        columns={[
          { title: 'Name', field: 'username' },
          { title: 'Email', field: 'email' },
          { title: 'Status', field: 'status' },
        ]}
        data={data}
        actions={actions}
        options={{actionsColumnIndex: -1}}
      />
    )
  }