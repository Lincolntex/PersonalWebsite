import './section.css'

export function Section() {
    return (
        <div className='section'>
            <h1 className='heading'>Heading</h1>
            <div className='content-area'>
                <div className='left-content'></div>
                <div className='right-content'>
                    <h2>University of Nevada Reno</h2>
                    <p>Bachlors of Science in Information Systems</p>
                    <p>May 17, 2024</p>
                </div>
            </div>
            <div className='section-break'></div>
        </div>
    )
}