import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../uiComponents/table'
import API from '../../api/api';

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

function Dashboard() {
  const [data, getData] = React.useState([]);
  const [user, updateUser] = React.useState(0);
  React.useEffect(() => {
    API.get(`admin/user_list`)
      .then(res => {
        getData(res.data.data)
      })
      .catch(err => {
        console.log("sdfs", err)
      });
  }, [user])

  const actions = [
    {
      icon: 'save',
      tooltip: 'Save User',
      onClick: (event, rowData) => {
        API.get(`admin/update_user_status/${rowData._id}`)
        .then(res => {
          updateUser(!user)
        })
        .catch(err => {
          console.log("sdfs", err)
        });
      }
    }
  ]

  return (
    <React.Fragment>
      <Table data={data} actions={actions} />
    </React.Fragment>
  );
}

export default Dashboard;