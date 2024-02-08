import './app-layout.css'
import { Header } from '../header/header'
import { Outlet } from 'react-router-dom'

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
                    {/* TODO footer*/}
                </div>
            </div>
            
        </div>
    )
}