import './homeHero.css'

export function HomeHero (props) {
    return (
        <div className='h-hero-holder'>
            <div className='image-frame'>
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png"></img>
            </div>
            <h2 className='title'>Chasen Young</h2>
            <h4 className='desc'>A graduate of the Univeristy of Nevada, Reno with a BS in Information Systems working toward a career in Web Development.</h4>
            <div className='section-break'></div>

        </div>
    )
}