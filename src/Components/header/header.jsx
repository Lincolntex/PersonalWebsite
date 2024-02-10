import { useNavigate } from 'react-router-dom'
import './header.scss'
import Button from 'react-bootstrap/Button'

export function Header () {
    const navigate = useNavigate()
    
    return (
        <div className="header">
            <div className='header-left'>
                <h1>Chasen</h1>
            </div>
            <div className='header-right'>
                <Button onClick={() => navigate ('home')}>Home</Button>
                <Button onClick={() => navigate ('about')}>About</Button>
                <Button onClick={() => navigate ('blog')}>Blog</Button>
            </div>
        </div>
    )
}