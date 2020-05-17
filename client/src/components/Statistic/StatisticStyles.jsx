import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  title: {
    fontSize: 20,
    '& span': {
      fontWeight: 'bold',
      marginLeft: 5,
    },
  },

  linksContainer: {
    marginTop: 20,
  },

  linkItem: {
    border: '1px solid rgba(0,0,0,0.23)',
    borderRadius: 5,
    padding: '5px 10px',
    marginBottom: 5,

  },
});

export default styles;
