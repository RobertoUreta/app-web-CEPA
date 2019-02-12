import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100wh;
`;

export const Navigation = styled.div`
  width: 220px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid rgba(0, 0, 0, 0.125);
`;
export const Body = styled.div`
  padding: 30px;
  height: 100vh;
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

export const ExampleContainer = styled.div`
  background: #fff;
  border: 1px solid #e5e5e5;
  height: 100vh;
`;

export const ExampleNavigation = styled(Navigation)`
  width: 100wh
  height: 100vh;
  margin-right: 4px;
  border: 1px solid rgba(0, 0, 0, 0.125);  
`;

export const ExampleBody = styled.div`  
  background: #fff;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.125);
`;