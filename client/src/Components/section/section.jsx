import './section.css'

export function Section(props) {
    return (
        <div className='section'>
            <h1 className='heading'>{props.title}</h1>
            <div className='content-area'>
                {props.content}
            </div>
            <div className='section-break'></div>
        </div>
    )
}