import { Section } from "../../Components/section/section"
import { Card } from "../../Components/card/card"
import { ACTIVITY_CARD_DATA } from "../../Components/data/data"
import { AboutHero } from "../../Components/aboutHero/aboutHero"

export function About() {
    function convertToCard(input) {
        return <Card heading={input.heading}
                        subTitle={input.subHeading}
                        content={input.content}
                        footer={input.footer}
        />
    }

    return(
        <>
            <AboutHero/>
            <Section title='Play Music' content={
                ACTIVITY_CARD_DATA.map (convertToCard)
            }/>
            <Section title='Outdoor Adventures' content={
                ACTIVITY_CARD_DATA.map (convertToCard)
            }/>
            <Section title='Tech/Gaming' content={
                ACTIVITY_CARD_DATA.map (convertToCard)
            }/>
            <Section title='Tabletop Gaming' content={
                ACTIVITY_CARD_DATA.map (convertToCard)
            }/>
        </>
    )
        
}