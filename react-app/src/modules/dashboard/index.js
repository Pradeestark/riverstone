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
        console.log("err", err)
      });
  }, [])
    return (
       <React.Fragment>
          <Table  data={data} />
      </React.Fragment>
    );
}

export default Dashboard;