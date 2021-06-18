import './style/noChat.css';

export default function NoChat() {
	return (
		<div className="no_chat">
			<div className="text">
				<h1>Welcome to Whisper</h1>
				<p>Whisper does not store your messages.</p>
				<p>Whisper only stores your hashed password and contacts(optional)</p>
			</div>
		</div>
	)
}
