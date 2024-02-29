import './card.css'
import BSCard from 'react-bootstrap/Card';

export function Card (props) {
    return (
        <BSCard>
            <BSCard.Header>{props.heading}</BSCard.Header>
            <BSCard.Body>
                {props.subTitle && 
                <BSCard.Title>{props.subTitle}</BSCard.Title>
                }
                <BSCard.Text>{props.content}</BSCard.Text>
                {props.footer && 
                <BSCard.Footer>{props.footer}</BSCard.Footer>
                }
            </BSCard.Body>
        </BSCard>
    )
}