import { RecoilRoot } from 'recoil';
import { CanvasEditorLayout } from './components';
import GlobalStyle from './styles/GlobalStyle';
import { CustomToastContainer } from './components/common';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <CustomToastContainer />
      <CanvasEditorLayout />
    </RecoilRoot>
  );
}

export default App;
