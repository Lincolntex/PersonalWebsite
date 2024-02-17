import './card.css'

export function Card (props) {
    return (
        <div className='card'>
            <h3 className='card-heading'>{props.heading}</h3>
            {props.subTitle && 
                <h4 className='card-sub-heading'>{props.subTitle}</h4>
            }
            <p className='card-content'>{props.content}</p>
            {props.footer && 
                <p className='card-footer'>{props.footer}</p>
            }

        </div>
    )
}