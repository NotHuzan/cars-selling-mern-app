import React from 'react';
import PropTypes from 'prop-types';
import './Hero.css';
import videoBg from '../../assets/havel.mp4'
import mercedes from '../../assets/mercedes.png'
import videoBg2 from '../../assets/ford.mp4'

export default function Hero() {
    return (
        <div id='hero'>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    {/* <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> */}
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className='page page1'>
                            <div className='main'>
                                <div className="overlay">
                                </div>
                                <video src={videoBg} autoPlay loop muted />
                                <div className="content">
                                    <h1>Innovation for Convenient Lifestyle</h1>
                                    <p>Introducing new era of Hybrid HEV</p>
                                    <a style={{margin: '15px 0'}}>Explore</a>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* {<div className="carousel-item">
                        <div className='page page2'>
                            <div className='left'>
                                <h1>Mercedees s500 Hybrid</h1>
                                <p>Introducing the new era of Benz HEC Hybrid model Staring from 10 Million Pounds</p>
                                <div className='link'>
                                    <a id='a'>Explore</a>
                                    <a id='special'>Learn more</a>
                                </div>

                            </div>
                            <div className='right'>
                                <img src={mercedes}></img>
                            </div>
                        </div>
                    </div>} */}
                    {<div className="carousel-item">
                        <div className='page page3'>

                            <div className='main'>
                                <div className="overlay">
                                </div>
                                <video src={videoBg2} autoPlay loop muted />
                                <div className="content">
                                    <h1>Sports Car for a Macho Lifestyle</h1>
                                    <p>Drive Beyond Limits.</p>
                                    <a style={{margin: '15px 0'}}>Explore</a>
                                </div>
                            </div>

                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}
