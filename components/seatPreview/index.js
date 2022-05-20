
import { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { availableVipSeats, availableGoldSeats, availableSilverSeats } from '../../mock/seatPreview';
import { SubtitleSeatPreview } from './SubTitle';

export const SeatPreview = ({ ticketsSold }) => {
    const counterVipInMap = useRef(0);
    const counterGoldInMap = useRef(0);
    const counterSilverInMap = useRef(0);

    useEffect(() => {
        if (counterVipInMap?.current) {
            counterVipInMap.current = 0
        }
        if (counterGoldInMap?.current) {
            counterGoldInMap.current = 0
        }
        if (counterSilverInMap?.current) {
            counterSilverInMap.current = 0
        }
    })

    return (
        <Container>
            <div className='container-seat-preview'>
                <div className='section-title'>
                    <h2>Veja aqui como será o mapa do nosso evento</h2>
                </div>
                <SubtitleSeatPreview />
                <div className='container-stage-indicator'>
                    <div className='stage-indicator'>
                        PALCO
                    </div>
                </div>
                {
                    availableVipSeats?.map((vip, i) => (
                        <div className='container-row-seat-preview'>
                            <div className='row-indicator-seat-preview'>{vip.row}</div>
                            <div className='row-seat-preview'>
                                {
                                    vip.cols.map((col, j) => {
                                        if (!col.corridor && i > 0) {
                                            counterVipInMap.current = counterVipInMap.current + 1;
                                        }
                                        return (
                                            <div className={`${i === 0 ? 'header-seat-preview' : ''} container-item-seat-preview`}>
                                                {
                                                    col.corridor ? (
                                                        <span className={`item-seat-preview corridor`} />
                                                    ) : (
                                                        i === 0 ? col.number : counterVipInMap.current <= 0 ? <i className={`item-seat-preview reserved fa fa-circle`}></i> : <i className={`item-seat-preview ${col.className} fa fa-chair`}></i>
                                                    )
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
                {
                    availableGoldSeats?.map((gold, i) => (
                        <div className='container-row-seat-preview'>
                            <div className='row-indicator-seat-preview'>{gold.row}</div>
                            <div className='row-seat-preview'>
                                {
                                    gold.cols.map(col => {
                                        if (!col.corridor) {
                                            counterGoldInMap.current = counterGoldInMap.current + 1;
                                        }
                                        return (
                                            <div className='container-item-seat-preview'>
                                                {
                                                    col.corridor ? (
                                                        <span className={`item-seat-preview corridor`} />
                                                    ) : (
                                                        counterGoldInMap.current <= 0 ? <i className={`item-seat-preview reserved fa fa-circle`}></i> : <i className={`item-seat-preview ${col.className}`}></i>
                                                    )}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
                {
                    availableSilverSeats?.map((silver, i) => (
                        <div className='container-row-seat-preview'>
                            <div className='row-indicator-seat-preview'>{silver.row}</div>
                            <div className='row-seat-preview'>
                                {
                                    silver.cols.map(col => {
                                        if (!col.corridor) {
                                            counterSilverInMap.current = counterSilverInMap.current + 1;
                                        }
                                        return (
                                            <div className='container-item-seat-preview'>
                                                {
                                                    col.corridor ? (
                                                        <span className={`item-seat-preview corridor`} />
                                                    ) : (
                                                        counterSilverInMap.current <= 0 ? <i className={`item-seat-preview reserved fa fa-circle`}></i> : <i className={`item-seat-preview ${col.className}`}></i>
                                                    )}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </Container>
    );
}