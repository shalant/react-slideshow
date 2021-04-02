import React, { Component, Fragment } from 'react';
import Card from './Card.js';

class Deck extends Component {
    constructor(props) {
        super(props);

        //a larger image will cause the radio buttons to go up and down, TODO: figure out how to keep images the same size
        this.state = {
            cards: [
                <Card picsum={`https://picsum.photos/800/350`} id='one' key='one' />,
                <Card picsum={`https://picsum.photos/800/352`} id='two' key='two' />,
                <Card picsum={`https://picsum.photos/800/353`} id='three' key='three' />
            ]
        }
    }

    componentDidMount() {
        this.number_of_cards_by_index = this.images.children.length -1;
        this.middle_card_by_index = Math.floor(this.number_of_cards_by_index / 2);

        /* *********** Responsive Code ************* */
        let img_width_as_percentage = 50;
        //img_width_as_percentage = window.innerWidth < 768 ? 100 : img_width_as_percentage;
        let nav_buttons_placement_as_percentage = 60;
        //nav_buttons_placement_as_percentage = window.innerWidth < 768 ? 100 : nav_buttons_placement_as_percentage;


        this.new_width = 
            /Android|webOS|iPhone|iPad|iPod|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
                (img_width_as_percentage / 100) * window.screen.width :
                (img_width_as_percentage / 100) * window.innerWidth;

        this.view_port.style.width = `${this.new_width}px`;
        this.nav_buttons_container.style.width = `${nav_buttons_placement_as_percentage}vw`;
        this.button_prev.style.width = `${(this.new_width / 2) * 0.30}px`;
        this.button_next.style.width = `${(this.new_width / 2) * 0.30}px`;

        this.selection_buttons_container.style.bottom = `${this.view_port.getBoundingClientRect().top}px`
        for (let i = 0; i < this.images.children.length; i++) {
            this.selection_buttons_container.children[i].transitionDuration = '0.0s';
            this.selection_buttons_container.children[i].style.width = `${this.new_width * 0.05}`;
            this.selection_buttons_container.children[i].style.height = `${this.new_width * 0.05}`;
        }

        this.order_cards();

        window.addEventListener('resize', () => {
            let img_width_as_percentage = 50;
            //img_width_as_percentage = window.innerWidth < 768 ? 100 : img_width_as_percentage;
            nav_buttons_placement_as_percentage = 60;
            //nav_buttons_placement_as_percentage = window.innerWidth < 768 ? 100 : nav_buttons_placement_as_percentage;

            
            this.new_width = 
                /Android|webOS|iPhone|iPad|iPod|Blackberry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
                    (img_width_as_percentage / 100) * window.screen.width :
                    (img_width_as_percentage / 100) * window.innerWidth;
    
            this.view_port.style.width = `${this.new_width}px`;
            this.button_prev.style.width = `${(this.new_width / 2) * 0.30}px`;
            this.button_next.style.width = `${(this.new_width / 2) * 0.30}px`;
    
            this.selection_buttons_container.style.bottom = `${this.view_port.getBoundingClientRect().top}px`
            for (let i = 0; i < this.images.children.length; i++) {
                this.selection_buttons_container.children[i].transitionDuration = '0.0s';
                this.selection_buttons_container.children[i].style.width = `${this.new_width * 0.05}`;
                this.selection_buttons_container.children[i].style.height = `${this.new_width * 0.05}`;
            }

            this.order_cards();
        })
        /* *********** Button Navigation ************* */



        /* ********** Selection Navigation ************** */


        /* ********** Autoplay Code ************** */

    }

    order_cards = () => {
        //const card_width = parseFloat(getComputedStyle(this.images.children[0]).width);
        let counter_for_right = 1,
            counter_for_left = this.middle_card_by_index;

        for (let i = 0; i < this.images.children.length; i++) {
            this.images.children[i].style.transitionDuration = '0.0s';

            if (i < this.middle_card_by_index) {
                this.images.children[i].style.left = `-${(counter_for_left * this.new_width) - (this.new_width / 2)}px`;
                counter_for_left--;
            } else if ( i > this.middle_card_by_index) {
                this.images.children[i].style.left = `${(counter_for_right * this.new_width) + (this.new_width / 2)}px`;
                counter_for_left++;
            } else {
                this.images.children[i].style.left = `${(this.new_width / 2)}px`;
                counter_for_left--;
            }
        }
    }

    render () {
        return (
            <Fragment>
                <div ref={ref_id => this.nav_buttons_container = ref_id} style={styles.nav_buttons_container}>
                    <img ref={ref_id => this.button_prev = ref_id} style={styles.nav_button} src='./left-chevron.png' alt='prev' />
                    <img ref={ref_id => this.button_next = ref_id} style={styles.nav_button} src='./right-chevron.png' alt='next' id='next'></img>
                </div>
                <div ref={ref_id => this.view_port = ref_id} style={styles.view_port}>
                    <div ref={ref_id => this.images = ref_id} style={styles.images_container}>
                        {this.state.cards}
                    </div>
                </div>
                <div ref={ref_id => this.selection_buttons_container = ref_id} style={styles.selection_buttons_container}>
                    {
                        this.state.cards.map((_, i) => {
                            return (<div style={styles.selection_button} key={i}></div>)
                        })
                    }   

                </div>
            </Fragment>
        )  
    }
}

const styles = {
    view_port: {
        margin: 0,
        padding: 0,
        width: '500px',
        height: '300px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        //overflow: 'hidden',
        //backgroundColor: 'red'
    },
    images_container: {
        margin: 0,
        padding: 0,
        width: 'inherit',
        height: 'inherit',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    nav_buttons_container: {
        margin: 0,
        padding: 0,
        width: '100vw',
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999
    },
    nav_button: {
        width: '50%',
        height: 'auto',
        pointerEvents: 'all',
        cursor: 'pointer'
    },
    selection_buttons_container: {
        margin: 0,
        padding: 0,
        width: 'fit-content',
        height: 'fit-content',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 255, 0.4)'
    },
    selection_button: {
        marginRight: '15px',
        padding: 0,
        width: '20px',
        height: '20px',
        borderRadius: "50%",
        backgroundColor: 'grey',
        pointerEvents: 'all',
        pointer: 'cursor'
    }
}

export default Deck;
