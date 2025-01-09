import { CapybaraImage } from '../image/CapybaraImage'
export const MainInfo = () => {
	return (
		<div className="flex m-0 flex-col items-center justify-center max-w-screen-2xl">
			<CapybaraImage />

			<p
				className="text-2xl m-0 p-2 text-center flex justify-start leading-loose"
				style={{ minWidth: '55%' }}
			>
				Hi, I'm a Software Developer.
				<br /> I love to build web applications from start to finish.
				<br /> I have experience in Java, Spring on the backend, React and
				Angular on the frontend.
				<br /> Let's connect and create something amazing together!
			</p>
		</div>
	)
}
