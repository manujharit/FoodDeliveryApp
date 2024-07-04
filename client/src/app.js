import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import appStore from "./redux/appStore"


const App = () => {
  return (
    <Provider store={appStore}>
      <div className="">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  )
}



export default App