import React from 'react'
import './BB8.css'

//credits
//https://github.com/jrlmontejo/bb-8

const BB8 = () => {
    return (
        <div className="bb8-container">
        <div className="bb-8">
            <div className="bb-8__head">
                <div className="bb-8__head__antenna"></div>
                <div className="bb-8__head__antenna--longer"></div>
                <div className="bb-8__head__top">
                    <div className="bb-8__head__top__bar--gray"></div>
                    <div className="bb-8__head__top__bar--red"></div>
                    <div className="bb-8__head__top__lens">
                        <div className="bb-8__head__top__lens__inner"></div>
                    </div>
                    <div className="bb-8__head__top__lens--secondary">
                        <div className="bb-8__head__top__lens--secondary__inner"></div>
                    </div>
                    <div className="bb-8__head__top__bar--red--lower--left"></div>
                    <div className="bb-8__head__top__bar--red--lower--right"></div>
                    <div className="bb-8__head__top__bar--gray--lower"></div>
                </div>
                <div className="bb-8__head__joint"></div>
            </div>
            <div className="bb-8__head-shadow"></div>
            <div className="bb-8__body">
                <div className="bb-8__body__circle bb-8__body__circle--one">
                    <div className="bb-8__body__circle__bar bb-8__body__circle--one__bar--one"></div>
                    <div className="bb-8__body__circle__bar bb-8__body__circle--one__bar--two"></div>
                    <div className="bb-8__body__circle--one__inner-circle"></div>
                    <div className="bb-8__body__circle--one__inner-border"></div>
                </div>
                <div className="bb-8__body__circle bb-8__body__circle--two">
                    <div className="bb-8__body__circle__bar bb-8__body__circle--two__bar--one"></div>
                    <div className="bb-8__body__circle--two__inner-border"></div>
                </div>
                <div className="bb-8__body__circle bb-8__body__circle--three">
                    <div className="bb-8__body__circle__bar bb-8__body__circle--three__bar--one"></div>
                    <div className="bb-8__body__circle__bar bb-8__body__circle--three__bar--two"></div>
                    <div className="bb-8__body__circle--three__inner-circle"></div>
                    <div className="bb-8__body__circle--three__inner-border"></div>
                </div>
                <div className="bb-8__body__line bb-8__body__line--one"></div>
                <div className="bb-8__body__line bb-8__body__line--two"></div>
                <div className="bb-8__body__line bb-8__body__line--three"></div>
                <div className="bb-8__body__screw bb-8__body__screw--one"></div>
                <div className="bb-8__body__screw bb-8__body__screw--two"></div>
                <div className="bb-8__body__screw bb-8__body__screw--three"></div>
                <div className="bb-8__body__screw bb-8__body__screw--four"></div>
                <div className="bb-8__body__screw bb-8__body__screw--five"></div>
                <div className="bb-8__body__screw bb-8__body__screw--six"></div>
            </div>
            <div className="bb-8__body-shadow"></div>
        </div>
        </div>
    )
}

export default BB8