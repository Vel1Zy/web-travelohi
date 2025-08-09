import styled from "@emotion/styled";

export const Timer = styled.div`
position: absolute;
display: flex;
justify-content: center;
align-items: center;
font-size: 1rem;
color: white;
width: 100vw;
padding-top: 10vh;
`;

export const HealthBar = styled.img`
position: absolute;
display: flex;
justify-content: center;
align-items: center;
font-size: 1rem;
color: white;
width: 80vw;
padding-top: 6vh;
padding-left: 10vw;
height: 9vh
`;

export const DrawImage = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    width: 200px;
    height: 200px;
`;

export const MainHpContainer = styled.div`
position: absolute;
display: flex;
justify-content: space-between;
align-items: center;
font-size: 1rem;
color: white;
width: 70vw;
margin-top: 10vh;
margin-left: 15vw;
height: 2vh;
`;

export const HpBarContainer = styled.div`
    height: 100%;
    width: 50%;
`;

export const HpBarContainerLeft = styled(HpBarContainer)`

    justify-content: flex-end;
`;

export const PlayerHp =  styled.div`
    width:50%;
    height: 100%;
    background-color: green;
`;

export const EnemyHp =  styled.div`
    width:50%;
    height: 100%;
    border: 1px solid black;
    background-color: green;
`;
