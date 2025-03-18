import styled from "styled-components";

export const InfoWrapper = styled.div`
  padding: 0 16px;
  margin-top: 2rem;
  margin-bottom: 100px;
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

export const Row = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1275px;
  margin: 0 auto;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 18px;
  width: 25%;
  font-family: "Medieval Sharp", cursive;
  @media (max-width: 1200px) {
    padding: 0 8px;
  }
  @media (max-width: 768px) {
    width: 50%;
    margin-bottom: 16px;
  }
  @media (max-width: 640px) {
    width: 100%;
    max-width: 320px;
    margin: 0 auto 40px;
  }
`;

export const Icon = styled.div`
  width: 40px;
  svg {
    width: 100%;
    fill: #554DF1;
  }
  @media (max-width: 1200px) {
    width: 30px;
  }
`;

export const Title = styled.div`
  color: #554DF1;
  font-size: 22px;
  line-height: 33px;
  font-family: "Medieval Sharp", cursive;
  font-weight: 700;
  margin-top: 20px;
  @media (max-width: 1200px) {
    font-size:16px;
    line-height: 24px;
    margin-top: 11px;
  }
`;

export const Text = styled.div`
  color: #F2F5FA;
  font-size: 18px;
  line-height: 27px;
  font-family: "Medieval Sharp", cursive;
  margin-top: 15px;
  @media (max-width: 1200px) {
    font-size: 14px;
    line-height: 19px;
    margin-top: 5px;
  }
`;

export const AccordionWrapper = styled.div`
  margin-top: 70px;
  padding: 0 40px 160px 40px;
  @media (max-width: 1200px) {
    padding: 0 40px 31px 40px;
  }
  @media (max-width: 768px) {
    padding: 0 20px 31px 20px;
  }
  @media (max-width: 640px) {
    margin-top: 45px;
  }
`;

export const AccordionStyled = styled.div`
  width: 90%;
  height: 100%;
  text-align:left;
  margin: 68px auto 0;
  @media (max-width: 1024px) {
    margin: 40px auto 0;
  }
  @media (max-width: 768px) {
    margin: 35px auto 0;
  }
`;

export const AccordionItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 30px;
  border: 2px solid #F2F5FA;
  border-radius: 10px;
  min-height: 76px;
  font-family: "Medieval Sharp", cursive;
  @media (max-width: 768px) {
    padding: 17px 20px;
  }
`;

export const AccordionTitle = styled.div`
  font-size: 18px;
  color: #F2F5FA;
  font-family: "Medieval Sharp", cursive;
  font-weight: 700;
  cursor: pointer;
  padding-right: 40px;
  @media (max-width: 1024px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    font-weight: 500;
  }
`;

export const AccordionText = styled.div`
  margin-top: 15px;
  color: #F2F5FA;
  font-family: "Medieval Sharp", cursive;
  font-size: 18px;
  line-height: 27px;
  @media (max-width: 768px) {
    font-size: 12px;
    margin-top: 11px;
    line-height: 18px;
  }
`;
