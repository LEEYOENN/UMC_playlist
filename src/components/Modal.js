import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/modalSlice';
import { clearCart } from '../redux/cartSlice';

const ModalOverlay = styled.div`
    position : fixed;
    top : 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display : flex;
    justify-content: center;
    align-items: center;
`;
const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
`
const Button = styled.button`
    background: palevioletred;
    border-radius: 3px;
    border: none;
    color: white;
    padding : 0.5em, 1em;
    cursor: pointer;
    margin: 5px;

    &:hover {
        background: #d64d7e;
    }
`
function Modal() {
    const dispatch = useDispatch()
    const isOpen = useSelector((state) => state.modal.isOpen);

    if(!isOpen) return null;

    const handleClose = () => {
        dispatch(closeModal());
    }

    const  handleClearCart = () => {
        dispatch(clearCart());
        dispatch(closeModal());
    };

    return (
        <ModalOverlay>
            <ModalContent>
                <h2>정말 장바구니를 비우시겠습니까?</h2>
                <Button onClick={handleClearCart}>예</Button>
                <Button onClick={handleClose}>아니요</Button>
            </ModalContent>
        </ModalOverlay>
    )
}

export default Modal;