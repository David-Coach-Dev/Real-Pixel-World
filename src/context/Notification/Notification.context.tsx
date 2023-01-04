import { AlertVoice } from "@/common/AlertVoice";
import { Notification } from "@/components";
import { AlertColor } from "@mui/material";
import { createContext, useContext, useState } from "react";
export interface NotificationInterface { };
type ContextProps = {
	getError: (msg: string) => void;
	getInfo: (msg: string) => void;
	getSuccess: (msg: string) => void;
	getWarning: (msg: string) => void;
};
const NotificationContext =createContext<ContextProps | null>(null);
export const NotificationProvider: React.FC<{ children: JSX.Element }> = ({
	children,
}) => {
	const [msg, setMsg] = useState('');
	const [open, setOpen] = useState(false);
	const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
	const handleClose = () => {
		setOpen(false);
	};
	const getError = (msg: string) => {
		setSeverity('error');
		setOpen(true);
		setMsg(msg);
		AlertVoice(msg);
	};
	const getInfo = (msg: string) => {
		setSeverity('info');
		setOpen(true);
		setMsg(msg);
		AlertVoice(msg);
	};
	const getSuccess = (msg: string) => {
		setSeverity('success');
		setOpen(true);
		setMsg(msg);
		AlertVoice(msg);
	};
	const getWarning = (msg: string) => {
		setSeverity('warning');
		setOpen(true);
		setMsg(msg);
		AlertVoice(msg);
	};
	
	const value = {
		getError,
		getInfo,
		getSuccess,
		getWarning,
	};
	return (
		<NotificationContext.Provider value={value}>
			<Notification
				handleClose={handleClose}
				open={open}
				severity={severity}
				msg={msg}
				/>
			{children}
		</NotificationContext.Provider>
	);
};
export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error('No existe contexto');
	} else {
		return context;
	};
};
