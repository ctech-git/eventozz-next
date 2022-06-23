import { useRouter } from "next/router";
import { Col } from "react-bootstrap";
import { dateLastAccess } from "../../utils/strings";
import styles from "./styles.module.scss";

export const EventCard = ({event}) => {

    const router = useRouter();
    const goToEvents = (selectedEvent) => {
        if (selectedEvent?.external_link) {
          window.location.href = selectedEvent.external_link;
        } else if(selectedEvent?.leaders) {
          router.push(`/leaders/${selectedEvent.slug}`);
        } else {
            router.push(`/evento/${selectedEvent.slug}`);
        }
      }

    return (
        <Col key={event.slug} xs={12} md={4} className={styles.eventCardContainer}>
            <div className='single-blog-post' onClick={() => goToEvents(event)}>
                <div className='post-image'>
                    <a className='d-block'>
                        <img src={event.foto} alt='image' />
                    </a>
                    <div className='tag-list'>
                        <a className={event.active ? "open-button" : "close-button"}>
                            {event.active ? "Aberto" : "Fechado"}
                        </a>
                    </div>
                </div>
                <div>
                    <label>{dateLastAccess(event.data_inicio)}</label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                            d="M15.494 12.6a.85.85 0 01-.253.51l-5.246 5.14a.89.89 0 01-.847.22.868.868 0 01-.619-.61.847.847 0 01.23-.828l4.624-4.532L8.76 7.968a.847.847 0 01-.23-.829.868.868 0 01.619-.61.89.89 0 01.847.221l5.246 5.14a.847.847 0 01.253.71z">
                        </path>
                    </svg>
                    <label>{dateLastAccess(event.data_fim)}</label>
                </div>
                <div className='post-content'>
                    <h3>
                        <a >
                            {event.nome_evento}
                        </a>
                    </h3>
                </div>
            </div>
        </Col>
    )
}