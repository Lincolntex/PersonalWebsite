import '../../styles.css'
import './about.css'
import { Section } from "../../Components/section/section"
import { Card } from "../../Components/card/card"
import { ACTIVITY_CARD_DATA } from "../../Components/data/data"
import { MUSIC_CARD_DATA } from "../../Components/data/data"
import { OUTDOOR_CARD_DATA } from "../../Components/data/data"
import { TECH_CARD_DATA } from "../../Components/data/data"
import { TABLETOP_CARD_DATA } from "../../Components/data/data"
import { AboutHero } from "../../Components/aboutHero/aboutHero"

export function About() {
    function convertToCard(input, id) {
        return (
            <div className="section-row about-section-row" key={id}>
                <img className='section-img' src={input.imgSrc}></img>
                <Card heading={input.heading}
                    subTitle={input.subHeading}
                    content={input.content}
                    footer={input.footer}
                />
            </div>
        )
    }

    return(
        <>
            <AboutHero/>
            <Section title='Play Music' content={
                MUSIC_CARD_DATA.map (convertToCard)
            }/>
            <Section title='Outdoor Adventures' content={
                OUTDOOR_CARD_DATA.map (convertToCard)
            }/>
            <Section title='Tech/Gaming' content={
                TECH_CARD_DATA.map (convertToCard)
            }/>
            <Section title='Tabletop Gaming' content={
                TABLETOP_CARD_DATA.map (convertToCard)
            }/>
        </>
    )
        
}