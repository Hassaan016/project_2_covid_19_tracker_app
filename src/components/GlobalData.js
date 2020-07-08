import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//>! Import
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import CircularProgress from '@material-ui/core/CircularProgress';

const useCircularProgress = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  globalCasesColor: { color: 'black' },
  activeCasesColor: { color: 'orange' },
  recoveredCasesColor: { color: 'green' },
  fatalitiesCasesColor: { color: 'red' },
}));


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: theme.spacing(16),
    },
  },
}));

const useStylesTypography = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  globalCases: { color: 'black', fontWeight: 'bold' },
  activeCases: { color: 'orange', fontWeight: 'bold' },
  recoveredCases: { color: 'green', fontWeight: 'bold' },
  fatalitiesCases: { color: 'red', fontWeight: 'bold' },
});

export default function GlobalData() {
  const classes = useStyles();
  const classTypography = useStylesTypography();
  const classCircularProgress = useCircularProgress();

  const [globalData, setGlobalData] = useState();
  const [bIsDataLoading, setbIsDataLoading] = useState(false);
  const strLoading = "Loading...";

  useEffect(() => {
    async function fetchGlobalData() {

      try {
        setbIsDataLoading(true);

        const apiResponse = await fetch('https://api.thevirustracker.com/free-api?global=stats');
        console.log(apiResponse);

        const dataFromApi = await apiResponse.json();
        console.log(dataFromApi);

        setGlobalData(dataFromApi);

        setbIsDataLoading(false);
      } catch (error) {
        console.error(error);
      }

    }

    fetchGlobalData();
  }, []) //>! End of useEffect()


  if ((bIsDataLoading === true)) {
    return (
      <div className={classes.root}>

        <Paper elevation={3} >

          <div className={classTypography.root}>
            <Typography variant="h4" gutterBottom className={classTypography.globalCases}>
              {strLoading}

              <div className={classCircularProgress.root}>
                <CircularProgress className={classCircularProgress.globalCasesColor} />
              </div>
            </Typography>

            <Typography variant="subtitle2" gutterBottom className={classTypography.globalCases}>
              Global Data as of Today
      </Typography>
          </div>
        </Paper>

        <Paper elevation={3} >

          <div className={classTypography.root}>
            <Typography variant="h4" gutterBottom className={classTypography.activeCases}>
              {strLoading}

              <div className={classCircularProgress.root}>
                <CircularProgress className={classCircularProgress.activeCasesColor} />
              </div>
            </Typography>

            <Typography variant="subtitle2" gutterBottom className={classTypography.activeCases}>
              Active
      </Typography>
          </div>
        </Paper>

        <Paper elevation={3} >

          <div className={classTypography.root}>
            <Typography variant="h4" gutterBottom className={classTypography.recoveredCases}>
              {strLoading}

              <div className={classCircularProgress.root}>
                <CircularProgress className={classCircularProgress.recoveredCasesColor} />
              </div>
            </Typography>

            <Typography variant="subtitle2" gutterBottom className={classTypography.recoveredCases}>
              Recoverd
      </Typography>
          </div>
        </Paper>

        <Paper elevation={3} >
          <div className={classTypography.root}>
            <Typography variant="h4" gutterBottom className={classTypography.fatalitiesCases}>
              {strLoading}

              <div className={classCircularProgress.root}>
                <CircularProgress className={classCircularProgress.fatalitiesCasesColor} />
              </div>
            </Typography>

            <Typography variant="subtitle2" gutterBottom className={classTypography.fatalitiesCases}>
              Deaths
            </Typography>
          </div>
        </Paper>

      </div>
    );
  }


  return (
    <div className={classes.root}>

      <Paper elevation={3} >

        <div className={classTypography.root}>
          <Typography variant="h4" gutterBottom className={classTypography.globalCases}>
            <NumberFormat value={globalData && globalData.results && globalData.results[0].total_cases} displayType={'text'} thousandSeparator={true} />
          </Typography>

          <Typography variant="subtitle2" gutterBottom className={classTypography.globalCases}>
            Global Data as of Today
      </Typography>
        </div>

      </Paper>

      <Paper elevation={3} >

        <div className={classTypography.root}>
          <Typography variant="h4" gutterBottom className={classTypography.activeCases}>
            <NumberFormat value={globalData && globalData.results && globalData.results[0].total_active_cases} displayType={'text'} thousandSeparator={true} />
          </Typography>

          <Typography variant="subtitle2" gutterBottom className={classTypography.activeCases}>
            Active
      </Typography>
        </div>

      </Paper>

      <Paper elevation={3} >

        <div className={classTypography.root}>
          <Typography variant="h4" gutterBottom className={classTypography.recoveredCases}>
            <NumberFormat value={globalData && globalData.results && globalData.results[0].total_recovered} displayType={'text'} thousandSeparator={true} />
          </Typography>

          <Typography variant="subtitle2" gutterBottom className={classTypography.recoveredCases}>
            Recoverd
      </Typography>
        </div>

      </Paper>

      <Paper elevation={3} >

        <div className={classTypography.root}>
          <Typography variant="h4" gutterBottom className={classTypography.fatalitiesCases}>
            <NumberFormat value={globalData && globalData.results && globalData.results[0].total_deaths} displayType={'text'} thousandSeparator={true} />
          </Typography>

          <Typography variant="subtitle2" gutterBottom className={classTypography.fatalitiesCases}>
            Fatalities
          </Typography>
        </div>
      </Paper>
    </div>
  );
}