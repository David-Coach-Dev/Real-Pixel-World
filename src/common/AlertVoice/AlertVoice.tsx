function AlertVoice(msn: string) {
	speechSynthesis.speak(new SpeechSynthesisUtterance(msn));
};
export default AlertVoice;
