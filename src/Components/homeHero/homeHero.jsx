import './homeHero.css'

export function HomeHero () {
    return (
        <div className='h-hero-holder'>
            <div className='image-frame'>
                <img src="https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg"></img>
            </div>
            <h2 className='title'>Chasen Young</h2>
            <h4 className='home-hero-desc'>A graduate of the Univeristy of Nevada, Reno with a BS in Information Systems working toward a career in Web Development.</h4>
            <div className='home-hero-break'></div>

        </div>
    )
}