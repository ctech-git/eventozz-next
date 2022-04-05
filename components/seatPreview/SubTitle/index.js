
import { Container } from 'react-bootstrap';
import { availableVipSeats, availableGoldSeats, availableSilverSeats } from '../../../mock/seatPreview';

export const SubtitleSeatPreview = ({ }) => {

    return (
        <div className='subtitle-container'>
                <div className='subtitle-item'>
                    <i className='item-seat-preview vip subtitle fa fa-chair'></i>
                    <span>Área Vip</span>
                </div>
                <div className='subtitle-item'>
                    <i className='item-seat-preview gold subtitle fa fa-chair'></i>
                    <span>Área Ouro</span>
                </div>
                <div className='subtitle-item'>
                    <i className='item-seat-preview silver subtitle fa fa-chair'></i>
                    <span>Área Prata</span>
                </div>
                <div className='subtitle-item'>
                    <i className='item-seat-preview black subtitle fa fa-wheelchair'></i>
                    <span>Área PCD</span>
                </div>
                <div className='subtitle-item'>
                    <i className='item-seat-preview reserved subtitle fa fa-circle'></i>
                    <span>Vendido</span>
                </div>
        </div>
    );
}