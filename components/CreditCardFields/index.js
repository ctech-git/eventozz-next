import { Col, Form, Row } from "react-bootstrap";
import { isValidCreditCardNumber } from "../../utils/fieldValidation";
import { cepMask, cpfCnpjMask, cvvMask, expirationDateMask, onlyUnsignedNumbers, stringNormalize } from "../../utils/strings";
import styles from './styles.module.scss';

export function CreditCardFields({ showCheckoutInputErros, creditCardData, handleChangeCreditCardData, billingData, handlerCep,
        handleChangeBillingData, installmentsNumber, handleChangeInstallmentNumber, installmentOptions}) {
    return (
        <div className='container-credit-card-inputs'>
            <Row className='pb-4'>
                <Col xs={12}>
                    <h3>Dados do Cartão</h3>
                </Col>
                <Col xs={12} md={6} className='pb-3'>
                    <Form.Group className={styles.inputContainer}>
                        <Form.Label>Número do Cartão</Form.Label>
                        <Form.Control className={showCheckoutInputErros && !isValidCreditCardNumber(creditCardData.number) ? 'input-error' : ''} value={creditCardData.number} onChange={(e) => handleChangeCreditCardData({ value: onlyUnsignedNumbers(e.target.value), field: 'number' })} placeholder="0000 0000 0000 0000" />
                        {showCheckoutInputErros && !isValidCreditCardNumber(creditCardData.number) && <Form.Text className="text-error">Informe um número de cartão válido.</Form.Text>}
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} className='pb-3'>
                    <Form.Group className={styles.inputContainer}>
                        <Form.Label>Data de Vencimento</Form.Label>
                        <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={expirationDateMask(creditCardData.expirationDate)} onChange={(e) => handleChangeCreditCardData({ value: onlyUnsignedNumbers(e.target.value), field: 'expirationDate' })} placeholder="00/00" />
                        {showCheckoutInputErros && <Form.Text className="text-error">Informe uma data de vencimento válida.</Form.Text>}
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} className='pb-3'>
                    <Form.Group className={styles.inputContainer}>
                        <Form.Label>Cod. Segurança</Form.Label>
                        <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={cvvMask(creditCardData.cvv)} onChange={(e) => handleChangeCreditCardData({ value: e.target.value, field: 'cvv' })} placeholder="000" />
                        {showCheckoutInputErros && <Form.Text className="text-error">Informe um código de segurança válido.</Form.Text>}
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} className='pb-3'>
                    <Form.Group className={styles.inputContainer}>
                        <Form.Label>Nome Impresso</Form.Label>
                        <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={creditCardData.name} onChange={(e) => handleChangeCreditCardData({ value: stringNormalize(e.target.value), field: 'name' })} />
                        {showCheckoutInputErros && <Form.Text className="text-error">Informe o nome como aparece no cartão.</Form.Text>}
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} className='pb-3'>
                    <Form.Group className={styles.inputContainer}>
                        <Form.Label>CPF ou CNPJ do portador do cartão</Form.Label>
                        <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={cpfCnpjMask(creditCardData.holderDocument)} onChange={(e) => handleChangeCreditCardData({ value: onlyUnsignedNumbers(e.target.value), field: 'holderDocument' })}
                            placeholder="00.000.000/0000-00" />
                        {showCheckoutInputErros && <Form.Text className="text-error">Informe o documento do portador do cartão.</Form.Text>}
                    </Form.Group>
                </Col>
            </Row>

            <Row className='pb-4'>
                <Col xs={12}>
                    <h3>Dados da Fatura</h3>
                </Col>
                <Col xs={12} md={6} className='pb-3'>
                    <Form.Group className={styles.inputContainer}>
                        <Form.Label>CEP</Form.Label>
                        <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={cepMask(billingData.cep)} onChange={(e) => handlerCep(e)} placeholder="00000-000" />
                        {showCheckoutInputErros && <Form.Text className="text-error">O campo CEP é obrigatório.</Form.Text>}
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} className='pb-3'>
                    <Form.Group className={styles.inputContainer}>
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={billingData.address} onChange={(e) => handleChangeBillingData({ value: e.target.value, field: 'address' })} />
                        {showCheckoutInputErros && <Form.Text className="text-error">O campo Endereço é obrigatório.</Form.Text>}
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} className='pb-3'>
                    <Form.Group className={styles.inputContainer}>
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={billingData.city} onChange={(e) => handleChangeBillingData({ value: e.target.value, field: 'city' })} />
                        {showCheckoutInputErros && <Form.Text className="text-error">O campo Cidade é obrigatório.</Form.Text>}
                    </Form.Group>
                </Col>
                <Col xs={12} md={6} className='pb-3'>
                    <Form.Group className={styles.inputContainer}>
                        <Form.Label>Estado</Form.Label>
                        <Form.Control className={showCheckoutInputErros ? 'input-error' : ''} value={billingData.state} onChange={(e) => handleChangeBillingData({ value: e.target.value, field: 'state' })} />
                        {showCheckoutInputErros && <Form.Text className="text-error">O campo Estado é obrigatório.</Form.Text>}
                    </Form.Group>
                </Col>
            </Row>

            <Row className='pb-4'>
                <Col xs={12}>
                    <h3>Parcelamento</h3>
                </Col>
                <Col xs={12} md={6} className='pb-3'>
                    <Form.Group className={styles.inputContainer}>
                        <Form.Label>Quantas parcelas?</Form.Label>
                        <Form.Select value={installmentsNumber} onChange={(e) => handleChangeInstallmentNumber(e.target.value)}>
                            <option>Selecione uma opção</option>
                            {
                                installmentOptions.map((item, i) => (
                                    <option selected={i === 0 ? true : false} value={item.value}>{item.label}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    )
}