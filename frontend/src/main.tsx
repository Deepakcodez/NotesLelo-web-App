import { BrowserRouter} from "react-router-dom"
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Context } from "./Context.tsx" 


ReactDOM.createRoot(document.getElementById('root')!).render(


  
  <Context>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </Context>

)
