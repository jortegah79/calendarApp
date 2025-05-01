import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
import Swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.min.css";
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    },
};

registerLocale('es', es)

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        'title': '',
        'notes': '',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';
        return (formValues.title.length > 0) ? '' : ' is-invalid '

    }, [formValues.title, formSubmitted])

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent })
        }
    }, [activeEvent])

    const onFormInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })

    }
    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const difference = differenceInSeconds(formValues.end, formValues.start);
      
        if (!(formValues.start && formValues.end) || difference <= 0) {
            Swal.fire("Fechas incorrectas", "Revisar fechas indicadas", "error");
            return;
        }
        if (formValues.title.length <= 0) return;
        setFormSubmitted(true)
        const eventToSave={
            ...activeEvent,
            ...formValues
        }
        await startSavingEvent(eventToSave)
        closeDateModal()

    }
    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={closeDateModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={(event) => onDateChange(event, 'start')}
                        dateFormat="Pp"
                        showTimeSelect
                        timeCaption='Hora'
                        locale="es" />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => onDateChange(event, 'end')}
                        showTimeSelect
                        dateFormat="Pp"
                        timeCaption='Hora'
                        locale="es" />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={` form-control ${titleClass} `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onFormInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onFormInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    );


}