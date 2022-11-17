
export class Notification {
    static showSuccess = (message: string) => {
        try {
            Xrm.App.addGlobalNotification({ message: message, level: 1, type: 2, showCloseButton: true });
        }
        catch { console.log(message); }

    }

    static showWarning = (message: string) => {
        try {
            Xrm.App.addGlobalNotification({ message: message, level: 3, type: 2, showCloseButton: true });
        }
        catch { console.log(message); }
    }

    static showError = (message: string, error?: any) => {
        let errorMessage = message;
        if (error?.messages) errorMessage = errorMessage + " " + error.messages.map((m: any) => { return m.message }).join('\n');
        try {
            Xrm.App.addGlobalNotification({ message: errorMessage, level: 2, type: 2, showCloseButton: true });
            if (error) console.log(error);
        }
        catch { console.log(errorMessage); if (error) console.log(error); }
    }
}