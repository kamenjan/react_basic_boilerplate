import React, { Component } from "react"
import PropTypes from 'prop-types'
import { TimelineLite, TweenLite } from 'gsap'
import _ from 'lodash'
import { compose } from "../../../../services/functional"
import PlpCubes from "./svg/plp-inkscape.svg"

export default class FirstScene extends Component {

	constructor({transitionState, transitionTimeout}) {
    super({transitionState, transitionTimeout})
		// super(props)
		// this.state = { transitionState: this.transitionState }
		this.plpCubesSvgRef = React.createRef()
		this.elementsAnimationSteps = {
			cubes: {
				out: { ... this.moveAlongYAxis(3000) }
			},
			P1: {
				initial: { ... this.moveAlongCubicalXAxis(-3000) },
				in: { ... this.moveAlongCubicalXAxis(0) },
				end: { ... this.moveAlongCubicalXAxis(-100) }
			},
			L: {
				initial: { ... this.moveAlongYAxis(3000) },
				in: { ... this.moveAlongYAxis(0) },
				end: { ... this.moveAlongYAxis(-100) }
			},
			P2: {
				initial: { ... this.moveAlongCubicalXAxis(3000) },
				in: { ... this.moveAlongCubicalXAxis(0) },
				end: { ... this.moveAlongCubicalXAxis(-100) }
			}
		}
		this.svgAnimationElements = {}
	}

	/* Helper functions for isometric axis movement */
	moveAlongYAxis = length => ({ y: length })
	moveAlongCubicalXAxis = length => ({ x: length*Math.cos(Math.PI / 6), y: -length*Math.sin(Math.PI / 6) })
	moveAlongCubicalYAxis = length => ({ x: length*Math.cos(Math.PI / 6), y: length*Math.sin(Math.PI / 6) })

	getSvgById = id => this.plpCubesSvgRef.current.querySelector(`#${id}`)
	objectToArray = object => typeof object === 'object' ? Object.values(object) : {}

	componentWillReceiveProps(nextProps) {
    // nextProps.transitionState !== this.props.transitionState ? console.log(nextProps.transitionState) : console.log('')
		if (nextProps.transitionState === `entering` || nextProps.transitionState === `exiting`) {
			// this.setState({transitionState: nextProps.transitionState})
			if (nextProps.transitionState === `exiting`) this.animateExit(this.svgAnimationElements)
		}
	}

	componentDidMount() {
		const svg = this.getSvgById(`plp-cubes`)
		const P1 = svg.getElementById(`P1`)
		const L = svg.getElementById(`L`)
		const P2 = svg.getElementById(`P2`)
		const cubes = this.objectToArray(svg.getElementsByClassName(`cube`))
		this.svgAnimationElements = {P1, L, P2, cubes}
		this.animateEnter(this.svgAnimationElements)
	}

	animateEnter = ({ P1, L, P2 }) => {
		const letters = [P1, L, P2]
		const animation = new TimelineLite()
		animation.add(`start`, `+=${this.transitionTimeout}`)
		letters.map((letter, index) => {
			const letterAnimationData = this.elementsAnimationSteps[letter.id].initial
			animation.from(letter, 1, { ... letterAnimationData}, `start+=${index/5}`)
		})
	}

	animateExit = ({ cubes }) => {
		const animation = new TimelineLite();
		animation.add("start")
		cubes.map((cube, index) => {
			const cubeAnimationData = this.elementsAnimationSteps.cubes.out
			animation.to(cube, 1, { ... cubeAnimationData}, `start+=${index/10}`)
		})
	}

	render() {
		return (
			<div id={"first-scene"} className={`section`} ref={this.plpCubesSvgRef}>
				<PlpCubes id={"plp-cubes"}/>
			</div>
		)
	}
}

FirstScene.propTypes = {
	history: PropTypes.object,
	location: PropTypes.object,
	match: PropTypes.object,
	transitionState: PropTypes.string,
	transitionTimeout: PropTypes.number
}