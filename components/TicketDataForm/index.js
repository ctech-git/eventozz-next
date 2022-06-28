import { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { isValidCpf, isValidEmail } from "../../utils/fieldValidation";
import { cpfMask, onlyUnsignedNumbers, phoneMaskForList } from "../../utils/strings";
import styles from './styles.module.scss';

const Loading = () => (
    <div class={`spinner-border ${styles.loading}`} role="status">
        <span class="sr-only"></span>
    </div>
)

export function TicketDataForm({ ticket, i, index, handleChangeTicketData, ticketIdUsingMyAccountData, handleUseMyAccountData, showInputErros }) {

    return (
        <Row className='container-tickets-data'>
            <Col xs={12}>
                <h4>{ticket.description}</h4>
            </Col>
            <Row className='container-tickets-inputs'>
                {
                    ((ticket.idIngresso === ticketIdUsingMyAccountData && i === 0)
                        || (!ticketIdUsingMyAccountData && i === 0)) &&
                    <Col className='pb-3 pt-3' xs={12}>
                        <Form.Check
                            type='checkbox'
                            id={`default-checkbox`}
                            label={`Usar os dados da minha conta`}
                            onChange={(e) => handleUseMyAccountData({ checked: e.target.checked, ticketsDataIndex: index, ticketIndex: i, idIngresso: ticket.idIngresso })}
                        />
                    </Col>
                }
                <Col className={`pb-3 ${styles.containerInput}`} xs={12} md={6}>
                    <Form.Label>Nome completo *</Form.Label>
                    <Form.Control className={showInputErros && ticket.name.length < 2 ? 'input-error' : ''} type="text" value={ticket.name} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'name', ticketsDataIndex: index, ticketIndex: i })} name="nome_completo" placeholder="Nome Completo *" />
                    {showInputErros && ticket.name.length < 2 && <Form.Text className="text-error">Informe o nome completo da pessoa que irá utilizar o ingresso.</Form.Text>}
                </Col>
                <Col className={`pb-3 ${styles.containerInput}`} xs={12} md={6}>
                    <div className={styles.containerPhoneNumber}>
                        <Form.Label>Telefone (WhatsApp) *</Form.Label>
                        <Form.Control className={showInputErros && (ticket.phone.length < 10 || !ticket?.isValidPhoneNumber) ? 'input-error' : ''} type="text" value={phoneMaskForList(ticket.phone)} onChange={(e) => handleChangeTicketData({ value: onlyUnsignedNumbers(e.target.value), field: 'phone', ticketsDataIndex: index, ticketIndex: i })} inputmode="numeric" name="telefone" placeholder="Telefone (WhatsApp) *" id="telefone_2" required="" maxlength="16" />
                        { ticket?.isCheckingPhoneNumber && <Loading />}
                    </div>
                    {showInputErros && (ticket.phone.length < 10 || !ticket?.isValidPhoneNumber) && <Form.Text className="text-error">Informe um número de WhatsApp válido (Enviaremos o qr code do ingresso por WhatsApp).</Form.Text>}
                </Col>
                <Col className={`pb-3 ${styles.containerInput}`} xs={12} md={6}>
                    <Form.Label>CPF <small>(Não obrigatório)</small></Form.Label>
                    <Form.Control className={showInputErros && (ticket.cpf?.length > 0 && !isValidCpf(ticket.cpf)) ? 'input-error' : ''} type="text" value={cpfMask(ticket.cpf)} onChange={(e) => handleChangeTicketData({ value: onlyUnsignedNumbers(e.target.value), field: 'cpf', ticketsDataIndex: index, ticketIndex: i })} inputmode="numeric" name="cpf" placeholder="CPF" maxlength="14" />
                    {showInputErros && (ticket.cpf?.length > 0 && !isValidCpf(ticket.cpf)) && <Form.Text className="text-error">Informe um CPF válido ou deixe o campo em branco.</Form.Text>}
                </Col>
                <Col className={`pb-3 ${styles.containerInput}`} xs={12} md={6}>
                    <Form.Label>Email <small>(Não obrigatório)</small></Form.Label>
                    <Form.Control className={showInputErros && (!isValidEmail(ticket.email) && ticket.email?.length > 0) ? 'input-error' : ''} type="email" value={ticket.email} onChange={(e) => handleChangeTicketData({ value: e.target.value, field: 'email', ticketsDataIndex: index, ticketIndex: i })} name="email" placeholder="Email" />
                    {showInputErros && (!isValidEmail(ticket.email) && ticket.email?.length > 0) && <Form.Text className="text-error">Informe um email válido ou deixe o campo em branco (Enviaremos o qr code do ingresso).</Form.Text>}
                </Col>
            </Row>
        </Row>
    )
}