import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    height: 100%;
    padding: 30px;
`;

export const List = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-gap: 30px;
    margin-top: 50px;
    text-align: center;
`;

export const ListItem = styled.li`
    display: flex;
    flex-direction: column;
`

const bounce = keyframes` 
    0% { transform: translateY(0); }
    50% {transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }`

export const Avatar = styled.img`
    width: 96px;
    height: 96px;
    cursor: pointer; 

    &:hover {
        animation: ${bounce} 0.5s infinite;
    }
`

export const ItemFooter = styled.footer`
    flex: 1;
    padding: 5px 10px;
    text-align: left;
`

export const ItemTitle = styled.strong`
  font-size: 18px;
  color: #333;
`

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`

export const Dialog = styled.div`
  position:fixed;
  background: white;
  width: 350px;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const DialogTitle = styled.h3`
  padding: 5px;
  margin-bottom: 0;
  background-color: #ef5350;
  width: 100%;
  text-align: center;
`

export const DialogAvatarSwitch = styled.div`
    display: flex;
    padding: 10px;
    flex-direction: row;
    align-items: center;
`

export const DialogAvatar = styled.img`
    width: 96px;
    height: 96px;
`

export const CloseButton = styled.button`
    margin-top: 15px;
    margin-bottom: 10px;
    border: 0;
    border-radius: 4px;
    background-color: #ef5350;
    font-weight: bold; 
    cursor: pointer; 
    width: 125px;
    height: 40px;
`

export const ChangeButton = styled.button`
    background:none;
    border:none;
    margin:0;
    padding:0;
    cursor: pointer;
    font-size: 20px;
    margin: 0 15px;
`

export const StatsTable = styled.table`
  width: 75%;
`
