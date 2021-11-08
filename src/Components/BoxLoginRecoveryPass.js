import { Row, Col, FormGroup, Label, Input } from 'reactstrap'

export const BoxLoginRecoveryPass = () => {
    return (
        <Row>
            <Col>
                <FormGroup check inline className="check-remember" >
                    <Label check >
                        <Input type="checkbox" /> Recuerdame
                    </Label>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup className="formgroup-a">
                    <a className='a-recovery-pass' href="/recovery-pass/">Olvidaste tu contraseña?</a>
                </FormGroup>
            </Col>
        </Row>
    )
}