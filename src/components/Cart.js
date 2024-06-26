import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease, removeItem, clearCart, calculateTotals, fetchCartItems } from '../redux/cartSlice';
import styled from 'styled-components';
import { openModal } from '../redux/modalSlice';
import Modal from './Modal';
import Loading from 'react-loading';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;
const Header = styled.h1`
  text-align: center;
`;
const Text = styled.div`
  text-align: center;
  margin-bottom : 50px;
`;
const Button = styled.button`
  background: #adacad;
  border-radius: 3px;
  border: none;
  color: white;
  padding: 0.5em 1em;
  cursor: pointer;
  margin: 5px;

  &:hover {
    background: #d64d7e;
  }
`;
const AlbumList = styled.ul`
  list-style: none;
  padding: 0;
`;
const AlbumItem = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;
const AlbumImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;
const AlbumInfo = styled.div`
  flex: 1;
`;
const TotalInfo = styled.div`
  text-align: center;
  margin-top: 20px;
`;

function Cart() {

  const { albums, totalQuantity, totalPrice, status, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [albums, dispatch]);

  const handleIncrease = (id) => {
    dispatch(increase({id}));
  };

  const handleDecrease = (id) => {
    dispatch(decrease({id}));
  };

  const handleRemove = (id) => {
    dispatch(removeItem({id}));
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };
  let content;

  if (status === 'loding') {
    content = (
      <div style={{ display: 'flex', justifyContent: 'center',
        alignItems: 'center', height:'100vh'
      }}>
        <Loading type='spin' color='#d64d7e' height={50} width={50} />
      </div>
    )
  }
  else if(status === 'succeeded') {
    content = (
      <AlbumList>
        {albums.map( album => (
          <AlbumItem key={album.id}>
            <AlbumImage src={album.img} alt={album.title}/>
            <AlbumInfo>
              {album.title} - {album.singer} - Price: {album.price} - Quantity: {album.amount}
            </AlbumInfo>
            <Button onClick={ () => handleIncrease(album.id)}>+</Button>
            <Button onClick={ () => handleDecrease(album.id)}>-</Button>
            <Button onClick={ () => handleRemove(album.id)}>Remove</Button>
          </AlbumItem> 
        ))}
      </AlbumList>
    );
  } else if(status === 'failed') {
    content = <p>{error}</p>
  }
  return (
    <Container>
      <Header>당신이 선택한 음반</Header>
      <Text>고객님이 좋아하는 옵션을 담아보세요 ~ !</Text>
      {content}
      <Button onClick={handleOpenModal}>Clear Cart</Button>
      <TotalInfo>
        <h2>Total Quantity: {totalQuantity}</h2>
        <h2>Total Price: {totalPrice}</h2>
      </TotalInfo>
      <Modal />
    </Container>
  );
}

export default Cart;