import {createRoot} from 'react-dom/client'
import './index.css';
import Round from './tic-tac-toe/Round';

const root  = createRoot(document.getElementById('root')!)
root.render(<Round />)
