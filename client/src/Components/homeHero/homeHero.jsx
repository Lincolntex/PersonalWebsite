import './homeHero.css'
import { BASE } from '../../const'
import { loadAsset } from '../../util/load-asset'

export function HomeHero () {
    return (
        <div className='h-hero-holder'>
            <div className='image-frame'>
                <img src={loadAsset("HomeHeroIMG")}></img>
            </div>
            <h2 className='title'>Chasen Young</h2>
            <h4 className='home-hero-desc'>A graduate of the Univeristy of Nevada, Reno with a BS in Information Systems working toward a career in Web Development.</h4>
            <div className='home-hero-break'></div>

        </div>
    )
}