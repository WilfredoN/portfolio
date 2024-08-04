export const prevPageVariant = {
	initial: {
		x: '100vw',
		opacity: 0,
		scale: 0.9,
		filter: 'blur(0px)',
		rotate: 0,
		borderRadius: '0%'
	},
	final: {
		x: '0vw',
		opacity: 1,
		scale: 1,
		filter: 'blur(0px)',
		rotate: 0,
		borderRadius: '0%',
		transition: {
			type: 'spring',
			stiffness: 150,
			damping: 25
		}
	},
	exit: {
		x: '100vw',
		opacity: 0,
		scale: 0.9,
		filter: 'blur(10px)',
		rotate: -5,
		borderRadius: '5%',
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 15
		}
	}
}

export const nextPageVariant = {
	initial: {
		x: '-100vw',
		opacity: 0,
		scale: 0.9,
		filter: 'blur(0px)',
		rotate: 0,
		borderRadius: '0%'
	},
	final: {
		x: '0vw',
		opacity: 1,
		scale: 1,
		filter: 'blur(0px)',
		rotate: 0,
		borderRadius: '0%',
		transition: {
			type: 'spring',
			stiffness: 150,
			damping: 25
		}
	},
	exit: {
		x: '-100vw',
		opacity: 0,
		scale: 0.9,
		filter: 'blur(10px)',
		rotate: 5,
		borderRadius: '5%',
		transition: {
			type: 'spring',
			stiffness: 200,
			damping: 15
		}
	}
}
