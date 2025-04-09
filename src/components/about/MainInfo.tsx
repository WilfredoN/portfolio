import { CapybaraImage } from '../image/CapybaraImage'
export const MainInfo = () => {
	return (
		<div className="flex m-0 flex-col items-center justify-center max-w-screen-2xl">
			<CapybaraImage />

			<p
				className="text-2xl m-0 p-2 text-center flex justify-start leading-10"
				style={{ minWidth: '55%' }}
			>
				Hi, I'm a Software Engineer.
				<br /> I love to build web and desktop applications from start to
				finish.
				<br /> I have experience in Java, Spring on the backend, React and
				Angular on the frontend.
				<br /> Also I have experience in C, C++ and Python.
				<br /> I am passionate about learning new technologies and improving my
				skills. <br />I am always looking for new challenges and opportunities
				to grow as a developer.
				<br /> Let's connect and create something amazing together!
			</p>
		</div>
	)
}
