import { RecoilRoot } from 'recoil';
import { CanvasEditorLayout } from './components';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <CanvasEditorLayout />
    </RecoilRoot>
  );
}

export default App;
