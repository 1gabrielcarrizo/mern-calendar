import { useState } from 'react';
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#root'); // se sobrepone en los elementos

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true)

    const onCloseModal = () => {
        console.log("cerrando modal")
        setIsOpen(false)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >
            <h1>Hola mundo</h1>
            <hr />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quas alias ratione enim labore dolorum necessitatibus quos deserunt. Nihil perferendis voluptates, quisquam dicta nobis debitis fugit porro commodi dolores unde?</p>
        </Modal>
    )
}