import React from "react";
import { Modal, Button } from "react-bootstrap";


function ModalPersonalizado({ componente, title, close }) {
      
  return (
    <>
      <Modal show={true} onHide={() => close(false)} size="md">

        <Modal.Header closeButton>
          <div>
            <Modal.Title> {title} </Modal.Title>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="p-3">
            {componente}          
          </div>
        </Modal.Body>        

      </Modal>
    </>
  );
}

export default ModalPersonalizado;

