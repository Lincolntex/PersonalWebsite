import './app-layout.css'
import { Header } from '../header/header'
import { Outlet } from 'react-router-dom'
import { Footer } from '../footer/footer'

export function AppLayout() {
    
    return (
        <div className='app-layout'>
            <div className='app-header sticky'>
                <Header/>
            </div>
            <div className='scroll-area'>
                <div className='app-content'>
                    <Outlet/>
                </div>
                <div className='app-footer'>
                    <Footer/>
                </div>
            </div>
            
        </div>
    )
}