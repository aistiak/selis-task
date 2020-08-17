import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';



function getModalStyle() {
  const top = 50 //+ rand();
  const left = 50 //+ rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '35vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({modalOpen,setModalOpen,modalData}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);






  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div  className="modal-container">
        <div className="modal-title">
           {modalData.name}
        </div>
        {/* <h2 id="simple-modal-title">{modalData.name}</h2> */}
        <div>
            <table>
                <tbody>
                                    
                    <tr>
                        <th>Played</th>
                        <th>Win</th>
                        <th>Los </th>
                        <th>Draw </th>
                    </tr>
                    <tr>
                        <td>{modalData.played}</td>
                        <td>{modalData.win}</td>
                        <td>{modalData.los}</td>
                        <td>{modalData.draw}</td>
                    </tr>
                
                </tbody>    
            </table>
        </div>  
      </div>
      <div>
          <span onClick={() => setModalOpen(false) } className="modal-close-text" >close</span>
      </div>
      {/* <SimpleModal /> */}
    </div>
  );

  return (
    <div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
