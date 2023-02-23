import {IUserNotification} from "../../interfaces/user";
import {ResponseError} from "../../enums/responses";

export const changeNotificationStatus =
    function (
        notificationsList: (IUserNotification<any>|string)[],
        id: string,
        status: boolean
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (id && status !== undefined) {
                for (let i = 0; i < notificationsList.length; i++) {
                    const notification = notificationsList[i];
                    if ((typeof notification !== 'string') && (notification.id === id)) {
                        notification.status = status;
                        break;
                    }
                }
                resolve(true);
            } else {
                reject({ message: ResponseError.BAD_REQUEST })
            }
        })
    }