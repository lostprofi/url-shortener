import { makeStyles } from '@material-ui/core/styles';

const modalStyles = makeStyles((theme) => ({

  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    position: 'absolute',
    width: '50%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: '100%',
  },

  button: {
    display: 'inline-flex',
  },

  formBtn: {
    backgroundColor: 'rgb(164, 219, 245)',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.23)',
    },
  },

}));

export default modalStyles;
