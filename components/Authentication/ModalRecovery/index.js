import { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap"
import { toast } from "react-toastify";
import Services from "../../../services/login";
import { isValidEmail } from "../../../utils/strings";
import { Loading } from "../../Loading";

export const ModalRecovery = ({ showModal, closeModal }) => {

    const [email, setEmail] = useState("");
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRecoveryPassword = async () => {
        if (!isValidEmail(email)) return toast.error('Informe um email válido')
        setLoading(true);
        const response = await Services.passwordRecovery({ email })
        setLoading(false);
        if (response.status == 200) {
            setShowFinalMessage(true);
        } else {
            if (response?.response?.data?.msg) {
                setErrorMessage(response.response.data.msg)
                toast.error(response.response.data.msg, {
                    autoClose: 6000
                })
            } else {
                setErrorMessage("Não foi possível recuperar a senha no momento")
                toast.error("Não foi possível recuperar a senha no momento", {
                    autoClose: 6000
                })
            }
        }

    }

    return (
        <Modal centered show={showModal}>
            <Modal.Header>
                <Modal.Title>Recuperar senha?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    !showFinalMessage ? (
                        <>
                            <h6>Informe o seu email cadastrado abaixo</h6>
                            <Form>
                                <Form.Group>
                                    <Form.Control
                                        placeholder="email@email.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>

                            {
                                errorMessage ? <Alert variant='danger'>
                                    {errorMessage}
                                </Alert> : null
                            }
                        </>
                    ) : (
                        <Alert variant='success'>
                            As instruções de recuperação de senha foram enviadas para o email <b>{email}</b>
                        </Alert>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" variant="danger" data-dismiss="modal" onClick={closeModal}>{loading ? <Loading /> : showFinalMessage ? 'Fechar' : 'Cancelar'}</Button>
                {!showFinalMessage ? <Button type="button" onClick={() => handleRecoveryPassword()}>{loading ? <Loading /> : 'Confirmar'}</Button> : null}
            </Modal.Footer>
        </Modal>
    )
}