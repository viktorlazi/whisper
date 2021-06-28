import './style/noChat.css';

export default function NoChat() {
	return (
		<div className="no_chat">
			<div className="text">
				<h1>Welcome to Whisper</h1>
				<p>- Whisper does not store your messages, you can only message online contacts</p>
				<p>- Whisper cannot read your messages.</p>
				<p>- Your messages are encrypted with E2EE.</p>
				<p>- Whisper only stores your hashed password and contacts (optional).</p>
				<p>- Learn mroe about encryption method: <a target="_blank" href="https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange">Diffie–Hellman key exchange</a></p>
			</div>
		</div>
	)
}
