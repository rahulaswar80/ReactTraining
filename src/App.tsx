import { MantineProvider } from '@mantine/core'
import './App.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import ProductDetails from './product-details'
import { Notifications } from '@mantine/notifications';

function App() {


  return (
    <MantineProvider>
            <Notifications position='top-right' />
    <div className="App">
 <ProductDetails></ProductDetails>
    
    </div>
    </MantineProvider>
  )
};

export default App;
