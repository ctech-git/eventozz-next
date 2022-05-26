import { Col, Row } from "react-bootstrap";
import { convertMoney } from "../../utils/strings";

export const TicketCard = ({ isFree, ticket, onChangeTicketQuantity }) => {

    return (
        <Col xs={12} sm={10} md={6} lg={3} className="ticket-animate">
            <div className="box-ticket animate">
                <h3>{ticket.nome}</h3>
                <div className="price-box-ticket">{isFree ? 'Gratuito' : convertMoney(ticket.activeValue)}</div>
                <ul>
                </ul>
                <Row className="mt-5 mb-5">
                    <Col xs={4}>
                        <a style={{ fontSize: 40 }} className="btn btn-outline-danger" onClick={() => onChangeTicketQuantity('minus', ticket.id)}><span><i className="fa fa-minus"></i></span></a>
                    </Col>
                    <Col style={{ margin: 'auto' }} xs={4}>
                        <span id="quantidade_ingressos2">{ticket.quantidade}</span>
                    </Col>
                    <Col xs={4}>
                        <a style={{ fontSize: 40 }} className="btn btn-outline-success" onClick={() => onChangeTicketQuantity('plus', ticket.id)}><span><i className="fa fa-plus"></i></span></a>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}