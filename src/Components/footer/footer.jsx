import './footer.css';

export function Footer() {
    return (
        <div className='footer'>
            <a className='icon-link' href = 'mailto: chasen.m.young@gmail.com'>
                <img src='https://raw.githubusercontent.com/rdimascio/icons/932c4cf6c9e2031abeca1c164baa0f76785c16fe/icons/gmail.svg'></img>
            </a>
            <a className='icon-link' href='https://github.com/Lincolntex'>
                <img src='https://raw.githubusercontent.com/rdimascio/icons/932c4cf6c9e2031abeca1c164baa0f76785c16fe/icons/github.svg'></img>
            </a>
            <a className='icon-link' href='https://www.linkedin.com/in/chasen-young-13y7189/'>
                <img src='https://raw.githubusercontent.com/rdimascio/icons/932c4cf6c9e2031abeca1c164baa0f76785c16fe/icons/linkedin.svg'></img>
            </a>
        </div>
    )
}