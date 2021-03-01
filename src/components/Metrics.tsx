import React, {useEffect} from 'react';
import Card from '@material-ui/core/Card';
// import CardHeader from './CardHeader';
// import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
// import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Provider, createClient, useQuery } from 'urql';
import gql from 'graphql-tag'

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = gql`
  {
    getMetrics
  }
`;

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
});

const Metrics = () => {
  const classes = useStyles();

  const [result] = useQuery({query})
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      console.log('🚨🚨🚨🚨🚨 error', error)
      // dispatch(actions.weatherApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    console.log('🥑🥑🥑🥑🥑 data', data)
    // const { getWeatherForLocation } = data;
    // dispatch(actions.weatherDataRecevied(getWeatherForLocation));
  }, [data, error]);
  
  return (
    <>
      {fetching && <LinearProgress />}
      <Card className={classes.card}>
        {/* <CardHeader title="Sick Graphs!" />
        <CardContent>
          
        </CardContent> */}
      </Card>
    </>
  );
};

export default () => <Provider value={client}><Metrics/></Provider>;
