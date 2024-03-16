import './aboutHero.css';
import { loadAsset } from '../../util/load-asset';

export function AboutHero () {
    return (
        <div className='a-hero-holder'>
            <div className='image-frame'>
                <img src={loadAsset("aboutHeroIMG")}></img>
            </div>
            <h2 className='title'>Chasen Young</h2>
            <h4 className='about-hero-desc'>Who is Chasen? Here are some hobbies and interests Chasen ejoys during his free time.</h4>
            <div className='hero-break'></div>

        </div>
    )
}