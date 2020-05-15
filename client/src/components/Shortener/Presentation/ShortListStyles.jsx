import { makeStyles } from '@material-ui/core/styles';


const shortListStyles = makeStyles({
  root: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 4,
    padding: '9px 14px',
    alignItems: 'center',
    marginTop: 20,

    '& div:nth-child(2)': {
      textAlign: 'center',
    },

    '& div:nth-child(3)': {
      textAlign: 'end',
    },

    '& div:nth-child(3) button': {
      backgroundColor: 'rgb(164, 219, 245)',
      marginLeft: 10,

      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.23)',
      },

    },
  },
});

export default shortListStyles;
