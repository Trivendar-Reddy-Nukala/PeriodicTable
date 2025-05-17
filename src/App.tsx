import { Global, css } from '@emotion/react';
import PeriodicTable from './components/PeriodicTable';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background: #f0f2f5;
    min-height: 100vh;
    padding: 20px;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 2.5rem;
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <h1>Interactive Periodic Table</h1>
      <PeriodicTable />
    </>
  );
}

export default App; 