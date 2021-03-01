import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { useDispatch, useSelector } from 'react-redux';
// import CardHeader from './CardHeader';
// import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
// import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Provider, createClient, useQuery } from 'urql';
import { IState } from '../../store';
import gql from 'graphql-tag';
import { actions } from './reducer';
import Selector from '../../components/Selector';
import { Callback } from '../../GlobalTypes';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = gql`
  {
    getMetrics
  }
`;

const getMetrics = (state: IState) => {
  const { avialableMetrics, selectedMetrics } = state.metrics;
  return {
    avialableMetrics,
    selectedMetrics,
  };
};

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
});

const Metrics = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { avialableMetrics, selectedMetrics } = useSelector(getMetrics);

  const [result] = useQuery({ query });
  const { fetching, data, error } = result;

  const handleChange = (e: any) => {
    console.log('handleChange', e);
    dispatch(actions.setSelectedMetrics(e.target.value));
  };

  useEffect(() => {
    if (error) {
      console.warn(error);
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.metricsDataRecevied(data));
  }, [data, error, dispatch]);

  if (fetching) return <LinearProgress />;

  return (
    <Card className={classes.card}>
      <Selector avialableMetrics={avialableMetrics} handleChange={handleChange} selectedMetrics={selectedMetrics} />
    </Card>
  );
};

export default () => (
  <Provider value={client}>
    <Metrics />
  </Provider>
);
