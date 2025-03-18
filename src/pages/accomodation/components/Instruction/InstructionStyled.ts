import styled from "styled-components";

export const InstructionWrapper = styled.div`
  padding: 0 16px;
  @media (max-width: 1200px) {
    padding: 0 30px;
    margin-top: 75px;
  }
   @media (max-width: 992px) {
    padding: 0 30px;
    margin-top: 75px;
  }
  @media (max-width: 640px) {
    padding: 0 50px;
    margin-top: 0px;
  }
`;

export const Title = styled.div`
  font-size: 30px;
  color: #986fe9;
  font-weight: 600;
  margin-top: 2rem;
  font-family: "Medieval Sharp", cursive;
  @media (max-width: 1200px) {
    font-size: 24px;
    letter-spacing: 0.2px;
  }
  @media (max-width: 1024px) {
    margin-bottom: 36px;
  }
  @media (max-width: 768px) {
    font-size: 26px;
    text-align: center;
  }
  @media (max-width: 640px) {
    font-size: 16px;
    text-align: center;
  }
`;

export const Text = styled.div`
  color: #F2F5FA;
  font-size: 18px;
  line-height: 27px;
  font-family: "Medieval Sharp", cursive;
  margin-top: 15px;
  position: relative;

  &::before {
    content: '»';
    position: absolute;
    top: -1px;
    left: 0;
    margin-left: -15px;
    font-size: 1rem;
    color: #8afa88;
    font-weight: 700;
  }
  @media (max-width: 1200px) {
    font-size: 14px;
    line-height: 19px;
    margin-top: 5px;
  }
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  padding: 0 100px;
  width: 100%;
  font-family: "Medieval Sharp", cursive;
  
  @media (max-width: 1200px) {
    padding: 0 80px;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 40px;
  }
  @media (max-width: 640px) {
    width: 100%;
    max-width: 320px;
    padding: 0 10px;
  }
`;
