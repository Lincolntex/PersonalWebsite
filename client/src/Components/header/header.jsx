import { useNavigate } from 'react-router-dom'
import './header.css'
import Button from 'react-bootstrap/Button'

export function Header () {
    const navigate = useNavigate()
    
    return (
        <div className="header">
            <div className='header-left'>
                <h1>Chasen Young</h1>
            </div>
            <div className='header-right'>
                <Button onClick={() => navigate ('home')}>Home</Button>
                <Button onClick={() => navigate ('about')}>About</Button>
                <Button hidden onClick={() => navigate ('blog')}>Blog</Button>
            </div>
        </div>
    )
}