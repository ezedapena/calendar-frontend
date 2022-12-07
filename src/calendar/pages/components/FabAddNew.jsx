import { addHours } from "date-fns";
import { useCalendarStore } from "../../../hooks/useCalendarStore";
import { useUiStore } from "../../../hooks/useUiStore"


export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();
    const handleClickNew = () => {
        setActiveEvent(
            {
                title: 'title',
                notes: 'notes',
                start: new Date(),
                end: addHours(new Date(), 2),
                bgColor: '#fafafa',
                user: {
                    name: 'Ezequiel',
                    lastname: 'Dapena'
                }
            })
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>

        </button>
    )
}
